import { timeHelpers } from '@chpokify/helpers';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Modal } from '@components/domains/shared/Modal';

import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TNeedConfirmEmailLayoutProps = {
  resendTimerSec: number;
  errGlobalMsg: string;
  isLoading: boolean;
  onSignOut: () => void;
  onResend: () => void;
};

const Layout = (props: TNeedConfirmEmailLayoutProps): React.ReactElement | null => {
  const {
    resendTimerSec,
    errGlobalMsg,
    isLoading,
    onSignOut,
    onResend,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderResendBtnTitle = () => {
    if (resendTimerSec) {
      return t('needConfirmEmail.resendWithTimerBtn', {
        timer: timeHelpers.fmtSecondsToMinutes(resendTimerSec),
      });
    }

    return t('needConfirmEmail.resendBtn');
  };

  return (
    <Modal
      variant="card"
      preventClose
    >
      <PaperHeader>
        {t('needConfirmEmail.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
        >
          {t('needConfirmEmail.description')}
        </Text>

        {
          !!resendTimerSec && (
            <FormHelperText
              variant="positive"
            >
              {t('needConfirmEmail.successMessage')}
            </FormHelperText>
          )
        }

        <FormHelperText
          variant="negative"
        >
          {errGlobalMsg}
        </FormHelperText>
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="space-between"
        >
          <Button
            variant="shadow"
            onClick={onSignOut}
          >
            {t('needConfirmEmail.signOutBtn')}
          </Button>

          <Button
            variant="primary"
            disabled={!!resendTimerSec || isLoading}
            onClick={onResend}
          >
            {renderResendBtnTitle()}
          </Button>
        </PaperActions>
      </PaperFooter>
    </Modal>
  );
};

export {
  Layout,
};
