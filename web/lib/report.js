import fs from "fs";
import path from "path";

const rootDir = path.resolve(process.cwd(), "..");
const reportsDir = path.join(rootDir, "reports");
const sampleReport = path.join(rootDir, "sample_reports", "report-sample.json");

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export function getLatestReport() {
  if (!fs.existsSync(reportsDir)) {
    return readJson(sampleReport);
  }
  const files = fs
    .readdirSync(reportsDir)
    .filter((file) => file.startsWith("report-") && file.endsWith(".json"))
    .map((file) => path.join(reportsDir, file));

  if (!files.length) {
    return readJson(sampleReport);
  }

  const latest = files
    .map((file) => ({ file, stat: fs.statSync(file) }))
    .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)[0];

  return readJson(latest.file);
}
