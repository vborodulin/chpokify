import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { videoCallSelectors } from '@Redux/domains/videoCall/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconCameraCamera, IconCameraCameraActive } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TPokerJoinCallBtnProps = Partial<TButtonProps>;

const PokerJoinCallBtn = (props: TPokerJoinCallBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isJoined = useSelector(videoCallSelectors.getIsJoined);

  const handleOpenVideoCall = () => {
    dispatch(pokerSessionsActions.isVideoCallOpenSet(true));
  };

  if (isJoined) {
    return (
      <Button
        StartIcon={IconCameraCameraActive}
        variant="positive"
        onClick={handleOpenVideoCall}
        {...other}
      >
        {t('pokerJoinCallBtn.onCall')}
      </Button>
    );
  }

  return (
    <Button
      StartIcon={IconCameraCamera}
      variant="primary-outline"
      onClick={handleOpenVideoCall}
      className={CLASS_TEST.POKER_VIDEO_CALL_START_BTN}
      {...other}
    >
      {t('pokerJoinCallBtn.joinCall')}
    </Button>
  );
};

export {
  PokerJoinCallBtn,
};
