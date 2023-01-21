import { useTranslation } from 'next-i18next';
import React from 'react';

import { TRANS } from '@components/utils/types';

import { HowItem } from '../HowItem';

const StartSessionBlock = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <HowItem
      title={t('pages.index.howItWorks.startSessionBlock.title')}
      description={t('pages.index.howItWorks.startSessionBlock.desc')}
      actionTitle={t('pages.index.howItWorks.startSessionBlock.actionTitle')}
      img={{
        src: '/images/chpokify-start-session.png',
        alt: t('pages.index.howItWorks.startSessionBlock.altImg'),
        width: '420px',
        height: '600px',
        layout: 'intrinsic',
      }}
      order="desc"
    />
  );
};

export {
  StartSessionBlock,
};
