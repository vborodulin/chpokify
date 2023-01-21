import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { usePokerSessionCreateModal } from '@components/domains/poker/hooks';

import { Layout } from './Layout';

export type TSessionCreateMainModalProps = {
  onClose: () => void;
  title?: string;
}

const PokerSessionCreateModal = (props: TSessionCreateMainModalProps): React.ReactElement | null => {
  const {
    title,
    onClose,
    ...other
  } = props;

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
  } = usePokerSessionCreateModal({ edit: false });

  const lastPokerSession = useSelector(pokerSessionsSelectors.getLastEntity);

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
        title,
        cardSetId: lastPokerSession?.cardSetId.toString(),
        isVideoCall: lastPokerSession?.isVideoCall,
        isAutoReveal: lastPokerSession?.isAutoReveal,
      }}
      cardSetId={watchCardSetId}
      errors={errors}
      errGlobalMsg={errGlobalMsg}
      isLoading={formState.isSubmitting}
      onCancel={onClose}
      onClickConnectingJira={onClickConnectingJira}
      onRefreshIntegrations={onRefreshIntegrations}
      onSubmit={handleSubmit(onSubmit)}
      {...other}
    />
  );
};

export {
  PokerSessionCreateModal,
};
