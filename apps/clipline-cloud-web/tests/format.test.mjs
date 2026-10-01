import test from "node:test";
import assert from "node:assert/strict";
import { formatDuration, formatBytes, formatViews } from "../src/lib/format.js";

test("formatDuration renders m:ss from ms", () => {
  assert.equal(formatDuration(58_000), "0:58");
  assert.equal(formatDuration(92_000), "1:32");
  assert.equal(formatDuration(null), "Unknown");
});
test("formatBytes matches legacy MiB/GiB output", () => {
  assert.equal(formatBytes(324 * 1024 * 1024), "324.0 MiB");
  assert.equal(formatBytes(null), "Unknown");
});
test("formatViews pluralizes", () => {
  assert.equal(formatViews(1), "1 view");
  assert.equal(formatViews(405), "405 views");
});

test("relative times do not round across minute boundaries", async () => {
  const { formatRelativeTime } = await import("../src/lib/format.js");
  const now = Date.now();
  assert.equal(formatRelativeTime(new Date(now + 500).toISOString()), "just now");
  assert.equal(formatRelativeTime(new Date(now - 3599500).toISOString()), "59 minutes ago");
});
