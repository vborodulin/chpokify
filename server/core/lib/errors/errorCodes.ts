enum ERROR_CODES {
  NO_AUTH = 'NO_AUTH',
  NOT_FOUND = 'NOT_FOUND',
  WRONG_AUTH = 'WRONG_AUTH',
  BROKEN_DATA = 'BROKEN_DATA',
  DB_ERROR = 'DB_ERROR',
  REDIS_ERROR = 'REDIS_ERROR',
  INVALID_PARAM = 'INVALID_PARAM',
  PARAM_REQUIRED = 'PARAM_REQUIRED',
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
  PARAM_NOT_ALLOWED = 'PARAM_NOT_ALLOWED',
  ATTEMPTS_EXCEEDED = 'ATTEMPTS_EXCEEDED',
  INVALID_PERMISSIONS = 'INVALID_PERMISSIONS',
  UNMET_CONDITIONS_ERROR = 'UNMET_CONDITIONS_ERROR',
  SESSION_EXPIRE = 'SESSION_EXPIRED',
  TOO_MANY_REQUESTS = 'TOO MANY REQUESTS',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

export { ERROR_CODES };
