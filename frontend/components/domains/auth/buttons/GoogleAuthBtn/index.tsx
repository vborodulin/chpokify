import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useSelector } from 'react-redux';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Button } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { ImageGoogle } from '@components/uiKit/Images';

import { TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

const CLIENT_ID = '238943843598-9iefbdc3npjlpsndj2aooch979djru26.apps.googleusercontent.com';

const GOOGLE_COOKIES_NOT_ENABLED_ERROR_CODE = 'idpiframe_initialization_failed';

export enum GOOGLE_AUTH_PLACEMENT {
  LOGIN = 'logIn',
  SIGNUP = 'signUp'
}

export type TGoogleAuthBtnProps = Partial<TBoxProps> & {
  placement: GOOGLE_AUTH_PLACEMENT
};

export type TGoogleAuthErrResp = {
  error: string;
  details?: string;
}

const GoogleAuthBtn = (props: TGoogleAuthBtnProps): React.ReactElement | null => {
  const {
    placement,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const inviteSpaceToken = useSelector(spacesSelectors.getInviteToken);

  const [errorCode, setErrorCode] = useState<any>(null);

  const googleAuthErr = useSelector(asyncRejectedSelectors.createErrorSelector)([
    authActionsTypes.GOOGLE_OAUTH_PENDING,
  ]);

  const handleOnSuccess = async (response: FIXME) => {
    await dispatch(authAsyncActions.googleOAuth({
      idToken: response.tokenId,
      googleId: response.googleId,
      inviteSpaceToken,
    }));

    log.info('[google auth]:', response);
  };

  return (
    <Box
      {...other}
    >
      <GoogleLogin
        clientId={CLIENT_ID}
        render={(renderProps) => (
          <Button
            StartIcon={ImageGoogle}
            variant="primary-outline"
            onClick={renderProps.onClick}
            fullWidth
            className={CLASS_TEST.AUTH_GOOGLE_BTN}
          >
            {t(`googleAuthBtn.${placement}.title`)}
          </Button>
        )}
        uxMode="popup"
        onSuccess={handleOnSuccess}
        onFailure={(resp: TGoogleAuthErrResp) => {
          try {
            setErrorCode(resp.error);
            log.error(new ClientError('Google auth fail', [], resp));
          } catch {
            // do nothing
          }
        }}
      />

      {
       !!errorCode && errorCode === GOOGLE_COOKIES_NOT_ENABLED_ERROR_CODE && (
         <FormHelperText
           variant="negative"
         >
           {t('googleAuthBtn.cookieNotEnabledError')}
         </FormHelperText>
       )
     }

      {
        !!googleAuthErr && (
          <FormHelperText
            variant="negative"
          >
            {googleAuthErr.message}
          </FormHelperText>
        )
      }
    </Box>
  );
};

export {
  GoogleAuthBtn,
};
