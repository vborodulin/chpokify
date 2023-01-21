import { useTranslation } from 'next-i18next';
import React from 'react';

import { TFormData } from '@components/domains/retro/RetroSession/RetroSessionCardEditModal';
import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

type TLayoutProps= TModalProps & {
  formId: string;
  errors: TFormErrors<TFormData>;
  formRefs: TFormRefs;
  isColumnAction: boolean;
  isSubmitDisabled: boolean;
  errGlobalMsg: string;
  defaultValueTitle: string | undefined;
  defaultValueDescription: string | undefined;
  onSubmit: () => void;
  onCancel: () => void;
};

const Layout = (props:TLayoutProps):React.ReactElement => {
  const {
    formId,
    isColumnAction,
    isSubmitDisabled,
    errGlobalMsg,
    errors,
    formRefs,
    defaultValueTitle,
    defaultValueDescription,
    onSubmit,
    onCancel,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      id={formId}
      forwardedAs="form"
      onSubmit={onSubmit}
      {...other}
    >
      <PaperHeader>
        {t('pages.retro.editCardModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={formRefs.title}
              name="title"
              defaultValue={defaultValueTitle}
              placeholder={t('pages.retro.editCardModal.titlePlaceholder')}
              rows={1}
              multiline
              isAutoResize
            />
          </FormControl>

          {
            !isColumnAction
            && (
            <FormControl
              errorMessage={errors.description?.message}
            >
              <Input
                inputRef={formRefs.description}
                name="description"
                defaultValue={defaultValueDescription}
                placeholder={t('pages.retro.editCardModal.descriptionPlaceholder')}
                rows={3}
                multiline
                isAutoResize
              />
            </FormControl>
            )
          }

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
            onClick={onCancel}
          >
            {t('pages.retro.editCardModal.cancelBtn')}
          </Button>

          <Button
            form={formId}
            type="submit"
            variant="primary"
            disabled={isSubmitDisabled}
          >
            {t('pages.retro.editCardModal.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
