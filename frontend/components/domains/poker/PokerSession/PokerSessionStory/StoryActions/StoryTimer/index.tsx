import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { Timer, TTimerProps } from '@components/domains/shared/Timer';

export type TStoryTimerProps = Partial<TTimerProps> & {
  storyId: TEntityID
};

const StoryTimer = (props: TStoryTimerProps): React.ReactElement | null => {
  const {
    storyId,
    ...other
  } = props;

  const pokerSession = useSelector(pokerSessionsSelectors.getCurr);
  const isStoryActive = useSelector(pokerSessionsSelectors.getIsStoryActive)(
    pokerSession?._id,
    storyId
  );
  const duration = useSelector(pokerSessionsSelectors.getStoryDurationInSec)(
    pokerSession?._id,
    storyId
  );

  if (!pokerSession) {
    return null;
  }

  return (
    <Timer
      timerId={storyId}
      isActive={isStoryActive}
      color={isStoryActive ? 'font.primary' : 'font.d_20'}
      pastSeconds={duration}
      {...other}
    />
  );
};

export {
  StoryTimer,
};
