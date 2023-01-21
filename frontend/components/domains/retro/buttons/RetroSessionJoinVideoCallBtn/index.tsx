import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { videoCallSelectors } from '@Redux/domains/videoCall/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { CLASS_TEST } from '@components/domains/core/types';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconCameraCamera, IconCameraCameraActive } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TRetroSessionJoinVideoCallBtnProps = Partial<TButtonProps>;

const RetroSessionJoinVideoCallBtn = (props: TRetroSessionJoinVideoCallBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const isJoined = useSelector(videoCallSelectors.getIsJoined);

  const handleOpenVideoCall = () => {
    dispatch(retroSessionsActions.isVideoCallOpenSet(true));
  };

  if (isJoined) {
    return (
      <Button
        StartIcon={IconCameraCameraActive}
        variant="positive"
        onClick={handleOpenVideoCall}
        isMobileReady
        {...other}
      >
        {t('pages.retro.retroHeaderActions.videoOnCall')}
      </Button>
    );
  }

  return (
    <Button
      StartIcon={IconCameraCamera}
      onClick={handleOpenVideoCall}
      className={CLASS_TEST.POKER_VIDEO_CALL_START_BTN}
      isMobileReady
      {...other}
    >
      {t('pages.retro.retroHeaderActions.videoCallBtn')}
    </Button>
  );
};

export {
  RetroSessionJoinVideoCallBtn,
};
