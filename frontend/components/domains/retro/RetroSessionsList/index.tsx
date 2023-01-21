import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';

import { RetroSessionsLoadMoreBtn } from '@components/domains/retro/buttons/RetroSessionsLoadMoreBtn';
import { retroHelpers } from '@components/domains/retro/helpers';
import { RetroSessionsItem } from '@components/domains/retro/RetroSessionsList/RetroSessionsItem';

import { Flex } from '@components/uiKit/Flex';
import { Paper } from '@components/uiKit/Paper';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

const RetroSessionsList = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const retroSessionsIds = useSelector(retroSessionsSelectors.getListIdsSortDesk);

  useEffect(() => {
    retroHelpers.clearOldRetroSessionActionsInStorage(retroSessionsIds);
  }, [JSON.stringify(retroSessionsIds)]);

  if (!retroSessionsIds.length) {
    return null;
  }

  return (
    <Paper
      variant="card"
    >
      <PaperHeader>
        {t('pages.retro.sessionsList.title')}
      </PaperHeader>

      <PaperContent>
        {
          retroSessionsIds.map((retroSessionId) => (
            <RetroSessionsItem
              key={retroSessionId.toString()}
              retroSessionId={retroSessionId.toString()}
            />
          ))
         }
        <Flex
          justifyContent="center"
        >
          <RetroSessionsLoadMoreBtn />
        </Flex>
      </PaperContent>
    </Paper>
  );
};

export {
  RetroSessionsList,
};
