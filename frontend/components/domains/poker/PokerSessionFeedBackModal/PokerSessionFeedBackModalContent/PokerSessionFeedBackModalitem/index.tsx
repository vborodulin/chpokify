import { TEntityID } from '@chpokify/models-types';
import { TRatingPokerSession } from '@chpokify/models-types/pokerSession';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { usersSelectors } from '@Redux/domains/users/selectors';

import {
  ratingState,
  TRating,
} from '@components/domains/poker/PokerSessionRating/PokerSessionRatingContent/PokerSessionRatingStat';
import { GuestBadge } from '@components/domains/user/GuestBadge';
import { YouBadge } from '@components/domains/user/YouBadge';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { IconIncognito } from '@components/uiKit/Icons';
import { Image } from '@components/uiKit/Image';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type PokerSessionFeedBackModalItemProps = {
  rating: TRatingPokerSession;
  pokerSessionId: TEntityID;
}
const Item = styled(Box)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  display: flex;
  justify-content: space-between;
  margin-bottom:12px;
  min-height: 64px;
  position: relative;
 `;

const PokerSessionFeedBackModalItem = (props: PokerSessionFeedBackModalItemProps): React.ReactElement | null => {
  const {
    rating,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const user = useSelector(usersSelectors.getById)(rating.userId);
  const currUsername = useSelector(authSelectors.getCurrUsername);

  const renderRatingImg = () => {
    if (!rating.result) {
      return (
        <Image
          src="/images/rating/skip.png"
          alt="rating"
          width="48px"
          height="48px"
          layout="intrinsic"
          mr={3}
        />
      );
    }

    const findRes = ratingState.find((el) => el.value === rating.result) as TRating;

    return (
      <Image
        src={findRes.img}
        alt="rating"
        width="48px"
        height="48px"
        layout="intrinsic"
        mr={3}
      />
    );
  };

  const renderUserName = () => (
    <Flex
      alignItems="center"
    >
      {rating.isAnonym
        ? (
          <>
            <IconIncognito
              fill="font.d_20"
              width="16px"
              height="16px"
            />
            <Text
              ml={1}
              fontSize={2}
              fontWeight={1}
              color="font.d_20"
            >
              {t('pokerSessionFeedbackRating.anonymous')}
            </Text>
          </>
        )
        : (
          <>
            <Text
              fontSize={2}
              fontWeight={1}
            >
              {user.username}
            </Text>
            {
              rating.skip && (
                <Text
                  fontSize={2}
                  ml={1}
                >
                  {t('pokerSessionFeedbackRating.skipped')}
                </Text>
              )
            }

          </>

        )}
      {
        user.username === currUsername
        && (
          <YouBadge
            ml={1}
          />
        )
      }
      {
        user.isGuest
        && (
          <GuestBadge
            ml={1}
          />
        )
      }
    </Flex>
  );

  const renderRatingContent = () => (
    <>
      {renderRatingImg()}
      <Box>
        {renderUserName()}
        <Text
          fontSize={2}
        >
          {rating.comment}
        </Text>
      </Box>
    </>
  );

  return (
    <Item
      p={3}
    >
      <Flex
        alignItems="center"
      >
        {renderRatingContent()}
      </Flex>
    </Item>
  );
};

export { PokerSessionFeedBackModalItem };
