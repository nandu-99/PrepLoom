import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { introductionToOperatingSystems } from "../content/subjects/operating-systems/fundamentals";

async function main() {
  const outputDirectory = path.join(process.cwd(), "rag-data");

  await mkdir(outputDirectory, { recursive: true });

  const outputFile = path.join(outputDirectory, "os-introduction.raw.json");

  const json = JSON.stringify(introductionToOperatingSystems, null, 2);

  await writeFile(outputFile, json, "utf8");

  console.log(`Exported topic to ${outputFile}`);
}
main().catch((error) => {
  console.error("Failed to export RAG content:", error);
  process.exit(1);
});
