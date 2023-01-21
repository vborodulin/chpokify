import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal, TModalProps } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export const FORM_FIELDS: (keyof TFormData)[] = [
  'name',
];

export type TFormData = {
  name: string
}

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TSpaceEditModalLayoutProps = Partial<TModalProps> & {
  formRefs: TFormRefs;
  defaultValues: Partial<TFormData>;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onCancel: () => void,
  onSave: () => void;
};

const Layout = (props: TSpaceEditModalLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    hasChanges,
    isLoading,
    onCancel,
    onSave,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      forwardedAs="form"
      onSubmit={onSave}
      {...other}
    >
      <PaperHeader>
        {t('spaceEditModal.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <Text
            fontSize={2}
            mb={4}
          >
            {t('spaceSettingsLeave.description')}
          </Text>

          <FormControl
            errorMessage={errors.name?.message}
          >
            <Input
              name="name"
              inputRef={formRefs.name}
              defaultValue={defaultValues.name}
              placeholder={t('spaceEditModal.namePlaceholder')}
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
          <Button
            onClick={onCancel}
          >
            {t('spaceEditModal.cancelBtn')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
          >
            {t('spaceEditModal.saveBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};