import {
  TInviteTokenPayload,
  USERNAME_CHAR_ALL_PATTERN,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { Trans, useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { APPLE_AUTH_PLACEMENT, AppleAuthBtn } from '@components/domains/auth/buttons/AppleAuthBtn';
import { GOOGLE_AUTH_PLACEMENT, GoogleAuthBtn } from '@components/domains/auth/buttons/GoogleAuthBtn';
import { DataEncrypted } from '@components/domains/auth/DataEncrypted';
import { InputPassword } from '@components/domains/auth/InputPassword';
import { Terms } from '@components/domains/auth/Terms';
import { CLASS_TEST } from '@components/domains/core/types';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { DividerWithText } from '@components/uiKit/DividerWithText';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconMailOutline, IconUserAvatar } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { LinkComponent } from '@components/uiKit/Link';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TFormErrors } from '@lib/types/form';

export type TFormData = {
  username: string;
  email: string;
  password: string;
};

export const FORM_FIELDS: (keyof TFormData)[] = [
  'email',
  'username',
  'password',
];

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TSignUpLayoutProps = {
  formRefs: TFormRefs;
  defaultValues: Partial<TFormData>;
  isEmailDisabled: boolean;
  invitePayload: TInviteTokenPayload | undefined;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
};

const Layout = (props: TSignUpLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValues,
    isEmailDisabled,
    invitePayload,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderTitle = () => {
    if (invitePayload) {
      return t('signUp.titleInvite', {
        spaceName: invitePayload.space.name,
      });
    }

    return t('signUp.title');
  };

  return (
    <Modal
      variant="card"
      preventClose
      forwardedAs="form"
      autoComplete="off"
      onSubmit={onSubmit}
      my={[4, 6]}
    >
      <PaperHeader>
        <Text
          as="h1"
          fontSize={6}
          fontWeight={1}
          textAlign="center"
        >
          {renderTitle()}
        </Text>
      </PaperHeader>

      <PaperContent>
        <fieldset
          disabled={isLoading}
        >
          <Text
            as="p"
            fontSize={2}
            mb={6}
            textAlign="center"
          >
            <Trans
              i18nKey="signUp.descriptionWithLink"
              components={{
                nextLink: (
                  <LinkComponent
                    href={routing.getLogInUrl()}
                  />
                ),
              }}
            />
          </Text>

          <GoogleAuthBtn
            fullWidth
            placement={GOOGLE_AUTH_PLACEMENT.SIGNUP}
            mb={4}
          />

          <AppleAuthBtn
            fullWidth
            placement={APPLE_AUTH_PLACEMENT.SIGNUP}
            mb={4}
          />

          <DividerWithText
            mb={4}
          >
            {t('signUp.dividerOAuth')}
          </DividerWithText>

          <FormControl
            errorMessage={errors?.email?.message}
          >
            <Input
              inputRef={formRefs.email}
              type="email"
              name="email"
              defaultValue={defaultValues.email}
              placeholder={t('signUp.emailPlaceholder')}
              autoComplete="new-email"
              startAdornment={(
                <IconMailOutline
                  fill="font.d_30"
                />
              )}
              disabled={isEmailDisabled}
            />
          </FormControl>

          <FormControl
            errorMessage={errors?.username?.message}
          >
            <Input
              inputRef={formRefs.username}
              type="text"
              name="username"
              defaultValue={defaultValues.username}
              placeholder={t('signUp.usernamePlaceholder')}
              autoComplete="new-username"
              startAdornment={(
                <IconUserAvatar
                  fill="font.d_30"
                />
              )}
              pattern={USERNAME_CHAR_ALL_PATTERN}
              title={t('formErrors.signUp.userName', {
                min: USERNAME_MIN_LENGTH,
                max: USERNAME_MAX_LENGTH,
              })}
            />
          </FormControl>

          <FormControl
            errorMessage={errors?.password?.message}
          >
            <InputPassword
              inputRef={formRefs.password}
              name="password"
              placeholder={t('signUp.passwordPlaceholder')}
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
          justifyContent="stretch"
        >
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className={CLASS_TEST.SIGN_UP_BTN}
          >
            {t('signUp.signUpBtn')}
          </Button>
        </PaperActions>

        <Terms
          mt={4}
        />

        <DataEncrypted
          mt={4}
        />
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
