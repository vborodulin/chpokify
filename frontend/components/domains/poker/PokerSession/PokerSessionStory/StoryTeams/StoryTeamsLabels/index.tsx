import { useTranslation } from 'next-i18next';
import React from 'react';

import { Caption } from '@components/uiKit/Caption';
import { Flex, TFlexProps } from '@components/uiKit/Flex';

import { TRANS } from '@components/utils/types';

export type TStoryTeamsLabelsProps = Partial<TFlexProps>;

const StoryTeamsLabels = (props: TStoryTeamsLabelsProps): React.ReactElement | null => {
  const { t } = useTranslation(TRANS.MAIN);

  return (
    <Flex
      justifyContent="space-between"
      {...props}
    >
      <Caption
        textAlign="start"
      >
        {t('pokerSession.teamsLabel')}
      </Caption>

      <Caption
        textAlign="start"
      >
        {t('pokerSession.teamsScoresLabel')}
      </Caption>
    </Flex>
  );
};

export {
  StoryTeamsLabels,
};
