// Run: node --experimental-strip-types --test scripts/test-bubble-sort-narration.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { bubbleSortSteps } from "../lib/bubble-sort.ts";
import { bubbleSortNarration } from "../lib/bubble-sort-narration.ts";
const text = (step) =>
  bubbleSortNarration(step)
    .map((part) => part.text)
    .join(" ");

test("swap narration describes the original pair and cues the actual movement", () => {
  const steps = bubbleSortSteps([6, 3, 8]);
  const swap = steps.find((step) => step.status === "swap");
  const parts = bubbleSortNarration(swap);
  assert.equal(parts[0].move, true);
  assert.match(parts[0].text, /3 moves left, and 6 moves right/);
  assert.match(text(swap), /still need to check the rest/);
});
test("equal numbers are left in place", () => {
  const compare = bubbleSortSteps([2, 2]).find(
    (step) => step.status === "compare",
  );
  assert.match(text(compare), /equal/);
  assert.match(text(compare), /no need to swap/);
});
test("early stop depends on this pass, not swaps made in earlier passes", () => {
  const steps = bubbleSortSteps([2, 1, 3]);
  const final = steps.at(-1);
  assert.equal(final.line, 9);
  assert.ok(final.swaps > 0);
  assert.equal(final.passSwaps, 0);
  assert.match(text(final), /whole pass/);
  assert.doesNotMatch(text(final), /stop early/);
  assert.match(text(steps.at(-2)), /without making a single swap/);
});
test("pass introductions explain neighbors and avoid repeating the full introduction", () => {
  const passes = bubbleSortSteps([4, 3, 2, 1]).filter(
    (step) => step.status === "pass",
  );
  assert.match(text(passes[0]), /move one position right/);
  assert.match(text(passes[0]), /called a pass/);
  assert.match(text(passes[1]), /check mark/);
  assert.ok(text(passes[1]).length < text(passes[0]).length);
});
test("single element and empty arrays do not promise nonexistent comparisons", () => {
  for (const values of [[], [7]]) {
    const steps = bubbleSortSteps(values);
    assert.equal(steps.at(-1).comparisons, 0);
    assert.match(text(steps.at(-1)), /Return the list as it is/);
  }
  assert.match(text(bubbleSortSteps([])[0]), /empty/);
});

test("only claims early stopping when another pass is actually avoided", () => {
  assert.match(text(bubbleSortSteps([1, 2, 3, 4]).at(-1)), /stop early/);
  assert.doesNotMatch(
    text(bubbleSortSteps([6, 3, 8, 2, 5]).at(-1)),
    /stop early/,
  );
});
