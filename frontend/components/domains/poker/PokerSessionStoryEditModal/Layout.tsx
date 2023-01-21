import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';
import {
  FORM_FIELDS, StoryEditForm, TFormData, TStoryEditFormProps,
} from '@components/domains/stories/StoryEditForm';

import { Button } from '@components/uiKit/Button';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

const FORM_ID = 'pokerSessionStoryEdit';

export type TLayoutProps = Omit<TStoryEditFormProps, 'formId'> & {
  onCancel: () => void;
  onRemove: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    onCancel,
    onRemove,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal>
      <PaperHeader>
        {t('pokerSessionStoryEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <StoryEditForm
          formId={FORM_ID}
          {...other}
        />
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onRemove}
          >
            {t('pokerSessionStoryEditModal.removeBtn')}
          </Button>

          <Button
            onClick={onCancel}
          >
            {t('pokerSessionStoryEditModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            type="submit"
            form={FORM_ID}
          >
            {t('pokerSessionStoryEditModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
  FORM_FIELDS,
};

export type {
  TFormData,
};
