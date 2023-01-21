import { isServer } from '@chpokify/helpers';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { asyncRejectedSelectors } from '@Redux/domains/asyncInfo/rejected/selectors';
import { authActionsTypes } from '@Redux/domains/auth/actionsTypes';
import { authAsyncActions } from '@Redux/domains/auth/asyncActions';
import { configSelectors } from '@Redux/domains/config/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { TButtonProps } from '@components/uiKit/Button';
import { FormHelperText } from '@components/uiKit/FormHelperText';
import { IconSocialApple } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { useEventListener } from '@components/utils/hooks/useEventListener';
import { useLoadScript } from '@components/utils/hooks/useLoadScript';
import { TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

const Root = styled(Box)<TBoxProps>`
  align-items: center;
  border: none;
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor: pointer;
  flex-shrink: 0;
  justify-content: center;
  outline: none;
  overflow: hidden;
  position: relative;
  user-select: none;
  vertical-align: middle;
`;

export enum APPLE_AUTH_PLACEMENT {
  LOGIN = 'logIn',
  SIGNUP = 'signUp'
}

type TAppleSignInRespFail = {
  error: string;
}

type TAppleSignInRespSuccess = {
  authorization: {
    state: string;
    code: string;
    // eslint-disable-next-line camelcase
    id_token: string;
  };
  user: {
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  };
}

const APPLE_AUTH_SCRIPT_URL = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

export type TAppleAuthBtnProps = TButtonProps & {
  placement: APPLE_AUTH_PLACEMENT
};

const AppleAuthBtn = (props: TAppleAuthBtnProps): React.ReactElement | null => {
  const {
    placement,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const btnRef = useRef<any>();

  const { isLoading } = useLoadScript(APPLE_AUTH_SCRIPT_URL);

  const clientId = useSelector(configSelectors.getAppleClientId);
  const redirectURI = useSelector(configSelectors.getAppleRedirectURI);
  const inviteSpaceToken = useSelector(spacesSelectors.getInviteToken);

  const appleAuthErr = useSelector(asyncRejectedSelectors.createErrorSelector)([
    authActionsTypes.APPLE_OAUTH_PENDING,
  ]);

  const handleClick = () => {
    const appleBtnEl = btnRef.current;

    if (appleBtnEl) {
      appleBtnEl.click();
    }
  };

  const handleOnSuccess = async (event: CustomEvent<TAppleSignInRespSuccess>) => {
    const {
      authorization: {
        id_token: idToken,
      },
    } = event.detail;

    log.info('[apple auth]', event.detail);

    await dispatch(authAsyncActions.appleOAuth({
      idToken,
      inviteSpaceToken,
    }));
  };

  const handleOnFailure = (event: CustomEvent<TAppleSignInRespFail>) => {
    log.error(new ClientError(`AppleSignIn: ${event.detail.error}`));
  };

  useEventListener(
    isServer() ? null : document,
    'AppleIDSignInOnSuccess',
    handleOnSuccess
  );

  useEventListener(
    isServer() ? null : document,
    'AppleIDSignInOnFailure',
    handleOnFailure
  );

  useEffect(() => {
    if (!isLoading && window.AppleID) {
      window.AppleID.auth.init({
        clientId,
        redirectURI,
        scope: 'name email',
        usePopup: true,
      });
    }
  }, [isLoading]);

  return (
    <>
      <Root
        as="button"
        type="button"
        pl={3}
        pr={4}
        py={0}
        height="40px"
        display="inline-flex"
        width="100%"
        bg="baseInvert.normal"
        className={CLASS_TEST.AUTH_APPLE_BTN}
        onClick={handleClick}
        {...other}
      >
        <IconSocialApple
          fill="font.invert"
        />

        <Text
          as="span"
          fontSize={2}
          fontWeight={1}
          verticalAlign="middle"
          color="font.invert"
          mr={0}
          ml={2}
          ellipses
        >
          {t(`appleAuthBtn.${placement}.title`)}
        </Text>
      </Root>

      <Box
        ref={btnRef}
        id="appleid-signin"
        data-type="sign in"
        data-color="white"
        data-border="false"
        data-logo-size="large"
        data-border-radius={25}
        opacity={0}
        zIndex={-1}
        position="absolute"
        transform="scale(0)"
      />

      {
        !!appleAuthErr && (
          <FormHelperText
            variant="negative"
          >
            {appleAuthErr.message}
          </FormHelperText>
        )
      }
    </>
  );
};

export {
  AppleAuthBtn,
};
