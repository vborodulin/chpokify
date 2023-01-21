import { pokerSessionHelpers } from '@chpokify/helpers/pokerSession';
import { TPokerSession } from '@chpokify/models-types/pokerSession';
import { routing } from '@chpokify/routing';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { storiesSelectors } from '@Redux/domains/stories/selectors';

import { Box } from '@components/uiKit/Box';
import { Flex } from '@components/uiKit/Flex';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

export type TStoriesListItemProps = {
  storyId: string;
  userName: string
};

const RootLinkMixin = css`
 cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.d_40};
  }
`;

const Root = styled(Grid)<TGridProps & { isLink: boolean }>`

 ${({ isLink }) => (isLink && RootLinkMixin)};
 
`;

const StoresListItem = (props: TStoriesListItemProps): React.ReactElement | null => {
  const {
    storyId,
    userName,
    ...other
  } = props;

  const story = useSelector(storiesSelectors.getById)(storyId);
  const pokerSession = useSelector(pokerSessionsSelectors.getByStoryId)(storyId) as TPokerSession;

  const score = pokerSessionHelpers.getStoryScores(pokerSession, storyId);

  if (!story) {
    return null;
  }

  const renderItem = (isLink: boolean) => (
    <Root
      gridTemplateColumns="1fr 1fr"
      alignItems="flex-end"
      px={6}
      py={4}
      role="button"
      isLink={isLink}
      {...other}
    >
      <Flex
        flexDirection="column"
      >
        <Text
          fontSize={2}
          fontWeight={1}
          lineHeight="20px"
          mb={1}
        >
          {story.title}
        </Text>

        <Box>

          <Text
            as="span"
            fontSize={2}
            color="font.d_20"
          >
            #
            {story.id}
          </Text>

          <Text
            as="span"
            fontSize={2}
            color="font.d_20"
          >
            {'created '}
            {formatDistanceToNow(
              new Date(story?.createdAt as string),
              { addSuffix: true }
            )}
            {` by ${userName}`}
          </Text>
        </Box>
      </Flex>

      <Flex
        flexDirection="column"
        alignItems="flex-end"
      >
        {score && (
          <Flex>
            <Text
              fontSize={2}
              color="font.d_20"
              mr={1}
            >
              Score
            </Text>
            <Text
              fontSize={2}
              fontWeight={1}
            >
              {score}
            </Text>
          </Flex>
        )}
        <Text
          as="span"
          fontSize={2}
          color="font.d_20"
        >
          {'updated '}
          {formatDistanceToNow(
            new Date(story?.updatedAt as string),
            { addSuffix: true }
          )}
        </Text>
      </Flex>
      <Grid />
    </Root>
  );

  const renderContent = () => {
    if (pokerSession) {
      return (
        <Link
          href={routing.getPokerSessionUrlTemplate()}
          // @ts-ignore
          as={routing.getPokerUrl(pokerSession.spaceId, pokerSession._id)}
        >
          {renderItem(true)}
        </Link>
      );
    }

    return renderItem(false);
  };

  return renderContent();
};

export {
  StoresListItem,
};
