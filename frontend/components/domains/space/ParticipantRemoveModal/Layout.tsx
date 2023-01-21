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

export type TUserRemoveModalLayoutProps = Partial<TModalProps> & {
  errGlobalMsg: string;
  isLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const Layout = (props: TUserRemoveModalLayoutProps): React.ReactElement | null => {
  const {
    errGlobalMsg,
    isLoading,
    onCancel,
    onSubmit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      {...other}
    >
      <PaperHeader>
        {t('participantRemoveModal.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('participantRemoveModal.description')}
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
            {t('participantRemoveModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            disabled={isLoading}
            onClick={onSubmit}
          >
            {t('participantRemoveModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
