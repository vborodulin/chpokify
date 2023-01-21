import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { POST_MESSAGE_TYPE } from '@components/domains/core/types';

import { CircularProgress } from '@components/uiKit/CircularProgress';
import { ContentCenter } from '@components/uiKit/ContentCenter';
import { ContentThumb } from '@components/uiKit/ContentThumb';
import { IconCheck, IconCross } from '@components/uiKit/Icons';

import { useInterval } from '@components/utils/hooks/useInterval';

const CLOSE_AFTER_SECONDS = 3;

const KeepmailCallback = () => {
  const { query } = useRouter();
  const { code, error } = query;

  const { t } = useTranslation();

  useEffect(() => {
    const sendCode = () => {
      if (!code || !window.opener) {
        return;
      }

      window.opener.postMessage({
        type: POST_MESSAGE_TYPE.KEEPMAIL_OAUTH_CODE,
        code,
      }, '*');
    };

    sendCode();
  }, [
    code,
  ]);

  useEffect(() => {
    const sendError = () => {
      if (!error || !window.opener) {
        return;
      }

      window.opener.postMessage({
        type: POST_MESSAGE_TYPE.KEEPMAIL_OAUTH_ERROR,
        error,
      }, '*');
    };

    sendError();
  }, [
    error,
  ]);

  const handleClose = () => {
    window.close();
  };

  useInterval(
    'timeout',
    handleClose,
    CLOSE_AFTER_SECONDS * 1000
  );

  const renderSuccess = () => (
    <ContentThumb
      Icon={IconCheck}
      iconProps={{
        fill: 'positive.normal',
      }}
      title={t('keepmailCallback.success.title')}
      description={t('keepmailCallback.success.description', {
        seconds: CLOSE_AFTER_SECONDS,
      })}
      button={(
        <CircularProgress
          color="baseInvert.normal"
          opacity={0.4}
        />
      )}
    />
  );

  const renderFail = () => (
    <ContentThumb
      Icon={IconCross}
      iconProps={{
        fill: 'negative.normal',
      }}
      title={error as string}
      description={t('keepmailCallback.fail.description', {
        seconds: CLOSE_AFTER_SECONDS,
      })}
      button={(
        <CircularProgress
          color="baseInvert.normal"
          opacity={0.4}
        />
      )}
    />
  );

  if (error) {
    return (
      <ContentCenter>
        {renderFail()}
      </ContentCenter>
    );
  }

  return (
    <ContentCenter>
      {renderSuccess()}
    </ContentCenter>
  );
};

export {
  KeepmailCallback,
};
