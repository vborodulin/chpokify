import { TFailResponse } from '@chpokify/api-schemas';
import { ExtensibleError, TErrorDetails } from '@chpokify/helpers';
import { AxiosError } from 'axios';

import { log } from '@lib/logger';

const CLIENT_ERROR_CODE = 1000;

class ClientError extends ExtensibleError {
  public constructor(message: string, public details: TErrorDetails = [], info?: any) {
    super(message, details, CLIENT_ERROR_CODE, info);
  }
}

class HttpError extends ExtensibleError {}

export type TAppError = HttpError | ClientError;

class ErrorAdapter {
  public constructor(private readonly err: AxiosError<TFailResponse> | Error) {}

  public static getIsAxiosError(err: any): err is AxiosError<TFailResponse> {
    return err.isAxiosError;
  }

  public parse(): TAppError {
    if (ErrorAdapter.getIsAxiosError(this.err)) {
      return this.parseAxiosError(this.err);
    }

    return this.parseClientError(this.err);
  }

  private parseAxiosError(err: AxiosError<TFailResponse | string>): HttpError {
    const { response } = err;

    if (response) {
      const { data } = response;

      if (typeof data === 'object') {
        const { error } = data;
        return new HttpError(
          error.message,
          error.details,
          error.code
        );
      }

      return new HttpError('Oops, something went wrong. Please reload the page or try again it later.');
    }

    return new HttpError(
      err.message,
      [],
      Number.parseInt(err.code || '500', 10)
    );
  }

  private parseClientError(err: Error): ClientError {
    return new ClientError(err.message);
  }
}

class NeverError extends Error {
  public constructor(value: never) {
    const msg = `Unreachable statement: ${value}`;
    log.error(new Error(msg));
    super(msg);
  }
}

export {
  ClientError,
  HttpError,
  ErrorAdapter,
  NeverError,
};
