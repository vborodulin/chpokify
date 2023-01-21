import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TConfirmEmailSuccessLayoutProps = {
  onResume: () => void;
};

const Layout = (props: TConfirmEmailSuccessLayoutProps): React.ReactElement | null => {
  const {
    onResume,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      variant="card"
      preventClose
    >
      <PaperHeader>
        {t('confirmEmailSuccess.title')}
      </PaperHeader>

      <PaperContent>
        {t('confirmEmailSuccess.description')}
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            variant="primary"
            onClick={onResume}
          >
            {t('confirmEmailSuccess.resumeBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
