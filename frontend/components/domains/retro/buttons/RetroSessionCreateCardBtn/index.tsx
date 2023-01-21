import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { Button } from '@components/uiKit/Button';
import { TFlexProps } from '@components/uiKit/Flex';
import { IconAdd } from '@components/uiKit/Icons';

export type TRetroSessionCreateCardBtnProps = TFlexProps & {
  popperId: string;
  isColumnAction: boolean;
};

const RetroSessionCreateCardBtn = (props: TRetroSessionCreateCardBtnProps): React.ReactElement | null => {
  const {
    popperId,
    isColumnAction,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);
  const canEditCards = useSelector(retroSessionsSelectors.getCanEditCards);

  const handleClick = () => {
    dispatch(uiActions.popperOpen(popperId));
  };

  if ((isColumnAction || !canEditCards) && !canModerate) {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      startIcon={(
        <IconAdd />
      )}
      fullWidth
      {...other}
    />
  );
};

export {
  RetroSessionCreateCardBtn,
};
