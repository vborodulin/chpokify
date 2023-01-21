import { objectHelpers } from '@chpokify/helpers';
import { TStory } from '@chpokify/models-types';
import { TJiraIntegration } from '@chpokify/models-types/core/integrations';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { Modal, TModalProps } from '@components/domains/shared/Modal';
import { StoriesFreeformInput } from '@components/domains/stories/StoriesAddModal/StoriesFreeformInput';
import { StoriesIntegration } from '@components/domains/stories/StoriesAddModal/StoriesIntegrations';

import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Spacer } from '@components/uiKit/Spacer';
import { Tab } from '@components/uiKit/Tab';
import { TabPanel } from '@components/uiKit/TabPanel';
import { Tabs } from '@components/uiKit/Tabs';

import { TRANS } from '@components/utils/types';

export type TStoriesAddModalProps = Partial<TModalProps> & {
  onAfterSubmit?: (data: { stories: TStory[] }) => Promise<void>;
  jiraIntegration: Record<string, TJiraIntegration>,
  hasJiraInPokerSession: boolean,
};

const StoriesAddModal = (props: TStoriesAddModalProps) => {
  const {
    jiraIntegration,
    onAfterSubmit,
    onClose = () => {

    },
    hasJiraInPokerSession,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const [tab, setTab] = useState<number>(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: any) => {
    setTab(newValue);
  };

  const isJiraConnected = !objectHelpers.isEmptyObject(jiraIntegration);
  const hasImportFromJira = isJiraConnected && hasJiraInPokerSession;

  const tab1 = hasImportFromJira
    ? t('storiesAddModal.tabImportFromJira')
    : t('storiesAddModal.tabCreate');
  const tab2 = hasImportFromJira
    ? t('storiesAddModal.tabCreate')
    : t('storiesAddModal.tabImportFromJira');
  const tabPanelFirstIndex = hasImportFromJira ? 0 : 1;
  const tabPanelSecondIndex = hasImportFromJira ? 1 : 0;

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      {...other}
    >
      <PaperHeader
        mb={3}
      >
        {t('storiesAddModal.title')}
      </PaperHeader>
      <Spacer
        mb={6}
      >
        <Tabs
          value={tab}
          centered
          // @ts-ignore
          onChange={handleChange}
        >
          <Tab
            label={tab1}
          />
          <Tab
            label={tab2}
          />
        </Tabs>
      </Spacer>

      <TabPanel
        index={tabPanelFirstIndex}
        value={tab}
      >
        <StoriesIntegration
          isConnectedToJira={isJiraConnected}
          hasJiraInPokerSession={hasJiraInPokerSession}
          onClose={handleClose}
          onAfterSubmit={onAfterSubmit}
        />
      </TabPanel>
      <TabPanel
        index={tabPanelSecondIndex}
        value={tab}
      >
        <StoriesFreeformInput
          onClose={handleClose}
          onAfterSubmit={onAfterSubmit}
        />
      </TabPanel>
    </Modal>
  );
};

export {
  StoriesAddModal,
};
