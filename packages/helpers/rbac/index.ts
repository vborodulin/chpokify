import { ExtensibleError } from '../errors';

export type TRbacRole = string | number;

export type TOperationName = string;

export type TWhen = (params: any) => boolean;

export type TRbacCan = Record<TOperationName, true | TWhen>;

export type TRbacRule = {
  can: TRbacCan;
  inherits?: TRbacRole[]
}

export type TRbacConfig = Record<TRbacRole, TRbacRule>;

class RBAC {
  private config: TRbacConfig;

  public constructor(config: TRbacConfig) {
    this.config = config;
  }

  public can(role: string | number, operation: string, params: Record<string, any> = {}): boolean {
    if (!this.config) {
      throw new ExtensibleError('broken data', [
        {
          path: ['rbac', 'config'],
          message: 'config is not specified',
        },
      ]);
    }

    if (!this.config[role]) {
      return false;
    }

    const rule = this.config[role];

    if (rule.can[operation]) {
      const operationCondition = rule.can[operation];

      if (typeof operationCondition === 'boolean') {
        return true;
      }

      if (typeof operationCondition === 'function') {
        const conditionRes = operationCondition(params);

        if (conditionRes) {
          return true;
        }
      }
    }

    if (!rule.inherits || !rule.inherits.length) {
      return false;
    }

    return rule.inherits.some((childRole) => this.can(childRole, operation, params));
  }
}

export {
  RBAC,
};
