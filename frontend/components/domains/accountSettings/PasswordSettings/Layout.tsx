import { useTranslation } from 'next-i18next';
import React from 'react';

import { InputPassword } from '@components/domains/auth/InputPassword';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  password: string;
  newPassword: string;
  repeatNewPassword: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'newPassword',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TPasswordSettingsLayoutProps = Partial<TPaperProps> & {
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  isFulfilled: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

const Layout = (props: TPasswordSettingsLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    errors,
    errGlobalMsg,
    hasChanges,
    isLoading,
    isFulfilled,
    onCancel,
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
        {t('passwordSettings.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <FormControl
            errorMessage={errors.newPassword?.message}
          >
            <InputPassword
              inputRef={formRefs.newPassword}
              name="newPassword"
              placeholder={t('passwordSettings.newPasswordPlaceholder')}
            />
          </FormControl>

          {
            isFulfilled && (
              <FormHelperText
                variant="positive"
              >
                {t('passwordSettings.fulfilledDescription')}
              </FormHelperText>
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
            disabled={isLoading || !hasChanges}
          >
            {t('passwordSettings.cancelBtn')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
          >
            {t('passwordSettings.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
