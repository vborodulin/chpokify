import { isServer } from '@chpokify/helpers';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { jiraActionTypes } from '@Redux/domains/jira/actionTypes';

import { CircularProgress } from '@components/uiKit/CircularProgress';
import { ContentThumb } from '@components/uiKit/ContentThumb';
import { IconCheck, IconCross } from '@components/uiKit/Icons';

import { useInterval } from '@components/utils/hooks/useInterval';
import { TRANS } from '@components/utils/types';

const CLOSE_AFTER_SECONDS = 5;

const JiraCallback = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const callbackError = useSelector(asyncRejectedSelectors.createErrorSelector)([
    jiraActionTypes.OAUTH_CALLBACK_PENDING,
  ]);
  const globalErrMsg = asyncRejectedSelectors.getGlobalErrMsg(callbackError, []);

  const handleClose = () => {
    if (isServer()) {
      return;
    }

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
      title={t('jiraCallback.success.title')}
      description={t('jiraCallback.success.description', {
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
      title={globalErrMsg}
      description={t('jiraCallback.fail.description', {
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

  if (callbackError) {
    return renderFail();
  }

  return renderSuccess();
};

export {
  JiraCallback,
};
