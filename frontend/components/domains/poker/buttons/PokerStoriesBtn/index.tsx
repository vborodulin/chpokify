import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconTasks } from '@components/uiKit/Icons';

export type TPokerStoriesBtnProps = Partial<TButtonProps>;

const PokerStoriesBtn = (props: TPokerStoriesBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORIES_LIST));
  };

  return (
    <Button
      variant="primary-outline"
      onClick={handleClick}
      StartIcon={IconTasks}
      isMobileReady
      {...other}
    >
      Stories
    </Button>
  );
};

export {
  PokerStoriesBtn,
};
