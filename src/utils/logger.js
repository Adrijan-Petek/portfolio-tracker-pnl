const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function createLogger(options = {}) {
  const levelName = (options.level || process.env.LOG_LEVEL || "info").toLowerCase();
  const minLevel = LEVELS[levelName] ?? LEVELS.info;

  function log(level, message, meta) {
    if (LEVELS[level] < minLevel) return;
    const timestamp = new Date().toISOString();
    const base = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    if (meta && Object.keys(meta).length) {
      // Keep logs JSON-ish for easy parsing in CI.
      console.log(`${base} ${JSON.stringify(meta)}`);
      return;
    }
    console.log(base);
  }

  return {
    debug: (message, meta) => log("debug", message, meta),
    info: (message, meta) => log("info", message, meta),
    warn: (message, meta) => log("warn", message, meta),
    error: (message, meta) => log("error", message, meta),
  };
}

module.exports = { createLogger };
