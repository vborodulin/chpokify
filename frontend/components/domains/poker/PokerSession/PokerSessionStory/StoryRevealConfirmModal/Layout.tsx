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
  teamName: string;
  onCancel: () => void;
  onSubmit: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    teamName,
    onCancel,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal>
      <PaperHeader>
        {t('pokerConfirmRevealModal.title')}
      </PaperHeader>

      <PaperContent>
        {t('pokerConfirmRevealModal.description', {
          teamName,
        })}
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('pokerConfirmRevealModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            onClick={onSubmit}
          >
            {t('pokerConfirmRevealModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
