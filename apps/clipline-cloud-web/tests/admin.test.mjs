import test from "node:test";
import assert from "node:assert/strict";

globalThis.window = new EventTarget();
window.location = { pathname: "/admin", hash: "", search: "" };
window.history = { pushState() {} };

const { isAdminLike } = await import("../src/pages/admin.js");

test("isAdminLike allows admins and the owner", () => {
  assert.equal(isAdminLike({ role: "admin" }), true);
  assert.equal(isAdminLike({ role: "owner" }), true);
});

test("isAdminLike rejects non-admin users", () => {
  assert.equal(isAdminLike({ role: "user" }), false);
  assert.equal(isAdminLike(null), false);
});


test("admin panels request only resources used by the active panel", async () => {
  const { loadAdminPanel } = await import("../src/pages/admin.js");
  const original = globalThis.fetch;
  const paths = [];
  globalThis.fetch = async (path) => {
    paths.push(path);
    return new Response("{}", { headers: { "content-type": "application/json" } });
  };
  try {
    await loadAdminPanel("categories", new AbortController().signal);
    assert.deepEqual(paths, ["/api/v1/admin/game-categories"]);
    paths.length = 0;
    await loadAdminPanel("users", new AbortController().signal);
    assert.deepEqual(paths, ["/api/v1/users", "/api/v1/admin/settings"]);
  } finally { globalThis.fetch = original; }
});
