import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconUserAvatar } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  username: string
}

export const FORM_FIELDS: (keyof TFormData)[] = [
  'username',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TUsernameSettingsLayoutProps = Partial<TPaperProps> & {
  formRefs: TFormRefs;
  defaultValues: TFormData;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  isLoading: boolean;
  hasChanges: boolean;
  onCancel: () => void;
  onSubmit: (event: FormEvent) => void;
};

const Layout = (props: TUsernameSettingsLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValues,
    errors,
    errGlobalMsg,
    isLoading,
    hasChanges,
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
        {t('usernameSettings.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <FormControl
            errorMessage={errors.username?.message}
          >
            <Input
              name="username"
              inputRef={formRefs.username}
              defaultValue={defaultValues.username}
              placeholder={t('usernameSettings.usernamePlaceholder')}
              startAdornment={(
                <IconUserAvatar
                  fill="font.d_30"
                />
              )}
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
            disabled={isLoading || !hasChanges}
          >
            {t('usernameSettings.cancelBtn')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !hasChanges}
          >
            {t('usernameSettings.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
