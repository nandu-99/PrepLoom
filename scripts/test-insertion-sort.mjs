import { test } from "node:test";
import assert from "node:assert/strict";
import {
  insertionSortSteps,
  parseInsertionInput,
} from "../lib/insertion-sort.ts";
import { insertionSortNarration } from "../lib/insertion-sort-narration.ts";
test("exhaustive insertion runs conserve items, keep stable order, and shift exactly inversions", () => {
  function check(values) {
    const original = [...values],
      steps = insertionSortSteps(values);
    assert.deepEqual(values, original);
    const result = steps.at(-1).items;
    assert.deepEqual(
      result.map((item) => item.value),
      [...values].sort((a, b) => a - b),
    );
    const inversions = values.reduce(
      (sum, v, i) => sum + values.slice(i + 1).filter((x) => x < v).length,
      0,
    );
    assert.equal(steps.at(-1).shifts, inversions);
    for (let i = 1; i < result.length; i++)
      if (result[i].value === result[i - 1].value)
        assert.ok(result[i].id > result[i - 1].id);
    for (const [index, step] of steps.entries()) {
      const all = step.items
        .filter(Boolean)
        .concat(step.held ? [step.held] : []);
      assert.deepEqual(
        all.map((item) => item.id).sort((a, b) => a - b),
        values.map((_, id) => id),
      );
      assert.equal(
        step.items.filter((item) => item === null).length,
        step.held ? 1 : 0,
      );
      if (step.held) assert.equal(step.items[step.gap], null);
      const prefix = step.items
        .slice(0, step.sortedCount)
        .filter(Boolean)
        .map((item) => item.value);
      assert.deepEqual(
        prefix,
        [...prefix].sort((a, b) => a - b),
      );
      if (step.status === "shift") {
        const prev = steps[index - 1];
        assert.equal(prev.status, "compare");
        assert.ok(prev.items[prev.j].value > prev.held.value);
        assert.equal(step.items[prev.j + 1].id, prev.items[prev.j].id);
        assert.equal(step.held.id, prev.held.id);
      }
      const parts = insertionSortNarration(step);
      assert.ok(parts.every((p) => p.text && p.pauseAfter >= 0));
      if (["pick", "shift", "insert"].includes(step.status))
        assert.equal(parts[0].move, true);
    }
  }
  function enumerate(a, n) {
    check(a);
    if (n) for (const v of [-1, 0, 1]) enumerate([...a, v], n - 1);
  }
  enumerate([], 6);
  check([6, 3, 8, 2, 5]);
  check(Array.from({ length: 12 }, (_, i) => 12 - i));
});
test("sorted inputs do not shift and duplicates stop comparisons without reversing identity", () => {
  const steps = insertionSortSteps([1, 2, 2, 3]);
  assert.equal(steps.at(-1).comparisons, 3);
  assert.equal(steps.at(-1).shifts, 0);
  assert.ok(
    steps.some((s) => s.status === "place" && /no shifts/.test(s.explanation)),
  );
});
test("input validation", () => {
  assert.deepEqual(parseInsertionInput("6, -3, 6"), [6, -3, 6]);
  for (const v of ["", "1,", "1.2", "100", Array(13).fill(1).join(",")])
    assert.throws(() => parseInsertionInput(v));
});
