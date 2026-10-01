#!/usr/bin/env bash
# Run a local development server as the current user on loopback.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
DATA_ROOT="${CLIPLINE_DEV_DATA_ROOT:-$PWD/.clipline-data}"
mkdir -p "$DATA_ROOT/objects"
export CLIPLINE_PUBLIC_URL="${CLIPLINE_PUBLIC_URL:-http://localhost:8080}"
export CLIPLINE_BIND_ADDR="${CLIPLINE_BIND_ADDR:-127.0.0.1:8080}"
export CLIPLINE_DATABASE_URL="${CLIPLINE_DATABASE_URL:-sqlite://$DATA_ROOT/clipline.db}"
export CLIPLINE_DATA_DIR="${CLIPLINE_DATA_DIR:-$DATA_ROOT/objects}"
export CLIPLINE_BOOTSTRAP_ADMIN_USERNAME="${CLIPLINE_BOOTSTRAP_ADMIN_USERNAME:-admin}"
export CLIPLINE_ALLOW_INSECURE_PUBLIC_URL=true
# Without an explicit password, bootstrap prints a random one on first run.
cargo build -p clipline-cloud-server --locked
exec "${CARGO_TARGET_DIR:-$PWD/target}/debug/clipline-cloud-server"
