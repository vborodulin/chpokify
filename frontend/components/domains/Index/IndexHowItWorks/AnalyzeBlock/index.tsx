import { useTranslation } from 'next-i18next';
import React from 'react';

import { TRANS } from '@components/utils/types';

import { HowItem } from '../HowItem';

const AnalyzeBlock = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <HowItem
      title={t('pages.index.howItWorks.analyzeBlock.title')}
      description={t('pages.index.howItWorks.analyzeBlock.desc')}
      actionTitle={t('pages.index.howItWorks.analyzeBlock.actionTitle')}
      img={{
        src: '/images/chpokify-analyze.png',
        alt: t('pages.index.howItWorks.analyzeBlock.altImg'),
        width: '440px',
        height: '240px',
        layout: 'intrinsic',
      }}
      order="desc"
    />
  );
};

export {
  AnalyzeBlock,
};
