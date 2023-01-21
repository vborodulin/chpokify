import { useTranslation } from 'next-i18next';
import React from 'react';

import { PokerStoryAddBtn } from '@components/domains/poker/buttons/PokerStoriesAddBtn';
import { PokerStoriesList } from '@components/domains/poker/PokerStoriesList';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = {
  onClose: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    onClose,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      onClose={onClose}
    >
      <PaperHeader>
        {t('pokerSessionStoriesListModal.title')}
      </PaperHeader>

      <PaperContent>
        <PokerStoriesList
          placement="modal"
          onAfterChoose={onClose}
        />
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('pokerSessionStoriesListModal.cancelBtn')}
          </Button>

          <PokerStoryAddBtn />
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
