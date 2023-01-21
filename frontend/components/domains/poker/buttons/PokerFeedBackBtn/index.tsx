import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';
import { TCopyBtnProps } from '@components/domains/shared/CopyBtn';

import { Button } from '@components/uiKit/Button';
import { IconThumbUpOutline } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

type TPokerRatingBtn = Partial<TCopyBtnProps> & {
  pokerSessionId: TEntityID;
};

const PokerFeedBackBtn = (props: TPokerRatingBtn): React.ReactElement | null => {
  const {
    pokerSessionId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const pokerSession = useSelector(pokerSessionsSelectors.getById)(
    pokerSessionId
  );

  const cantModerate = useSelector(spacesSelectors.getCanModerate)(
    pokerSession?.spaceId,
    currUserId
  );

  const handleOnClick = async () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_FEEDBACK, {
      pokerSessionId,
      withBtnRating: true,
    }));
  };

  if (!cantModerate) {
    return null;
  }

  return (
    <Button
      onClick={handleOnClick}
      StartIcon={IconThumbUpOutline}
      className={CLASS_TEST.POKER_SESSION_FEEDBACK_BTN}
      isMobileReady
      {...other}
    >
      {t('pokerSessionStoriesRating.askToRate')}
    </Button>
  );
};

export {
  PokerFeedBackBtn,
};
