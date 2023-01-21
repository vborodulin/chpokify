import { TTeam } from '@chpokify/models-types';
import { TPokerCardDeck } from '@chpokify/models-types/pokerCardDeck';
import React from 'react';
import styled from 'styled-components';

import { PokerVotingScore } from '@components/domains/poker/PokerVotingScoresBanner/PokerVotingScore';

import { Flex, TFlexProps } from '@components/uiKit/Flex';

const Root = styled(Flex)<TFlexProps>`
bottom: 0;
cursor: pointer;
display: flex;
flex-direction: column;
left: 0;
position: fixed;
right: 0;
`;

export type TLayoutProps = Partial<TFlexProps> & {
  teams?: TTeam[] | null;
  cardSet?: TPokerCardDeck;
  onChooseCard: (votingCardId:string, team:TTeam) => void;
}

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    onChooseCard,
    cardSet,
    teams,
    ...other
  } = props;

  if (!teams) {
    return null;
  }

  return (
    <Root>
      {
        teams.map((team) => (
          <PokerVotingScore
            key={team.name}
            team={team}
            cardSet={cardSet}
            onChooseCard={onChooseCard}
            {...other}
          />
        ))
      }
    </Root>
  );
};

export {
  Layout,
};
