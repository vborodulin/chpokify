import { TEntityID, TPokerCardDeckScores, TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { PokerAddTeamsBtn } from '@components/domains/poker/buttons/PokerAddTeamsBtn';
import { PokerExportCSVBtn } from '@components/domains/poker/buttons/PokerExportCSVBtn';
import { PokerTeamsBtn } from '@components/domains/poker/buttons/PokerTeamsBtn';
import { PokerSessionScores } from '@components/domains/poker/PokerSession/PokerSessionHeader/PokerSessionScores';
import { TeamName } from '@components/domains/poker/PokerSession/PokerSessionStory/StoryTeams/StoryTeam/TeamName';

import { Box } from '@components/uiKit/Box';
import { Caption } from '@components/uiKit/Caption';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { Divider } from '@components/uiKit/Divider';
import { Grid } from '@components/uiKit/Grid';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TPaperProps> & {
  pokerSessionId: TEntityID;
  teams: TTeam[];
  canModerate: boolean;
  getTeamScoresTotal: (teamId: TEntityID) => number;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    teams,
    canModerate,
    getTeamScoresTotal,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderTeam = (team: TTeam, score: TPokerCardDeckScores) => (
    <Grid
      key={team._id.toString()}
      justifyContent="space-between"
      gridTemplateColumns="1fr 1fr"
    >
      <Box>
        <TeamName
          pokerSessionId={pokerSessionId}
          teamId={team._id}
          teamName={team.name}
          fontSize={2}
          fontWeight={1}
          textAlign="left"
        />
      </Box>

      <Text
        fontSize={3}
        fontWeight={1}
        textAlign="right"
      >
        {score}
      </Text>
    </Grid>
  );

  const renderContent = () => {
    if (!teams.length) {
      return (
        <ContentEmpty>
          {t('pokerSession.emptyTeamsInSession')}
        </ContentEmpty>
      );
    }

    return (
      <Box>
        <Grid
          gridGap={3}
        >
          {
            teams.map((team) => (
              renderTeam(team, getTeamScoresTotal(team._id))))
          }
        </Grid>

        <Divider
          my={3}
        />

        <Grid
          gridGap={3}
          gridTemplateColumns="1fr 1fr"
          justifyContent="space-between"
        >
          <Text
            fontSize={2}
            fontWeight={1}
            color="font.d_20"
            textAlign="left"
          >
            {t('pokerSessionTeams.totalScore')}
          </Text>

          <PokerSessionScores
            pokerSessionId={pokerSessionId}
            fontSize={3}
            fontWeight={1}
            color="font.d_20"
            textAlign="right"
          />
        </Grid>
      </Box>
    );
  };

  const renderTeamsBtn = () => {
    if (!teams.length) {
      return (
        <PokerAddTeamsBtn
          pokerSessionId={pokerSessionId}
        />
      );
    }

    return (
      <PokerTeamsBtn
        variant="primary-outline"
        pokerSessionId={pokerSessionId}
      />
    );
  };

  const renderActionsContent = () => {
    if (!canModerate) {
      return (
        <PokerExportCSVBtn
          pokerSessionId={pokerSessionId}
        />
      );
    }

    return (
      <>
        {renderTeamsBtn()}
        <PokerExportCSVBtn
          pokerSessionId={pokerSessionId}
        />
      </>
    );
  };

  return (
    <Paper
      variant="card"
      {...other}
    >
      <PaperContent>
        <Grid
          gridGap={3}
          gridTemplateColumns="1fr 1fr"
          justifyContent="space-between"
          mb={3}
        >
          <Caption
            textAlign="left"
          >
            {t('pokerSessionTeams.teamLabel')}
          </Caption>

          <Caption
            textAlign="right"
          >
            {t('pokerSessionTeams.scoreLabel')}
          </Caption>
        </Grid>

        {renderContent()}
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          {renderActionsContent()}
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
