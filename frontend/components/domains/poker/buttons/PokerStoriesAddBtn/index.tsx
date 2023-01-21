import React from 'react';
import { useSelector } from 'react-redux';

import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { TButtonProps } from '@components/uiKit/Button';

import { Layout } from './Layout';

export type TPokerStoryAddBtnProps = Partial<TButtonProps>;

const PokerStoryAddBtn = (props: TPokerStoryAddBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const canModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const handleAddStories = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORIES_ADD));
  };

  return (
    <Layout
      canModerate={canModerate}
      onAddStories={handleAddStories}
      {...other}
    />
  );
};

export {
  PokerStoryAddBtn,
};
