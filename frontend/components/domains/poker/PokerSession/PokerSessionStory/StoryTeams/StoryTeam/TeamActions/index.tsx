import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { PokerTeamRevealBtn } from '@components/domains/poker/buttons/PokerTeamRevealBtn';
import { PokerTeamVoteBn } from '@components/domains/poker/buttons/PokerTeamVoteBtn';

import { Grid, TGridProps } from '@components/uiKit/Grid';

import { TRANS } from '@components/utils/types';

const Root = styled(Grid)<TGridProps>`
  &:empty {
    display: none;
  }
`;

export type TTeamActionsProps = Partial<TGridProps> & {
  pokerSessionId: TEntityID;
  storyId: TEntityID;
  teamId: TEntityID;
};

const TeamActions = (props: TTeamActionsProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    storyId,
    teamId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const spaceId = useSelector(pokerSessionsSelectors.getSpaceId)(
    pokerSessionId
  );

  if (!spaceId) {
    throw new Error(t('errors.spaceNotFound'));
  }

  return (
    <Root
      gridGap={4}
      gridAutoFlow="column"
      justifyContent="flex-start"
      {...other}
    >
      <PokerTeamRevealBtn
        storyId={storyId}
        teamId={teamId}
      />

      <PokerTeamVoteBn
        pokerSessionId={pokerSessionId}
        spaceId={spaceId}
        storyId={storyId}
        teamId={teamId}
      />
    </Root>
  );
};

export {
  TeamActions,
};
