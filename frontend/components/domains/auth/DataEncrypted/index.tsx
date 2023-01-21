import { useTranslation } from 'next-i18next';
import React from 'react';

import { Grid, TGridProps } from '@components/uiKit/Grid';
import { IconShieldLock } from '@components/uiKit/Icons/ShieldLock';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TDataEncryptedProps = Partial<TGridProps>;

const DataEncrypted = (props: TDataEncryptedProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Grid
      gridGap={1}
      gridTemplateColumns="auto auto"
      alignItems="center"
      justifyContent="center"
      {...other}
    >
      <IconShieldLock />

      <Text
        as="span"
        fontSize={1}
      >
        {t('dataEncrypted.description')}
      </Text>
    </Grid>
  );
};

export {
  DataEncrypted,
};
