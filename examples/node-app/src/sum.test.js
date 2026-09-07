import assert from "node:assert/strict";
import { test } from "node:test";
import { sum } from "./sum.js";

test("adds two integers", () => {
  assert.equal(sum(2, 3), 5);
});

test("rejects non-numbers", () => {
  assert.throws(() => sum("1", 2), TypeError);
});
