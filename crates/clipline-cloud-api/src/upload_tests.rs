use super::*;
use axum::{
    body::Bytes,
    extract::{Path, State},
    http::HeaderMap,
    routing::{get, post, put},
    Json, Router,
};
use std::{
    collections::BTreeMap,
    sync::{
        atomic::{AtomicUsize, Ordering},
        Arc, Mutex,
    },
};

#[derive(Clone)]
struct UploadFixture {
    origin: String,
    mode: &'static str,
    direct: bool,
    part_size: u64,
    bytes: Bytes,
    parts: Arc<Mutex<BTreeMap<u16, Bytes>>>,
    active: Arc<AtomicUsize>,
    peak: Arc<AtomicUsize>,
    polls: Arc<AtomicUsize>,
    completed: Arc<AtomicUsize>,
}

fn authorized(headers: &HeaderMap) {
    assert_eq!(
        headers.get(header::AUTHORIZATION).unwrap(),
        "Bearer fixture-token"
    );
}

fn progress(state: &UploadFixture) -> serde_json::Value {
    let parts = state.parts.lock().unwrap();
    let received: Vec<_> = parts.keys().copied().collect();
    let total_parts = (state.bytes.len() as u64).div_ceil(state.part_size) as u16;
    let missing: Vec<_> = (1..=total_parts)
        .filter(|part| !parts.contains_key(part))
        .collect();
    serde_json::json!({
        "upload_id":"upload", "clip_id":"clip", "mode":state.mode,
        "status":if state.completed.load(Ordering::SeqCst) > 0 {"completed"} else {"uploading"},
        "file_size_bytes":state.bytes.len(), "part_size_bytes":state.part_size, "received_size_bytes":parts.values().map(|bytes|bytes.len()).sum::<usize>(),
        "total_parts":total_parts, "received_part_count":received.len(), "missing_part_count":missing.len(),
        "next_part_number":missing.first(), "progress_basis_points":0, "failure_reason":null, "recovery_action":null,
        "expires_at":"2027-01-01T00:00:00Z", "received_parts":received, "missing_parts":missing
    })
}

async fn create(
    State(state): State<UploadFixture>,
    headers: HeaderMap,
    Json(request): Json<CreateUploadRequest>,
) -> Json<serde_json::Value> {
    authorized(&headers);
    assert_eq!(request.file_size_bytes, state.bytes.len() as u64);
    assert_eq!(request.checksum_sha256, sha256_hex(&state.bytes));
    Json(
        serde_json::json!({"upload_id":"upload", "clip_id":"clip", "mode":state.mode, "part_size_bytes":state.part_size,
        "single_put_url":"/api/v1/uploads/upload/content", "parts_url_template":"/api/v1/uploads/upload/parts/{part_number}",
        "direct_part_presign_url_template":state.direct.then_some("/presign/{part_number}"), "direct_part_ack_url_template":state.direct.then_some("/ack/{part_number}")}),
    )
}

async fn poll(State(state): State<UploadFixture>, headers: HeaderMap) -> Json<serde_json::Value> {
    authorized(&headers);
    state.polls.fetch_add(1, Ordering::SeqCst);
    Json(progress(&state))
}

async fn content(
    State(state): State<UploadFixture>,
    headers: HeaderMap,
    bytes: Bytes,
) -> Json<serde_json::Value> {
    authorized(&headers);
    assert_eq!(
        headers[header::CONTENT_LENGTH],
        state.bytes.len().to_string()
    );
    assert_eq!(bytes, state.bytes);
    state.completed.store(1, Ordering::SeqCst);
    Json(progress(&state))
}

async fn save_part(state: &UploadFixture, number: u16, bytes: Bytes) {
    let active = state.active.fetch_add(1, Ordering::SeqCst) + 1;
    state.peak.fetch_max(active, Ordering::SeqCst);
    tokio::time::sleep(std::time::Duration::from_millis(20)).await;
    assert_eq!(
        bytes,
        chunk_for_part(&state.bytes, state.part_size, number).unwrap()
    );
    assert!(
        state.parts.lock().unwrap().insert(number, bytes).is_none(),
        "received parts must not be retransmitted"
    );
    state.active.fetch_sub(1, Ordering::SeqCst);
}

fn part_result(number: u16, bytes: &Bytes) -> serde_json::Value {
    serde_json::json!({"upload_id":"upload", "part_number":number, "size_bytes":bytes.len(), "checksum_sha256":sha256_hex(bytes), "etag":format!("part-{number}"), "idempotent":false})
}

async fn proxy_part(
    State(state): State<UploadFixture>,
    Path(number): Path<u16>,
    headers: HeaderMap,
    bytes: Bytes,
) -> Json<serde_json::Value> {
    authorized(&headers);
    assert_eq!(headers[header::CONTENT_LENGTH], bytes.len().to_string());
    assert_eq!(headers[PART_SHA256_HEADER], sha256_hex(&bytes));
    let response = part_result(number, &bytes);
    save_part(&state, number, bytes).await;
    Json(response)
}

async fn presign(
    State(state): State<UploadFixture>,
    Path(number): Path<u16>,
    headers: HeaderMap,
) -> Json<serde_json::Value> {
    authorized(&headers);
    Json(
        serde_json::json!({"upload_id":"upload", "part_number":number, "method":"PUT", "url":format!("{}/s3/{number}",state.origin),
        "expires_at":"2027-01-01T00:00:00Z", "expected_size_bytes":chunk_for_part(&state.bytes,state.part_size,number).unwrap().len(),
        "headers":[{"name":"x-signed-fixture", "value":"signed"},
        {"name":"Content-Length", "value":chunk_for_part(&state.bytes,state.part_size,number).unwrap().len().to_string()}]}),
    )
}

async fn direct_part(
    State(state): State<UploadFixture>,
    Path(number): Path<u16>,
    headers: HeaderMap,
    bytes: Bytes,
) -> HeaderMap {
    assert!(
        !headers.contains_key(header::AUTHORIZATION),
        "Clipline bearer must never reach S3"
    );
    assert_eq!(headers["x-signed-fixture"], "signed");
    assert_eq!(headers[header::CONTENT_LENGTH], bytes.len().to_string());
    assert_eq!(headers.get_all(header::CONTENT_LENGTH).iter().count(), 1);
    save_part(&state, number, bytes).await;
    let mut response = HeaderMap::new();
    response.insert(header::ETAG, format!("\"part-{number}\"").parse().unwrap());
    response
}

async fn ack(
    State(state): State<UploadFixture>,
    Path(number): Path<u16>,
    headers: HeaderMap,
    Json(request): Json<types::DirectPartUploadAckRequest>,
) -> Json<serde_json::Value> {
    authorized(&headers);
    let parts = state.parts.lock().unwrap();
    let bytes = parts.get(&number).unwrap();
    assert_eq!(request.size_bytes, bytes.len() as u64);
    assert_eq!(request.checksum_sha256, sha256_hex(bytes));
    assert_eq!(request.etag, format!("part-{number}"));
    Json(part_result(number, bytes))
}

async fn complete(
    State(state): State<UploadFixture>,
    headers: HeaderMap,
) -> Json<serde_json::Value> {
    authorized(&headers);
    let assembled: Vec<_> = state
        .parts
        .lock()
        .unwrap()
        .values()
        .flat_map(|bytes| bytes.iter().copied())
        .collect();
    assert_eq!(assembled, state.bytes);
    state.completed.store(1, Ordering::SeqCst);
    Json(progress(&state))
}

#[tokio::test]
async fn file_upload_streams_single_put_and_resumes_bounded_proxy_and_direct_parts() {
    for (mode, direct) in [("single_put", false), ("chunked", false), ("chunked", true)] {
        exercise_file_upload(
            mode,
            direct,
            8,
            Bytes::from((0..67).collect::<Vec<u8>>()),
            true,
        )
        .await;
    }
}

#[tokio::test]
async fn file_upload_streams_parts_larger_than_64_mib() {
    let part_size = 65 * 1024 * 1024;
    for direct in [false, true] {
        exercise_file_upload(
            "chunked",
            direct,
            part_size,
            Bytes::from(vec![7; part_size as usize + 17]),
            false,
        )
        .await;
    }
}

async fn exercise_file_upload(
    mode: &'static str,
    direct: bool,
    part_size: u64,
    bytes: Bytes,
    resume: bool,
) {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let origin = format!("http://{}", listener.local_addr().unwrap());
    let state = UploadFixture {
        origin: origin.clone(),
        mode,
        direct,
        part_size,
        bytes,
        parts: Default::default(),
        active: Default::default(),
        peak: Default::default(),
        polls: Default::default(),
        completed: Default::default(),
    };
    if mode == "chunked" && resume {
        for number in [2, 9] {
            state.parts.lock().unwrap().insert(
                number,
                chunk_for_part(&state.bytes, part_size, number).unwrap(),
            );
        }
    }
    let router = Router::new()
        .route("/api/v1/uploads", post(create))
        .route("/api/v1/uploads/upload", get(poll))
        .route("/api/v1/uploads/upload/content", put(content))
        .route("/api/v1/uploads/upload/parts/{number}", put(proxy_part))
        .route(
            "/api/v1/uploads/upload/parts/{number}/presign",
            post(presign),
        )
        .route("/api/v1/uploads/upload/parts/{number}/ack", post(ack))
        .route("/api/v1/uploads/upload/complete", post(complete))
        .route("/s3/{number}", put(direct_part))
        .layer(axum::extract::DefaultBodyLimit::max(
            state.bytes.len().max(2 * 1024 * 1024),
        ))
        .with_state(state.clone());
    let server = tokio::spawn(async move {
        axum::serve(listener, router).await.unwrap();
    });
    let directory = tempfile::tempdir().unwrap();
    let path = directory.path().join("clip.mp4");
    tokio::fs::write(&path, &state.bytes).await.unwrap();
    let request: CreateUploadRequest = serde_json::from_value(serde_json::json!({"title":"fixture", "file_size_bytes":state.bytes.len(), "checksum_sha256":sha256_hex(&state.bytes), "container":"mp4"})).unwrap();
    let client = CloudClient::with_device_token(Url::parse(&origin).unwrap(), "fixture-token");
    let mut callbacks = 0;
    let result = client
        .upload_mp4_file_with_progress(&request, &path, |_| callbacks += 1)
        .await
        .unwrap();
    assert_eq!(result.status, "completed");
    if mode == "chunked" {
        let peak = state.peak.load(Ordering::SeqCst);
        if resume {
            assert_eq!(peak, 4);
        } else {
            assert!((1..=2).contains(&peak));
        }
        assert_eq!(
            state.polls.load(Ordering::SeqCst),
            if resume { 3 } else { 2 }
        );
        assert_eq!(callbacks, if resume { 4 } else { 3 });
    } else {
        assert_eq!(state.polls.load(Ordering::SeqCst), 1);
        assert_eq!(callbacks, 2);
    }
    server.abort();
}
