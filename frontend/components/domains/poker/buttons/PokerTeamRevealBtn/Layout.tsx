import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconFlip } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TButtonProps> & {
  canModerate: boolean;
  isVoting: boolean;
  onRevealCards: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    isVoting,
    onRevealCards,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate || !isVoting) {
    return null;
  }

  return (
    <Button
      variant="primary"
      StartIcon={IconFlip}
      onClick={onRevealCards}
      {...other}
    >
      {t('pokerSession.revealCardsBtn')}
    </Button>
  );
};

export {
  Layout,
};
