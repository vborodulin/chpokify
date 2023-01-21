import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { InputPassword } from '@components/domains/auth/InputPassword';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { LinkComponent } from '@components/uiKit/Link';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  password: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'password',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TResetPasswordLayoutProps = {
  formRefs: TFormRefs;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
}

const Layout = (props: TResetPasswordLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      variant="card"
      preventClose
      forwardedAs="form"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <PaperHeader>
        {t('resetPassword.title')}
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <Text
            as="p"
            fontSize={2}
            mb={6}
          >
            {t('resetPassword.description')}
          </Text>

          <FormControl
            errorMessage={errors?.password?.message}
          >
            <InputPassword
              inputRef={formRefs.password}
              name="password"
              placeholder={t('resetPassword.passwordPlaceholder')}
              autoComplete="new-password"
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
        <PaperActions
          justifyContent="space-between"
        >
          <LinkComponent
            href={routing.getLogInUrl()}
          >
            {t('resetPassword.logInLink')}
          </LinkComponent>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {t('resetPassword.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
