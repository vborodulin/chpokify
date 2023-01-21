import { isEqualsId } from '@chpokify/helpers';
import { TEntityID, TUserProtected } from '@chpokify/models-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { authSelectors } from '@Redux/domains/auth/selectors';
import { pokerCardDecksSelectors } from '@Redux/domains/pokerCardDecks/selectors';
import { pokerSessionsSelectors } from '@Redux/domains/pokerSessions/selectors';

import { ClientError } from '@lib/errors';
import { log } from '@lib/logger';

import { Layout } from './Layout';

export type TPokerUserCardProps = {
  user: TUserProtected;
  storyId: TEntityID;
  teamId: TEntityID;
  pokerSessionId: TEntityID;
  isTeamVoting: boolean;
  cardSetId?: TEntityID;
};

const PokerUserCard = (props: TPokerUserCardProps): React.ReactElement | null => {
  const {
    user,
    storyId,
    teamId,
    pokerSessionId,
    isTeamVoting,
    cardSetId,
  } = props;

  const currUserId = useSelector(authSelectors.getCurrUserId);

  const inSession = useSelector(pokerSessionsSelectors.getIsUserInSession)(
    pokerSessionId,
    user._id
  );

  const userStoryResultCardId = useSelector(pokerSessionsSelectors.getUserStoryResultCardId)(
    storyId,
    teamId,
    user._id
  );

  const userStoryVotingCardId = useSelector(pokerSessionsSelectors.getUserStoryVotingCardId)(
    storyId,
    teamId,
    user._id
  );

  const cardId = isTeamVoting ? userStoryVotingCardId : userStoryResultCardId;
  const cardSet = useSelector(pokerCardDecksSelectors.getCardDeckById)(cardSetId);

  if (!cardSet) {
    log.error(new ClientError(`cardSet not found for id:${cardSetId}`));
    return null;
  }

  const card = cardSet?.cards.find((el) => isEqualsId(el._id, cardId));

  return (
    <Layout
      isMe={isEqualsId(currUserId, user._id)}
      card={card}
      username={user.username}
      inSession={inSession}
      isTeamVoting={isTeamVoting}
    />
  );
};

export {
  PokerUserCard,
};
