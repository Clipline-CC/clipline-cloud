#!/usr/bin/env bash
# Idempotent Cloud Agent setup for Clipline Cloud.
# Warms the Rust dependency cache, compiles the workspace (including test
# targets so `cargo test` is fast), and installs the frontend toolchain.
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

# Frontend toolchain (Preact + esbuild). Fast; committed dist/ is used at runtime.
npm ci --prefix apps/clipline-cloud-web

# The committed Cargo.lock pulls dependencies that need the edition2024 Cargo
# feature (Rust 1.85+), matching CI's use of the latest stable toolchain. Some
# base images default to an older toolchain, so pin the default to stable and
# ensure the lint components are present.
rustup default stable
rustup component add rustfmt clippy

# Rust workspace. `--locked` keeps Cargo.lock authoritative.
cargo fetch --locked
cargo build --workspace --all-targets
