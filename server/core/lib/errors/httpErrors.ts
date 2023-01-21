import { ExtensibleError } from '@chpokify/helpers';

/**
 * List of custom errors
 */

// 3xx
export class MovedPermanentlyError extends ExtensibleError {
  public readonly code: number = 301;
}

// 4xx
export class NotFoundError extends ExtensibleError {
  public readonly code = 404;
}

export class ForbiddenError extends ExtensibleError {
  public readonly code = 403;
}

export class BadRequestError extends ExtensibleError {
  public readonly code = 400;
}

export class UnauthorizedError extends ExtensibleError {
  public readonly code = 401;
}

export class NotAcceptableError extends ExtensibleError {
  public readonly code = 406
}

export class RequestTimeoutError extends ExtensibleError {
  public readonly code = 408
}

export class MethodNotAllowedError extends ExtensibleError {
  public readonly code = 405
}
export class UnprocessableEntityError extends ExtensibleError {
  public readonly code = 422
}

export class TooManyRequestsError extends ExtensibleError {
  public readonly code = 429
}

export class SessionExpiredError extends ExtensibleError {
  public readonly code = 440
}

// 5xx

export class InternalServerError extends ExtensibleError {
  public readonly code = 500
}

export class NotImplementedError extends ExtensibleError {
  public readonly code = 501
}

export class GatewayTimeoutError extends ExtensibleError {
  public readonly code = 504
}

export class ServiceUnavailableError extends ExtensibleError {
  public readonly code = 503
}
