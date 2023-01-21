import { TEntityID, TRetroRelations, TRetroTemplate } from '@chpokify/models-types';

import { retroSessionsRelationsActionsTypes } from '@Redux/domains/retroSessionsRelations/actionsTypes';
import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';

const setCurrId = (retroTemplateId: string) => ({
  type: retroTemplatesActionsTypes.CURRENT_ID_SET,
  payload: {
    retroTemplateId,
  },
}) as const;

const upsert = (retroTemplate: TRetroTemplate) => ({
  type: retroTemplatesActionsTypes.UPSERT,
  payload: {
    retroTemplate,
  },
}) as const;

const retroTemplatesActions = {
  setCurrId,
  upsert,
};

export {
  retroTemplatesActions,
};
