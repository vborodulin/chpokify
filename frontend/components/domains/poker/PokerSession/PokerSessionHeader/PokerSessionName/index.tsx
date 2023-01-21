import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Text, TTextProps } from '@components/uiKit/Text';

export type TPokerSessionNameProps = Partial<TTextProps> & {
  pokerSessionId: TEntityID;
  pokerSessionTitle: string;
}

const PokerSessionName = (props: TPokerSessionNameProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    pokerSessionTitle,
    ...other
  } = props;
  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleClick = () => {
    if (!canModerate) {
      return;
    }

    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_EDIT, {
      pokerSessionId,
    }));
  };

  return (
    <Text
      as="h1"
      fontSize={[6, 8]}
      fontWeight={1}
      role={canModerate ? 'button' : ''}
      canHover={canModerate}
      onClick={handleClick}
      {...other}
    >
      {pokerSessionTitle}
    </Text>
  );
};

export {
  PokerSessionName,
};
