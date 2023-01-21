import { domHelpers } from '@chpokify/helpers/dom';
import { routing } from '@chpokify/routing';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { SiweMessage } from 'siwe';
import {
  useConnect, useSignMessage, useAccount, useDisconnect, Connector,
} from 'wagmi';

import { authApi } from '@api';

import { authActions } from '@Redux/domains/auth/actions';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { POST_MESSAGE_TYPE } from '@components/domains/core/types';

import { ClientError } from '@lib/errors';
import { keepmail } from '@lib/keepmail';

const getKeepmailOauth = async (redirectUri: string): Promise<{ code: string | null; error: string | null }> =>
  new Promise((resolve) => {
    domHelpers.openNewTab(redirectUri, 60, 60);

    const handleEvent = (event: MessageEvent) => {
      if (event.data.type === POST_MESSAGE_TYPE.KEEPMAIL_OAUTH_CODE) {
        const { code } = event.data;
        window.removeEventListener('message', handleEvent);
        return resolve({
          code,
          error: null,
        });
      }

      if (event.data.type === POST_MESSAGE_TYPE.KEEPMAIL_OAUTH_ERROR) {
        const { error } = event.data;
        window.removeEventListener('message', handleEvent);
        return resolve({
          error,
          code: null,
        });
      }
    };

    window.addEventListener('message', handleEvent);
  });

const useLoginWithConnector = () => {
  const dispatch = useAppDispatch();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const inviteSpaceToken = useSelector(spacesSelectors.getInviteToken);

  const logInCrypto = useCallback(async (message: string, signature: string) => {
    try {
      const { data: { result: { user } } } = await authApi.logInCrypto({
        signature,
        message,
        inviteSpaceToken,
      });

      dispatch(authActions.cryptoAuthFulfilled(user));

      return {
        user,
        err: null,
      };
    } catch (err) {
      return {
        user: null,
        err,
      };
    }
  }, [
    dispatch,
    inviteSpaceToken,
  ]);

  const signUpCrypto = useCallback(async (message: string, signature: string) => {
    const redirectUri = new URL(
      routing.getKeepmailCallbackUrl(),
      window.location.href
    );
    const keepmailOauthUrl = keepmail.getOauthUrl(
      '1',
      redirectUri.toString()
    );

    const keepmailOauth = await getKeepmailOauth(keepmailOauthUrl);

    if (keepmailOauth.error || !keepmailOauth.code) {
      throw new ClientError(keepmailOauth.error || 'Access denied');
    }

    const { data: { result: { user } } } = await authApi.singUpCrypto({
      code: keepmailOauth.code,
      redirectUri: redirectUri.toString(),
      signature,
      message,
      inviteSpaceToken,
    });

    dispatch(authActions.cryptoAuthFulfilled(user));
  }, [
    dispatch,
    inviteSpaceToken,
  ]);

  const auth = useCallback(async (message: string, signature: string) => {
    const { err } = await logInCrypto(message, signature);

    if (err instanceof AxiosError && err.response?.status === 401) {
      await signUpCrypto(message, signature);
    } else {
      throw err;
    }
  }, [
    logInCrypto,
    signUpCrypto,
  ]);

  const loginConnector = useCallback(async (connector: Connector) => {
    try {
      setIsLoading(true);
      setError(null);

      if (isConnected) {
        await disconnectAsync();
      }

      const { data: { result: { nonce } } } = await authApi.getNonce();
      const { account, chain } = await connectAsync({ connector });

      const message = new SiweMessage({
        domain: window.location.host,
        address: account,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: chain.id,
        nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await auth(
        message.prepareMessage(),
        signature
      );
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
    }
  }, [
    signMessageAsync,
    connectAsync,
    disconnectAsync,
    isConnected,
    auth,
  ]);

  return {
    loginConnector,
    error,
    isLoading,
  };
};

export {
  useLoginWithConnector,
};
