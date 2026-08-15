import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const katex = require("katex");
const Module = require("node:module");
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function resolveProjectAlias(
  request,
  parent,
  isMain,
  options,
) {
  const resolvedRequest = request.startsWith("@/")
    ? path.join(projectRoot, request.slice(2))
    : request;

  return originalResolveFilename.call(
    this,
    resolvedRequest,
    parent,
    isMain,
    options,
  );
};

require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  module._compile(output, filename);
};

const { unicodeMathToLatex } = require(
  path.join(projectRoot, "lib/math-notation.ts"),
);

const subjects = [
  [
    "Operating Systems",
    "content/subjects/operating-systems.ts",
    "operatingSystemsContent",
  ],
  [
    "Computer Architecture",
    "content/subjects/modern-computer-architecture.ts",
    "modernComputerArchitectureContent",
  ],
  ["Object-Oriented Programming", "content/subjects/oop.ts", "oopContent"],
  ["Database Systems", "content/subjects/dbms.ts", "dbmsContent"],
  [
    "Computer Networks",
    "content/subjects/computer-networks.ts",
    "computerNetworksContent",
  ],
  [
    "Machine Learning",
    "content/subjects/machine-learning.ts",
    "machineLearningContent",
  ],
  ["Deep Learning", "content/subjects/deep-learning.ts", "deepLearningContent"],
];

const results = [];
const failures = [];
const uniqueExpressions = new Set();
const spacingProbe = unicodeMathToLatex(
  "V = 1 when same-sign inputs produce an opposite-sign result",
);
const spacingFailure = !spacingProbe.includes(
  "1\\ \\mathrm{when}\\ \\mathrm{same}",
);

for (const [name, relativeFile, exportName] of subjects) {
  const content = require(path.join(projectRoot, relativeFile))[exportName];
  const counts = { name, learn: 0, revise: 0, total: 0 };

  for (const subjectModule of content.modules) {
    for (const topic of subjectModule.topics) {
      for (const [mode, sections] of [
        ["learn", topic.learn.sections],
        ["revise", topic.revise.sections ?? []],
      ]) {
        for (const section of sections) {
          for (const formula of section.formulas ?? []) {
            counts[mode] += 1;
            counts.total += 1;
            uniqueExpressions.add(formula.expression);

            try {
              katex.renderToString(unicodeMathToLatex(formula.expression), {
                displayMode: true,
                output: "htmlAndMathml",
                strict: "error",
                throwOnError: true,
                trust: false,
              });
            } catch (error) {
              failures.push({
                subject: name,
                topic: topic.slug,
                expression: formula.expression,
                error: error instanceof Error ? error.message : String(error),
              });
            }
          }
        }
      }
    }
  }

  results.push(counts);
}

console.table(results);
console.log(
  `Formula entries: ${results.reduce((sum, item) => sum + item.total, 0)}`,
);
console.log(`Distinct expressions: ${uniqueExpressions.size}`);
console.log(`KaTeX failures: ${failures.length}`);
console.log(`Spacing failures: ${spacingFailure ? 1 : 0}`);

if (failures.length > 0 || spacingFailure) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
}
