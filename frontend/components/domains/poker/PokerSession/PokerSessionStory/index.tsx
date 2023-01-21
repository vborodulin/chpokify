import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { Layout, TLayoutProps } from './Layout';

export type TPokerSessionStoryProps = Partial<TLayoutProps>;

const PokerSessionStory = (props: TPokerSessionStoryProps) => {
  const storyId = useSelector(pokerSessionsSelectors.getSelectedStoryId);
  const story = useSelector(storiesSelectors.getById)(storyId);
  const scores = useSelector(pokerSessionsSelectors.getStoryScores)(
    story?._id
  );

  return (
    <Layout
      story={story}
      scores={scores}
      {...props}
    />
  );
};

export {
  PokerSessionStory,
};
