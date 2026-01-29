export const loggerPrefix = '[Eppo SDK]';

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

const LOG_LEVELS: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 100,
};

let currentLevel: LogLevel = 'warn';

export function setLogLevel(level: LogLevel): void {
  currentLevel = level;
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatArgs(args: unknown[]): unknown[] {
  // Handle pino-style object-first logging: logger.error({ err }, 'message')
  if (
    args.length >= 2 &&
    typeof args[0] === 'object' &&
    args[0] !== null &&
    typeof args[1] === 'string'
  ) {
    const [obj, message, ...rest] = args;
    return [message, obj, ...rest];
  }
  return args;
}

export const logger = {
  trace: (...args: unknown[]) => shouldLog('trace') && console.debug(...formatArgs(args)),
  debug: (...args: unknown[]) => shouldLog('debug') && console.debug(...formatArgs(args)),
  info: (...args: unknown[]) => shouldLog('info') && console.info(...formatArgs(args)),
  warn: (...args: unknown[]) => shouldLog('warn') && console.warn(...formatArgs(args)),
  error: (...args: unknown[]) => shouldLog('error') && console.error(...formatArgs(args)),
};
