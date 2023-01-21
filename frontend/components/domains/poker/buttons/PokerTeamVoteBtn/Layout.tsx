import { TPokerCardDeckScores } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconBlock, IconFlagOutline, IconRefresh } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TButtonProps> & {
  canModerate: boolean;
  hasTeamParticipants: boolean;
  isStoryActive: boolean;
  isTeamVoting: boolean;
  onStartVote: () => void;
  onCancelVote: () => void;
  teamScores?: TPokerCardDeckScores;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    teamScores,
    hasTeamParticipants,
    isStoryActive,
    isTeamVoting,
    onStartVote,
    onCancelVote,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate || !isStoryActive || !hasTeamParticipants) {
    return null;
  }

  if (isTeamVoting) {
    return (
      <Button
        variant="base"
        StartIcon={IconBlock}
        onClick={onCancelVote}
        isMobileReady
        {...other}
      >
        {t('pokerSession.voteCancelBtn')}
      </Button>
    );
  }

  if (typeof teamScores !== 'number' && !teamScores) {
    return (
      <Button
        variant="primary"
        StartIcon={IconFlagOutline}
        onClick={onStartVote}
        {...other}
      >
        {t('pokerSession.voteBtn')}
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      StartIcon={IconRefresh}
      onClick={onStartVote}
      {...other}
    >
      {t('pokerSession.revoteBtn')}
    </Button>
  );
};

export {
  Layout,
};
