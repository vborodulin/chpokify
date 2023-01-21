import { TStory } from '@chpokify/models-types';
import { TPokerCardDeckScores } from '@chpokify/models-types/pokerCardDeck';
import React from 'react';

import { PokerScores } from '@components/domains/poker/PokerScores';
import { StoryActions } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryActions';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';

import { StoryName } from '../StoryName';

export type TStoryHeaderProps = Partial<TFlexProps> & {
  story: TStory;
  scores: TPokerCardDeckScores;
}

const StoryHeader = (props: TStoryHeaderProps): React.ReactElement | null => {
  const {
    story,
    scores,
    ...other
  } = props;

  return (
    <Flex
      flexDirection="column"
      {...other}
    >
      <Grid
        gridAutoFlow="column"
        gridGap={6}
        justifyContent="space-between"
        mb={3}
      >
        <StoryName
          story={story}
        />

        <PokerScores
          scores={scores}
        />
      </Grid>

      <StoryActions
        story={story}
      />
    </Flex>
  );
};

export {
  StoryHeader,
};
