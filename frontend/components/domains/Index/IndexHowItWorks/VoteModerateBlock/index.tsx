import { useTranslation } from 'next-i18next';
import React from 'react';

import { TRANS } from '@components/utils/types';

import { HowItem } from '../HowItem';

const VoteModerateBlock = () => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <HowItem
      title={t('pages.index.howItWorks.voteModerateBlock.title')}
      description={t('pages.index.howItWorks.voteModerateBlock.desc')}
      actionTitle={t('pages.index.howItWorks.voteModerateBlock.actionTitle')}
      img={{
        src: '/images/chpokify-moderate.png',
        alt: t('pages.index.howItWorks.voteModerateBlock.altImg'),
        width: '440px',
        height: '360px',
        layout: 'intrinsic',
      }}
      order="asc"
    />
  );
};

export {
  VoteModerateBlock,
};
