import { ObjectId } from 'bson';

export type TEntityID = string | number | ObjectId;

export enum ENVIRONMENT {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local'
}

export const BASE_URL_PROD = 'https://chpokify.com';

export const PROJECT_NAME = 'Chpokify';
