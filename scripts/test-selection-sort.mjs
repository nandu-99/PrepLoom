import { test } from "node:test";
import assert from "node:assert/strict";
import {
  selectionSortSteps,
  parseSelectionInput,
} from "../lib/selection-sort.ts";
import { selectionSortNarration } from "../lib/selection-sort-narration.ts";

test("selection steps preserve items, select minima, and finish with a sorted prefix", () => {
  function check(values) {
    const original = [...values];
    const expected = [...values].sort((a, b) => a - b);
    const steps = selectionSortSteps(values);
    assert.deepEqual(values, original);
    assert.deepEqual(
      steps.at(-1).items.map((item) => item.value),
      expected,
    );
    assert.equal(
      steps.at(-1).comparisons,
      (values.length * Math.max(0, values.length - 1)) / 2,
    );
    assert.ok(steps.at(-1).swaps <= Math.max(0, values.length - 1));
    for (const [i, step] of steps.entries()) {
      assert.deepEqual(
        step.items.map((item) => item.id).sort((a, b) => a - b),
        values.map((_, id) => id),
      );
      assert.deepEqual(
        step.items.slice(0, step.sortedCount).map((item) => item.value),
        expected.slice(0, step.sortedCount),
      );
      if (step.status === "minimum" || step.status === "keep") {
        assert.equal(
          step.items[step.minIndex].value,
          Math.min(
            ...step.items
              .slice(step.start, step.scan + 1)
              .map((item) => item.value),
          ),
        );
      }
      if (i && step.status !== "swap")
        assert.deepEqual(step.items, steps[i - 1].items);
      if (step.status === "swap") {
        const before = steps[i - 1];
        assert.equal(before.status, "decision");
        assert.equal(steps[i - 2].scan, values.length - 1);
        const exchanged = [...before.items];
        [exchanged[step.start], exchanged[step.minIndex]] = [
          exchanged[step.minIndex],
          exchanged[step.start],
        ];
        assert.deepEqual(step.items, exchanged);
      }
      assert.ok(
        selectionSortNarration(step).every(
          (part) => part.text && part.pauseAfter >= 0,
        ),
      );
    }
  }
  function enumerate(values, remaining) {
    check(values);
    if (remaining)
      for (const value of [-1, 0, 1])
        enumerate([...values, value], remaining - 1);
  }
  enumerate([], 6);
  check([6, 3, 8, 2, 5]);
  check([99, -99, 42, 0, 12, -5, 8, 7, 6, 5, 4, 3]);
});

test("narration cues a swap only after explaining the full scan", () => {
  const swap = selectionSortSteps([6, 3, 8, 2, 5]).find(
    (step) => step.status === "swap",
  );
  const parts = selectionSortNarration(swap);
  assert.equal(parts[0].move, false);
  assert.equal(parts[1].move, true);
  assert.match(
    parts[1].text,
    /2 moves to position 0, and 6 moves to position 3/,
  );
});

test("input accepts unsorted integers and rejects invalid or oversized lists", () => {
  assert.deepEqual(parseSelectionInput("6, -3, 0, 6"), [6, -3, 0, 6]);
  for (const input of [
    "",
    "1,",
    "1.5",
    "100",
    "x",
    Array(13).fill(1).join(","),
  ]) {
    assert.throws(() => parseSelectionInput(input));
  }
});

test("already-placed minima explain no swap and finish without a backward code highlight", () => {
  const steps = selectionSortSteps([1, 2, 3]);
  assert.equal(steps.filter((step) => step.status === "decision").length, 2);
  assert.equal(
    steps.some((step) => step.status === "swap" || step.status === "keep"),
    false,
  );
  for (const [i, step] of steps.entries()) {
    if (step.status !== "decision") continue;
    assert.equal(step.line, 7);
    assert.match(selectionSortNarration(step)[0].text, /No swap needed/);
    assert.equal(steps[i + 1].status, "settled");
    assert.equal(steps[i + 1].line, 0);
  }
});
