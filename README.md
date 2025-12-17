# Portfolio Tracker PNL 📊💰

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive portfolio tracking application for monitoring cryptocurrency investments and profit/loss (PNL) analysis. Built with Node.js backend for data tracking and Next.js frontend for beautiful visualizations.

## 🌟 Features

- **Real-time Portfolio Tracking**: Monitor your crypto portfolio balances across multiple wallets
- **PNL Analysis**: Track daily and historical profit/loss percentages
- **Interactive Visualizations**: Pie charts and detailed reports for portfolio composition
- **Automated Reporting**: Generate JSON reports with timestamps and portfolio snapshots
- **Web Dashboard**: Modern React-based interface for viewing portfolio data
- **Configurable Wallets**: Easily add and manage multiple wallet addresses

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-tracker-pnl.git
   cd portfolio-tracker-pnl
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd web && npm install && cd ..
   ```

3. **Configure your wallets**
   Edit `config/wallets.json` to add your wallet addresses:
   ```json
   {
     "wallets": [
       "0xYourWalletAddress1",
       "0xYourWalletAddress2"
     ]
   }
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   INFURA_PROJECT_ID=your_infura_project_id
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

### Usage

1. **Run the tracker**
   ```bash
   npm run track
   ```
   This generates a portfolio report in the `reports/` directory.

2. **Start the web dashboard**
   ```bash
   cd web
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📁 Project Structure

```
portfolio-tracker-pnl/
├── config/
│   └── wallets.json          # Wallet configuration
├── sample_reports/
│   └── report-sample.json    # Sample portfolio data
├── src/
│   └── tracker.js            # Main tracking logic
├── web/
│   ├── pages/
│   │   └── index.js          # Next.js homepage
│   ├── package.json
│   └── vercel.json           # Vercel deployment config
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **Backend**: Node.js, Ethers.js, Axios
- **Frontend**: Next.js, React, Recharts
- **Deployment**: Vercel
- **Data Sources**: Ethereum blockchain via Infura/Etherscan

## 📊 Sample Report Format

```json
{
  "date": "2025-09-28",
  "portfolio": {
    "ETH": 2.0,
    "USDC": 1000.0
  },
  "total_value_usd": 4600.0,
  "daily_change_percent": 1.9,
  "timestamp": "2025-09-28T12:00:00.000Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

*Built with ❤️ for crypto enthusiasts*</content>

