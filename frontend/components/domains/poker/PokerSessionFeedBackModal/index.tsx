import { TEntityID } from '@chpokify/models-types';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { pokerSessionsActions } from '@Redux/domains/pokerSessions/actions';
import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { pokerHelpers } from '@components/domains/poker/helpers';
import {
  PokerSessionFeedBackModalContent,
} from '@components/domains/poker/PokerSessionFeedBackModal/PokerSessionFeedBackModalContent';

import { Button } from '@components/uiKit/Button';
import { ButtonWithTimer } from '@components/uiKit/ButtonWithTimer';
import { Divider } from '@components/uiKit/Divider';
import { Flex } from '@components/uiKit/Flex';
import { IconThumbUpOutline } from '@components/uiKit/Icons';
import { Modal } from '@components/uiKit/Modal';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text } from '@components/uiKit/Text';

import { TRANS } from '@components/utils/types';

type TPokerSessionFeedBackModalProps = {
  onClose: () => void;
  pokerSessionId: TEntityID;
  withBtnRating: boolean
}

const PokerSessionFeedBackModal = (props: TPokerSessionFeedBackModalProps): React.ReactElement | null => {
  const {
    onClose,
    pokerSessionId,
    withBtnRating,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const rating = useSelector(pokerSessionsSelectors.getRating)(pokerSessionId);
  const hasRatingWithoutSkip = useSelector(pokerSessionsSelectors.hasRatingWithoutSkip)(pokerSessionId);
  const ratingWithoutSkip = useSelector(pokerSessionsSelectors.getRatingWithoutSkip)(pokerSessionId);
  const ratingTimeSecond = useSelector(pokerSessionsSelectors.getRatingTime)(pokerSessionId);

  const dateNowSecond = Math.floor(Date.now() / 1000);

  const timerBtn = (ratingTimeSecond && (dateNowSecond - ratingTimeSecond) < 30)
    ? 30 - (dateNowSecond - ratingTimeSecond)
    : 0;

  const onOpenRatingModal = async () => {
    await dispatch(pokerSessionsAsyncActions.openRatingModal(pokerSessionId));
    dispatch(pokerSessionsActions.pokerSessionRatingTimerSet(pokerSessionId));
  };

  const renderRatingStat = () => (
    <Flex
      bg="primary.d_40"
      py={1}
      px={2}
      borderRadius={2}
    >
      <Text
        color="font.primary"
        fontSize={2}
        mr={1}
      >
        {t('spacePokerSessionItem.ratingStat')}
        :
      </Text>
      <Text
        color="font.primary"
        fontSize={2}
        fontWeight={1}
      >
        {
          pokerHelpers.ratingStat(ratingWithoutSkip)
        }
      </Text>
    </Flex>
  );

  return (
    <Modal
      maxWidth="600px"
      onClose={onClose}
    >
      <Flex
        justifyContent="space-between"
        alignItems={['start', 'center']}
        flexDirection={['column', 'row']}
        mb={4}
      >
        <PaperHeader
          mb={0}
        >
          {t('pokerSessionStoriesRating.title')}
        </PaperHeader>
        {
          hasRatingWithoutSkip && renderRatingStat()
        }
      </Flex>

      <PaperContent>
        <PokerSessionFeedBackModalContent
          pokerSessionId={pokerSessionId}
          ratingList={rating as []}
        />
      </PaperContent>

      {
        withBtnRating
        && (
          <>
            <Divider
              mt={5}
            />
            <PaperFooter>
              <PaperActions>
                <Button
                  onClick={onClose}
                >
                  {t('pokerSessionStoriesRating.closeBtn')}
                </Button>
                <ButtonWithTimer
                  onClick={onOpenRatingModal}
                  StartIcon={IconThumbUpOutline}
                  startId={ratingTimeSecond?.toString() as string}
                  seconds={timerBtn}
                  type="submit"
                  variant="primary"
                  renderTimerTitle={(timer: string) => t('pokerSessionStoriesRating.launchRatingBtnWithTimer', {
                    timer,
                  })}
                >
                  {t('pokerSessionStoriesRating.launchRatingBtn')}
                </ButtonWithTimer>
              </PaperActions>
            </PaperFooter>
          </>
        )
      }
    </Modal>
  );
};

export { PokerSessionFeedBackModal };
