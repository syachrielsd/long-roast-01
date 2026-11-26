// The Long Roast (u-jolly-fox-32-the-long-roast-5d379544): one line roasting
// my own AI agent (Muse Spark 1.3, a depth-2 subagent that cannot submit
// its own entry). Writes the line to <output>/entry.txt.
// Deterministic: no input, no network, no clock, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Winner of SCREENING.md (candidate 1), revised in-session: the repeated
// "needed" is cut and the ending is now present tense, so the punch lands
// harder on the last words ("submit it") instead of trailing off in the past.
const LINE =
  "My agent needed 74,000 characters of rules, three joke skills and twelve drafts to write this one line, and its parent still has to submit it.";

function main(): void {
  // Hard gate: UTF-8 text, 1-200 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
