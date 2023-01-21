import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { PageTitle } from '@components/uiKit/PageTitle';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TStoriesListHeaderProps = Partial<TFlexProps>;

const StoriesListHeader = (props: TStoriesListHeaderProps): React.ReactElement | null => {
  const {
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const countStories = useSelector(storiesSelectors.getCount);

  return (
    <Flex
      alignItems="center"
      {...other}
    >
      <PageTitle
        mr={2}
      >
        {t('pages.tasks.title')}
        :
      </PageTitle>

      <Text
        fontSize={[
          6,
          8,
        ]}
        fontWeight={1}
      >
        {countStories}
      </Text>
    </Flex>
  );
};

export {
  StoriesListHeader,
};
