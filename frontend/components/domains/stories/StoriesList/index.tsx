import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { StoriesListContent } from '@components/domains/stories/StoriesList/StoriesListContent';
import { StoriesListHeader } from '@components/domains/stories/StoriesList/StoriesListHeader';

import { ContentCenter } from '@components/uiKit/ContentCenter';
import { ContentEmpty } from '@components/uiKit/ContentEmpty';

import { TRANS } from '@components/utils/types';

const StoriesList = (): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  const countStoriesList = useSelector(storiesSelectors.getCount);

  if (!countStoriesList) {
    return (
      <ContentCenter>
        <ContentEmpty>
          {t('storiesList.empty')}
        </ContentEmpty>
      </ContentCenter>
    );
  }

  return (
    <>
      <StoriesListHeader />
      <StoriesListContent />
    </>
  );
};

export {
  StoriesList,
};
