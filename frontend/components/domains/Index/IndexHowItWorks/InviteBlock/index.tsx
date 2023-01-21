import { useTranslation } from 'next-i18next';
import React from 'react';

import { TRANS } from '@components/utils/types';

import { HowItem } from '../HowItem';

const InviteBlock = () => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <HowItem
      title={t('pages.index.howItWorks.inviteBlock.title')}
      description={t('pages.index.howItWorks.inviteBlock.desc')}
      actionTitle={t('pages.index.howItWorks.inviteBlock.actionTitle')}
      img={{
        src: '/images/chpokify-invite-people.png',
        alt: t('pages.index.howItWorks.inviteBlock.altImg'),
        width: '440px',
        height: '560px',
        layout: 'intrinsic',
      }}
      order="desc"
    />
  );
};

export {
  InviteBlock,
};
