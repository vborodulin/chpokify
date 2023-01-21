import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconMailOutline } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  email: string;
}

export const FORM_FIELDS: (keyof TFormData)[] = [
  'email',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TEmailSettingsLayoutProps = Partial<TPaperProps> & {
  formRefs: TFormRefs;
  defaultValues: TFormData;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  isLoading: boolean;
  hasChanges: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent) => void;
};

const Layout = (props: TEmailSettingsLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Paper
      variant="card"
      forwardedAs="form"
      onSubmit={onSubmit}
      {...other}
    >
      <PaperHeader>
        {t('emailSettings.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <FormControl
            errorMessage={errors.email?.message}
          >
            <Input
              inputRef={formRefs.email}
              name="email"
              type="email"
              defaultValue={defaultValues.email}
              startAdornment={(
                <IconMailOutline
                  fill="font.d_30"
                />
              )}
              placeholder={t('emailSettings.emailPlaceholder')}
              disabled
            />
          </FormControl>

          <FormHelperText
            variant="negative"
          >
            {errGlobalMsg}
          </FormHelperText>
        </fieldset>
      </PaperContent>
    </Paper>
  );
};

export {
  Layout,
};
