import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';

import { UserAvatar } from '@components/domains/user/UserAvatar';

import { Avatar } from '@components/uiKit/Avatar';
import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { IconIncognito } from '@components/uiKit/Icons';
import { Input } from '@components/uiKit/Input';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type PokerSessionRatingCommentProps = {
  isAnonym: boolean;
  commentRef: React.Ref<HTMLInputElement>
}

const PokerSessionRatingComment = (props: PokerSessionRatingCommentProps): React.ReactElement | null => {
  const {
    isAnonym,
    commentRef,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const renderAvatar = () => {
    if (isAnonym) {
      return (
        <Avatar
          variant="circle"
          dimension="200"
          icon={(
            <IconIncognito />
          )}
          bg="base.a_30"
        />
      );
    }

    return (
      <UserAvatar
        userId={currUserId}
        variant="circle"
        dimension="200"
      />
    );
  };

  return (
    <Box>
      <Text
        fontSize={2}
      >
        {t('pokerSessionStoriesRating.commentText')}
      </Text>
      <Flex
        mt={3}
        justifyContent="space-between"
        gap={3}
      >
        {renderAvatar()}
        <Input
          fullWidth
          inputRef={commentRef}
          name="stories"
          multiline
          rows={3}
          placeholder={
            t('pokerSessionStoriesRating.comment')
          }
          autoFocus
        />
      </Flex>
    </Box>

  );
};

export { PokerSessionRatingComment };
