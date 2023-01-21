import { TTeam } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { spacesRepoSelectors } from '@Redux/domains/spacesRepo/selectors';
import { uiActions } from '@Redux/domains/ui/actions';
import { uiTypes } from '@Redux/domains/ui/types';

import { DATA_TEST_ID } from '@components/domains/core/types';
import { EntityItem } from '@components/domains/shared/EntityItem';
import { SPACE_ONBOARDING_STEP_ID } from '@components/domains/space/onboarding/types';

import { Badge } from '@components/uiKit/Badge';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TTeamsContentProps = Partial<TGridProps> & {};

const TeamsContent = (props: TTeamsContentProps): React.ReactElement | null => {
  const { ...other } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useDispatch();

  const cantModerate = useSelector(spacesRepoSelectors.getCanModerateMeCurr);

  const teams = useSelector(spacesSelectors.getCurrTeams);
  const currTeamsIds = useSelector(spacesRepoSelectors.getCurrTeamsIds);

  const handleEditTeam = (team: TTeam) => () => {
    if (cantModerate) {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_EDIT, {
        teamId: team._id,
      }));
    } else {
      dispatch(uiActions.modalOpen(uiTypes.MODAL_TYPES.TEAM_VIEW, {
        team,
      }));
    }
  };

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
      onClick={handleEditTeam(team)}
    />
  );

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
      {...other}
    >
      {
        teams.map(renderTeamItem)
      }
    </Grid>
  );
};

export { TeamsContent };
