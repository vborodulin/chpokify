import React from 'react';

import {
  PokerSessionRatingModalContentProps,
} from '@components/domains/poker/PokerSessionRating/PokerSessionRatingContent';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Text, TTextProps } from '@components/uiKit/Text';

import { PokerSessionRatingStatItem } from './PokerSessionRatingStatItem';

type TPokerSessionRatingStat = TBoxProps & Pick<PokerSessionRatingModalContentProps, 'rating' | 'setRating'> & {
  title: string;
  textProps?: Partial<TTextProps>;
  contentProps?: Partial<TTextProps>;
}

export type TRating = {
  img: string,
  imgSelected: string,
  value: number,
  active?: boolean
}

export const ratingState: TRating[] = [
  {
    img: '/images/rating/mad.png',
    imgSelected: '/images/rating/mad-selected.png',
    value: 1,
  },
  {
    img: '/images/rating/sad.png',
    imgSelected: '/images/rating/sad-selected.png',
    value: 2,
  },
  {
    img: '/images/rating/confused.png',
    imgSelected: '/images/rating/confused-selected.png',
    value: 3,
  },
  {
    img: '/images/rating/glad.png',
    imgSelected: '/images/rating/glad-selected.png',
    value: 4,
  },
  {
    img: '/images/rating/happy.png',
    imgSelected: '/images/rating/happy-selected.png',
    value: 5,
  },
];

const PokerSessionRatingStat = (props: TPokerSessionRatingStat): React.ReactElement | null => {
  const {
    rating,
    setRating,
    title,
    textProps,
    contentProps,
    ...other
  } = props;

  return (
    <Box
      {...other}
    >
      <Text
        {...textProps}
      >
        {title}
      </Text>
      <Flex
        {...contentProps}
      >
        {ratingState.map((item) => (
          <PokerSessionRatingStatItem
            key={item.value}
            hasRating={!!rating}
            isActive={item.value === rating}
            setRatingState={() => setRating(item.value)}
            {...item}
          />
        ))}
      </Flex>
    </Box>
  );
};

export { PokerSessionRatingStat };
