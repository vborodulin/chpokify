import { TInviteTokenPayload } from '@chpokify/models-types';
import { routing } from '@chpokify/routing';
import { useTranslation, Trans } from 'next-i18next';
import React, { FormEvent } from 'react';
import { useConnect } from 'wagmi';

import { APPLE_AUTH_PLACEMENT, AppleAuthBtn } from '@components/domains/auth/buttons/AppleAuthBtn';
import { ConnectorBtn } from '@components/domains/auth/buttons/ConnectorBtn';
import { GOOGLE_AUTH_PLACEMENT, GoogleAuthBtn } from '@components/domains/auth/buttons/GoogleAuthBtn';
import { InputPassword } from '@components/domains/auth/InputPassword';
import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { DividerWithText } from '@components/uiKit/DividerWithText';
import { Flex } from '@components/uiKit/Flex';
import { FormControl } from '@components/uiKit/FormControl';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconMailOutline } from '@components/uiKit/Icons';
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
  email: string;
  password: string;
};

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TLogInLayoutProps = {
  formRefs: TFormRefs;
  defaultValues: Partial<TFormData>;
  isEmailDisabled: boolean;
  invitePayload: TInviteTokenPayload | undefined;
  errors: TFormErrors<TFormData>;
  errGlobalMsg: string;
  hasChanges: boolean;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
  hasCrypto?: boolean;
}

const Layout = (props: TLogInLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    defaultValues,
    isEmailDisabled,
    invitePayload,
    errors,
    errGlobalMsg,
    isLoading,
    onSubmit,
    hasCrypto = false,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);
  const { connectors, error } = useConnect();

  const renderTitle = () => {
    if (invitePayload) {
      return t('logIn.titleInvite', {
        spaceName: invitePayload.space.name,
      });
    }

    return t('logIn.title');
  };

  return (
    <Modal
      variant="card"
      forwardedAs="form"
      preventClose
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
              i18nKey="logIn.descriptionWithLink"
              components={{
                nextLink: (
                  <LinkComponent
                    href={routing.getSignUpUrl()}
                  />
                ),
              }}
            />
          </Text>

          <GoogleAuthBtn
            placement={GOOGLE_AUTH_PLACEMENT.LOGIN}
            fullWidth
            mb={4}
          />

          <AppleAuthBtn
            placement={APPLE_AUTH_PLACEMENT.LOGIN}
            fullWidth
            mb={4}
          />

          {
            hasCrypto && (
              <>
                {
                  connectors.map((connector) => (
                    <ConnectorBtn
                      key={connector.id}
                      connector={connector}
                      width="100%"
                      mb={4}
                    />
                  ))
                }

                {
                  error && (
                    <FormHelperText
                      variant="negative"
                      mb={4}
                    >
                      {error.message}
                    </FormHelperText>
                  )
                }
              </>
            )
          }

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
              type="text"
              name="email"
              autoComplete="email"
              defaultValue={defaultValues.email}
              placeholder={t('logIn.emailPlaceholder')}
              startAdornment={(
                <IconMailOutline
                  fill="font.d_30"
                />
              )}
              disabled={isEmailDisabled}
            />
          </FormControl>

          <FormControl
            errorMessage={errors?.password?.message}
          >
            <InputPassword
              inputRef={formRefs.password}
              name="password"
              autoComplete="password"
              placeholder={t('logIn.passwordPlaceholder')}
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
            href={routing.getForgotPasswordUrl()}
          >
            {t('logIn.forgotPasswordLink')}
          </LinkComponent>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {t('logIn.logInBtn')}
          </Button>
        </PaperActions>

        <Divider
          my={6}
        />

        <Flex
          justifyContent="center"
        >
          <LinkComponent
            href={routing.getSignUpUrl()}
          >
            {t('logIn.signUpBtn')}
          </LinkComponent>
        </Flex>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
