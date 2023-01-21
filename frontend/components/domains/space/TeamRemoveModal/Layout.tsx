import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TRemoveTeamModalLayout = {
  errGlobalMsg: string;
  isLoading: boolean;
  onCancel: () => void;
  onRemove: () => void;
}

export const FORM_FIELDS = [];

const Layout = (props: TRemoveTeamModalLayout): React.ReactElement | null => {
  const {
    errGlobalMsg,
    isLoading,
    onCancel,
    onRemove,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal>
      <PaperHeader>
        {t('removeTeamActionModal.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('removeTeamActionModal.description')}
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
            {t('removeTeamActionModal.cancelBtn')}
          </Button>

          <Button
            variant="negative"
            onClick={onRemove}
            disabled={isLoading}
          >
            {t('removeTeamActionModal.removeBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
