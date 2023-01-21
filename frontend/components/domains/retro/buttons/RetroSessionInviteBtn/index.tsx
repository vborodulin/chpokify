import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsAsyncActions } from '@Redux/domains/retroSessions/asyncActions';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import {
  TRetroSessionActionsProps,
} from '@components/domains/retro/RetroSession/RetroSessionHeader/RetroSessionActions';
import { CopyBtn, TCopyBtnProps } from '@components/domains/shared/CopyBtn';

import { LOCALE, TRANS } from '@components/utils/types';

export type TRetroSessionInviteBtnProps = Partial<TCopyBtnProps> &
  Pick<TRetroSessionActionsProps, 'canModerate'>;

const RetroSessionInviteBtn = (props: TRetroSessionInviteBtnProps): React.ReactElement | null => {
  const {
    canModerate,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const retroSession = useSelector(retroSessionsSelectors.getCurr);

  const handleGetInviteLink = async () => {
    if (!retroSession) {
      return '';
    }

    const {
      teamsIds,
      _id,
    } = retroSession;

    const { payload } = await dispatch(retroSessionsAsyncActions.inviteGen(_id.toString(), {
      teamsIds,
      locale: router.locale || LOCALE.EN,
    }));

    if (!getIsRejectedActionPayload(payload)) {
      return payload.url;
    }

    return '';
  };

  if (!canModerate) {
    return null;
  }

  return (
    <CopyBtn
      variant="primary"
      getCopyText={handleGetInviteLink}
      hideTimeout={1500}
      {...other}
    >
      {t('pages.retro.retroHeaderActions.shareBtn')}
    </CopyBtn>
  );
};

export {
  RetroSessionInviteBtn,
};
