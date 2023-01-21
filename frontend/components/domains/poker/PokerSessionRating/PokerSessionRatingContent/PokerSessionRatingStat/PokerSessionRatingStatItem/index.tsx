import React from 'react';
import styled, { css } from 'styled-components';

import { TRating } from '@components/domains/poker/PokerSessionRating/PokerSessionRatingContent/PokerSessionRatingStat';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { Image } from '@components/uiKit/Image';

type TPokerSessionRatingStatItem = TRating & {
  setRatingState: () => void
  hasRating:boolean
  isActive:boolean
}
type TRootProps = Partial<TBoxProps> & {
  isActive: boolean;
  hasRating: boolean;
};
const activeOpacity = css`
opacity:1;
`;
const nonOpacity = css`
 opacity:0.4;
`;

const Root = styled(Box)<TRootProps>`
align-items: center;
display: flex;
justify-content: center;

overflow: hidden;
position: relative;

${({ hasRating }) => (hasRating && nonOpacity)};
${({ isActive }) => (isActive && activeOpacity)};


&:hover {
cursor:pointer;
}
`;

const PokerSessionRatingStatItem = (props: TPokerSessionRatingStatItem): React.ReactElement | null => {
  const {
    img,
    imgSelected,
    setRatingState,
    isActive,
    hasRating,
  } = props;

  return (
    <Root
      onClick={setRatingState}
      isActive={isActive}
      hasRating={hasRating}
    >
      <Image
        src={isActive ? imgSelected : img}
        alt="rating"
        width="48px"
        height="48px"
        layout="intrinsic"
      />
    </Root>
  );
};

export { PokerSessionRatingStatItem };
