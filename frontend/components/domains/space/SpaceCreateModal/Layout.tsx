import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { CLASS_TEST } from '@components/domains/core/types';
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

export type TFormData = {
  name: string;
}

export const FORM_FIELDS: (keyof TFormData)[] = [
  'name',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TCreateNewSpaceLayoutProps = Partial<TModalProps> & {
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
  onCancel?: () => void;
};

const Layout = (props: TCreateNewSpaceLayoutProps): React.ReactElement |null => {
  const {
    formRefs,
    errors,
    errGlobalMsg,
    hasChanges,
    isLoading,
    onCancel,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      forwardedAs="form"
      onSubmit={onSubmit}
    >
      <PaperHeader>
        {t('createSpace.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <FormControl
            errorMessage={errors.name?.message}
          >
            <Input
              inputRef={formRefs.name}
              name="name"
              placeholder={t('createSpace.namePlaceholder')}
              autoFocus
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
          {
            !!onCancel && (
              <Button
                onClick={onCancel}
              >
                {t('createSpace.cancelBtn')}
              </Button>
            )
          }

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
            className={CLASS_TEST.SPACE_CREATE_MODAL_SUBMIT_BTN}
          >
            {t('createSpace.createSpaceBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
