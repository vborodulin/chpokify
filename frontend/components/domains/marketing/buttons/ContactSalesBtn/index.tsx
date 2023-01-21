import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button, TButtonProps } from '@components/uiKit/Button';

import { TRANS } from '@components/utils/types';

import { support } from '@lib/support';

export type TContactSalesBtnProps = Partial<TButtonProps>;

const ContactSalesBtn = (props: TContactSalesBtnProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const handleOpenSupport = () => {
    support.openEmailModal();
  };

  return (
    <Button
      variant="outline"
      onClick={handleOpenSupport}
      {...other}
    >
      {t('contactSalesBtn.title')}
    </Button>
  );
};

export {
  ContactSalesBtn,
};
