import { TStory } from '@chpokify/models-types';
import React from 'react';

import { PokerStoryRevealAllBtn } from '@components/domains/poker/buttons/PokerStoryRevealAllBtn';
import { PokerStoryStartBtn } from '@components/domains/poker/buttons/PokerStoryStartBtn';
import { PokerStoryVoteAllBtn } from '@components/domains/poker/buttons/PokerStoryVoteAllBtn';
import { StoryTimer } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryActions/StoryTimer';

import { Flex } from '@components/uiKit/Flex';
import { Grid, TGridProps } from '@components/uiKit/Grid';

export type TStoryActionsProps = Partial<TGridProps> & {
  story: TStory;
}

const StoryActions = (props: TStoryActionsProps): React.ReactElement | null => {
  const {
    story,
    ...other
  } = props;

  return (
    <Grid
      gridGap={4}
      gridTemplateColumns={[
        '1fr',
        'auto auto',
      ]}
      alignItems="center"
      justifyContent="flex-start"
      {...other}
    >
      <PokerStoryVoteAllBtn
        storyId={story._id}
      />

      <PokerStoryRevealAllBtn
        storyId={story._id}
      />

      <Flex
        alignItems="center"
      >
        <PokerStoryStartBtn
          storyId={story._id}
          mr={4}
        />

        <StoryTimer
          fontSize={4}
          fontWeight={1}
          storyId={story._id}
        />
      </Flex>
    </Grid>
  );
};

export {
  StoryActions,
};
