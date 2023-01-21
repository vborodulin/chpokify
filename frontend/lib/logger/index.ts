import { objectHelpers } from '@chpokify/helpers/object';
import { ENVIRONMENT } from '@chpokify/models-types';
import * as Sentry from '@sentry/nextjs';

enum LOG_LEVEL {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  REPORT,
}

class Logger {
  private logLevel: LOG_LEVEL = process.env.NODE_ENV === ENVIRONMENT.PRODUCTION
    ? LOG_LEVEL.ERROR
    : LOG_LEVEL.TRACE;

  private canLog(methodLevel: LOG_LEVEL) {
    return methodLevel >= this.logLevel;
  }

  public setLogLevel(level: LOG_LEVEL) {
    this.logLevel = level;
  }

  private log(methodName: keyof Console, methodLevel: LOG_LEVEL, ...args: any[]) {
    if (this.canLog(methodLevel)) {
      if (methodName in console) {
        // @ts-ignore
        console[methodName](...args);
      } else {
        console.log(methodName, ...args);
      }
    }
  }

  public trace(...args: any[]) {
    this.log('trace', LOG_LEVEL.TRACE, ...args);
  }

  public debug(...args: any[]) {
    this.log('debug', LOG_LEVEL.DEBUG, ...args);
  }

  public info(...args: any[]) {
    this.log('log', LOG_LEVEL.INFO, ...args);
  }

  public warn(...args: any[]) {
    Sentry.captureMessage(JSON.stringify(args));
    this.log('warn', LOG_LEVEL.WARN, ...args);
  }

  public error(error: Error, errorInfo?: any) {
    this.log('error', LOG_LEVEL.ERROR, JSON.stringify(error));

    const scope = new Sentry.Scope();
    scope.setContext('error', objectHelpers.toJSON(error));

    if (errorInfo) {
      scope.setContext('errorInfo', errorInfo);
    }

    Sentry.captureException(error, scope);
  }
}

const log = new Logger();

export {
  log,
  Logger,
};
