// Run: node --experimental-strip-types --test scripts/test-binary-search-narration.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { binarySearchSteps } from "../lib/binary-search.ts";
import { binarySearchNarration } from "../lib/binary-search-narration.ts";
const values = [3, 8, 12, 17, 23, 31, 38, 42, 56, 64, 79, 91];
const steps = binarySearchSteps(values, 42);
const parts = (step) => binarySearchNarration(step, values, 42);
const text = (step) =>
  parts(step)
    .map((part) => part.text)
    .join(" ");

test("introduces zero-based positions and reduces arithmetic after the first iteration", () => {
  assert.match(text(steps[0]), /index.*counting from zero/);
  const selections = steps.filter((step) => step.status === "select");
  assert.match(text(selections[0]), /11 minus 0 is 11/);
  assert.match(text(selections[0]), /round down to 5/i);
  assert.ok(parts(selections[0]).length > parts(selections[1]).length);
  assert.match(text(selections.at(-1)), /one number left to check/);
  assert.doesNotMatch(text(selections.at(-1)), /minus|Round down/);
});
test("movement is cued after the rationale, not at the start of narration", () => {
  for (const step of steps.filter((step) => step.status === "narrow")) {
    const script = parts(step);
    assert.equal(script[0].move, false);
    assert.equal(script[1].move, true);
    assert.match(script[1].text, /Move (low|high) to index/);
  }
});
test("every midpoint leads directly to its comparison", () => {
  steps.forEach((step, index) => {
    if (step.status === "select")
      assert.equal(steps[index + 1].status, "compare");
  });
});
test("both completion outcomes explain the returned result", () => {
  assert.match(text(steps.at(-1)), /Return index 7, not the value 42/);
  const missing = binarySearchSteps(values, 50).at(-1);
  const script = binarySearchNarration(missing, values, 50)
    .map((part) => part.text)
    .join(" ");
  assert.match(script, /Return minus one/);
  assert.match(script, /still one number to check/);
});
console.log(
  `Default lesson: ${steps.reduce((sum, step) => sum + text(step).split(/\s+/).length, 0)} spoken words.`,
);
