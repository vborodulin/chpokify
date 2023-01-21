import { ExtensibleError } from '@chpokify/helpers';
import Joi from '@hapi/joi';

export const SUCCESS_VOID_RESULT = {};

export type TSuccessVoidResult = typeof SUCCESS_VOID_RESULT;

export type TSuccessResponse<T = any> = {
  error: null;
  result: T;
  meta: {
    time: number;
  };
};

export type TFailErrorData = {
  message: ExtensibleError['message'];
  details: ExtensibleError['details'];
  code: ExtensibleError['code'];
  stack?: ExtensibleError['stack'];
};

export type TFailResponse = {
  error: TFailErrorData;
  result: null;
  meta: {
    time: number;
  };
};

const ObjectIdSchema = Joi
  .string()
  .length(24);

const coreSchemas = {
  ObjectIdSchema,
};

export { coreSchemas };
