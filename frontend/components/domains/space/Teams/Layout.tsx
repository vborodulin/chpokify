import { TEntityID, TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { EntityItem } from '@components/domains/shared/EntityItem';
import { SpaceCreateTeamBtn } from '@components/domains/space/buttons/SpaceCreateTeamBtn';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Badge } from '@components/uiKit/Badge';
import { Grid } from '@components/uiKit/Grid';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TTeamsLayoutProps = Partial<TPaperProps> & {
  teams: TTeam[];
  cantModerate: boolean;
  onEditTeam: (team: TTeam) => () => void;
  currTeamsIds?: TEntityID[];
};

const Layout = (props: TTeamsLayoutProps): React.ReactElement | null => {
  const {
    teams,
    currTeamsIds,
    cantModerate,
    onEditTeam,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderTeamBadge = () => (
    <Badge>
      {t('teams.currTeamBadge')}
    </Badge>
  );

  const renderTeamItem = (team: TTeam, index: number) => (
    <EntityItem
      key={team._id.toString()}
      data-test-id={index === 0 ? DATA_TEST_ID.TEAM_ITEM : undefined}
      data-tut-space={index === teams.length - 1 ? SPACE_ONBOARDING_STEP_ID.TEAM_ITEM : undefined}
      type="button"
      item={team.name}
      startAdornment={currTeamsIds?.includes(team._id) ? renderTeamBadge() : undefined}
      endAdornment={team.participantsIds.length.toString()}
      onClick={onEditTeam(team)}
    />
  );

  const renderTeams = () => {
    if (!teams.length) {
      return (
        <Text
          fontSize={2}
        >
          {t('teams.emptyDescription')}
        </Text>
      );
    }

    return (
      <Grid
        gridTemplateColumns={['1fr', '1fr 1fr']}
        gridGap={3}
      >
        {
          teams.map(renderTeamItem)
        }
      </Grid>
    );
  };

  const renderCreateButton = () => {
    if (cantModerate) {
      return (
        <SpaceCreateTeamBtn />
      );
    }

    return null;
  };

  return (
    <Paper
      data-tut-space={SPACE_ONBOARDING_STEP_ID.TEAMS}
      variant="card"
      {...other}
    >
      <PaperHeader>
        {t('teams.title')}
      </PaperHeader>

      <PaperContent>
        <Text
          fontSize={2}
          mb={4}
        >
          {t('teams.description')}
        </Text>

        {renderTeams()}
      </PaperContent>

      <PaperFooter>
        <PaperActions
          justifyContent="flex-start"
        >
          {renderCreateButton()}
        </PaperActions>
      </PaperFooter>
    </Paper>
  );
};

export {
  Layout,
};
