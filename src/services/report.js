const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readReports(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.startsWith("report-") && file.endsWith(".json"))
    .map((file) => path.join(dir, file));
  return files
    .map((file) => {
      try {
        const data = JSON.parse(fs.readFileSync(file, "utf8"));
        return { file, data };
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.data.timestamp) - new Date(a.data.timestamp));
}

function getLatestReport(dir) {
  const reports = readReports(dir);
  return reports.length ? reports[0].data : null;
}

function buildReport({ config, holdings, prices, previous }) {
  const baseCurrency = config.baseCurrency || "USD";
  const holdingsWithValue = {};
  let totalValue = 0;

  for (const [symbol, item] of Object.entries(holdings)) {
    const price = prices[symbol] ?? 0;
    const value = item.balance * price;
    totalValue += value;
    holdingsWithValue[symbol] = {
      ...item,
      price_usd: price,
      value_usd: value,
    };
  }

  const changeUsd = previous ? totalValue - previous.total_value_usd : 0;
  const dailyChangePercent = previous && previous.total_value_usd
    ? (changeUsd / previous.total_value_usd) * 100
    : 0;

  return {
    date: new Date().toISOString().slice(0, 10),
    timestamp: new Date().toISOString(),
    base_currency: baseCurrency,
    wallets: config.wallets,
    holdings: holdingsWithValue,
    total_value_usd: Number(totalValue.toFixed(2)),
    daily_change_percent: Number(dailyChangePercent.toFixed(2)),
    change_usd: Number(changeUsd.toFixed(2)),
    previous_report: previous
      ? {
          date: previous.date,
          total_value_usd: previous.total_value_usd,
        }
      : null,
  };
}

function writeReport(dir, report) {
  ensureDir(dir);
  const file = path.join(dir, `report-${report.date}.json`);
  fs.writeFileSync(file, JSON.stringify(report, null, 2));
  return file;
}

module.exports = { buildReport, writeReport, getLatestReport };
