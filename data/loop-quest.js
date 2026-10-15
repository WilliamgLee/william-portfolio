// Text for the Loop Quest story page (/work/loop-quest).
// Edit the words here; app/work/loop-quest/page.jsx lays them out.
// Text inside `backticks` is shown as code.
//
// Every technical claim below matches public/projects/loop-quest.html and
// scripts/loop-quest-vs-gcc.mjs. If you change the game, update this too.

export const loopQuest = {
  title: "Loop Quest",
  eyebrow: "03 · C interpreter",
  subtitle:
    "Type a C loop and watch it run one step at a time. Every trip through the loop becomes a tile, and a tiny pixel hero jumps along them.",
  play: "/projects/loop-quest.html",
  image: "/img/loop-quest.jpg",

  // Why I built it.
  // TODO (William): write your own story here. Ideas: when did loops first
  // confuse you, which class, what did you try before, who did you see
  // struggling? Keep it true; one or two short paragraphs is plenty.
  why: [
    "Loop Quest came from seeing people around me, myself included, struggle with C loops. On paper a loop is three short lines, but what happens on each round, and when exactly it stops, is hard to picture. So I made it visible.",
  ],

  glance: [
    ["Runs", "Entirely in the browser: one HTML file, no server, no libraries."],
    ["Understands", "`int`, `for`, `while`, `do-while`, `if/else`, `break`, `continue`, and `printf` with `%d`, `%i` and `%c`."],
    ["Shows", "The current line, a plain-English explanation, every variable, the output, and the loop itself as tiles."],
    ["Sounds", "Chiptune effects generated live with the Web Audio API. No audio files."],
    ["Checked by", "16 test programs that must print exactly what GCC prints."],
  ],

  howIntro:
    "There's no real C compiler in the browser, so Loop Quest carries its own small C interpreter, written in JavaScript. Your code goes through four stages:",
  steps: [
    { kind: "topic", label: "Your code" },
    { label: "Tokenizer", color: "#e3c58f" },
    { label: "Parser", color: "#82a0bd" },
    { label: "Step runner", color: "#6fbf73" },
    { label: "Screen", color: "#d0574f" },
  ],
  stages: [
    {
      title: "Tokenizer",
      text: "Reads the code character by character and cuts it into tokens: numbers, names, operators like `<=` and `++`, and text in quotes. Comments and `#include` lines are skipped. Every token remembers its line number, so an error can point at the right line.",
    },
    {
      title: "Parser",
      text: "Turns the tokens into a tree, using recursive descent: each level of operator precedence (`||`, then `&&`, then `==`, then `<`, then `+`, then `*`) is its own small function, so `1 + 2 * 3` groups the way C does. Mistakes come out in plain words, like: Expected \";\" but found \"}\".",
    },
    {
      title: "Step runner",
      text: "A JavaScript generator function (`function*`) walks the tree. After every meaningful action (a declaration, a condition check, an update, a `printf`) it pauses with `yield` and hands the screen one event: which line, what kind of step, and a sentence explaining it. The Step button asks for the next event; Play does the same on a timer.",
      example: ["Check i <= 5", "3 <= 5", "TRUE. Round 3 begins!"],
    },
    {
      title: "Screen",
      text: "Each loop gets its own lane: the first runs along the ground, the second and third on raised platforms above it. Every check adds a tile showing the loop variable at that moment; the final, failed check adds a red X tile. The hero jumps from tile to tile and `printf` text floats up from him. It's drawn on a 260×130 canvas and scaled up 3× for crisp pixels.",
    },
  ],
  faithful: {
    title: "Behaving like C, not JavaScript",
    points: [
      "Every value is forced to a 32-bit integer (`v | 0`), so numbers wrap around the way C's `int` does.",
      "Multiplication uses `Math.imul`, so even a huge `y * y` overflows like C instead of turning into a big float.",
      "Division cuts toward zero (`-7 / 2` is `-3`), and `%` keeps the sign of the left side.",
      "Every `{ }` block gets its own scope, so an inner `int i` hides the outer one until the block ends.",
      "After 2,000 steps it stops and explains that the condition probably never becomes false.",
    ],
  },

  gccIntro:
    "A visualizer that teaches the wrong answer is worse than none. So the interpreter is tested against GCC, a real C compiler.",
  gccSteps: [
    "The script `scripts/loop-quest-vs-gcc.mjs` pulls the interpreter straight out of `loop-quest.html`, so it tests the exact code visitors run.",
    "Each test program is wrapped in `#include <stdio.h>` and `int main(void) { … }`, compiled with GCC and run.",
    "The same program runs through Loop Quest. The two outputs must match character for character.",
  ],
  gccTests:
    "16 programs: the 8 examples in the game, plus 8 cases where JavaScript and C easily disagree:",
  gccCases: [
    "Negative division and %",
    "int overflow",
    "printf width and %c",
    "Inner scope hiding an outer variable",
    "i++ vs ++i",
    "&& short-circuit",
    "break inside nested loops",
    "Compound assignment",
  ],
  gccNote:
    "One honest footnote: in C, overflowing an `int` is technically undefined. GCC on normal computers wraps around, and Loop Quest matches that.",

  limits: [
    ["Use arrays, pointers or strings.", "Only whole-number variables exist; there's no `[ ]`, no `*p`, no text variables."],
    ["Call functions.", "`printf` is the only one. No `scanf`, and no functions you write yourself."],
    ["Handle decimals.", "No `float` or `double`, and `printf` knows only `%d`, `%i` and `%c`."],
    ["Tell long from int.", "`long` and `char` are accepted but stored as a 32-bit `int`, so a `long` past about 2.1 billion wraps where real C wouldn't."],
    ["Use switch, ?: or bit operators.", "They give a friendly error instead of running."],
    ["Draw every loop.", "Only the first three loops in a program get a lane on screen. A fourth still runs, just without tiles."],
    ["Run very long programs.", "The 2,000-step safety stop also cuts off long programs that would have finished."],
  ],
};
