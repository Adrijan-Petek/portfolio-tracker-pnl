const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const DEFAULT_CONFIG_PATH = path.join(__dirname, "..", "config", "wallets.json");

function normalizeAddress(address) {
  if (!address) return null;
  try {
    return ethers.getAddress(address);
  } catch (error) {
    return null;
  }
}

function loadConfig(configPath = DEFAULT_CONFIG_PATH) {
  const resolved = path.isAbsolute(configPath)
    ? configPath
    : path.join(process.cwd(), configPath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Config file not found: ${resolved}`);
  }
  const raw = fs.readFileSync(resolved, "utf8");
  const parsed = JSON.parse(raw);

  const wallets = (parsed.wallets || []).map((wallet) => {
    const address = normalizeAddress(wallet.address || wallet);
    if (!address) {
      throw new Error(`Invalid wallet address: ${wallet.address || wallet}`);
    }
    return {
      address,
      label: wallet.label || "Wallet",
      chain: wallet.chain || "ethereum",
    };
  });

  const tokens = (parsed.tokens || []).map((token) => ({
    ...token,
    chain: token.chain || "ethereum",
    decimals: Number(token.decimals ?? 18),
  }));

  return {
    baseCurrency: parsed.baseCurrency || "USD",
    chains: parsed.chains || {
      ethereum: {
        name: "Ethereum Mainnet",
        rpcUrlEnv: "ETH_RPC_URL",
        nativeSymbol: "ETH",
      },
    },
    wallets,
    tokens,
    pricing: parsed.pricing || {},
  };
}

module.exports = { loadConfig };
