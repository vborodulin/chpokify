import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = {
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    isLoading,
    onCancel,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal>
      <PaperHeader>
        {t('pokerSessionRemoveModal.title')}
      </PaperHeader>

      <PaperContent>
        {t('pokerSessionRemoveModal.description')}
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('pokerSessionRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {t('pokerSessionRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
