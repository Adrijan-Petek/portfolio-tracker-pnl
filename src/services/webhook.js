const axios = require("axios");

async function sendWebhook(report, logger) {
  const url = process.env.WEBHOOK_URL;
  if (!url) return false;
  try {
    await axios.post(url, report, { timeout: 15000 });
    logger.info("Webhook sent", { url });
    return true;
  } catch (error) {
    logger.warn("Webhook failed", { message: error.message });
    return false;
  }
}

module.exports = { sendWebhook };
