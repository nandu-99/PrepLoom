// Run with: node --experimental-strip-types scripts/test-binary-search.mjs
import assert from "node:assert/strict";
import { binarySearchSteps } from "../lib/binary-search.ts";

let cases = 0;
for (let size = 0; size <= 20; size++) {
  for (const duplicate of [false, true]) {
    const values = Array.from(
      { length: size },
      (_, i) => (duplicate ? Math.floor(i / 2) : i) - 5,
    );
    for (let target = -7; target <= 17; target++) {
      const steps = binarySearchSteps(values, target);
      assert.equal(steps[0].status, "ready");
      let comparisons = 0;
      for (let i = 1; i < steps.length; i++) {
        const before = steps[i - 1];
        const step = steps[i];
        if (step.status === "select") {
          assert.ok(["ready", "narrow"].includes(before.status));
          assert.equal(
            step.mid,
            step.low + Math.floor((step.high - step.low) / 2),
          );
          assert.equal(step.line, 4);
        }
        if (step.status === "compare") {
          assert.equal(before.status, "select");
          assert.equal(step.low, before.low);
          assert.equal(step.high, before.high);
          assert.equal(step.mid, before.mid);
          comparisons++;
        }
        if (step.status === "narrow") {
          assert.equal(before.status, "compare");
          assert.equal(step.mid, before.mid);
          const right = values[step.mid] < target;
          assert.equal(step.low, right ? step.mid + 1 : before.low);
          assert.equal(step.high, right ? before.high : step.mid - 1);
          assert.equal(step.line, right ? 8 : 10);
        }
        assert.equal(step.comparisons, comparisons);
        if (values.includes(target))
          assert.ok(values.slice(step.low, step.high + 1).includes(target));
      }
      const last = steps.at(-1);
      assert.equal(last.status, values.includes(target) ? "found" : "missing");
      if (last.status === "found") {
        assert.equal(values[last.mid], target);
        assert.equal(last.line, 6);
      } else {
        assert.ok(last.low > last.high);
        assert.equal(last.mid, null);
        assert.equal(last.line, 11);
      }
      cases++;
    }
  }
}
console.log(
  `${cases} scenarios passed: phase order, comparisons, boundaries, duplicates, and terminal states.`,
);
