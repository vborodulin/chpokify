import { isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { flatten } from 'lodash';

import { RetroRelationsModel, TRetroRelationsDocument } from '@models/retroRelations';
import { TRetroTemplateDocument } from '@models/retroTemplate';

class RetroRelationsService {
  public constructor(private retroRelations: TRetroRelationsDocument) {
  }

  public addCard(cardId: TEntityID, isTopCreate?: boolean) {
    if (isTopCreate) {
      this.retroRelations.cardsIds.unshift(cardId);
    } else {
      this.retroRelations.cardsIds.push(cardId);
    }

    this.retroRelations.markModified('cardsIds');
  }

  public removeCard(cardId: TEntityID) {
    this.retroRelations.cardsIds = this.retroRelations.cardsIds.filter(
      (taskId) => !isEqualsId(taskId, cardId)
    );
    this.retroRelations.markModified('cardsIds');
  }

  public static async createRelationsFromColumns(retroTemplate: TRetroTemplateDocument) {
    if (!retroTemplate.columns.length) {
      return;
    }

    const promisesArr: Array<Promise<TRetroRelationsDocument>> = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const column of retroTemplate.columns) {
      const createNewRelations = RetroRelationsModel.createNew({
        templateId: retroTemplate._id,
        columnId: column._id,
      });
      promisesArr.push(createNewRelations.save());
    }

    await Promise.all(promisesArr);
  }

  public static getCardsIdsFromRelations(retroRelations: TRetroRelationsDocument[]): TEntityID[] {
    return flatten(retroRelations.map((retroRelation) => retroRelation.cardsIds));
  }

  public moveCardInColumn(
    cardId: TEntityID,
    cardStartIdx: number,
    cardFinishIdx: number
  ) {
    const cardsIds = Array.from(this.retroRelations.cardsIds);

    cardsIds.splice(cardStartIdx, 1);
    cardsIds.splice(cardFinishIdx, 0, cardId);

    this.retroRelations.set({ cardsIds });
  }

  public static moveCardInBetweenColumns(
    retroRelationsFromColumnStart: TRetroRelationsDocument,
    retroRelationsFromColumnFinish: TRetroRelationsDocument,
    data: { cardStartIdx: number, cardFinishIdx: number, cardId: string }
  ) {
    const {
      cardStartIdx,
      cardFinishIdx,
      cardId,
    } = data;

    const startCardIds = Array.from(retroRelationsFromColumnStart.cardsIds);
    startCardIds.splice(cardStartIdx, 1);

    const finishCardIds = Array.from(retroRelationsFromColumnFinish.cardsIds);
    finishCardIds.splice(cardFinishIdx, 0, cardId);

    retroRelationsFromColumnStart.set({ cardsIds: startCardIds });
    retroRelationsFromColumnFinish.set({ cardsIds: finishCardIds });
  }
}

export { RetroRelationsService };
