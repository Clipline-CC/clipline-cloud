use crate::error::ApiError;
use sha2::{Digest, Sha256};
use std::{
    collections::HashMap,
    sync::{LazyLock, Mutex},
    time::{Duration, Instant},
};

type ScopeBudgets = HashMap<[u8; 32], (Instant, u32)>;
type RequestBudgets = HashMap<&'static str, ScopeBudgets>;
static BUCKETS: LazyLock<Mutex<RequestBudgets>> = LazyLock::new(|| Mutex::new(HashMap::new()));
const MAX_BUCKETS: usize = 8192;

/// Fixed-size identities and bounded storage, shared by inexpensive request
/// checks. Separate scopes keep read, comment and external-service budgets apart.
pub(crate) fn check(
    scope: &'static str,
    actor: &str,
    maximum: u32,
    window: Duration,
) -> Result<(), ApiError> {
    let now = Instant::now();
    let key: [u8; 32] = Sha256::digest(actor.as_bytes()).into();
    let mut scopes = BUCKETS.lock().expect("request limiter");
    let buckets = scopes.entry(scope).or_default();
    buckets.retain(|_, (until, _)| *until > now);
    if buckets.len() >= MAX_BUCKETS && !buckets.contains_key(&key) {
        return Err(ApiError::too_many_requests_after(
            "request service is busy; retry shortly",
            Duration::from_secs(1),
        ));
    }
    let bucket = buckets.entry(key).or_insert((now + window, 0));
    if bucket.1 >= maximum {
        return Err(ApiError::too_many_requests_after(
            "too many requests; retry later",
            bucket.0.saturating_duration_since(now),
        ));
    }
    bucket.1 += 1;
    Ok(())
}
