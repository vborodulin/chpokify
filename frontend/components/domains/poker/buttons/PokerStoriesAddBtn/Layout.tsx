import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconAdd } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TPokerStoryAddBtnProps = Partial<TButtonProps> & {
  canModerate: boolean;
  onAddStories: () => void;
};

const Layout = (props: TPokerStoryAddBtnProps): React.ReactElement | null => {
  const {
    canModerate,
    onAddStories,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate) {
    return null;
  }

  return (
    <Button
      data-test-id="poker-stories-btn"
      variant="primary-outline"
      StartIcon={IconAdd}
      onClick={onAddStories}
      {...other}
    >
      {t('pokerSession.addStoryBtn')}
    </Button>
  );
};

export {
  Layout,
};
