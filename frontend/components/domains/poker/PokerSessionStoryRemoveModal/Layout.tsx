import { useTranslation } from 'next-i18next';
import React from 'react';

import { CLASS_TEST } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = {
  errGlobalMsg: string;
  onCancel: () => void;
  onSubmit: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    errGlobalMsg,
    onCancel,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal>
      <PaperHeader>
        {t('pokerSessionStoryRemoveModal.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('pokerSessionStoryRemoveModal.description')}
        </Text>

        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onCancel}
          >
            {t('pokerSessionStoryRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            className={CLASS_TEST.POKER_STORY_REMOVE_MODAL_SUBMIT_BTN}
            onClick={onSubmit}
          >
            {t('pokerSessionStoryRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
