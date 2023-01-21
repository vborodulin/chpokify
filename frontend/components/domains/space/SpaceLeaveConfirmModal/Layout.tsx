import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TModalProps> & {
  isLoading: boolean;
  errGlobalMsg: string;
  onCancel: () => void;
  onLeave: () => void;
}

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    isLoading,
    errGlobalMsg,
    onCancel,
    onLeave,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      {...other}
    >
      <PaperHeader>
        {t('confirmLeaveSpaceModal.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('confirmLeaveSpaceModal.description')}
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
            {t('confirmLeaveSpaceModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            onClick={onLeave}
            disabled={isLoading}
          >
            {t('confirmLeaveSpaceModal.leaveBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
