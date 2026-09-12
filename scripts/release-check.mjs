import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"));
const required = ["name", "version", "description", "type", "license", "engines", "exports", "files", "scripts"];
const missing = required.filter((key) => packageJson[key] === undefined);
const forbiddenExtensions = new Set([".gguf", ".safetensors", ".pth", ".mp4", ".wav", ".mp3", ".png", ".jpg", ".jpeg", ".webp"]);
const forbiddenText = /(api[_-]?key|password|token|secret)\s*[:=]\s*['"`]?[^\s'"`]+/i;
const absolutePath = /(?:[A-Za-z]:\\(?:Users|home|mnt)\\|\/(?:home|mnt|Users)\/[A-Za-z0-9_.-]+)/i;
const findings = [];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else {
      const rel = path.relative(ROOT, full).replaceAll(path.sep, "/");
      if ([".env", ".env.local", ".env.production"].includes(entry.name.toLowerCase())) findings.push({ type: "environment_file", path: rel });
      if (forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) findings.push({ type: "private_media_or_weight", path: rel });
      if (path.extname(entry.name).toLowerCase() === ".json" || /\.(m?js|md|ya?ml|toml|txt)$/i.test(entry.name)) {
        const text = await fs.readFile(full, "utf8");
        if (forbiddenText.test(text)) findings.push({ type: "credential_like_text", path: rel });
        if (absolutePath.test(text)) findings.push({ type: "machine_path", path: rel });
      }
    }
  }
}

await walk(ROOT);
if (packageJson.license !== "Apache-2.0") findings.push({ type: "license_mismatch", value: packageJson.license });
if (packageJson.engines?.node !== ">=20") findings.push({ type: "node_engine_mismatch", value: packageJson.engines?.node });
const status = missing.length || findings.length ? "FAIL" : "PASS";
const report = { project: "Xiaoya Framework", version: packageJson.version, status, missing, findings, privateAssetsExcluded: !findings.some((item) => item.type === "private_media_or_weight"), credentialsExcluded: !findings.some((item) => item.type === "credential_like_text"), localOnly: true };
const artifact = path.resolve(ROOT, "..", "artifacts", "acceptance", "v3", "xiaoya-framework-release-check-20260912.json");
await fs.mkdir(path.dirname(artifact), { recursive: true });
await fs.writeFile(artifact, `${JSON.stringify({ ...report, artifact: "artifacts/acceptance/v3/xiaoya-framework-release-check-20260912.json" }, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
console.log(`XIAOYA_FRAMEWORK_RELEASE_${status}`);
if (status !== "PASS") process.exitCode = 1;
