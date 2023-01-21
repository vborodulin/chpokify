import { TEntityID } from '@chpokify/models-types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesRepoSelectors } from '@Redux/domains/storiesRepo/selectors';
import { useAppDispatch } from '@Redux/hooks';

const StoriesListSelectProcessor = (): React.ReactElement | null => {
  const dispatch = useAppDispatch();

  const pokerSession = useSelector(pokerSessionsSelectors.getCurr);
  const storySelectedId = useSelector(pokerSessionsSelectors.getSelectedStoryId);

  const activeStoryId = useSelector(pokerSessionsSelectors.getActiveStoryId)(
    pokerSession?._id
  );

  const firstStory = useSelector(storiesRepoSelectors.getFirstInPokerSession)(
    pokerSession?._id
  );

  const selectStory = (id: TEntityID | null) => {
    if (!id) {
      return;
    }

    dispatch(pokerSessionsActions.storySelect(id));
  };

  useEffect(() => {
    if (!storySelectedId && firstStory) {
      selectStory(firstStory?._id);
    }
  }, [firstStory, storySelectedId]);

  useEffect(() => {
    if (activeStoryId) {
      selectStory(activeStoryId);
    }
  }, [activeStoryId]);

  useEffect(() => () => {
    selectStory(null);
  }, []);

  return null;
};

export {
  StoriesListSelectProcessor,
};
