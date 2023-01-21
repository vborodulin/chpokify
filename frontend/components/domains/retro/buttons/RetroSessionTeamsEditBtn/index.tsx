import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconAccountSettings } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

type TRetroSessionTeamsEditBtnProps = Partial<TButtonProps>;

const RetroSessionTeamsEditBtn = (props: TRetroSessionTeamsEditBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currRetroSessionId = useSelector(retroSessionsSelectors.getCurrId);

  const handleClick = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.RETRO_SESSION_EDIT_TEAMS, {
      retroSessionId: currRetroSessionId,
      onSuccess: () => {},
    }));
  };

  return (
    <Button
      variant="primary-outline"
      StartIcon={IconAccountSettings}
      onClick={handleClick}
      {...other}
    >
      {t('pages.retro.retroSessionPeople.teamsBtn')}
    </Button>
  );
};

export {
  RetroSessionTeamsEditBtn,
};
