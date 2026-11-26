// The Long Roast: Lawmakers and the File They Cannot Convert.
// Writes one satirical sentence to <output>/entry.txt.
// Deterministic: no input, no network, no clock, no randomness.
// Sources resolve from this file's own directory, never process.cwd().

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This file's own directory. Every path below is built from it.
const HERE = dirname(fileURLToPath(import.meta.url));

// Winner of SCREENING.md (candidate 8): the lawmakers' own bill, in .docx,
// halts its own vote. Punch lands on the last words: "to PDF."
const SENTENCE =
  "They wrote 212 pages on how the internet should work, then held up the vote because the bill itself was still a .docx nobody in the room could convert to PDF.";

function main(): void {
  // Self-check: the entrypoint really is running from its own directory.
  if (!existsSync(join(HERE, "main.ts"))) {
    throw new Error(`main.ts not found next to itself in ${HERE}`);
  }

  const text = SENTENCE;

  // Gate: UTF-8 text, 1-320 characters, not only whitespace.
  if (text.length < 1 || text.length > 320) {
    throw new Error(`entry must be 1-320 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, text, "utf8");
  // Read back and confirm the write landed byte-for-byte.
  if (readFileSync(outFile, "utf8") !== text) {
    throw new Error("entry.txt read-back mismatch");
  }
}

main();
