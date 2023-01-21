import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { retroSessionRepoSelectors } from '@Redux/domains/retroSessionsRepo/selectors';

import { Box } from '@components/uiKit/Box';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TRetroStatsProps = Partial<TGridProps> & {
  retroSessionId: string
}

const RetroStats = (props: TRetroStatsProps): React.ReactElement | null => {
  const {
    retroSessionId,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const countPeople = useSelector(retroSessionRepoSelectors.getCountPeopleByRetroSessionId)(retroSessionId);
  const countCardsFromActionColumn = useSelector(
    retroSessionRepoSelectors.getCountCardsFromActionColumnByRetroSessionId
  )(retroSessionId);
  const countCards = useSelector(retroSessionRepoSelectors.getCountCardsByRetroSessionId)(retroSessionId);

  const renderStatItem = (name: string, value: number) => (
    <Box>
      <Text
        fontSize={3}
        fontWeight={1}
        textAlign={['left', 'right']}
      >
        {value}
      </Text>

      <Text
        fontSize={1}
        textAlign={['left', 'right']}
        color="font.d_20"
      >
        {name}
      </Text>
    </Box>
  );

  return (
    <Grid
      gridAutoFlow="column"
      justifyContent={['flex-start', 'flex-end']}
      gridGap={6}
      width={['100%', 'auto']}
      {...other}
    >
      {
        renderStatItem(t('pages.retro.retroItem.cards'), countCards)
      }
      {
        renderStatItem(t('pages.retro.retroItem.people'), countPeople)
      }
      {
        renderStatItem(t('pages.retro.retroItem.actions'), countCardsFromActionColumn)
      }
    </Grid>
  );
};

export {
  RetroStats,
};
