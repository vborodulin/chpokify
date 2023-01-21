import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { useAppDispatch } from '@Redux/hooks';

import { TColumnHeaderProps } from '@components/domains/retro/RetroSession/RetroSessionColumn/ColumnHeader';

import { IconButton, TIconButtonProps } from '@components/uiKit/IconButton';
import { IconAdd } from '@components/uiKit/Icons';

type TColumnAddCardBtnProps = Partial<TIconButtonProps> & Pick<TColumnHeaderProps, 'popperCreateCardId'>

const ColumnAddCardBtn = (props: TColumnAddCardBtnProps): React.ReactElement | null => {
  const {
    popperCreateCardId,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(uiActions.popperToggle(popperCreateCardId));
  };

  return (
    <IconButton
      variant="contained"
      onClick={handleClick}
      isHover
      {...other}
    >
      <IconAdd />
    </IconButton>
  );
};

export {
  ColumnAddCardBtn,
};
