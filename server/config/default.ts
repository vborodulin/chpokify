import {
  RETRO_TEMPLATE_TYPE,
} from '@chpokify/models-types';

const config = {
  app: {
    shutdownTime: 10000,
    confirmEmailExpiration: '24h',
    resetPasswordExpiration: '1h',
    inviteToSpaceExpiration: '5 days',
  },
  google: {
    webClientId: '238943843598-9iefbdc3npjlpsndj2aooch979djru26.apps.googleusercontent.com',
    iOSClientId: '238943843598-lk5mgc601mkfu2uhim3ev2erftmb2227.apps.googleusercontent.com',
  },
  apple: {
    clientId: 'com.chpokify.web',
    redirectURI: 'https://chpokify.xyz',
  },
  poker: {
    userRemoveOnlineInterval: 10 * 30 * 1000,
    userSetOnlineInterval: 5 * 1000,
  },
  jira: {
    applicationName: 'Chpokify',
    consumerKey: 'c09caf10-3c5c-4427-b127-1d11f497bb1b',
    consumerName: 'Chpokify',
  },
  intercom: {
    appId: 'zmsti56u',
    identitySecret: 'rJyXkNiMS7t_i7wAx0GxcWQo3pSya4J-UD8qMbHY',
  },
  jitsi: {
    host: 'jitsi.chpokify.tech',
  },
  tagManager: {
    trackingId: '',
  },
  retro: {
    templates: {
      [RETRO_TEMPLATE_TYPE.WENT_WELL_GO_WELL]: {
        type: RETRO_TEMPLATE_TYPE.WENT_WELL_GO_WELL,
      },
      [RETRO_TEMPLATE_TYPE.START_STOP_CONTINUE]: {
        type: RETRO_TEMPLATE_TYPE.START_STOP_CONTINUE,
      },
      [RETRO_TEMPLATE_TYPE.MAD_SAD_GLAD]: {
        type: RETRO_TEMPLATE_TYPE.MAD_SAD_GLAD,
      },
      [RETRO_TEMPLATE_TYPE.CUSTOM]: {
        type: RETRO_TEMPLATE_TYPE.CUSTOM,
      },
    },
  },
};

export default config;
