use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, QueryBuilder, Sqlite};

use super::ClipSort;
use crate::Clip;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ClipCursor {
    sort: ClipSort,
    value: CursorValue,
    id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum CursorValue {
    Null,
    Timestamp(DateTime<Utc>),
    Integer(i64),
    Text(String),
}

fn sort_spec(sort: ClipSort) -> (&'static str, bool, bool) {
    use ClipSort::*;
    match sort {
        RecordedAtDesc => ("recorded_at", false, true),
        RecordedAtAsc => ("recorded_at", true, true),
        UploadedAtDesc => ("uploaded_at", false, true),
        UploadedAtAsc => ("uploaded_at", true, true),
        DurationDesc => ("duration_ms", false, true),
        DurationAsc => ("duration_ms", true, true),
        FileSizeDesc => ("file_size_bytes", false, true),
        FileSizeAsc => ("file_size_bytes", true, true),
        TitleDesc => ("title", false, false),
        TitleAsc => ("title", true, false),
        CreatedAtDesc => ("created_at", false, false),
        CreatedAtAsc => ("created_at", true, false),
        UpdatedAtDesc => ("updated_at", false, false),
        UpdatedAtAsc => ("updated_at", true, false),
    }
}

impl ClipCursor {
    pub fn from_clip(sort: ClipSort, clip: &Clip) -> Self {
        use ClipSort::*;
        let value = match sort {
            RecordedAtDesc | RecordedAtAsc => clip.recorded_at.map(CursorValue::Timestamp),
            UploadedAtDesc | UploadedAtAsc => clip.uploaded_at.map(CursorValue::Timestamp),
            DurationDesc | DurationAsc => clip.duration_ms.map(CursorValue::Integer),
            FileSizeDesc | FileSizeAsc => clip.file_size_bytes.map(CursorValue::Integer),
            TitleDesc | TitleAsc => Some(CursorValue::Text(clip.title.clone())),
            CreatedAtDesc | CreatedAtAsc => Some(CursorValue::Timestamp(clip.created_at)),
            UpdatedAtDesc | UpdatedAtAsc => Some(CursorValue::Timestamp(clip.updated_at)),
        };
        Self {
            sort,
            value: value.unwrap_or(CursorValue::Null),
            id: clip.id.clone(),
        }
    }

    pub fn is_valid_for(&self, sort: ClipSort) -> bool {
        let (column, _, nullable) = sort_spec(sort);
        self.sort == sort
            && !self.id.is_empty()
            && self.id.len() <= 255
            && match &self.value {
                CursorValue::Null => nullable,
                CursorValue::Integer(_) => matches!(column, "duration_ms" | "file_size_bytes"),
                CursorValue::Timestamp(_) => column.ends_with("_at"),
                CursorValue::Text(value) => column == "title" && value.len() <= 4096,
            }
    }

    pub(super) fn has_null_tail(&self) -> bool {
        sort_spec(self.sort).2 && !matches!(self.value, CursorValue::Null)
    }

    pub(super) fn null_start(&self) -> Self {
        Self {
            sort: self.sort,
            value: CursorValue::Null,
            id: String::new(),
        }
    }
}

macro_rules! cursor_filter {
    ($name:ident, $backend:ty, $title:expr) => {
        pub(super) fn $name(builder: &mut QueryBuilder<'_, $backend>, cursor: &ClipCursor) {
            let (column, ascending, nullable) = sort_spec(cursor.sort);
            let column = if column == "title" { $title } else { column };
            let comparison = if ascending { " > " } else { " < " };
            let is_null = matches!(cursor.value, CursorValue::Null);
            if nullable {
                // Query each NULL segment independently so the index can seek
                // directly to (nullness, value, id), including deep pages.
                builder.push(" AND (").push(column).push(" IS NULL) = ");
                builder.push_bind(is_null);
            }
            if is_null {
                if !cursor.id.is_empty() {
                    builder
                        .push(" AND id")
                        .push(comparison)
                        .push_bind(cursor.id.clone());
                }
            } else {
                builder
                    .push(" AND (")
                    .push(column)
                    .push(", id)")
                    .push(comparison)
                    .push("(");
                match &cursor.value {
                    CursorValue::Timestamp(value) => {
                        builder.push_bind(*value);
                    }
                    CursorValue::Integer(value) => {
                        builder.push_bind(*value);
                    }
                    CursorValue::Text(value) => {
                        builder.push_bind(value.clone());
                    }
                    CursorValue::Null => unreachable!(),
                }
                builder.push(", ").push_bind(cursor.id.clone()).push(")");
            }
        }
    };
}

cursor_filter!(push_cursor_sqlite, Sqlite, "title COLLATE BINARY");
cursor_filter!(push_cursor_postgres, Postgres, "title COLLATE \"C\"");
