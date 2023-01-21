import { useTranslation } from 'next-i18next';
import React from 'react';

import { TRANS } from '@components/utils/types';

import { HowItem } from '../HowItem';

const RegisterBlock = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <HowItem
      title={t('pages.index.howItWorks.registerBlock.title')}
      description={t('pages.index.howItWorks.registerBlock.desc')}
      actionTitle={t('pages.index.howItWorks.registerBlock.actionTitle')}
      img={{
        src: '/images/chpokify-dashboard.png',
        alt: t('pages.index.howItWorks.registerBlock.altImg'),
        width: '440px',
        height: '225px',
        layout: 'intrinsic',
      }}
      order="asc"
    />
  );
};

export {
  RegisterBlock,
};
