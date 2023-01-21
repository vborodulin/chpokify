import { isEqualsId } from '@chpokify/helpers';
import { TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';

import { PokerCardValue } from '@components/domains/poker/PokerCardValue';

import { Button } from '@components/uiKit/Button';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { TLayoutProps } from '../Layout';

const BANNER_HEIGHT = '58px';

export type PokerVotingScoreProps = Partial<TLayoutProps> & {
  team: TTeam;
  onChooseCard: (votingCardId:string, team:TTeam) => void;
};

const PokerVotingScore = (props: PokerVotingScoreProps): React.ReactElement | null => {
  const {
    team,
    cardSet,
    onChooseCard,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const votingCardId = useSelector(pokerSessionsRepoSelectors.getMyVotingCardId)(
    team?._id
  );
  const card = cardSet?.cards.find((el) => isEqualsId(el._id, votingCardId));

  const handleClick = () => {
    onChooseCard(votingCardId, team);
  };

  const renderCard = () => {
    if (card) {
      return (
        <PokerCardValue
          card={card}
          textProps={{
            fontSize: 5,
            fontWeight: 1,
            color: 'font.invert',
          }}
          iconProps={{
            width: '32px',
            height: '32px',
            fill: 'font.invert',
          }}
        />
      );
    }

    return (
      <Text
        fontSize={5}
        fontWeight={1}
        color="font.invert"
        mr={2}
      >
        {t('pokerVotingScoresBanner.emptyCard')}
      </Text>
    );
  };

  if (!votingCardId) {
    return null;
  }

  return (
    <>
      <Divider />
      <Flex
        bg="primary.normal"
        height={BANNER_HEIGHT}
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        onClick={handleClick}
        width="100%"
        {...other}
      >
        <Flex
          mr={3}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text
            fontSize={5}
            fontWeight={1}
            color="font.invert"
            mr={2}
          >
            {team.name}
            :
          </Text>
          {renderCard()}
        </Flex>

        <Button
          variant="base"
        >
          {t('pokerVotingScoresBanner.changeCardBtn')}
        </Button>
      </Flex>

    </>

  );
};

export {
  PokerVotingScore,
};
