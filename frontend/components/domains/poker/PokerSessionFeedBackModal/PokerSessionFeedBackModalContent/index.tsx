import { arrayHelpers } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { TRatingPokerSession } from '@chpokify/models-types/pokerSession';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { PokerSessionFeedBackModalItem } from './PokerSessionFeedBackModalitem';

type PokerSessionFeedBackModalContentProps = {
  ratingList: TRatingPokerSession[];
  pokerSessionId: TEntityID;
}

const PokerSessionFeedBackModalContent = (props: PokerSessionFeedBackModalContentProps): React.ReactElement | null => {
  const { ratingList, pokerSessionId } = props;

  const { t } = useTranslation(TRANS.MAIN);

  if (arrayHelpers.isEmptyArr(ratingList)) {
    return (
      <>
        <Text
          fontSize={2}
        >
          {`${t('pokerSessionStoriesRating.emptyFeedBackTxt')}`}
        </Text>
        <Text
          fontSize={2}
        >
          {`${t('pokerSessionStoriesRating.infoTxt')}`}
        </Text>
      </>

    );
  }

  return (
    <>
      {ratingList.map((rating) => (
        <PokerSessionFeedBackModalItem
          key={rating.userId.toString()}
          pokerSessionId={pokerSessionId}
          rating={rating}
        />
      ))}
    </>
  );
};

export { PokerSessionFeedBackModalContent };
