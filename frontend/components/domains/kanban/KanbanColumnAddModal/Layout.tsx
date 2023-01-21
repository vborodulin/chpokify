import { useTranslation } from 'next-i18next';
import React from 'react';

import { TFormData } from '@components/domains/kanban/KanbanColumnAddModal';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

type TLayoutProps = {
  errors: TFormErrors<TFormData>;
  onClose: () => void;
  register: React.Ref<any>,
  onSubmit: () => void;
  formId: string,
  errGlobalMsg: string,
  disabled: boolean
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    formId,
    onSubmit,
    register,
    errGlobalMsg,
    onClose,
    disabled,
    errors,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      forwardedAs="form"
      onSubmit={onSubmit}
      {...other}
    >
      <PaperHeader>
        {t('kanbanColumnAddModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <FormLabel>
              {t('kanbanColumnAddModal.nameLabel')}
            </FormLabel>

            <Input
              inputRef={register}
              name="title"
              placeholder={t('kanbanColumnAddModal.namePlaceholder')}
            />
          </FormControl>
          <FormHelperText
            variant="negative"
          >
            {errGlobalMsg}
          </FormHelperText>
        </fieldset>
      </PaperContent>

      <PaperFooter>
        <PaperActions>
          <Button
            onClick={onClose}
          >
            {t('kanbanColumnAddModal.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            type="submit"
            form={formId}
            onClick={onSubmit}
            disabled={disabled}
          >
            {t('kanbanColumnAddModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
