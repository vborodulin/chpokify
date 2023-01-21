import { TEntityID } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { retroSessionsCardsAsyncActions } from '@Redux/domains/retroSessionsCards/asyncActions';
import { retroSessionsCardsSelectors } from '@Redux/domains/retroSessionsCards/selectors';
import { spacesSelectors } from '@Redux/domains/spaces/selectors';
import { useAppDispatch } from '@Redux/hooks';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { IconCross } from '@components/uiKit/Icons';

const RootVote = styled(Box)<TBoxProps>`
  background-color: ${({ theme }) => theme.colors.baseInvert.normal};
  border-radius: 50%;
  display:flex;
  height: 16px;
  width:16px;

  &:hover{
    cursor:pointer
  };

  & .vote-result__remove-icon{
      display:none;
  }

  &:hover .vote-result__remove-icon{
      display: inline-block;
   }
`;

type TVoteResultProps = TBoxProps & {
  cardId: string;
  voteId: TEntityID;
}

const VoteResult = (props: TVoteResultProps): React.ReactElement | null => {
  const {
    cardId,
    voteId,
    ...other
  } = props;

  const dispatch = useAppDispatch();

  const currSpaceId = useSelector(spacesSelectors.getCurrSpaceId);
  const retroCard = useSelector(retroSessionsCardsSelectors.getById)(cardId);

  const handleClick = async () => {
    if (!retroCard) {
      return;
    }

    await dispatch(
      retroSessionsCardsAsyncActions.removeVote(currSpaceId, retroCard._id, voteId)
    );
  };

  return (
    <RootVote
      onClick={handleClick}
      {...other}
    >
      <IconCross
        width="16px"
        height="16px"
        fill="font.invert"
        className="vote-result__remove-icon"
      />
    </RootVote>
  );
};

export {
  VoteResult,
};
