import { dateHelpers } from '@chpokify/helpers';
import { pokerSessionHelpers } from '@chpokify/helpers/pokerSession';
import { TPokerSession } from '@chpokify/models-types/pokerSession';
import { routing } from '@chpokify/routing';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';

import { pokerHelpers } from '@components/domains/poker/helpers';
import {
  PokerSessionMenuWithBtn,
  TPokerSessionMenuWithBtnProps,
} from '@components/domains/poker/PokerSessionMenuWithBtn';

import { Box } from '@components/uiKit/Box';
import { Grid, TGridProps } from '@components/uiKit/Grid';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

import { stylesMixins } from '@styles';

const Title = styled(Text)`
  ${stylesMixins.textLinesEllipsis(2)}
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StylesPokerSessionMenuWithBtn = styled(PokerSessionMenuWithBtn)<TPokerSessionMenuWithBtnProps>`
  position: absolute;
  right: ${({ theme }) => theme.space[3]};
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

const Root = styled(Grid)<TGridProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  cursor: pointer;
  min-height: 64px;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.base.a_20};
  }
`;

export type TSessionListItemProps = Partial<TGridProps> & {
  pokerSession: TPokerSession;
};

const SessionListItem = (props: TSessionListItemProps): React.ReactElement | null => {
  const {
    pokerSession,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const pokerSessionId = pokerSession._id;
  const pokerCardDeckId = pokerSession.cardSetId;

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const duration = useSelector(pokerSessionsSelectors.getDurationInSec)(pokerSessionId);
  const hasRatingWithoutSkip = useSelector(pokerSessionsSelectors.hasRatingWithoutSkip)(pokerSessionId);
  const ratingWithoutSkip = useSelector(pokerSessionsSelectors.getRatingWithoutSkip)(pokerSessionId);
  const pokerCardDeckTitle = useSelector(pokerCardDecksSelectors.getTitleCardDeck)(pokerCardDeckId);
  const canModerate = useSelector(spacesSelectors.getCanModerate)(
    pokerSession.spaceId,
    currUserId
  );
  return (
    <Link
      href={routing.getPokerSessionUrlTemplate()}
      // @ts-ignore
      as={routing.getPokerUrl(pokerSession?.spaceId, pokerSession._id)}
    >
      <Root
        gridAutoFlow={['row', 'column']}
        gridColumnGap={6}
        gridRowGap={3}
        alignItems={['start', 'center']}
        p={3}
        pr={canModerate ? 16 : undefined}
        {...other}
      >
        <Box
          flexGrow={1}
        >
          <Text
            fontSize={3}
            fontWeight={1}
            ellipses
            mb={1}
          >
            {pokerSessionHelpers.getTitle(pokerSession)}
          </Text>

          <Box>
            <Text
              as="span"
              fontSize={1}
              color="font.d_20"
            >
              {dateHelpers.formatAppointmentDateTime(new Date(pokerSession?.createdAt || ''))}
            </Text>
          </Box>
        </Box>

        <Grid
          gridAutoFlow="column"
          justifyContent={['flex-start', 'flex-end']}
          gridGap={6}
          width={['100%', 'auto']}
        >
          <Box>
            <Text
              fontSize={3}
              fontWeight={1}
              textAlign={['left', 'right']}
            >
              {dateHelpers.formatSeconds(duration)}
            </Text>
            <Text
              fontSize={1}
              textAlign={['left', 'right']}
              color="font.d_20"
            >
              {t('spacePokerSessionItem.timeStat')}
            </Text>
          </Box>
          <Box
            display={['none', 'block']}
          >
            <Title
              fontSize={3}
              fontWeight={1}
              textAlign={['left', 'right']}
            >
              {pokerCardDeckTitle}
            </Title>
            <Text
              fontSize={1}
              textAlign={['left', 'right']}
              color="font.d_20"
            >
              {t('spacePokerSessionItem.cardDeck')}
            </Text>
          </Box>
          {
            hasRatingWithoutSkip
            && (
              <Box
                display={['none', 'block']}
              >
                <Text
                  fontSize={3}
                  fontWeight={1}
                  textAlign={['left', 'right']}
                >
                  {
                    pokerHelpers.ratingStat(ratingWithoutSkip)
                  }
                </Text>

                <Text
                  fontSize={1}
                  textAlign={['left', 'right']}
                  color="font.d_20"
                >
                  {t('spacePokerSessionItem.ratingStat')}
                </Text>
              </Box>
            )
          }

          <Box>
            <Text
              fontSize={3}
              fontWeight={1}
              textAlign={['left', 'right']}
            >
              {pokerSession.storiesIds.length}
            </Text>

            <Text
              fontSize={1}
              textAlign={['left', 'right']}
              color="font.d_20"
            >
              {t('spacePokerSessionItem.storiesStat')}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize={3}
              fontWeight={1}
              textAlign={['left', 'right']}
            >
              {
                pokerHelpers.getScoresView(pokerSessionHelpers.getSessionScores(pokerSession))
              }
            </Text>

            <Text
              fontSize={1}
              textAlign={['left', 'right']}
              color="font.d_20"
            >
              {t('spacePokerSessionItem.scoresStat')}
            </Text>
          </Box>
        </Grid>

        {
          canModerate && (
            <StylesPokerSessionMenuWithBtn
              pokerSessionId={pokerSession._id}
              menuProps={{
                hasTeamsItem: true,
                hasFeedbackItem: true,
                hasRemoveItem: true,
              }}
            />
          )
        }
      </Root>
    </Link>
  );
};

export {
  SessionListItem,
};
