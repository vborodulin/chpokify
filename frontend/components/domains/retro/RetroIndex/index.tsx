import { useTranslation } from 'next-i18next';
import React from 'react';

import { RetroSessionCreate } from '@components/domains/retro/RetroSessionCreate';
import { RetroSessionsList } from '@components/domains/retro/RetroSessionsList';
import { Participants } from '@components/domains/space/Participants';
import { Teams } from '@components/domains/space/Teams';

import { Grid } from '@components/uiKit/Grid';
import { PageTitle } from '@components/uiKit/PageTitle';

import { TRANS } from '@components/utils/types';

const RetroIndex = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);
  return (
    <>
      <PageTitle>
        {t('pages.retro.title')}
      </PageTitle>
      <Grid
        gridTemplateColumns={['1fr', null, '1.4fr 1fr']}
        gridGap={6}
        alignItems="flex-start"
      >
        <Grid
          gridGap={5}
        >
          <RetroSessionCreate />
          <RetroSessionsList />

        </Grid>

        <Grid
          gridGap={6}
        >
          <Teams />
          <Participants />
        </Grid>
      </Grid>
    </>
  );
};

export {
  RetroIndex,
};
