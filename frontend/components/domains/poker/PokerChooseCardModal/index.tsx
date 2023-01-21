import { TEntityID, TTeam } from '@chpokify/models-types';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { pokerSessionsAsyncActions } from '@Redux/domains/pokerSessions/asyncActions';
import { getIsRejectedActionPayload } from '@Redux/helpers/common';
import { useAppDispatch } from '@Redux/hooks';

import { useCurrUserPokerSessionInfo } from '@components/domains/poker/hooks';
import { PokerChooseCards } from '@components/domains/poker/PokerChooseCardModal/PokerChooseCards';
import { Modal } from '@components/domains/shared/Modal';

import { PaperContent } from '@components/uiKit/PaperContent';
import { PaperHeader } from '@components/uiKit/PaperHeader';
import { Text, TTextProps } from '@components/uiKit/Text';

const StyledTitle = styled(Text)<TTextProps>`
  word-break: break-word;
`;

export type TPokerChooseCardsModalProps = {
  pokerSessionId: TEntityID;
  onClose: () => void;
  votingCardId?: string,
  team?: TTeam,
}

const PokerChooseCardsModal = (props: TPokerChooseCardsModalProps): React.ReactElement | null => {
  const {
    pokerSessionId,
    onClose,
    team: teamProps,
    votingCardId: votingCardIdProps,
    ...other
  } = props;

  const modalRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const {
    team,
    votingCardId,
    activeStory,
    pokerSession,
  } = useCurrUserPokerSessionInfo(pokerSessionId);

  const currTeamVoting = team || teamProps;
  const currVotingCardId = votingCardId || votingCardIdProps;

  const handleChooseCard = async (cardId: TEntityID) => {
    if (!pokerSession || (!currTeamVoting) || !activeStory) {
      return;
    }

    const { payload } = await dispatch(pokerSessionsAsyncActions.chooseCard(
      pokerSession._id,
      activeStory._id,
      {
        teamId: currTeamVoting?._id,
        cardId,
      }
    ));

    if (!getIsRejectedActionPayload(payload)) {
      onClose();
    }
  };

  useEffect(() => {
    if ((!currTeamVoting) || !activeStory) {
      onClose();
    }
  }, [JSON.stringify(currTeamVoting), !activeStory]);

  if (!pokerSession || (!currTeamVoting) || !activeStory) {
    return null;
  }

  const renderContent = () => (
    <>
      <PaperHeader>
        <Text
          fontSize={4}
          fontWeight={1}
          color="font.d_20"
          mb={2}
        >
          {currTeamVoting.name}
        </Text>
        <StyledTitle
          forwaredAs="h3"
          fontSize={6}
          fontWeight={1}
        >
          {activeStory.title}
        </StyledTitle>
      </PaperHeader>

      <PaperContent>
        <PokerChooseCards
          cardSetId={pokerSession.cardSetId}
          votingCardId={currVotingCardId}
          onChoose={handleChooseCard}
        />
      </PaperContent>
    </>
  );

  return (
    <Modal
      maxWidth="800px"
      ref={modalRef}
      {...other}
    >
      {
        renderContent()
      }
    </Modal>
  );
};

export {
  PokerChooseCardsModal,
};
