// Checks Loop Quest's C interpreter against a real C compiler (GCC).
//
// For every test program: run it in Loop Quest's interpreter (taken straight
// from public/projects/loop-quest.html), compile and run the same code with
// GCC, and compare the two outputs character by character.
//
// Run:  node scripts/loop-quest-vs-gcc.mjs      (needs gcc on your PATH)

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import vm from "node:vm";

// 1. Pull the interpreter (sections 1 and 2 of the page's script) out of the HTML.
const html = readFileSync(new URL("../public/projects/loop-quest.html", import.meta.url), "utf8");
const script = html.slice(html.indexOf('"use strict";'), html.indexOf("/* ==", html.indexOf("3. Sound")));
const ctx = vm.createContext({});
vm.runInContext(
  script +
    `;globalThis.run = (src) => { loopCounter = 0; const S = newState();
       const prog = new Parser(tokenize(src)).program(); let n = 0;
       for (const _ of runProgram(S, prog)) if (++n > 100000) throw new Error("too many steps");
       return S.out; };
     globalThis.EXAMPLES = EXAMPLES;`,
  ctx
);

// 2. Test programs: the page's own examples plus edge cases where JavaScript
//    and C easily disagree (integer division, negative %, overflow, scopes, printf).
const extra = [
  ["Negative division and %", `int a = -7, b = 2;\nprintf("%d %d %d %d\\n", a / b, a % b, 7 / -2, 7 % -2);`],
  ["int overflow wraps", `int x = 2147483647;\nx = x + 1;\nprintf("%d\\n", x);\nint y = 65536;\nprintf("%d\\n", y * y);`],
  ["printf width and %c", `for (int i = 1; i <= 3; i++) {\n    printf("[%3d][%-3d]%c\\n", i * 7, i, 'A' + i);\n}`],
  ["Inner scope shadows", `int i = 100;\nfor (int i = 0; i < 2; i++) {\n    printf("%d ", i);\n}\nprintf("%d\\n", i);`],
  ["i++ vs ++i", `int i = 5;\nint a = i++;\nint b = ++i;\nprintf("%d %d %d\\n", a, b, i);`],
  ["&& short-circuit", `int n = 0;\nif (n != 0 && 10 / n > 1) {\n    printf("never\\n");\n}\nprintf("safe\\n");`],
  ["Nested break only exits inner loop", `for (int a = 1; a <= 3; a++) {\n    for (int b = 1; b <= 3; b++) {\n        if (b == 2) break;\n        printf("%d%d ", a, b);\n    }\n}\nprintf("\\n");`],
  ["while with compound ops", `int x = 1;\nwhile (x < 200) {\n    x *= 3;\n    x -= 1;\n}\nprintf("%d\\n", x);`],
];
const tests = [...ctx.EXAMPLES.map((e) => [e.name, e.code]), ...extra];

// 3. Compile each with GCC and compare.
const dir = mkdtempSync(join(tmpdir(), "lq-gcc-"));
let failed = 0;
try {
  for (const [name, code] of tests) {
    const c = join(dir, "t.c"), exe = join(dir, "t");
    writeFileSync(c, `#include <stdio.h>\nint main(void) {\n${code}\nreturn 0;\n}\n`);
    execFileSync("gcc", ["-std=c99", "-w", "-o", exe, c]);
    const expected = execFileSync(exe, { encoding: "utf8" });
    let got;
    try {
      got = ctx.run(code);
    } catch (e) {
      got = `ERROR: ${e.message}`;
    }
    const ok = got === expected;
    if (!ok) failed++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
    if (!ok) console.log(`      gcc:        ${JSON.stringify(expected)}\n      Loop Quest: ${JSON.stringify(got)}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
console.log(`\n${tests.length - failed}/${tests.length} programs print exactly the same as GCC.`);
process.exit(failed ? 1 : 0);
