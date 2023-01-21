import { RETRO_TEMPLATE_TYPE } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { RetroSessionChooseTemplate } from '@components/domains/retro/RetroSessionChooseTemplate';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Divider } from '@components/uiKit/Divider';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { FormLabel } from '@components/uiKit/FormLabel';
import { Input } from '@components/uiKit/Input';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  title: string;
  description?: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'title',
  'description',
];

export type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TRetroSessionEditFormProps = Partial<TBoxProps> & {
  formRefs: TFormRefs;
  defaultValue: Partial<TFormData>;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  formId: string;
  isLoading?: boolean;
  templateType?:RETRO_TEMPLATE_TYPE;
  hasEdit?:boolean;
  onChooseTemplate?: (type:RETRO_TEMPLATE_TYPE) => void;
}

const RetroSessionEditForm = (props: TRetroSessionEditFormProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValue,
    errors,
    isLoading,
    onSubmit,
    errGlobalMsg,
    onChooseTemplate,
    templateType,
    hasEdit,
    formId,
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
        <Box>
          <FormControl
            errorMessage={errors.title?.message}
          >
            <Input
              inputRef={formRefs.title}
              name="title"
              defaultValue={defaultValue.title}
              placeholder={t('pages.retro.retroSessionEditForm.titlePlaceholder')}
              autoFocus
            />
          </FormControl>

          <FormControl
            errorMessage={errors.description?.message}
          >
            <Input
              multiline
              rows={2}
              inputRef={formRefs.description}
              name="description"
              defaultValue={defaultValue.description}
              placeholder={t('pages.retro.retroSessionEditForm.descriptionPlaceholder')}
            />
          </FormControl>
        </Box>
        {
          hasEdit
          && (
            <>
              <Divider
                mt={6}
                mb={6}
              />
              <Box>
                <FormControl>
                  <FormLabel>
                    {t('pages.retro.retroSessionEditForm.chooseTemplate')}
                  </FormLabel>
                  <RetroSessionChooseTemplate
                    templateType={templateType}
                    onChooseTemplate={onChooseTemplate}
                    hasEdit={hasEdit}
                  />
                </FormControl>
              </Box>
            </>
          )
        }
      </Box>
      <FormHelperText
        variant="negative"
        mt={0}
      >
        {errGlobalMsg}
      </FormHelperText>
    </Box>
  );
};

RetroSessionEditForm.displayName = 'RetroSessionEditForm';

export {
  RetroSessionEditForm,
};
