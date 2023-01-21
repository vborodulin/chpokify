import { TStory } from '@chpokify/models-types';
import React from 'react';

import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TStoryMenuProps = Partial<TLayoutProps> & {
  story: TStory
};

const StoryMenu = React.forwardRef<any, TStoryMenuProps>((props, ref) => {
  const {
    story,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORY_EDIT, {
      story,
    }));
  };

  const handleRemove = () => {
    dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.POKER_SESSION_STORY_REMOVE, {
      story,
    }));
  };

  return (
    <Layout
      ref={ref}
      onEdit={handleEdit}
      onRemove={handleRemove}
      {...other}
    />
  );
});

StoryMenu.displayName = 'StoryMenu';

export {
  StoryMenu,
};
