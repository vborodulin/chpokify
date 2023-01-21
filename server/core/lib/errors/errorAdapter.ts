import { ExtensibleError } from '@chpokify/helpers';
import Joi from '@hapi/joi';
import mongoose from 'mongoose';

import { BadRequestError, InternalServerError } from './index';

class ErrorAdapter {
  public constructor(private readonly err: Error) {}

  public parse(): ExtensibleError {
    let httpError: ExtensibleError;

    if (this.err instanceof ExtensibleError) {
      httpError = this.err;
    } else if (this.err instanceof mongoose.Error.ValidationError) {
      httpError = this.parseMongooseValidationError();
    } else if (this.err instanceof Joi.ValidationError) {
      httpError = this.parseJoiValidationError();
    } else {
      httpError = new InternalServerError(this.err.message);
    }

    httpError.stack = this.err.stack;
    return httpError;
  }

  private parseMongooseValidationError(): ExtensibleError {
    const mongooseValidationError = this.err as mongoose.Error.ValidationError;
    const { message, errors } = mongooseValidationError;

    const details = Object.values(errors).map((error) => ({
      message: error.message,
      // @ts-ignore
      path: [error.path],
    }));

    return new BadRequestError(message, details);
  }

  private parseJoiValidationError() {
    const joiValidationError = this.err as Joi.ValidationError;
    const { message, details } = joiValidationError;
    return new BadRequestError(message, details);
  }
}

export { ErrorAdapter };
