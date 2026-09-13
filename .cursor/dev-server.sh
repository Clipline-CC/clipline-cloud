#!/usr/bin/env bash
# Runs the Clipline Cloud server for local development.
#
# Uses the default local stack: SQLite for metadata and local-disk object
# storage, both under a gitignored data directory in the workspace. The owner
# account is bootstrapped with fixed dev credentials so it can be used
# immediately; these are for LOCAL DEVELOPMENT ONLY on a localhost bind.
#
# The server is compiled as the normal user (so target/ stays user-owned) and
# then launched as root. Running as root lets the media-processing sandbox drop
# each ffmpeg child to the unprivileged "nobody" uid, exactly as in a production
# container. That matters here because the sandbox caps ffmpeg with
# RLIMIT_NPROC: on a shared dev VM the normal user already owns many processes,
# so ffmpeg (thumbnail/poster/optimization) would otherwise fail with
# "pthread_create() failed: Resource temporarily unavailable". Dropping to
# "nobody" gives ffmpeg a near-empty process table and the sandbox works.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

DATA_ROOT="${CLIPLINE_DEV_DATA_ROOT:-$PWD/.clipline-data}"
mkdir -p "$DATA_ROOT/objects"

CLIPLINE_PUBLIC_URL="${CLIPLINE_PUBLIC_URL:-http://localhost:8080}"
CLIPLINE_DATABASE_URL="${CLIPLINE_DATABASE_URL:-sqlite://$DATA_ROOT/clipline.db}"
CLIPLINE_DATA_DIR="${CLIPLINE_DATA_DIR:-$DATA_ROOT/objects}"
CLIPLINE_BOOTSTRAP_ADMIN_USERNAME="${CLIPLINE_BOOTSTRAP_ADMIN_USERNAME:-admin}"
CLIPLINE_BOOTSTRAP_ADMIN_PASSWORD="${CLIPLINE_BOOTSTRAP_ADMIN_PASSWORD:-clipline-dev-password}"
CLIPLINE_SESSION_SECRET="${CLIPLINE_SESSION_SECRET:-clipline-dev-session-secret-0123456789}"
CLIPLINE_LOG_LEVEL="${CLIPLINE_LOG_LEVEL:-info}"

# Build as the current (unprivileged) user so target/ stays user-owned.
cargo build -p clipline-cloud-server

BIN="$PWD/target/debug/clipline-cloud-server"

# `sudo env VAR=... BIN` passes the config as arguments to /usr/bin/env, which
# sidesteps sudo's env sanitization while still launching the server as root.
exec sudo env \
  CLIPLINE_PUBLIC_URL="$CLIPLINE_PUBLIC_URL" \
  CLIPLINE_DATABASE_URL="$CLIPLINE_DATABASE_URL" \
  CLIPLINE_DATA_DIR="$CLIPLINE_DATA_DIR" \
  CLIPLINE_BOOTSTRAP_ADMIN_USERNAME="$CLIPLINE_BOOTSTRAP_ADMIN_USERNAME" \
  CLIPLINE_BOOTSTRAP_ADMIN_PASSWORD="$CLIPLINE_BOOTSTRAP_ADMIN_PASSWORD" \
  CLIPLINE_SESSION_SECRET="$CLIPLINE_SESSION_SECRET" \
  CLIPLINE_LOG_LEVEL="$CLIPLINE_LOG_LEVEL" \
  "$BIN"
