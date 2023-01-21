import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { LinkComponent } from '@components/uiKit/Link';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { support } from '@lib/support';

export type TJiraReverseErrorModalProps = TModalProps & {
  onClose: () => void
}

const JiraReverseErrorModal = (props: TJiraReverseErrorModalProps): React.ReactElement | null => {
  const {
    onClose,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const handleOpenSupport = () => {
    support.openEmailModal();
  };

  const onHandleClose = () => {
    onClose();
    window.open(routing.getJiraFieldScreenUrl(), '_blank');
  };

  const renderPaperHeader = () => (
    <PaperHeader>
      <Text
        fontSize={6}
        fontWeight={1}
        color="negative.normal"
      >
        {t('pokerSession.jira.errorTitleUp')}
      </Text>
      <Text
        fontSize={6}
        fontWeight={1}
      >
        {t('pokerSession.jira.errorTitleDown')}
      </Text>
    </PaperHeader>
  );
  const renderPaperContent = () => (
    <PaperContent
      overflow="hidden"
    >
      <Text
        fontSize={2}
        mb={2}
      >
        {t('pokerSession.jira.errorContentTxt')}
        {' '}
        <LinkComponent
          href={routing.getJiraFieldScreenUrl()}
          target="_blank"
        >
          {t('pokerSession.jira.errorContentLink')}
        </LinkComponent>
        .
      </Text>

      <Text
        fontSize={2}
        mb={2}
      >
        {t('pokerSession.jira.errorHelpTxt')}
        {' '}
        <LinkComponent
          fontSize={2}
          onClick={handleOpenSupport}
        >
          {t('pokerSession.jira.errorHelpLink')}
        </LinkComponent>
        .
      </Text>
    </PaperContent>
  );

  const renderPaperFooter = () => (
    <PaperFooter>
      <PaperActions>
        <Button
          variant="primary"
          onClick={onHandleClose}
        >
          {t('pokerSession.jira.errorBtn')}
        </Button>
      </PaperActions>
    </PaperFooter>
  );

  return (
    <Modal
      onClose={onClose}
    >
      {renderPaperHeader()}
      {renderPaperContent()}
      {renderPaperFooter()}
    </Modal>
  );
};

export {
  JiraReverseErrorModal,
};
