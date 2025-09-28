require('dotenv').config();
const fs = require('fs');
const path = require('path');

const REPORTS_DIR = path.join(__dirname,'..','reports');
if(!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR,{recursive:true});

async function main(){
  const report = {
    date: new Date().toISOString().slice(0,10),
    portfolio: {"ETH":2,"USDC":1000},
    total_value_usd:4600,
    daily_change_percent:1.9,
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync(path.join(REPORTS_DIR,`report-${report.date}.json`),JSON.stringify(report,null,2));
  console.log('Sample report written.');
}

main();
