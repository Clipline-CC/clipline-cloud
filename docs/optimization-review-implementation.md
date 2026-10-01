# Optimization review implementation

Implemented on 2026-10-01 against baseline commit
`789466c56554e7b958234fc4aa811fc3d2d24a0a`. The measurements below use synthetic
fixtures and disposable services. They are not a production load profile.

## Changes

| Review finding | Implementation |
| --- | --- |
| Default feed and library sorting | SQLite and PostgreSQL migrations add two partial indexes matching the default descending upload timestamp, NULL-last expression, and ID tie-breaker. Existing indexes remain available for other filters. |
| Repeated media source copies | New `refresh_artifacts` jobs stage and hash the source once, probe it, and produce thumbnail and poster through one FFmpeg split/decode. Each job owns its scratch directory and removes it on completion, failure, or cancellation. Legacy queued job kinds remain executable. |
| Authentication activity writes | Already-loaded session/device timestamps suppress touches for one minute. Conditional repository updates protect concurrent refreshes and revoked credentials. Every request still checks credential expiry, revocation, and the user record. |
| Duplicate serving metadata | HTTP handlers pass HEAD metadata into streaming. S3 GET uses `If-Match`; local streaming checks the opened file's size and modification time. A detected replacement returns 409 for retry. Local storage skips the read-URL attempt; range and conditional response handling remain intact. |
| Substring search | PostgreSQL uses maintained trigram GIN indexes. SQLite uses a normalized, case-sensitive, contentless FTS5 trigram index with mutation triggers to find candidates, then the original escaped LIKE predicates verify exact results. Short and NUL-containing queries use LIKE directly. Category display-name candidates join current category mappings. |
| Pagination and repeated totals | Cursor pagination covers all 14 sorts, both directions, ties, and NULL segments. New owner page/totals endpoints allow rendering without waiting for aggregates. The library caches totals for 30 seconds across matching pages and invalidates on its mutations. Quota checks retain authoritative database reads. |
| Upload buffering and hashing | Four upload permits per web process are acquired by middleware before body consumption. Uploads stream in bounded chunks to temporary files; a bounded blocking worker hashes and writes them. Local/S3 part-file operations avoid collecting complete bodies. Cancellation retains a permit until the blocking worker exits. Local multipart completion hashes parts while copying and preserves atomic rename and final checksum verification. |
| Frontend requests | Public routes mount while authentication resolves; protected routes and edit controls retain authentication gating. Visibility changes use one atomic bulk endpoint with returned sharing data; undo groups original visibility values into at most three atomic requests. Admin panels fetch their own resources and cache other visited panels, invalidating after mutations. Checked-in distribution assets are rebuilt. |
| Incremental maintenance | Object inventories use pages of at most 1,000 objects; source checks and deleted clips use batches of 100. Cursors and completed-subtask flags persist in the database. Incomplete sweeps continue after one second; completed cycles wait 30 minutes. Orphan deletion has concurrency four, a one-hour grace period, and a fresh reference check. Ready-source rotation now reaches clips beyond the first 100 and keeps the second missing-source check. Multipart inventories also paginate. |
| Operational improvements | SteamGridDB reuses its HTTP client; automatic enrichment tasks are bounded to four. Cleanup prunes at most 1,000 succeeded jobs older than 30 days, retaining failed, dead, and active jobs. The Rust client supports file uploads, four concurrent missing parts, one progress poll per batch, and direct S3 presign/upload/ack. Direct requests carry no Clipline bearer credential. Direct server deployments enable gzip for compressible responses, preserving video and range responses. |

## API and operational details

`GET /api/v1/clips/page` accepts the existing owner-list filters plus optional
`cursor` and returns `page`, `page_size`, `has_more`, `next_cursor`, and `clips`.
`GET /api/v1/clips/totals` returns exact `total` and `total_size_bytes` for the
same filters. The legacy `/api/v1/clips` response remains compatible. Public
`/api/v1/public/clips` also accepts cursors and adds `next_cursor`.

Treat cursors as opaque and keep their original filters and sort. They are not
snapshot tokens: edits, additions, and deletions between requests can change
the result set. The UI resets cursors when filters, sorts, or its mutation
generation change; previously unvisited page numbers can fall back to OFFSET.
NULL and non-NULL segments are queried separately, with their constant NULL
expression removed from the segment's ORDER BY so SQLite can stop at the limit.

The bulk visibility endpoint retains `status` and `affected`, and adds `clips`
with each updated `id`, `visibility`, `public_share_id`, and `public_url`.
Forward changes are atomic. Undo can partially succeed across different original
visibility groups; the UI reconciles each group's committed or failed result.

SQLite deployments need FTS5 with the trigram tokenizer; the repository's bundled
SQLite build is exercised by the database tests. PostgreSQL migrations create
`pg_trgm` if absent, requiring CREATE privilege on the database. An operator can
install it first using a privileged role. An existing extension schema is honored
and was tested outside `public`. Index construction and FTS backfill run during
migration, so account for migration time and temporary disk requirements on large
databases.

The four-upload limit is per web process and returns 429 with `Retry-After: 1`
when full. Each admitted request uses temporary disk proportional to its expected
body size. Scratch and storage capacity still need to cover admitted uploads and
processing. Single file uploads stream; multipart file uploads buffer at most four
parts, each capped by the client at 64 MiB. Automatic enrichment skips excess
best-effort tasks; manual enrichment remains available.

Update web and worker processes together so every runner recognizes the new
`refresh_artifacts` job kind. New runners also execute previously queued legacy kinds.

Artifact processing changes three source copies into one. For a 500 MiB source,
the artifact job reads and stages approximately 500 MiB rather than 1,500 MiB.
Separate S3 validation and optional transcoding still have their own reads.
Checksums tie staged input to the clip record, and retries stage current storage
bytes again. Files are not shared between jobs.

Processing remains serialized per worker, preserving heartbeat ownership and
existing source mutation behavior. Use the existing
[dedicated worker profile](cloud/deployment-operations.md#process-roles-and-workers)
to isolate processing from HTTP resources. Maintenance now yields between bounded
batches. Adding media concurrency or separate queue priorities requires additional
ownership and resource-limit design.

S3 inventory pages make bounded listing requests. Local inventory keeps bounded
candidate memory and prunes completed subtrees, but an unordered filesystem still
requires enumerating the root directory on each page. This reduces memory growth;
it does not guarantee constant local enumeration work per page.

## Observability

Structured events now include:

- `http.response`: method, matched route, status, and response-header latency.
- `db.query`: operation, duration, and success for repository macro queries and
  clip listing/totals builders. Parameters and raw SQL are not logged.
- `jobs.claimed` and `jobs.duration`: queue age and execution duration.
- `storage.operation`: countable backend operations, including metadata, streams,
  file uploads, and inventory pages.
- `media.source_staged` and `media.scratch_released`: source/scratch bytes and
  scratch lifetime.

Enable DEBUG for `clipline_cloud_db`, `clipline_cloud_storage`, and
`clipline_cloud_core` when collecting query/operation/queue/scratch measurements.
For example, set `CLIPLINE_LOG_LEVEL` to
`info,clipline_cloud_db=debug,clipline_cloud_storage=debug,clipline_cloud_core=debug`.
Aggregate these events in the deployment's log collector. Storage counts describe
logical operations; SDK retries may issue additional wire requests. HTTP latency
ends at response headers, so streaming transfer duration must be measured separately.

## Verification

- `npm test --prefix apps/clipline-cloud-web`: 184 tests passed.
- `npm run build --prefix apps/clipline-cloud-web` and `npm run check:dist --prefix apps/clipline-cloud-web`: passed.
- `cargo test --locked --offline --workspace`: 227 regular tests passed, with live
  PostgreSQL 16 rather than environment-skipped PostgreSQL checks.
- `cargo clippy --locked --offline --workspace --all-targets -- -D warnings`: passed.
- The normally ignored MinIO round-trip test was run explicitly and passed,
  covering metadata reuse/replacement, ranges, object and multipart pagination,
  and file-backed part uploads. Multipart pagination also handles the tested
  server's empty key marker when several uploads share one key.
- The normally ignored FFmpeg artifact test was run explicitly and passed:
  actual probing, both JPEG dimensions, checksum rejection, and repeat execution.
  It ran through the existing sandbox UID 65534 because the shared development
  UID already exceeded the sandbox's 32-process limit. Sandbox limits were retained.
- Upload admission tests verify oversized and busy requests are rejected before
  their bodies are polled, alongside staged-body validation and cancellation cleanup.
- Regression coverage compares every cursor sort with full ordered results and
  verifies search against the original literal LIKE semantics after edits and
  deletes and SQLite row-identity rebuilds/VACUUM. It also covers authentication touch races, history retention, source
  rotation across worker restarts, and prompt sweep continuation.
- The file-client loopback test verifies single PUT streaming, resumed proxy and
  direct parts, peak concurrency four, fewer progress polls, and credential isolation.
- Disposable HTTP checks verify identical cursor/OFFSET clips, gzip JSON equality,
  and exact full/range video bytes and headers.

## Reproducible benchmark

Run from the repository root:

```sh
cargo build --locked --offline -p clipline-cloud-server
python3 tools/benchmark_optimizations.py --http --output /tmp/clipline-optimizations.json
```

Omit `--http` for the in-memory SQLite benchmark alone. The script creates its own
database and starts an isolated loopback server for HTTP measurements. It never
connects to the configured application database or storage. Stop other local
builds/benchmarks when collecting timings.

The fixture has 100,000 clips across ten users, 75,000 public clips, and 991 NULL
upload timestamps. Query medians use seven warm executions with full row equality
checks. Insert costs use seven 1,000-row batches rolled back after each sample;
they exclude commit/fsync cost. Migration times and allocated database bytes are
reported for each index stage. HTTP medians use seven warm loopback requests in a
debug build and are measured after all migrations; they have no pre-change HTTP
baseline. See [recorded timings and query plans](optimization-benchmark-results.json).

| Query | Existing indexes | Default sort indexes | All new indexes |
| --- | ---: | ---: | ---: |
| First public page, 61 rows | 74.259 ms | 0.136 ms | 0.130 ms |
| First owner page, 61 rows | 13.441 ms | 0.132 ms | 0.134 ms |
| Public OFFSET 30,000 | 110.145 ms | 0.603 ms | 0.604 ms |
| Rare public substring | 81.066 ms | 81.830 ms | 0.126 ms |
| Owner count/bytes, 10,000 clips | 3.094 ms | 4.525 ms | 3.298 ms |

An equivalent non-NULL cursor at row 30,000 took 0.134 ms. The recorded cursor plan seeks the ordering index without a temporary sort.

| Index stage | Allocated database size | Insert 1,000 clips | Migration build |
| --- | ---: | ---: | ---: |
| Historical indexes | 78.68 MiB | 13.373 ms | 0.000 ms |
| Add default sort indexes | 89.81 MiB | 15.340 ms | 87.023 ms |
| Add maintenance indexes | 95.77 MiB | 17.964 ms | 65.257 ms |
| Add maintained search indexes | 113.19 MiB | 138.998 ms | 241.503 ms |

The default sort indexes add 11.14 MiB (14.2%). All three migration stages add 34.52 MiB (43.9%). Search maintenance increases this fixture's insert cost substantially; budget for it rather than assuming that query speedups are free. These figures exclude commit/fsync, WAL growth, disk I/O, and PostgreSQL costs.

| Endpoint after implementation | Warm loopback median |
| --- | ---: |
| `public_first_page` | 2.974 ms |
| `owner_page_without_totals` | 2.861 ms |
| `owner_legacy_page_with_totals` | 14.965 ms |
| `owner_totals` | 13.750 ms |
| `public_rare_search` | 1.168 ms |
| `public_offset_30000` | 4.714 ms |
| `public_cursor_30000` | 2.928 ms |
| `auth_me` | 0.736 ms |

These endpoint timings describe the current implementation only. They include authentication, response construction, and loopback HTTP; they do not establish a before/after HTTP speedup. Production measurements are still needed for deployment-specific decisions.
