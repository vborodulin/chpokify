import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TConfirmEmailFailLayoutProps = {
  onTryAgain: () => void
};

const Layout: React.FunctionComponent<TConfirmEmailFailLayoutProps> = (props) => {
  const { onTryAgain } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      variant="card"
      preventClose
    >
      <PaperHeader>
        {t('confirmEmailFail.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('confirmEmailFail.description')}
        </Text>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            variant="primary"
            onClick={onTryAgain}
          >
            {t('confirmEmailFail.tryAgainBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
