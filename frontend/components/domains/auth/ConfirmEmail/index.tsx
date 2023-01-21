import React from 'react';

import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';

import { useAsyncActionInfo } from '@components/utils/hooks/useAsyncActionInfo';

import { ConfirmEmailFail } from './ConfirmEmailFail';
import { ConfirmEmailSuccess } from './ConfirmEmailSuccess';

const ConfirmEmail = () => {
  const { errGlobalMsg } = useAsyncActionInfo(
    [authActionsTypes.CONFIRM_EMAIL_PENDING],
    []
  );

  if (errGlobalMsg) {
    return (
      <ConfirmEmailFail />
    );
  }

  return (
    <ConfirmEmailSuccess />
  );
};

export {
  ConfirmEmail,
};
