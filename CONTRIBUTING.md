# Contributing

Thanks for your interest in improving Portfolio Tracker PnL.

## Development setup

- Node.js 18+
- npm

```bash
npm install
cd web && npm install && cd ..
```

## Local workflows

- Generate a report (offline mock prices):
  ```bash
  npm run track:dry
  ```
- Generate a report (live prices + chain data):
  ```bash
  npm run track
  ```
- Run the dashboard:
  ```bash
  cd web
  npm run dev
  ```

## Pull requests

- Keep PRs focused and small.
- Add or update documentation for new features.
- If you touch reporting logic, include a sample report update in `sample_reports/report-sample.json`.

## Code style

- Prefer small modules with single responsibilities.
- Avoid adding dependencies unless they remove significant complexity.
