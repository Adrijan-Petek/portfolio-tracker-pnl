const { ethers } = require("ethers");

const ERC20_ABI = ["function balanceOf(address) view returns (uint256)"];

function resolveRpcUrl(chainConfig) {
  const envKey = chainConfig.rpcUrlEnv || "ETH_RPC_URL";
  if (process.env[envKey]) return process.env[envKey];
  if (process.env.ALCHEMY_API_KEY) {
    return `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
  }
  if (process.env.INFURA_PROJECT_ID) {
    return `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
  }
  return null;
}

function createProvider(chainConfig) {
  const rpcUrl = resolveRpcUrl(chainConfig);
  if (!rpcUrl) {
    throw new Error(
      `Missing RPC URL. Set ${chainConfig.rpcUrlEnv || "ETH_RPC_URL"} or ALCHEMY_API_KEY/INFURA_PROJECT_ID.`
    );
  }
  return new ethers.JsonRpcProvider(rpcUrl);
}

async function fetchBalances({ wallets, tokens, chains }, logger) {
  const providers = {};
  const holdings = {};

  for (const token of tokens) {
    holdings[token.symbol] = {
      symbol: token.symbol,
      chain: token.chain,
      balance: 0,
      wallets: {},
    };
  }

  for (const wallet of wallets) {
    const chainConfig = chains[wallet.chain];
    if (!chainConfig) {
      logger.warn("Unknown chain for wallet", { address: wallet.address, chain: wallet.chain });
      continue;
    }
    if (!providers[wallet.chain]) {
      providers[wallet.chain] = createProvider(chainConfig);
    }
    const provider = providers[wallet.chain];

    for (const token of tokens.filter((item) => item.chain === wallet.chain)) {
      let rawBalance;
      if (token.type === "erc20" && token.address) {
        const contract = new ethers.Contract(token.address, ERC20_ABI, provider);
        rawBalance = await contract.balanceOf(wallet.address);
      } else {
        rawBalance = await provider.getBalance(wallet.address);
      }
      const balance = Number(ethers.formatUnits(rawBalance, token.decimals || 18));
      holdings[token.symbol].balance += balance;
      holdings[token.symbol].wallets[wallet.address] = balance;
    }
  }

  return holdings;
}

module.exports = { fetchBalances };
