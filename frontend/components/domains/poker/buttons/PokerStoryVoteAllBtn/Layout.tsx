import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconFlagOutline } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TButtonProps> & {
  canModerate: boolean;
  hasTeams: boolean;
  isStoryActive: boolean;
  isStoryVoting: boolean;
  onStartVoteAll: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    hasTeams,
    isStoryActive,
    isStoryVoting,
    onStartVoteAll,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate || !isStoryActive || isStoryVoting) {
    return null;
  }

  return (
    <Button
      variant="primary"
      StartIcon={IconFlagOutline}
      onClick={onStartVoteAll}
      disabled={!hasTeams}
      {...other}
    >
      {t('pokerSession.voteAllBtn')}
    </Button>
  );
};

export {
  Layout,
};
