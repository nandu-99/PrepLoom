// Run: node --experimental-strip-types scripts/test-bubble-sort.mjs
import assert from "node:assert/strict";
import { bubbleSortSteps, parseBubbleInput } from "../lib/bubble-sort.ts";
let cases = 0;
function check(values) {
  const original = values.slice();
  const steps = bubbleSortSteps(values);
  const sorted = values.slice().sort((a, b) => a - b);
  let inversions = 0;
  values.forEach((left, i) =>
    values.slice(i + 1).forEach((right) => {
      if (left > right) inversions++;
    }),
  );
  assert.deepEqual(values, original, "must not mutate input");
  assert.equal(steps[0].status, "ready");
  assert.deepEqual(
    steps.at(-1).items.map((item) => item.value),
    sorted,
  );
  assert.equal(steps.at(-1).swaps, inversions);
  assert.equal(steps.at(-1).sortedFrom, 0);
  assert.ok(
    steps.at(-1).comparisons <= (values.length * (values.length - 1)) / 2,
  );
  steps.forEach((step, i) => {
    assert.deepEqual(
      step.items.map((item) => item.id).sort((a, b) => a - b),
      values.map((_, id) => id),
    );
    assert.deepEqual(
      step.items.slice(step.sortedFrom).map((item) => item.value),
      sorted.slice(step.sortedFrom),
    );
    if (step.status === "swap") {
      const previous = steps[i - 1];
      assert.equal(previous.status, "compare");
      const j = step.pair;
      assert.ok(previous.items[j].value > previous.items[j + 1].value);
      assert.equal(step.items[j].id, previous.items[j + 1].id);
      assert.equal(step.items[j + 1].id, previous.items[j].id);
      assert.equal(step.swaps, previous.swaps + 1);
    }
    if (step.status === "keep")
      assert.ok(step.items[step.pair].value <= step.items[step.pair + 1].value);
  });
  const final = steps.at(-1).items;
  for (let i = 1; i < final.length; i++)
    if (final[i].value === final[i - 1].value)
      assert.ok(
        final[i].id > final[i - 1].id,
        "equal values preserve original order",
      );
  if (
    values.length > 1 &&
    values.every((value, i) => i === 0 || value >= values[i - 1])
  ) {
    assert.equal(steps.at(-1).comparisons, values.length - 1);
    assert.equal(steps.at(-1).line, 9);
  }
  cases++;
}
function enumerate(values, remaining) {
  check(values);
  if (remaining)
    for (const value of [-1, 0, 1])
      enumerate([...values, value], remaining - 1);
}
enumerate([], 6);
check([6, 3, 8, 2, 5]);
check(Array.from({ length: 12 }, (_, i) => 12 - i));
for (const invalid of [
  "",
  "1,,2",
  "a",
  "1.5",
  "100",
  Array(13).fill(1).join(","),
])
  assert.throws(() => parseBubbleInput(invalid));
assert.deepEqual(parseBubbleInput("3, -2, 3, 0"), [3, -2, 3, 0]);
console.log(
  `${cases} bubble-sort cases passed: sorting, swaps, stable duplicates, final positions, early exit, and input validation.`,
);
