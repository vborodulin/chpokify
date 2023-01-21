import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { retroSessionsCardsRepoSelectors } from '@Redux/domains/retroSessionsCardsRepo/selectors';

import { RetroSessionVoteCardBtn } from '@components/domains/retro/buttons/RetroSessionVoteCardBtn';
import { rootBlurCardMixin } from '@components/domains/retro/RetroSession/RetroSessionCard/Layout';
import { VotesResults } from '@components/domains/retro/RetroSession/RetroSessionCard/SettingVotesCard/VotesResults';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

type TSettingVotesCardProps = TFlexProps & {
  cardId: string;
};

const RootVotesCard = styled(Flex)<TFlexProps & { isHiddenCard: boolean }>`
  align-items: center;
  ${({ isHiddenCard }) => isHiddenCard && rootBlurCardMixin};
`;

const SettingVotesCard = (props: TSettingVotesCardProps): React.ReactElement | null => {
  const {
    cardId,
    ...other
  } = props;

  const isHiddenCard = useSelector(retroSessionsCardsRepoSelectors.getIsHiddenCard)(cardId);
  const countVotesCard = useSelector(retroSessionsCardsSelectors.getCountVotes)(cardId);
  const myVotesCard = useSelector(retroSessionsCardsRepoSelectors.getMyVotesByCardId)(cardId);
  const countMyVotesFromCard = useSelector(retroSessionsCardsRepoSelectors.getCountMyVotesByCardId)(cardId);
  const hasMyVotes = useSelector(retroSessionsCardsRepoSelectors.getHasMyVotesByCardId)(cardId);
  const canVotes = useSelector(retroSessionsCardsRepoSelectors.getCanVotesByCardId)(cardId);

  const renderResultVotes = () => {
    if (!countMyVotesFromCard || !hasMyVotes) {
      return null;
    }

    return (
      <VotesResults
        cardId={cardId}
        votesCard={myVotesCard}
      />
    );
  };

  return (
    <RootVotesCard
      gap="2"
      isHiddenCard={isHiddenCard}
      {...other}
    >
      <RetroSessionVoteCardBtn
        cardId={cardId}
        canVote={canVotes}
        countVotes={countVotesCard}
        hasMyVotes={hasMyVotes}
      />
      {
        renderResultVotes()
      }
    </RootVotesCard>
  );
};

export {
  SettingVotesCard,
};
