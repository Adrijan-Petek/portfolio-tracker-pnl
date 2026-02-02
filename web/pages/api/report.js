import { getLatestReport } from "../../lib/report";

export default function handler(req, res) {
  const report = getLatestReport();
  res.status(200).json(report);
}
