import { useTranslation } from 'next-i18next';
import React from 'react';

import { retroSessionsActions } from '@Redux/domains/retroSessions/actions';
import { useAppDispatch } from '@Redux/hooks';

import {
  TRetroSessionActionsProps,
} from '@components/domains/retro/RetroSession/RetroSessionHeader/RetroSessionActions';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconTasks } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TRetroSessionActionsColumnBtnProps = Partial<TButtonProps> &
  Pick<TRetroSessionActionsProps, 'canModerate'>;

const RetroSessionActionsColumnBtn = (props: TRetroSessionActionsColumnBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(retroSessionsActions.columnActionsSidebarToggle());
  };

  return (
    <Button
      variant="primary-outline"
      StartIcon={IconTasks}
      onClick={handleClick}
      isMobileReady
      {...other}
    >
      {t('pages.retro.retroHeaderActions.actionsBtn')}
    </Button>
  );
};

export {
  RetroSessionActionsColumnBtn,
};
