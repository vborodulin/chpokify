import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { CLASS_TEST } from '@components/domains/core/types';

import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconCheck, IconPlay } from '@components/uiKit/Icons';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TButtonProps> & {
  canModerate: boolean;
  hasTeams: boolean;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    canModerate,
    isActive,
    onStart,
    onStop,
    className,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (!canModerate) {
    return null;
  }

  if (isActive) {
    return (
      <Button
        variant="primary-outline"
        StartIcon={IconCheck}
        onClick={onStop}
        className={classnames(className, CLASS_TEST.POKER_STORY_STOP)}
        {...other}
      >
        {t('pokerSession.storyStopBtn')}
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      StartIcon={IconPlay}
      onClick={onStart}
      className={classnames(className, CLASS_TEST.POKER_STORY_START)}
      {...other}
    >
      {t('pokerSession.taskStartBtn')}
    </Button>
  );
};

export {
  Layout,
};
