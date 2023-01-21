import { TEntityID, TTeam, TUserWithParticipant } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';

import { TeamActions } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryTeams/StoryTeam/TeamActions';
import { TeamName } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryTeams/StoryTeam/TeamName';
import { PokerUserCard } from '@components/domains/poker/PokerUserCard';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Grid } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import { TeamScores } from './TeamScores';

export type TLayoutProps = Partial<TBoxProps> & {
  pokerSessionId: TEntityID;
  storyId: TEntityID;
  team: TTeam;
  isTeamVoting: boolean;
  teamUsersWithParticipants: Record<string, TUserWithParticipant>;
  cardSetId?: TEntityID;
}

const Root = styled(Box)<TBoxProps>`
  border: 1px solid ${({ theme }) => theme.colors.base.a_40};
`;

const Layout = (props: TLayoutProps): React.ReactElement => {
  const {
    pokerSessionId,
    cardSetId,
    storyId,
    team,
    isTeamVoting,
    teamUsersWithParticipants,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderUserCard = () => {
    if (!team.participantsIds.length) {
      return (
        <Text
          fontSize={2}
        >
          {t('pokerSessionTeam.emptyDescription')}
        </Text>
      );
    }

    return (
      <Grid
        gridGap={5}
        gridTemplateColumns={[
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
          'repeat(5, 1fr)',
          'repeat(6, 1fr)',
        ]}
        width="100%"
        justifyContent="flex-start"
        mr={[0, null, 8]}
      >
        {
          team.participantsIds.map((participantId) => {
            const user = teamUsersWithParticipants[participantId.toString()];

            if (!user) {
              log.error(
                new ClientError(
                  `PokerUserCard: user not found: participantId: ${participantId}}`
                )
              );
              return null;
            }

            return (
              <PokerUserCard
                key={participantId.toString()}
                pokerSessionId={pokerSessionId}
                cardSetId={cardSetId}
                storyId={storyId}
                teamId={team._id}
                user={user}
                isTeamVoting={isTeamVoting}
              />
            );
          })
        }
      </Grid>
    );
  };

  return (
    <Root
      p={[4, 6]}
      borderRadius={2}
      {...other}
    >
      <Grid
        gridAutoFlow="column"
        alignItems="center"
        justifyContent="space-between"
        gridGap={3}
        mb={3}
      >
        <TeamName
          pokerSessionId={pokerSessionId}
          teamId={team._id}
          teamName={team.name}
        />

        <TeamScores
          storyId={storyId}
          teamId={team._id}
          fontSize={6}
          fontWeight={1}
        />
      </Grid>

      <Flex
        justifyContent="space-between"
        alignItems="center"
      >
        {renderUserCard()}
      </Flex>

      {
        !!team.participantsIds.length && (
          <TeamActions
            pokerSessionId={pokerSessionId}
            teamId={team._id}
            storyId={storyId}
            mt={6}
          />
        )
      }
    </Root>
  );
};

export {
  Layout,
};
