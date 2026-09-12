import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const result = spawnSync(npmCommand, ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: ROOT, encoding: "utf8" });
if (result.error || result.status !== 0) {
  console.error(result.error?.message || result.stderr || "npm pack dry-run failed");
  process.exit(1);
}
const payload = JSON.parse(result.stdout);
const pack = payload[0];
const files = (pack?.files || []).map((entry) => entry.path).sort();
const forbidden = files.filter((entry) => /(^|\/)(?:\.env(?:\..*)?|data\/private|.*\.(?:gguf|safetensors|pth|mp4|wav|mp3|png|jpe?g|webp))$/i.test(entry));
const report = {
  project: "Xiaoya Framework",
  package: pack?.id,
  version: pack?.version,
  status: forbidden.length ? "FAIL" : "PASS",
  entryCount: files.length,
  unpackedSize: pack?.unpackedSize,
  files,
  forbidden,
  localOnly: true,
  uploads: 0,
  downloads: 0,
  artifact: "artifacts/acceptance/v3/xiaoya-framework-package-manifest-20260912.json",
};
const artifact = path.resolve(ROOT, "..", report.artifact);
await fs.mkdir(path.dirname(artifact), { recursive: true });
await fs.writeFile(artifact, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`XIAOYA_FRAMEWORK_PACKAGE_${report.status}`);
if (report.status !== "PASS") process.exitCode = 1;
