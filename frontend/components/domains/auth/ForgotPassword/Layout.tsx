import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';

import { Modal } from '@components/domains/shared//Modal';

import { ButtonWithTimer } from '@components/uiKit/ButtonWithTimer';
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
  email: string
}

type TFormRefs = Record<keyof TFormData, React.Ref<HTMLInputElement>>;

export type TForgotPasswordLayoutProps = {
  formRefs: TFormRefs,
  errors: TFormErrors<TFormData>,
  errGlobalMsg: string,
  sendId: string;
  hasChanges: boolean;
  isTouched: boolean;
  isLoading: boolean;
  onSubmit: (event: FormEvent) => void;
};

const Layout = (props: TForgotPasswordLayoutProps): React.ReactElement | null => {
  const {
    formRefs,
    errors,
    errGlobalMsg,
    sendId,
    hasChanges,
    isTouched,
    isLoading,
    onSubmit,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Modal
      variant="card"
      preventClose
      forwardedAs="form"
      onSubmit={onSubmit}
    >

      <PaperHeader>
        {t('forgotPassword.title')}
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
            {t('forgotPassword.description')}
          </Text>

          <FormControl
            errorMessage={errors?.email?.message}
          >
            <Input
              inputRef={formRefs.email}
              type="email"
              name="email"
              placeholder={t('forgotPassword.emailPlaceholder')}
              startAdornment={(
                <IconMailOutline
                  fill="font.d_30"
                />
              )}
            />

            {
              sendId && !hasChanges && !isTouched && (
                <FormHelperText
                  variant="positive"
                >
                  {t('forgotPassword.mailSentMessage')}
                </FormHelperText>
              )
            }
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
            {t('forgotPassword.logInLink')}
          </LinkComponent>

          <ButtonWithTimer
            startId={sendId}
            seconds={120}
            type="submit"
            variant="primary"
            disabled={isLoading}
            renderTimerTitle={(timer: string) =>
              t('forgotPassword.resendWithTimerBtn', {
                timer,
              })}
          >
            {t('forgotPassword.resetBtn')}
          </ButtonWithTimer>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
