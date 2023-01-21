import { useTranslation } from 'next-i18next';
import React from 'react';

import { Box } from '@components/uiKit/Box';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  title: string;
}

export const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TStoryEditFormProps= {
  formId: string;
  formRefs: TFormRefs;
  defaultValues: Partial<TFormData>;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  isLoading: boolean;
  onSubmit: () => void;
}

const StoryEditForm = (props: TStoryEditFormProps): React.ReactElement | null => {
  const {
    formId,
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Box
      id={formId}
      as="form"
      onSubmit={onSubmit}
    >
      <Box
        as="fieldset"
        disabled={isLoading}
      >
        <FormControl
          errorMessage={errors.title?.message}
        >
          <Input
            inputRef={formRefs.title}
            name="title"
            placeholder={t('storyEditForm.titlePlaceholder')}
            defaultValue={defaultValues.title}
            autoFocus
          />
        </FormControl>

        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </Box>
    </Box>
  );
};

export {
  StoryEditForm,
};
