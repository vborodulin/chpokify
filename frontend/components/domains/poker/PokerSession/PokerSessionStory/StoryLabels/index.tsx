import { useTranslation } from 'next-i18next';
import React from 'react';

import { Caption } from '@components/uiKit/Caption';
import { Flex, TFlexProps } from '@components/uiKit/Flex';

import { TRANS } from '@components/utils/types';

export type TStoryLabelsProps = Partial<TFlexProps>;

const StoryLabels = (props: TStoryLabelsProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      justifyContent="space-between"
      mb={2}
      {...props}
    >
      <Caption
        textAlign="start"
      >
        {t('pokerSession.currentTaskLabel')}
      </Caption>

      <Caption
        textAlign="end"
      >
        {t('pokerSession.taskScoreLabel')}
      </Caption>
    </Flex>
  );
};

export {
  StoryLabels,
};
