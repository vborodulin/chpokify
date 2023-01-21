import { useTranslation } from 'next-i18next';
import React from 'react';

import { SwitcherWithText } from '@components/uiKit/SwitcherWithText';

import { TRANS } from '@components/utils/types';

import { PokerSessionRatingComment } from './PokerSessionComment';
import { PokerSessionRatingStat } from './PokerSessionRatingStat';

export type PokerSessionRatingModalContentProps = {
  isAnonym: boolean;
  setIsAnonym: (flag: boolean) => void;
  setRating: (idx: number) => void;
  rating: number | undefined,
  commentRef: React.Ref<HTMLInputElement>
}

const PokerSessionRatingContent = (props: PokerSessionRatingModalContentProps): React.ReactElement | null => {
  const {
    isAnonym,
    setIsAnonym,
    rating,
    setRating,
    commentRef,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const onHandleSetIsAnonym = () => {
    setIsAnonym(!isAnonym);
  };

  return (
    <>
      <SwitcherWithText
        onClickBox={onHandleSetIsAnonym}
        id="rate-anonym"
        name="rateAnonym"
        checked={isAnonym}
        textCss={{
          color: 'font.primary',
        }}
        title={t('pokerSessionStoriesRating.switcher')}
      />
      <PokerSessionRatingStat
        my={6}
        rating={rating}
        setRating={setRating}
        title={t('pokerSessionStoriesRating.ratingText')}
        textProps={{
          fontSize: 2,
        }}
        contentProps={{
          mt: 3,
          justifyContent: 'space-between',
        }}
      />
      <PokerSessionRatingComment
        isAnonym={isAnonym}
        commentRef={commentRef}
      />
    </>
  );
};

export { PokerSessionRatingContent };
