import test from "node:test";
import assert from "node:assert/strict";
import { JobPanel } from "../src/pages/admin/jobs.js";

test("JobPanel renders the action in the section header next to the count", () => {
  const action = { marker: "clear-button" };
  const vnode = JobPanel({
    title: "Dead jobs",
    items: [{}],
    emptyLabel: "No dead jobs.",
    renderItem: () => null,
    action,
  });
  const header = vnode.props.children[0];
  assert.equal(header.type, "div");
  assert.equal(header.props.children[2], action);
});

test("JobPanel omits the action slot when none is provided", () => {
  const vnode = JobPanel({
    title: "Failed uploads",
    items: [],
    emptyLabel: "No failed uploads.",
    renderItem: () => null,
  });
  const header = vnode.props.children[0];
  assert.equal(header.props.children[2], undefined);
});
