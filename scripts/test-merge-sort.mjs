import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeSortSteps, parseMergeInput } from "../lib/merge-sort.ts";
import { mergeSortNarration } from "../lib/merge-sort-narration.ts";
test("recursive merges sort stably and consume only the first remaining items", () => {
  function check(values) {
    const original = [...values],
      steps = mergeSortSteps(values),
      result = steps.at(-1).output;
    assert.deepEqual(values, original);
    assert.deepEqual(
      result.map((x) => x.value),
      [...values].sort((a, b) => a - b),
    );
    for (let i = 1; i < result.length; i++)
      if (result[i].value === result[i - 1].value)
        assert.ok(result[i].id > result[i - 1].id);
    for (const [i, s] of steps.entries()) {
      assert.ok(mergeSortNarration(s).every((p) => p.text));
      if (["merge", "compare", "take", "rest", "merged"].includes(s.status)) {
        const remaining = [
          ...s.left.slice(s.l),
          ...s.right.slice(s.r),
          ...s.output,
        ];
        assert.deepEqual(
          remaining.map((x) => x.id).sort((a, b) => a - b),
          s.group.map((x) => x.id).sort((a, b) => a - b),
        );
        assert.deepEqual(
          s.output.map((x) => x.value),
          s.output.map((x) => x.value).sort((a, b) => a - b),
        );
      }
      if (s.status === "take") {
        const p = steps[i - 1],
          a = p.left[p.l],
          b = p.right[p.r];
        assert.equal(
          s.output.at(-1).id,
          (a && (!b || a.value <= b.value) ? a : b).id,
        );
        assert.equal(s.placements, p.placements + 1);
        assert.equal(mergeSortNarration(s)[0].move, true);
      }
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
test("custom input validation", () => {
  assert.deepEqual(parseMergeInput("6,-2,6"), [6, -2, 6]);
  for (const s of ["", "1,", "100", "1.5", Array(13).fill(1).join(",")])
    assert.throws(() => parseMergeInput(s));
});

test("leftovers move in one batch and single-number lists use the early return", () => {
  const steps = mergeSortSteps([1, 2, 3, 4]);
  for (const [i, s] of steps.entries())
    if (s.status === "rest") {
      const previous = steps[i - 1];
      const rest = [
        ...previous.left.slice(previous.l),
        ...previous.right.slice(previous.r),
      ];
      assert.deepEqual(s.output, [...previous.output, ...rest]);
      assert.equal(s.placements - previous.placements, rest.length);
      assert.equal(mergeSortNarration(s)[0].move, true);
    }
  assert.equal(mergeSortSteps([6]).at(-1).line, 3);
  assert.doesNotMatch(mergeSortSteps([6]).at(-1).explanation, /split the list/);
  assert.ok(steps.some((s) => s.trail.some((frame) => frame.ready)));
});

test("teaching sequence shows every split before any merge", () => {
  const steps = mergeSortSteps([6, 3, 8, 2, 5]);
  const first = steps.findIndex((s) => s.status === "merge");
  assert.ok(first > 0);
  assert.ok(
    steps
      .slice(first)
      .every((s) => s.status !== "split" && s.status !== "single"),
  );
  assert.ok(steps.slice(0, first).every((s) => s.comparisons === 0));
  const groups = steps.filter((s) => s.status === "merged");
  assert.equal(groups.at(-1).depth, 0);
});
