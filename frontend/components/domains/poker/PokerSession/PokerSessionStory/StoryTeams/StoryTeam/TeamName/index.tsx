import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TTeamNameProps = Partial<TTextProps> & {
  pokerSessionId: TEntityID;
  teamId: TEntityID;
  teamName: string;
}

const TeamName = (props: TTeamNameProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    teamId,
    teamName,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currUserId = useSelector(authSelectors.getCurrUserId);
  const spaceId = useSelector(pokerSessionsSelectors.getSpaceId)(pokerSessionId);
  const canModerate = useSelector(spacesSelectors.getCanModerate)(
    spaceId,
    currUserId
  );

  const handleClick = () => {
    if (!canModerate) {
      return null;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_EDIT, {
      teamId,
    }));
  };

  return (
    <Text
      as="span"
      canHover={canModerate}
      fontSize={4}
      fontWeight={1}
      onClick={handleClick}
      {...other}
    >
      {teamName}
    </Text>
  );
};

export {
  TeamName,
};
