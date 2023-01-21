import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { usePokerSessionCreateModal } from '@components/domains/poker/hooks';

import { Layout } from './Layout';

export type TPokerSessionEditModalProps = {
  pokerSessionId: TEntityID;
  onClose: () => void;
}

const PokerSessionEditModal = (props: TPokerSessionEditModalProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    onClose,
    ...other
  } = props;

  const pokerSession = useSelector(pokerSessionsSelectors.getById)(pokerSessionId);
  const {
    domainOptions,
    jiraOptions,
    isConnectedJira,
    isShowIntegJira,
    handleToggleIntegJira,
    register,
    watchCardSetId,
    errors,
    errGlobalMsg,
    formState,
    handleSubmit,
    onSubmit,
    onRefreshIntegrations,
    jiraApiErr,
    onClickConnectingJira,
  } = usePokerSessionCreateModal({
    edit: true,
    pokerSessionId,
    onClose,
    pokerSession,
  });

  return (
    <Layout
      jiraApiErr={jiraApiErr}
      domainOptions={domainOptions}
      jiraProjectsOptions={jiraOptions.projects}
      jiraFieldsOptions={jiraOptions.fields}
      isConnectedJira={isConnectedJira}
      isShowIntegJira={isShowIntegJira}
      setIsShowIntegJira={() => handleToggleIntegJira()}
      formRefs={{
        title: register,
        description: register,
        isAutoReveal: register,
        isVideoCall: register,
        cardSetId: register,
      }}
      formRefsJira={{
        baseUrl: register,
        projectJira: register,
        fieldJira: register,
      }}
      defaultValue={{
        title: pokerSession?.title,
        description: pokerSession?.description,
        cardSetId: pokerSession?.cardSetId,
        isAutoReveal: pokerSession?.isAutoReveal,
        isVideoCall: pokerSession?.isVideoCall,
        fieldJira: pokerSession?.jira?.field?.id,
        projectJira: pokerSession?.jira?.project?.id,
        baseUrl: pokerSession?.jira?.baseUrl,
      }}
      cardSetId={watchCardSetId}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      isLoading={formState.isSubmitting}
      onCancel={onClose}
      onRefreshIntegrations={onRefreshIntegrations}
      onClickConnectingJira={onClickConnectingJira}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      {...other}
    />
  );
};

export {
  PokerSessionEditModal,
};
