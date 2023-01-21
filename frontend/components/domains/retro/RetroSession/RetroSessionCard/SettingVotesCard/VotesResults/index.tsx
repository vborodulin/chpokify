import { TEntityID } from '@chpokify/models-types';
import React from 'react';

import { VoteResult } from '@components/domains/retro/RetroSession/RetroSessionCard/SettingVotesCard/VoteResult';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

const MAX_VIEW_VOTES = 5;

type TVotesResultsProps = TFlexProps & {
  cardId: string;
  votesCard:TEntityID[];
}

const VotesResults = (props: TVotesResultsProps): React.ReactElement | null => {
  const {
    cardId,
    votesCard,
    ...other
  } = props;

  const votes = Array.from(votesCard);
  let votesAdditionalHelper = 0;

  if (votes.length > MAX_VIEW_VOTES) {
    votesAdditionalHelper = votes.splice(MAX_VIEW_VOTES).length;
  }

  const renderVotesHelper = () => {
    if (!votesAdditionalHelper) {
      return null;
    }

    return (
      <Text
        fontSize={1}
        fontWeight={1}
      >
        +
        {votesAdditionalHelper}
      </Text>
    );
  };

  return (
    <Flex
      alignItems="center"
      gap={1}
      {...other}
    >
      {
        votes.map((voteId, idx) => (
          <VoteResult
            key={idx.toString()}
            cardId={cardId}
            voteId={voteId}
          />
        ))
      }
      {
        renderVotesHelper()
      }
    </Flex>
  );
};

export {
  VotesResults,
};
