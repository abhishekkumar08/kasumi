import assert from "node:assert/strict";
import { cn } from "./cn.js";

assert.equal(
  cn("text-title text-fg", "text-fg-muted"),
  "text-title text-fg-muted"
);
assert.equal(cn("text-body", "text-title"), "text-title");
assert.equal(cn("p-card", "p-4"), "p-4");
assert.equal(cn("rounded-card", "rounded-2xl"), "rounded-2xl");
assert.equal(cn("shadow-raised", "shadow-modal"), "shadow-modal");
assert.equal(
  cn("bg-surface", false && "bg-error-subtle", "px-control-x"),
  "bg-surface px-control-x"
);
assert.equal(cn("border-line", "border-error-line"), "border-error-line");
console.log("cn ok");
