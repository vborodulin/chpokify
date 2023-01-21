import { arrayHelpers } from '@chpokify/helpers';
import { TStory } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { jiraAsyncActions } from '@Redux/domains/jira/asyncActions';
import { jiraSelectors } from '@Redux/domains/jira/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import {
  StoriesIntegrationsJiraConnected,
} from '@components/domains/stories/StoriesAddModal/StoriesIntegrations/StoriesIntegrationsJiraConnected';
import {
  StoriesIntegrationsJiraNotConnected,
} from '@components/domains/stories/StoriesAddModal/StoriesIntegrations/StoriesIntegrationsJiraNotConnected';
import {
  StoriesIntegrationsJiraNotSetup,
} from '@components/domains/stories/StoriesAddModal/StoriesIntegrations/StoriesIntegrationsJiraNotSetup';

import { TSelectOption } from '@components/uiKit/Select';

import { TRANS } from '@components/utils/types';

export type TFormData = {
  baseUrl: string;
  jql: string;
  fieldJira: string;
};

export type TStoriesIntegrationProps = {
  onClose: () => void;
  onAfterSubmit?: (data: { stories: TStory[] }) => Promise<void>,
  isConnectedToJira: boolean
  hasJiraInPokerSession: boolean
}

const StoriesIntegration = (props: TStoriesIntegrationProps): React.ReactElement | null => {
  const {
    onClose,
    onAfterSubmit,
    isConnectedToJira,
    hasJiraInPokerSession,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const {
    register,
    formState,
    errors,
    handleSubmit,
    setValue,
    setError,
    clearError,
  } = useForm<TFormData>();

  const dispatch = useAppDispatch();

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const jiraInPokerSession = useSelector(pokerSessionsSelectors.getJira);
  const jiraFieldsByBaseUrl = useSelector(jiraSelectors.getFieldsByBaseUrl)(jiraInPokerSession?.baseUrl);

  const baseUrlFromPokerSession = jiraInPokerSession?.baseUrl as string;

  const jiraFieldsOptions: TSelectOption[] = jiraFieldsByBaseUrl.map((el) => ({
    label: el.name,
    value: el.id,
  }));

  useEffect(() => {
    if (!arrayHelpers.isEmptyArr(jiraFieldsOptions)) {
      setValue('fieldJira', jiraInPokerSession?.field?.id);
    }
  }, [JSON.stringify(jiraFieldsOptions)]);

  const onClickConnectingJira = () => {
    window.open(routing.getJiraConnectUrl(), '_blank');
  };

  const onClickToSettingsSession = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_EDIT, {
      pokerSessionId,
    }));
  };

  const onSubmit = async (data: Omit<TFormData, 'baseUrl'>) => {
    const keyProject = jiraInPokerSession?.project?.key;
    const regex = new RegExp(`project\\s*=.*(${keyProject})`, 'gm');
    const useDifferentProject = !data.jql.match(regex);
    const err: boolean = !data.jql || useDifferentProject;

    if (err) {
      const message:string = !data.jql
        ? t('storiesIntegrationImport.useEmptyProject')
        : t('storiesIntegrationImport.useDifferentProject');

      setError('jql', {
        type: 'manual',
        message,
      });

      setTimeout(() => {
        clearError('jql');
      }, 4000);
      return;
    }

    const res = await dispatch(jiraAsyncActions.issuesImport({
      spaceId: currSpaceId.toString(),
      baseUrl: baseUrlFromPokerSession,
      jql: data.jql,
    }));

    if (getIsRejectedActionPayload(res.payload)) {
      return;
    }

    if (onAfterSubmit) {
      await onAfterSubmit({
        stories: res.payload.stories,
      });
    }

    onClose();
  };

  if (!isConnectedToJira) {
    return (
      <StoriesIntegrationsJiraNotConnected
        onClickConnectingJira={onClickConnectingJira}
        onClose={onClose}
      />
    );
  }

  if (!hasJiraInPokerSession) {
    return (
      <StoriesIntegrationsJiraNotSetup
        onClickToSettingsSession={onClickToSettingsSession}
        onClose={onClose}
      />
    );
  }

  return (
    <StoriesIntegrationsJiraConnected
      disabledForm={formState.isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      jiraFieldsOptions={jiraFieldsOptions}
      formRefs={{
        baseUrl: register,
        jql: register,
        fieldJira: register,
      }}
      defaultValue={{
        fieldJira: jiraInPokerSession?.field?.id,
        projectJira: jiraInPokerSession?.project?.name,
        baseUrl: baseUrlFromPokerSession,
      }}
      errors={errors}
    />
  );
};

export {
  StoriesIntegration,
};
