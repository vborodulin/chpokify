import { isEqualsId } from '@chpokify/helpers';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiSelectors } from '@Redux/domains/ui/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Layout, TLayoutProps } from './Layout';

export type TPokerStoryItemProps = Partial<TLayoutProps> & {
  storyId: string;
  placement?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const PokerStoryItem = React.forwardRef<any, TPokerStoryItemProps>((props, ref) => {
  const {
    storyId,
    placement,
    onClick,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const story = useSelector(storiesSelectors.getById)(storyId);
  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const selectedStoryId = useSelector(pokerSessionsSelectors.getSelectedStoryId);
  const activeStoryId = useSelector(pokerSessionsSelectors.getActiveStoryId)(
    pokerSessionId
  );
  const storyScores = useSelector(pokerSessionsSelectors.getStoryScores)(
    story?._id
  );

  const isSelected = isEqualsId(selectedStoryId, story?._id);
  const isActive = isEqualsId(activeStoryId, story?._id);

  const menuIdRef = useRef(`poker-story-item-menu-${story?._id}-${placement}-${shortid()}`);

  const isMenuOpen = useSelector(uiSelectors.getPopperIsOpen)(
    menuIdRef.current
  );

  const handleSelect = () => {
    if (!story) {
      return;
    }

    dispatch(pokerSessionsActions.storySelect(story._id));
  };

  const handleClosePoppers = () => {
    dispatch(uiActions.popperHideAll());
  };

  const handleClick = (event: React.MouseEvent) => {
    handleSelect();
    handleClosePoppers();

    if (onClick) {
      onClick(event);
    }
  };

  if (!story) {
    return null;
  }

  return (
    <Layout
      ref={ref}
      story={story}
      score={storyScores}
      menuId={menuIdRef.current}
      isActive={isActive}
      isSelected={isSelected}
      isMenuOpen={isMenuOpen}
      onClick={handleClick}
      {...other}
    />
  );
});

PokerStoryItem.displayName = 'PokerStoryItem';

export {
  PokerStoryItem,
};
