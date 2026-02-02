require("dotenv").config();
const path = require("path");
const { loadConfig } = require("./config");
const { getCoingeckoPrices } = require("./providers/coingecko");
const { fetchBalances } = require("./services/balances");
const { buildReport, writeReport, getLatestReport } = require("./services/report");
const { sendWebhook } = require("./services/webhook");
const { createLogger } = require("./utils/logger");
const { parseArgs } = require("./utils/args");

const DEFAULT_REPORTS_DIR = path.join(__dirname, "..", "reports");

function getOfflinePrices(tokens) {
  const prices = {};
  for (const token of tokens) {
    if (typeof token.mockPriceUsd === "number") {
      prices[token.symbol] = token.mockPriceUsd;
    }
  }
  return prices;
}

async function main() {
  const args = parseArgs(process.argv);
  const logger = createLogger({ level: args.logLevel });
  const reportsDir = args["reports-dir"] || DEFAULT_REPORTS_DIR;

  logger.info("Loading config");
  const config = loadConfig(args.config);

  logger.info("Fetching balances", { wallets: config.wallets.length });
  const holdings = await fetchBalances(config, logger);

  let prices = {};
  if (args.offline) {
    logger.info("Using offline prices");
    prices = getOfflinePrices(config.tokens);
  } else {
    logger.info("Fetching prices", { provider: "coingecko" });
    prices = await getCoingeckoPrices(config.tokens, config.baseCurrency);
  }

  const previous = getLatestReport(reportsDir);
  const report = buildReport({ config, holdings, prices, previous });

  if (args["dry-run"]) {
    logger.info("Dry run enabled, report not written");
  } else {
    const file = writeReport(reportsDir, report);
    logger.info("Report saved", { file });
  }

  if (args.print) {
    console.log(JSON.stringify(report, null, 2));
  }

  if (!args["no-webhook"]) {
    await sendWebhook(report, logger);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
