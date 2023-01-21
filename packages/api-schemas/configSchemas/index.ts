import { TClientConfig, TUserConfig } from '@chpokify/models-types';

export namespace configSchemas {
  // get config
  export type TConfigResResp = {
    config: TClientConfig,
  };

  export type TUserConfigResResp = {
    userConfig: TUserConfig;
  }
}
