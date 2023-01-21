import { SUCCESS_VOID_RESULT } from '@chpokify/api-schemas';
import { retroCardsSchemas } from '@chpokify/api-schemas/retroCardsSchemas';
import { isEqualsId, spaceHelpers } from '@chpokify/helpers';
import { transServer } from '@chpokify/i18n';
import { RetroCardService } from '@domains/retroCards/service';
import { RetroRelationsService } from '@domains/retroRelations/services';
import { ObjectID } from 'bson';

import {
  BadRequestError, ERROR_CODES, ForbiddenError, NotFoundError,
} from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { RetroCardModel, TRetroCardDocument } from '@models/retroCard';
import { RetroRelationsModel } from '@models/retroRelations';
import { TRetroSessionDocument } from '@models/retroSession';
import { SPACE_PARTICIPANT_ROLE, TSpaceDocument } from '@models/space';

const getList = createHandler(async (
  req: TAppRequest<{}, retroCardsSchemas.TGetListBodyReq>,
  res: TAppResponse<retroCardsSchemas.TGetListResResp>
) => {
  const { ids } = req.body;
  const space = res.locals.get('space') as TSpaceDocument;

  const objectIdIds = ids.map((id) => new ObjectID(id));

  const retroCards = await RetroCardModel.find({
    _id: {
      $in: objectIdIds,
    },
    spaceId: space._id,
  });

  res.locals.result = {
    retroCards,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, retroCardsSchemas.TUpdateBodyReq>,
  res: TAppResponse<retroCardsSchemas.TUpdateResResp>
) => {
  const {
    user,
    body,
  } = req;

  const { combinedCardsTitles, combinedCardsDescriptions, ...other } = body;

  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;
  const space = res.locals.get('space') as TSpaceDocument;

  const cardService = new RetroCardService(retroCard);

  const roleInSpace = spaceHelpers.getParticipantRole(space, user._id);

  if (!isEqualsId(user._id, retroCard.userId)
    && SPACE_PARTICIPANT_ROLE.ADMIN > roleInSpace
  ) {
    throw new ForbiddenError(ERROR_CODES.INVALID_PERMISSIONS, [
      {
        message: transServer.t('errors.forbidden'),
        path: ['params', 'retroCardId'],
      },
    ]);
  }

  if (combinedCardsDescriptions) {
    cardService.updateDescriptionsCombinedCards(combinedCardsDescriptions);
  }

  if (combinedCardsTitles) {
    cardService.updateTitlesCombinedCards(combinedCardsTitles);
    cardService.removeCardsCombined(combinedCardsTitles.length);
  }

  retroCard.set(other);

  await retroCard.save();

  res.locals.result = {
    retroCard,
  };
});

const addVote = createHandler(async (
  req: TAppRequest<{}, retroCardsSchemas.TAddVoteBodyReq>,
  res: TAppResponse<retroCardsSchemas.TAddVoteResResp>
) => {
  const { voteId } = req.body;
  const { user } = req;

  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;
  const retroSession = res.locals.get('retroSession') as TRetroSessionDocument;

  const retroCardService = new RetroCardService(retroCard);

  const countVotesByUserId = retroCardService.getCountVotesByUserId(user._id);

  if (countVotesByUserId >= retroSession.maxVotesCard) {
    throw new BadRequestError(ERROR_CODES.BROKEN_DATA, [
      {
        path: ['body', 'voteId'],
        message: transServer.t('errors.retroCard.invalidMaxVotes', {
          maxVotes: retroSession.maxVotesCard,
        }),
      },
    ]);
  }

  retroCardService.addVote(voteId);

  await retroCard.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const removeVote = createHandler(async (
  req: TAppRequest<{ voteId: string }>,
  res: TAppResponse<retroCardsSchemas.TRemoveVoteResResp>
) => {
  const { voteId } = req.params;

  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;

  const retroCardService = new RetroCardService(retroCard);

  retroCardService.removeVote(voteId);

  await retroCard.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const combineCard = createHandler(async (
  req: TAppRequest<{}, retroCardsSchemas.TCombineCardBodyReq>,
  res: TAppResponse<retroCardsSchemas.TCombineCardResResp>
) => {
  const {
    cardId,
    columnId,
  } = req.body;

  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;
  const retroSession = res.locals.get('retroSession') as TRetroSessionDocument;

  const retroRelation = await RetroRelationsModel.findOne({
    templateId: retroSession.templateId,
    columnId,
  });

  if (!retroRelation) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroRelations.notFound'),
        path: ['body', 'columnId'],
      },
    ]);
  }

  const retroCardMoving = await RetroCardModel.findById(
    cardId,
    ['isCompleted', 'title', 'description', 'spaceId', 'userId', 'votes', 'combinedCards']
  );

  if (!retroCardMoving) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        message: transServer.t('errors.retroCard.notFound'),
        path: ['body', 'cardId'],
      },
    ]);
  }

  const retroCardService = new RetroCardService(retroCard);
  const retroRelationService = new RetroRelationsService(retroRelation);

  retroCardService.combineCard(retroCardMoving);

  retroRelationService.removeCard(cardId);

  await Promise.all([
    retroCard.save(),
    retroRelation.save(),
    RetroCardModel.deleteOne({ _id: cardId }),
  ]);

  res.locals.result = SUCCESS_VOID_RESULT;
});

export const retroCardsControllers = {
  getList,
  update,
  addVote,
  removeVote,
  combineCard,
};
