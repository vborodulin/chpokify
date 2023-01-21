import { dateHelpers } from '@chpokify/helpers';
import { TSpaceStat } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { SpaceStatItem } from '@components/domains/space/SpaceStatisctics/SpaceStatItem';

import { Grid } from '@components/uiKit/Grid';
import { Paper, TPaperProps } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TPaperProps> & {
  stat: TSpaceStat | undefined
};

const Layout = (props: TLayoutProps): React.ReactElement | null => {
  const {
    stat = {
      sessionsCount: 0,
      storiesCount: 0,
      sessionAverageTime: 0,
      storyAverageTime: 0,
    },
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Paper
      variant="card"
      {...other}
    >
      <PaperHeader>
        {t('spaceStatistics.title')}
      </PaperHeader>

      <PaperContent>
        <Grid
          gridGap={3}
          gridTemplateColumns={[
            '1fr 1fr',
            null,
            null,
            '1fr 1fr 1fr 1fr',
          ]}
        >
          <SpaceStatItem
            title={t('spaceStatistics.sessionLabel')}
            value={(stat.sessionsCount || 0).toString()}
          />

          <SpaceStatItem
            title={t('spaceStatistics.storiesLabel')}
            value={(stat.storiesCount || 0).toString()}
          />

          <SpaceStatItem
            title={t('spaceStatistics.sessionAverageLabel')}
            value={dateHelpers.formatSeconds((stat.sessionAverageTime || 0))}
          />

          <SpaceStatItem
            title={t('spaceStatistics.storyAverageLabel')}
            value={dateHelpers.formatSeconds((stat.storyAverageTime || 0))}
          />
        </Grid>
      </PaperContent>
    </Paper>
  );
};

export {
  Layout,
};
