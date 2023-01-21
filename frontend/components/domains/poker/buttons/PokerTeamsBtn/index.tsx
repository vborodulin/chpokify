import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconGroupOfUsers } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TPokerTeamsBtnProps = Partial<TButtonProps> & {
  pokerSessionId: TEntityID;
};

const PokerTeamsBtn = (props: TPokerTeamsBtnProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    children,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const cantModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleEditTeams = () => {
    if (cantModerate) {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_TEAMS_EDIT, {
        pokerSessionId,
      }));
    }
  };

  if (!cantModerate) {
    return null;
  }

  return (
    <Button
      variant="shadow"
      StartIcon={IconGroupOfUsers}
      onClick={handleEditTeams}
      {...other}
    >
      {children || t('pokerSession.teamsBtn')}
    </Button>
  );
};

export {
  PokerTeamsBtn,
};
