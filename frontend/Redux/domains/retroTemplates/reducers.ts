import { retroTemplateSchemas } from '@chpokify/api-schemas';
import { arrayHelpers, isEqualsId } from '@chpokify/helpers';
import { TEntityID } from '@chpokify/models-types';
import { TRetroTemplate } from '@chpokify/models-types/retroSession';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { retroTemplatesActionsTypes } from '@Redux/domains/retroTemplates/actionTypes';
import { TAppAction } from '@Redux/types';

type TEntitiesState = Record<string, TRetroTemplate | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.retroTemplates.entities, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.retroTemplates.entities,
      });
    }

    case retroTemplatesActionsTypes.UPSERT:
    case retroTemplatesActionsTypes.CREATE_COLUMN_FULFILLED:
    case retroTemplatesActionsTypes.UPDATE_COLUMN_FULFILLED:
    case retroTemplatesActionsTypes.REMOVE_COLUMN_FULFILLED:
    case retroTemplatesActionsTypes.GET_FULFILLED:
      return update(state, {
        [action.payload.retroTemplate._id.toString()]: { $set: action.payload.retroTemplate },
      });

    case retroTemplatesActionsTypes.MOVE_COLUMN_PENDING: {
      const [
        templateId,
        {
          columnId,
          columnStartIdx,
          columnFinishIdx,
        }] = action.payload.args.slice(1) as
        [TEntityID, retroTemplateSchemas.TMoveColumnBodyReq];

      if (!templateId) {
        return state;
      }

      const templateIdStr = templateId.toString();
      const template = state[templateIdStr];

      if (!template) {
        return state;
      }

      const { columns } = template;
      const findColumn = columns.find((column) => isEqualsId(column._id, columnId));

      if (!findColumn) {
        return state;
      }

      const newColumns = Array.from(columns);
      newColumns.splice(columnStartIdx, 1);
      newColumns.splice(columnFinishIdx, 0, findColumn);

      return update(state, {
        [templateIdStr]: {
          columns: { $set: newColumns },
        },
      });
    }

    case retroTemplatesActionsTypes.GET_LIST_FULFILLED: {
      const { retroTemplates } = action.payload;
      return update(state, { $set: arrayHelpers.normalizeArr(retroTemplates, '_id') });
    }

    default:
      return state;
  }
};

type TRetroTemplateIdState = string;

const retroTemplateIdInitialState: TRetroTemplateIdState = '';

const retroTemplateIdReducer = (
  state: TRetroTemplateIdState = retroTemplateIdInitialState,
  action: TAppAction
): TRetroTemplateIdState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.retroTemplates.retroTemplateId, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.retroTemplates.retroTemplateId,
      });
    }

    case retroTemplatesActionsTypes.CURRENT_ID_SET:
      return action.payload.retroTemplateId;
    default:
      return state;
  }
};

export const retroTemplatesReducer = combineReducers({
  entities: entitiesReducer,
  retroTemplateId: retroTemplateIdReducer,
});
