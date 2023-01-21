import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { pokerSessionsRepoSelectors } from '@Redux/domains/pokerSessionsRepo/selectors';

import { PokerAddTeamsBtn } from '@components/domains/poker/buttons/PokerAddTeamsBtn';

import { ContentEmpty } from '@components/uiKit/ContentEmpty';
import { Grid, TGridProps } from '@components/uiKit/Grid';

import { TRANS } from '@components/utils/types';

import { StoryTeam } from './StoryTeam';

export type TStoryTeamsProps = Partial<TGridProps> & {
  storyId: TEntityID;
};

const StoryTeams = (props: TStoryTeamsProps): React.ReactElement | null => {
  const {
    storyId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const pokerSessionId = useSelector(pokerSessionsSelectors.getCurrId);
  const teams = useSelector(pokerSessionsRepoSelectors.getTeamsWithSort);

  if (!pokerSessionId) {
    return null;
  }

  const renderContent = () => {
    if (!teams.length) {
      return (
        <ContentEmpty
          actionBtn={(
            <PokerAddTeamsBtn
              pokerSessionId={pokerSessionId}
            />
          )}
        >
          {t('pokerSession.emptyTeamsInSession')}
        </ContentEmpty>
      );
    }

    return (
      <Grid
        gridGap={6}
        {...other}
      >
        {
          teams
            .map((teamId) => (
              <StoryTeam
                key={`team-${teamId.toString()}`}
                pokerSessionId={pokerSessionId}
                storyId={storyId}
                teamId={teamId}
              />
            ))
        }
      </Grid>
    );
  };

  return renderContent();
};

export {
  StoryTeams,
};
