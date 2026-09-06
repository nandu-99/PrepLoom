// Run: node --experimental-strip-types --test scripts/test-lesson-playback.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  startLessonPlayback,
  narrateInSequence,
} from "../lib/lesson-playback.ts";

for (const speechFirst of [true, false]) {
  test(`waits for both speech and animation (${speechFirst ? "speech" : "animation"} first)`, (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    let done;
    let count = 0;
    const stop = startLessonPlayback({
      delay: 100,
      speak: (finish) => {
        done = finish;
        return () => {};
      },
      onComplete: () => count++,
      onError: () => assert.fail("unexpected speech failure"),
    });
    if (speechFirst) done();
    else t.mock.timers.tick(100);
    assert.equal(count, 0);
    if (speechFirst) t.mock.timers.tick(100);
    else done();
    assert.equal(count, 1);
    done();
    t.mock.timers.tick(120000);
    assert.equal(count, 1);
    stop();
  });
}
test("cancellation ignores late speech events and clears timers", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let done, fail;
  let canceled = 0;
  const stop = startLessonPlayback({
    delay: 100,
    speak: (finish, error) => {
      done = finish;
      fail = error;
      return () => canceled++;
    },
    onComplete: () => assert.fail("canceled step advanced"),
    onError: () => assert.fail("canceled step reported an error"),
  });
  stop();
  done();
  fail();
  t.mock.timers.tick(120000);
  assert.equal(canceled, 1);
});
test("speech errors and stalled engines stop rather than advance", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  for (const stall of [true, false]) {
    let fail, done;
    let errors = 0;
    const stop = startLessonPlayback({
      delay: 100,
      speak: (finish, error) => {
        fail = error;
        done = finish;
        return () => {};
      },
      onComplete: () => assert.fail("failed speech advanced"),
      onError: () => errors++,
    });
    if (stall) t.mock.timers.tick(120000);
    else fail();
    done();
    t.mock.timers.tick(120000);
    assert.equal(errors, 1);
    stop();
  }
});
test("silent playback advances after the visual hold", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let count = 0;
  startLessonPlayback({
    delay: 100,
    onComplete: () => count++,
    onError: () => assert.fail(),
  });
  t.mock.timers.tick(99);
  assert.equal(count, 0);
  t.mock.timers.tick(1);
  assert.equal(count, 1);
});
test("narration waits through the deliberate gaps, including the final pause", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const spoken = [];
  let finish;
  let complete = 0;
  const stop = narrateInSequence(
    [
      { text: "First idea.", pauseAfter: 500 },
      { text: "Reasoning.", pauseAfter: 700 },
    ],
    (text, done) => {
      spoken.push(text);
      finish = done;
      return () => {};
    },
    () => complete++,
    () => assert.fail(),
  );
  assert.deepEqual(spoken, ["First idea."]);
  finish();
  t.mock.timers.tick(499);
  assert.equal(spoken.length, 1);
  t.mock.timers.tick(1);
  assert.deepEqual(spoken, ["First idea.", "Reasoning."]);
  finish();
  t.mock.timers.tick(699);
  assert.equal(complete, 0);
  t.mock.timers.tick(1);
  assert.equal(complete, 1);
  stop();
});
test("canceling during a pause prevents the next spoken phrase", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let finish;
  let spoken = 0;
  const stop = narrateInSequence(
    [
      { text: "One.", pauseAfter: 500 },
      { text: "Two.", pauseAfter: 500 },
    ],
    (_, done) => {
      spoken++;
      finish = done;
      return () => {};
    },
    () => assert.fail("canceled narration finished"),
    () => assert.fail(),
  );
  finish();
  stop();
  t.mock.timers.tick(2000);
  assert.equal(spoken, 1);
});
