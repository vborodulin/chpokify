import { objectHelpers } from './object';

export type TErrorDetails = {message: string, path: (string | number)[]}[];

const getIsError = (err: any) => typeof err === 'object' && 'message' in err && 'stack' in err;

class ExtensibleError extends Error {
  public code: number;

  public info?: any;

  public constructor(message: string, public details: TErrorDetails = [], code = 500, info?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.info = info;
    this.stack = new Error().stack;
  }

  public toJSON() {
    return objectHelpers.toJSON(this);
  }
}

const errorsHelpers = {
  getIsError,
};

export {
  errorsHelpers,
  ExtensibleError,
};
