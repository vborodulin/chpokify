import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { omit } from 'lodash';

import { TRetroCardDocument } from '@models/retroCard';

class RetroCardService {
  public constructor(private retroCard: TRetroCardDocument) {
  }

  public updateDescriptionsCombinedCards(combinedCardsDescriptions: string[]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [idx, card] of this.retroCard.combinedCards.entries()) {
      if (combinedCardsDescriptions[idx]) {
        card.description = combinedCardsDescriptions[idx];
      } else {
        card.description = '';
      }
    }

    this.retroCard.markModified('combinedCards');
  }

  public updateTitlesCombinedCards(combinedCardsTitle: string[]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [idx, title] of combinedCardsTitle.entries()) {
      if (this.retroCard.combinedCards[idx]) {
        this.retroCard.combinedCards[idx].title = title;
      }
    }

    this.retroCard.markModified('combinedCards');
  }

  public removeCardsCombined(count: number) {
    this.retroCard.combinedCards.splice(count);
    this.retroCard.markModified('combinedCards');
  }

  public combineCard(card: TRetroCardDocument) {
    this.retroCard.votes.push(...card.votes);
    this.retroCard.combinedCards.push(omit(card, ['combinedCards']));

    if (card.combinedCards.length) {
      this.retroCard.combinedCards.push(...card.combinedCards);
    }
  }

  public addVote(voteId: TEntityID) {
    this.retroCard.votes.push(voteId);
    this.retroCard.markModified('votes');
  }

  public getCountVotesByUserId(userId: TEntityID) {
    const countVotes = this.retroCard.votes.filter(
      (voteIdLocal) => isEqualsId(voteIdLocal, userId)
    );
    return countVotes.length;
  }

  public removeVote(voteId: TEntityID) {
    const findId = this.retroCard.votes.indexOf(voteId.toString());

    if (findId !== -1) {
      this.retroCard.votes.splice(findId, 1);
      this.retroCard.markModified('votes');
    }
  }

  public static removeVotes(cards: TRetroCardDocument[]) {
    // eslint-disable-next-line no-restricted-syntax
    for (const card of cards) {
      card.votes = [];
    }

    return cards;
  }
}

export {
  RetroCardService,
};
