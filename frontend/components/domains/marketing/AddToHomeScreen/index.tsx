import { isServer } from '@chpokify/helpers';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { asyncFulfilledSelectors } from '@Redux/domains/asyncInfo/fulfilled/selectors';
import { pokerSessionsActionsTypes } from '@Redux/domains/pokerSessions/actionTypes';

import { COOKIES_KEYS } from '@components/domains/core/types';

import { useEventListener } from '@components/utils/hooks/useEventListener';

import { Layout } from './Layout';

const AddToHomeScreen = (): React.ReactElement | null => {
  const promptEventRef = useRef<FIXME>(null);
  const [isShow, setIsShow] = useState<boolean>(false);

  const needShowPrompt = useSelector(asyncFulfilledSelectors.createFulfilledSelector)([
    pokerSessionsActionsTypes.STORY_REVEAL_CARDS_FULFILLED,
    pokerSessionsActionsTypes.STORY_TEAM_REVEAL_CARDS_FULFILLED,
    pokerSessionsActionsTypes.STORY_CHOOSE_CARD_FULFILLED,
  ]);

  const open = () => {
    if (Cookies.get(COOKIES_KEYS.ADD_TO_HOME_SCREEN_SHOWN)) {
      return;
    }

    setIsShow(true);
  };

  const close = () => {
    Cookies.set(COOKIES_KEYS.ADD_TO_HOME_SCREEN_SHOWN, '1', {
      expires: 30,
    });
    setIsShow(false);
  };

  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    promptEventRef.current = event;
  };

  const showPrompt = () => {
    if (promptEventRef.current) {
      open();
    }
  };

  const handleCancel = () => {
    close();
  };

  const handleSubmit = async () => {
    const promptEvent = promptEventRef.current;

    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();
    promptEventRef.current = null;
    close();
  };

  useEventListener(
    isServer() ? null : window,
    'beforeinstallprompt',
    handleBeforeInstallPrompt
  );

  useEffect(() => {
    if (needShowPrompt) {
      showPrompt();
    }
  }, [needShowPrompt]);

  return (
    <Layout
      isShow={isShow}
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};

export {
  AddToHomeScreen,
};
