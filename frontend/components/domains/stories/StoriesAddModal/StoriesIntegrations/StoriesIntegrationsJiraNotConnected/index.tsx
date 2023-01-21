import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from '@components/uiKit/Button';
import { Flex } from '@components/uiKit/Flex';
import { IconJira } from '@components/uiKit/Icons';
import { Instruction } from '@components/uiKit/Instruction';
import { PaperContent } from '@components/uiKit/PaperContent';

import { TRANS } from '@components/utils/types';

export type TStoriesIntegrationsJiraNotConnectedProps = {
  onClose: () => void;
  onClickConnectingJira: () => void;
}

const StoriesIntegrationsJiraNotConnected = (props: TStoriesIntegrationsJiraNotConnectedProps)
  : React.ReactElement | null => {
  const {
    onClickConnectingJira,
    onClose,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <PaperContent>
      <Instruction
        onClickBox={onClickConnectingJira}
        title={t('storiesAddModal.connectedToJira')}
        icon={(
          <IconJira
            fill="primary.normal"
          />
        )}
      />
      <Flex
        mt={5}
        justifyContent="flex-end"
      >
        <Button
          mr={4}
          onClick={onClose}
        >
          {t('storiesIntegrationImport.cancelBtn')}
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onClickConnectingJira}

          color="base.normal"
        >
          {t('storiesAddModal.connectedToJiraBtn')}
        </Button>
      </Flex>
    </PaperContent>
  );
};

export { StoriesIntegrationsJiraNotConnected };
