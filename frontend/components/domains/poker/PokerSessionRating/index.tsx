import { TEntityID } from '@chpokify/models-types';
import { TRatingPokerSession } from '@chpokify/models-types/pokerSession';
import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { TAppDispatch } from '@Redux/types';

import {
  PokerSessionRatingContent,
} from '@components/domains/poker/PokerSessionRating/PokerSessionRatingContent';

import { Button } from '@components/uiKit/Button';
import { Modal } from '@components/uiKit/Modal';
import { PaperActions } from '@components/uiKit/PaperActions';
import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperFooter } from '@components/uiKit/PaperFooter';
import { PaperHeader } from '@components/uiKit/PaperHeader';

import { TRANS } from '@components/utils/types';

type TPokerSessionStoriesRatingModalProps = {
  onClose: () => void;
  pokerSessionId: TEntityID;
}

const PokerSessionRating = (props: TPokerSessionStoriesRatingModalProps): React.ReactElement | null => {
  const {
    onClose,
    pokerSessionId,
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const commentRef = useRef<HTMLInputElement>(null);

  const [isAnonym, setIsAnonym] = useState<boolean>(false);
  const [rating, setRating] = useState<number>();

  const dispatch = useDispatch<TAppDispatch>();

  const onSetRatingState = (idx: number) => {
    setRating(idx);
  };

  const disabledBtn = typeof rating === 'number';

  const enhanceData = (skip: boolean): Omit<TRatingPokerSession, 'userId'> | Pick<TRatingPokerSession, 'skip'> => {
    if (skip) {
      return { skip };
    }

    return {
      comment: commentRef?.current?.value,
      result: rating as number,
      isAnonym,
      skip,
    };
  };

  const onSubmit = async (skip = false) => {
    if (!pokerSessionId) return;
    const enhanceRating = enhanceData(skip);

    const { payload } = await dispatch(
      pokerSessionsAsyncActions.setRatingModal(pokerSessionId, { rating: enhanceRating })
    );

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  return (
    <Modal
      onClose={onClose}
    >
      <PaperHeader>
        {t('pokerSessionStoriesRating.title')}
      </PaperHeader>
      <PaperContent>
        <PokerSessionRatingContent
          commentRef={commentRef}
          rating={rating}
          isAnonym={isAnonym}
          setIsAnonym={setIsAnonym}
          setRating={onSetRatingState}
        />
      </PaperContent>
      <PaperFooter>
        <PaperActions>
          <Button
            onClick={() => onSubmit(true)}
          >
            {t('pokerSessionStoriesRating.cancelBtn')}
          </Button>

          <Button
            variant="primary"
            onClick={() => onSubmit()}
            disabled={!disabledBtn}
          >
            {t('pokerSessionStoriesRating.submitBtn')}
          </Button>
        </PaperActions>
      </PaperFooter>

    </Modal>
  );
};

export { PokerSessionRating };
