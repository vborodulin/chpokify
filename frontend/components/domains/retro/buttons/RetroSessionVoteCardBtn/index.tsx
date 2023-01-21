import { useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { retroSessionsSelectors } from '@Redux/domains/retroSessions/selectors';
import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box } from '@components/uiKit/Box';
import { Button, TButtonProps } from '@components/uiKit/Button';
import { IconThumbUpOutline } from '@components/uiKit/Icons';
import { Tooltip } from '@components/uiKit/Tooltip';
import { TooltipTitle } from '@components/uiKit/TooltipTitle';

import { Popper, POPPER_MODE } from '@components/utils/Popper';
import { popperTooltipOptions } from '@components/utils/Popper/options/tooltip';
import { TRANS } from '@components/utils/types';

export type TRetroSessionVoteCardBtnProps = TButtonProps & {
  cardId: string;
  countVotes: number;
  canVote: boolean;
  hasMyVotes: boolean;
};

const HEIGHT_BTN = '28px';

const RetroSessionVoteCardBtn = (props: TRetroSessionVoteCardBtnProps): React.ReactElement | null => {
  const {
    cardId,
    countVotes,
    canVote,
    hasMyVotes,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const currUserId = useSelector(authSelectors.getCurrUserId);
  const retroCard = useSelector(retroSessionsCardsSelectors.getById)(cardId);
  const retroSessionId = useSelector(retroSessionsSelectors.getCurrId);
  const isHiddenVoteCountCards = useSelector(retroSessionsSelectors.getIsHiddenVoteCountCards);

  const [targetElement, setTargetElement] = useState<any>();

  const popperIdRef = useRef(`retroSessionCardVoteBtn-${shortid()}`);

  const btnVariant = hasMyVotes ? 'base' : 'secondary';

  const renderTooltip = () => {
    if (canVote) {
      return null;
    }

    return (
      <Popper
        id={popperIdRef.current}
        targetElement={targetElement}
        mode={POPPER_MODE.HOVER}
        options={{
          ...popperTooltipOptions,
          placement: 'right',
        }}
      >
        <Tooltip>
          <TooltipTitle>
            {
              t('pages.retro.votesCard.limitTooltip')
            }
          </TooltipTitle>
        </Tooltip>
      </Popper>
    );
  };

  const renderTxtBtn = () => {
    if (isHiddenVoteCountCards && hasMyVotes) {
      return null;
    }

    if (countVotes && !isHiddenVoteCountCards) {
      return countVotes;
    }

    return t('pages.retro.votesCard.voteBtn');
  };

  const onSubmit = async () => {
    if (!retroCard || !currUserId || !canVote) {
      return;
    }

    await dispatch(
      retroSessionsCardsAsyncActions.addVote(currSpaceId, retroCard._id, {
        voteId: currUserId,
        retroSessionId,
      })
    );
  };

  if (!retroCard) {
    return null;
  }

  return (
    <Box
      ref={setTargetElement}
    >
      <Button
        variant={btnVariant}
        disabled={!canVote}
        height={HEIGHT_BTN}
        onClick={onSubmit}
        startIcon={(
          <IconThumbUpOutline
            width="16px"
            height="16px"
            mr={1}
          />
        )}
        textProps={{
          fontSize: 1,
        }}
        {...other}
      >
        {
          renderTxtBtn()
        }
      </Button>
      {renderTooltip()}
    </Box>
  );
};

export {
  RetroSessionVoteCardBtn,
};
