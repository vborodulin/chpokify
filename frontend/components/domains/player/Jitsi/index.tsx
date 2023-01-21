import { isServer } from '@chpokify/helpers';
import { TUser } from '@chpokify/models-types/user';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { configSelectors } from '@Redux/domains/config/selectors';

import { Box } from '@components/uiKit/Box';
import { CircularProgress } from '@components/uiKit/CircularProgress';

import { useLoadScript } from '@components/utils/hooks/useLoadScript';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import { getJitsiOptions } from './types';

const getJitsiScriptUrl = (host: string) => `https://${host}/external_api.js`;

export type TJitsiProps = {
  roomId: string;
  participant: TUser;
  onJoin?: () => void;
  onLeave?: () => void;
  onLoaded?: (api: typeof window.JitsiMeetExternalAPI) => void;
};

export type TJitsiError = {
  type: string;
  message: string;
};

export type TJitsiLog = {
  logLevel: string;
  args: string;
};

const Jitsi = (props: TJitsiProps): React.ReactElement | null => {
  const {
    roomId,
    participant,
    onJoin,
    onLeave,
    onLoaded,
    ...other
  } = props;

  const host = useSelector(configSelectors.getJitsiHost);

  const {
    isLoading: isScriptLoading,
    error: loadScriptError,
  } = useLoadScript(
    getJitsiScriptUrl(host)
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isServer() || isScriptLoading) {
      return;
    }

    const options = getJitsiOptions(
      roomId,
      participant
    );

    if (!('JitsiMeetExternalAPI' in window)) {
      return;
    }

    let api: typeof window.JitsiMeetExternalAPI;
    // eslint-disable-next-line prefer-const
    api = new window.JitsiMeetExternalAPI(host, {
      ...options,
      onload: () => {
        setIsLoading(false);

        if (onLoaded) {
          onLoaded(api);
        }
      },
    });

    api.addListener('videoConferenceJoined', () => {
      if (onJoin) {
        onJoin();
      }
    });

    api.addListener('videoConferenceLeft', () => {
      if (onLeave) {
        onLeave();
      }
    });

    api.addListener('cameraError', (data: TJitsiError) => {
      log.error(new ClientError(data.message, [], data));
    });

    api.addListener('micError', (data: TJitsiError) => {
      log.error(new ClientError(data.message, [], data));
    });

    api.addListener('log', (details: TJitsiLog) => {
      const { logLevel } = details;

      if (logLevel === 'error') {
        log.error(new ClientError('Jitsi error', [], details));
      }
    });

    const destroy = () => {
      api.executeCommand('hangup');
      api.dispose();
    };

    window.addEventListener(
      'beforeunload',
      destroy
    );

    return () => {
      window.removeEventListener(
        'beforeunload',
        destroy
      );
      destroy();
    };
  }, [isScriptLoading]);

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      {...other}
    >
      <Box
        id="meet"
        width="100%"
        height="100%"
      />

      {
        isLoading && !loadScriptError && (
          <CircularProgress
            isCenter
          />
        )
      }
    </Box>
  );
};

export {
  Jitsi,
};
