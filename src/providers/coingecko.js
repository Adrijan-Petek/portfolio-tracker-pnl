const axios = require("axios");

async function getCoingeckoPrices(tokens, baseCurrency = "USD") {
  const ids = tokens.map((token) => token.coingeckoId).filter(Boolean);
  if (!ids.length) return {};

  const vsCurrency = baseCurrency.toLowerCase();
  const url = "https://api.coingecko.com/api/v3/simple/price";
  const response = await axios.get(url, {
    params: {
      ids: ids.join(","),
      vs_currencies: vsCurrency,
    },
    timeout: 15000,
  });

  const prices = {};
  for (const token of tokens) {
    const id = token.coingeckoId;
    if (!id || !response.data[id]) continue;
    const value = response.data[id][vsCurrency];
    if (typeof value === "number") {
      prices[token.symbol] = value;
    }
  }

  return prices;
}

module.exports = { getCoingeckoPrices };
