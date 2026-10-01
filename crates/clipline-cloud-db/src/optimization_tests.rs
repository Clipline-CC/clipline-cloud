use crate::repositories::{ClipCursor, ClipListParams, ClipSort, PublicClipListParams};
use crate::tests::{postgres_test_database, sqlite_test_database};
use crate::*;
use chrono::Duration;

fn params(owner: &str) -> ClipListParams {
    ClipListParams {
        owner_user_id: owner.to_string(),
        game: None,
        game_category_id: None,
        source_type: None,
        visibility: None,
        status: None,
        from: None,
        to: None,
        min_duration_ms: None,
        max_duration_ms: None,
        min_size_bytes: None,
        max_size_bytes: None,
        query: None,
        sort: ClipSort::UploadedAtDesc,
        limit: 100,
        offset: 0,
    }
}

async fn assert_cursor_and_search_results(database: Database) {
    let repos = Repositories::new(database.clone());
    let owner = repos
        .users
        .create(&NewUser::new(
            format!("optimized-{}", new_ulid()),
            "hash",
            "user",
        ))
        .await
        .unwrap();
    let stamp = now_utc();
    let titles = [
        "ABC100%_\\end",
        "a\"bc",
        "été",
        "Été",
        "abc",
        "abc",
        "nothing",
        "plain",
    ];
    let mut created = Vec::new();
    for (i, title) in titles.into_iter().enumerate() {
        let mut clip = NewClip::new(&owner.id, title, "local");
        clip.status = "ready".into();
        clip.visibility = if i % 3 == 0 { "private" } else { "public" }.into();
        clip.public_share_id = Some(format!("share-{}", clip.id));
        clip.game_name = Some("Reported Game".into());
        clip.game_id = Some(format!("game-{i}"));
        clip.created_at = stamp;
        clip.updated_at = stamp;
        clip.uploaded_at = (i < 5).then_some(stamp);
        clip.recorded_at = (i < 4).then_some(stamp - Duration::seconds(i as i64 % 2));
        clip.duration_ms = (i < 6).then_some(i as i64 % 2);
        clip.file_size_bytes = (i < 6).then_some(i as i64 % 2);
        created.push(repos.clips.create(&clip).await.unwrap());
    }
    repos.reconcile_game_categories().await.unwrap();
    let category = repos
        .game_categories
        .get_by_reported_name("Reported Game")
        .await
        .unwrap()
        .unwrap();
    db_execute!(
        &database,
        "UPDATE game_categories SET display_name = ? WHERE id = ?",
        ["Display 100%_\\ABC", &category.id]
    )
    .unwrap();

    let sorts = [
        ClipSort::RecordedAtDesc,
        ClipSort::RecordedAtAsc,
        ClipSort::UploadedAtDesc,
        ClipSort::UploadedAtAsc,
        ClipSort::DurationDesc,
        ClipSort::DurationAsc,
        ClipSort::FileSizeDesc,
        ClipSort::FileSizeAsc,
        ClipSort::TitleAsc,
        ClipSort::TitleDesc,
        ClipSort::CreatedAtAsc,
        ClipSort::CreatedAtDesc,
        ClipSort::UpdatedAtAsc,
        ClipSort::UpdatedAtDesc,
    ];
    for sort in sorts {
        let mut params = params(&owner.id);
        params.sort = sort;
        let expected = repos.clips.list_for_owner(&params).await.unwrap();
        params.limit = 2;
        let mut cursor = None;
        let mut actual = Vec::new();
        for _ in 0..10 {
            let page = repos
                .clips
                .list_for_owner_after(&params, cursor.as_ref())
                .await
                .unwrap();
            if page.is_empty() {
                break;
            }
            cursor = page.last().map(|clip| ClipCursor::from_clip(sort, clip));
            assert!(cursor.as_ref().unwrap().is_valid_for(sort));
            actual.extend(page.into_iter().map(|clip| clip.id));
        }
        assert_eq!(
            actual,
            expected.into_iter().map(|clip| clip.id).collect::<Vec<_>>(),
            "owner sort {sort:?}"
        );
        let mut public = PublicClipListParams {
            owner_user_id: Some(owner.id.clone()),
            game: None,
            game_category_id: Some(category.id.clone()),
            query: None,
            sort,
            limit: 100,
            offset: 0,
        };
        let expected = repos.clips.list_public(&public).await.unwrap();
        public.limit = 2;
        let mut cursor = None;
        let mut actual = Vec::new();
        for _ in 0..10 {
            let page = repos
                .clips
                .list_public_after(&public, cursor.as_ref())
                .await
                .unwrap();
            if page.is_empty() {
                break;
            }
            cursor = page.last().map(|clip| ClipCursor::from_clip(sort, clip));
            actual.extend(page.into_iter().map(|clip| clip.id));
        }
        assert_eq!(
            actual,
            expected.into_iter().map(|clip| clip.id).collect::<Vec<_>>(),
            "public sort {sort:?}"
        );
    }

    // Compare optimized search against the exact original predicates, including
    // short queries, punctuation, non-ASCII case, category names, edits and deletes.
    for phase in 0..4 {
        if phase == 1 {
            db_execute!(
                &database,
                "UPDATE clips SET title = ? WHERE id = ?",
                ["new abc100%_\\end", &created[7].id]
            )
            .unwrap();
        } else if phase == 2 {
            repos.clips.delete(&created[0].id).await.unwrap();
        } else if phase == 3 {
            if let Database::Sqlite(pool) = &database {
                // Maintenance may rebuild row identities; search uses stable document IDs.
                sqlx::query("UPDATE clips SET rowid = rowid + 1000")
                    .execute(pool)
                    .await
                    .unwrap();
                sqlx::query("VACUUM").execute(pool).await.unwrap();
            }
        }
        for query in [
            "%", "_", "\\", "abc", "100%_\\", "a\"bc", "été", "Été", "Display", "game-7", "zzzz",
        ] {
            let pattern = format!(
                "%{}%",
                query
                    .to_ascii_lowercase()
                    .replace('\\', "\\\\")
                    .replace('%', "\\%")
                    .replace('_', "\\_")
            );
            let mut params = params(&owner.id);
            params.query = Some(query.into());
            let actual = repos
                .clips
                .list_for_owner(&params)
                .await
                .unwrap()
                .into_iter()
                .map(|clip| clip.id)
                .collect::<Vec<_>>();
            let expected = db_fetch_all!(&database, (String,),
                r"SELECT id FROM clips WHERE owner_user_id = ? AND deleted_at IS NULL AND status <> 'deleted'
                 AND (LOWER(title) LIKE ? ESCAPE '\' OR LOWER(COALESCE(game_name, '')) LIKE ? ESCAPE '\'
                    OR LOWER(COALESCE(game_id, '')) LIKE ? ESCAPE '\'
                    OR EXISTS (SELECT 1 FROM game_category_names n JOIN game_categories c ON c.id = n.category_id
                        WHERE LOWER(n.reported_name) = LOWER(game_name) AND LOWER(c.display_name) LIKE ? ESCAPE '\'))
                 ORDER BY uploaded_at IS NULL ASC, uploaded_at DESC, id DESC",
                [&owner.id, &pattern, &pattern, &pattern, &pattern]).unwrap().into_iter().map(|row| row.0).collect::<Vec<_>>();
            assert_eq!(actual, expected, "query {query:?}, phase {phase}");
        }
    }
    for (status, visibility) in [
        (Some("ready"), None),
        (None, Some("private")),
        (None, Some("public")),
    ] {
        let mut params = params(&owner.id);
        params.status = status.map(str::to_string);
        params.visibility = visibility.map(str::to_string);
        params.game_category_id = Some(category.id.clone());
        let expected = repos.clips.list_for_owner(&params).await.unwrap();
        params.limit = 2;
        let first = repos
            .clips
            .list_for_owner_after(&params, None)
            .await
            .unwrap();
        let cursor = first
            .last()
            .map(|clip| ClipCursor::from_clip(params.sort, clip));
        let rest = repos
            .clips
            .list_for_owner_after(&params, cursor.as_ref())
            .await
            .unwrap();
        let actual = first
            .into_iter()
            .chain(rest)
            .map(|clip| clip.id)
            .collect::<Vec<_>>();
        assert_eq!(
            actual,
            expected
                .into_iter()
                .take(4)
                .map(|clip| clip.id)
                .collect::<Vec<_>>()
        );
    }
}

#[tokio::test]
async fn sqlite_cursor_and_search_match_existing_results() {
    let (_temp, db) = sqlite_test_database().await;
    assert_cursor_and_search_results(db).await;
}

#[tokio::test]
async fn postgres_cursor_and_search_match_existing_results() {
    if let Some(db) = postgres_test_database().await {
        assert_cursor_and_search_results(db).await;
    }
}

#[tokio::test]
async fn sqlite_default_lists_use_ordering_indexes() {
    let (_temp, database) = sqlite_test_database().await;
    let Database::Sqlite(pool) = database else {
        unreachable!()
    };
    for (filter, index) in [
        ("visibility = 'public' AND status = 'ready' AND deleted_at IS NULL AND public_share_id IS NOT NULL", "clips_public_uploaded_order_idx"),
        ("owner_user_id = 'owner' AND deleted_at IS NULL AND status <> 'deleted'", "clips_owner_uploaded_order_idx"),
    ] {
        for suffix in [
            " ORDER BY uploaded_at IS NULL ASC, uploaded_at DESC, id DESC LIMIT 61",
            " AND (uploaded_at IS NULL) = 0 AND (uploaded_at, id) < ('2026-01-01T00:00:00+00:00', 'anchor') ORDER BY uploaded_at DESC, id DESC LIMIT 61",
            " AND (uploaded_at IS NULL) = 1 AND id < 'anchor' ORDER BY uploaded_at DESC, id DESC LIMIT 61",
        ] {
            let plan = sqlx::query_as::<_, (i64, i64, i64, String)>(&format!("EXPLAIN QUERY PLAN SELECT * FROM clips WHERE {filter}{suffix}"))
                .fetch_all(&pool).await.unwrap().into_iter().map(|row| row.3).collect::<Vec<_>>().join(" ");
            assert!(plan.contains(index), "{plan}");
            assert!(!plan.contains("TEMP B-TREE"), "{plan}");
        }
    }
}

async fn assert_touch_and_retention(database: Database) {
    let repos = Repositories::new(database.clone());
    let user = repos
        .users
        .create(&NewUser::new(
            format!("touch-{}", new_ulid()),
            "hash",
            "user",
        ))
        .await
        .unwrap();
    let session = repos
        .sessions
        .create(&NewSession::new(
            &user.id,
            new_ulid(),
            now_utc() + Duration::days(1),
        ))
        .await
        .unwrap();
    let token = repos
        .device_tokens
        .create(&NewDeviceToken::new(&user.id, "device", new_ulid()))
        .await
        .unwrap();
    repos.sessions.touch(&session.id).await.unwrap();
    repos.device_tokens.touch(&token.id).await.unwrap();
    let first_session = repos
        .sessions
        .get_by_token_hash(&session.token_hash)
        .await
        .unwrap()
        .unwrap()
        .last_used_at;
    let first_token = repos
        .device_tokens
        .get_by_token_hash(&token.token_hash)
        .await
        .unwrap()
        .unwrap()
        .last_used_at;
    for _ in 0..4 {
        let (session_result, token_result) = tokio::join!(
            repos.sessions.touch(&session.id),
            repos.device_tokens.touch(&token.id)
        );
        session_result.unwrap();
        token_result.unwrap();
    }
    assert_eq!(
        first_session,
        repos
            .sessions
            .get_by_token_hash(&session.token_hash)
            .await
            .unwrap()
            .unwrap()
            .last_used_at
    );
    assert_eq!(
        first_token,
        repos
            .device_tokens
            .get_by_token_hash(&token.token_hash)
            .await
            .unwrap()
            .unwrap()
            .last_used_at
    );
    let old = now_utc() - Duration::minutes(2);
    db_execute!(
        &database,
        "UPDATE sessions SET last_used_at = ? WHERE id = ?",
        [old, &session.id]
    )
    .unwrap();
    db_execute!(
        &database,
        "UPDATE device_tokens SET last_used_at = ? WHERE id = ?",
        [old, &token.id]
    )
    .unwrap();
    repos.sessions.touch(&session.id).await.unwrap();
    repos.device_tokens.touch(&token.id).await.unwrap();
    assert!(
        repos
            .sessions
            .get_by_token_hash(&session.token_hash)
            .await
            .unwrap()
            .unwrap()
            .last_used_at
            .unwrap()
            > old
    );
    assert!(
        repos
            .device_tokens
            .get_by_token_hash(&token.token_hash)
            .await
            .unwrap()
            .unwrap()
            .last_used_at
            .unwrap()
            > old
    );
    let mut jobs = Vec::new();
    for status in ["succeeded", "failed", "dead", "pending", "running"] {
        let mut job = NewJob::new("history", now_utc());
        job.status = status.into();
        job.updated_at = now_utc() - Duration::days(40);
        jobs.push(repos.jobs.create(&job).await.unwrap());
    }
    assert_eq!(
        repos
            .jobs
            .prune_succeeded_before(now_utc() - Duration::days(30), 100)
            .await
            .unwrap(),
        1
    );
    assert!(repos.jobs.get(&jobs[0].id).await.unwrap().is_none());
    for job in &jobs[1..] {
        assert!(repos.jobs.get(&job.id).await.unwrap().is_some());
    }
    repos
        .jobs
        .set_sweep_cursor("test", Some("position"))
        .await
        .unwrap();
    assert_eq!(
        repos.jobs.sweep_cursor("test").await.unwrap().as_deref(),
        Some("position")
    );
    repos.jobs.set_sweep_cursor("test", None).await.unwrap();
    assert!(repos.jobs.sweep_cursor("test").await.unwrap().is_none());
}

#[tokio::test]
async fn sqlite_activity_throttling_and_history_retention() {
    let (_temp, db) = sqlite_test_database().await;
    assert_touch_and_retention(db).await;
}

#[tokio::test]
async fn postgres_activity_throttling_and_history_retention() {
    if let Some(db) = postgres_test_database().await {
        assert_touch_and_retention(db).await;
    }
}
