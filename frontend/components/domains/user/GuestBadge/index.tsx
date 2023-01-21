import { useTranslation } from 'next-i18next';
import React from 'react';

import { Badge, TBadgeProps } from '@components/uiKit/Badge';

import { TRANS } from '@components/utils/types';

export type TYouLabelProps = Partial<TBadgeProps>;

const GuestBadge = (props: TYouLabelProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Badge
      bg="base.a_60"
      color="font.invert"
      {...props}
    >
      {t('labels.guest')}
    </Badge>
  );
};

export {
  GuestBadge,
};
