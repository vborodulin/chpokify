import {
  retroRelationsSchemas,
  SUCCESS_VOID_RESULT,
  TSuccessVoidResult,
} from '@chpokify/api-schemas';
import { transServer } from '@chpokify/i18n';
import { RetroRelationsService } from '@domains/retroRelations/services';
import { RetroTemplatesService } from '@domains/retroTemplates/services';
import { ObjectID } from 'bson';

import { ERROR_CODES, NotFoundError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { RetroCardModel, TRetroCardDocument } from '@models/retroCard';
import { RetroRelationsModel, TRetroRelationsDocument } from '@models/retroRelations';
import { TRetroTemplateDocument } from '@models/retroTemplate';
import { TSpaceDocument } from '@models/space';

const getListByTemplatesIds = createHandler(async (
  req: TAppRequest<{}, retroRelationsSchemas.TGetListByTemplatesIdsBodyReq>,
  res: TAppResponse<retroRelationsSchemas.TGetListByTemplatesIdsResResp>
) => {
  const { ids } = req.body;

  const objectIdIds = ids.map((id) => new ObjectID(id));

  const retroRelations = await RetroRelationsModel.find({
    templateId: {
      $in: objectIdIds,
    },
  },
  [
    'cardsIds',
    'templateId',
    'columnId',
    'isDeleted',
  ]);

  res.locals.result = {
    retroRelations,
  };
});

const getListByTemplateId = createHandler(async (
  req: TAppRequest<{}>,
  res: TAppResponse<retroRelationsSchemas.TGetListResResp>
) => {
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const retroRelations = await RetroRelationsModel.find({
    templateId: retroTemplate._id,
  },
  [
    'cardsIds',
    'templateId',
    'columnId',
    'isDeleted',
  ]);

  res.locals.result = {
    retroRelations,
  };
});

const createCard = createHandler(async (
  req: TAppRequest<{}, retroRelationsSchemas.TCreateCardBodyReq>,
  res: TAppResponse<retroRelationsSchemas.TCreateCardResResp>
) => {
  const {
    user,
    body,
  } = req;
  const { isTopCreate, title, description } = body;

  const retroRelation = res.locals.get('retroRelation') as TRetroRelationsDocument;
  const space = res.locals.get('space') as TSpaceDocument;

  const retroRelationService = new RetroRelationsService(retroRelation);

  const card = RetroCardModel.createNew({
    title,
    description,
    userId: user._id,
    spaceId: space._id,
  });

  retroRelationService.addCard(card._id, isTopCreate);

  await Promise.all([
    retroRelation.save(),
    card.save(),
  ]);

  res.locals.result = {};
});

const moveCardInColumn = createHandler(async (
  req: TAppRequest<{}, retroRelationsSchemas.TMoveCardInColumnBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    cardId,
    cardStartIdx,
    cardFinishIdx,
  } = req.body;
  const retroRelation = res.locals.get('retroRelation') as TRetroRelationsDocument;

  const retroRelationsService = new RetroRelationsService(retroRelation);

  retroRelationsService.moveCardInColumn(cardId, cardStartIdx, cardFinishIdx);

  await retroRelation.save();

  res.locals.result = SUCCESS_VOID_RESULT;
});

const moveCardBetweenColumns = createHandler(async (
  req: TAppRequest<{}, retroRelationsSchemas.TMoveCardBetweenColumnsBodyReq>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const {
    cardStartIdx,
    cardFinishIdx,
    cardId,
  } = req.body;

  const retroRelationFromColumnStart = res.locals.get('retroRelationFromColumnStart') as
    TRetroRelationsDocument;
  const retroRelationFromColumnFinish = res.locals.get('retroRelationFromColumnFinish') as
    TRetroRelationsDocument;

  RetroRelationsService.moveCardInBetweenColumns(
    retroRelationFromColumnStart,
    retroRelationFromColumnFinish,
    {
      cardId,
      cardStartIdx,
      cardFinishIdx,
    }
  );

  await Promise.all([
    retroRelationFromColumnStart.save(),
    retroRelationFromColumnFinish.save(),
  ]);

  res.locals.result = SUCCESS_VOID_RESULT;
});

const removeCard = createHandler(async (
  req: TAppRequest<{ retroCardId: string }>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const { retroCardId } = req.params;

  const retroRelation = res.locals.get('retroRelation') as TRetroRelationsDocument;
  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;

  const retroRelationsService = new RetroRelationsService(retroRelation);
  retroRelationsService.removeCard(retroCardId);

  await Promise.all([
    retroCard.remove(),
    retroRelation.save(),
  ]);

  res.locals.result = {};
});

const moveCardInActionColumn = createHandler(async (
  req: TAppRequest<{}>,
  res: TAppResponse<TSuccessVoidResult>
) => {
  const retroCard = res.locals.get('retroCard') as TRetroCardDocument;
  const retroTemplate = res.locals.get('retroTemplate') as TRetroTemplateDocument;

  const retroTemplateService = new RetroTemplatesService(retroTemplate);
  const columnAction = retroTemplateService.getActionColumn();

  if (!columnAction) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        path: ['params', 'columnId'],
        message: transServer.t('errors.retroSessionTemplate.column.notFoundAction'),
      },
    ]);
  }

  const retroRelationsFromActionColumn = await RetroRelationsModel.findOne({
    templateId: retroTemplate._id,
    columnId: columnAction._id,
  });

  if (!retroRelationsFromActionColumn) {
    throw new NotFoundError(ERROR_CODES.NOT_FOUND, [
      {
        path: ['params'],
        message: transServer.t('errors.retroRelations.notFound'),
      },
    ]);
  }

  const retroRelationsFromActionColumnService = new RetroRelationsService(retroRelationsFromActionColumn);

  const card = RetroCardModel.createNew({
    title: retroCard.title,
    userId: retroCard.userId,
    spaceId: retroCard.spaceId,
    combinedCards: retroCard.combinedCards,
  });

  retroRelationsFromActionColumnService.addCard(card._id);

  await Promise.all([
    retroRelationsFromActionColumn.save(),
    card.save(),
  ]);

  res.locals.result = {};
});

export const retroRelationsControllers = {
  createCard,
  moveCardInColumn,
  moveCardBetweenColumns,
  removeCard,
  moveCardInActionColumn,
  getListByTemplateId,
  getListByTemplatesIds,
};
