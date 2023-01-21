import { useTranslation } from 'next-i18next';
import React from 'react';

import { Counter } from '@components/uiKit/Counter';
import { Flex, TFlexProps } from '@components/uiKit/Flex';
import { IconExclamationMarkOutline } from '@components/uiKit/Icons';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

export type TStoriesListFilterProps = Partial<TFlexProps> & {
  total:number
};

const StoriesListFilter = (props: TStoriesListFilterProps): React.ReactElement | null => {
  const {
    total,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...other}
    >
      <Flex
        alignItems="center"
      >
        <IconExclamationMarkOutline
          mr={1}
        />

        <Text
          fontSize={2}
          mr={1}
        >
          {t('storiesListFilter.allLabel')}
        </Text>

        <Counter
          count={total}
          textProps={{
            fontSize: 2,
          }}
        />
      </Flex>
    </Flex>
  );
};

export {
  StoriesListFilter,
};
