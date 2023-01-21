import { kanbanBoardIdColumnIdTasksIdsSchemas } from '@chpokify/api-schemas';
import { arrayHelpers, isEqualsId } from '@chpokify/helpers';
import { TEntityID, TKanbanBoardIdColumnIdTasksIds } from '@chpokify/models-types';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { TAppAction } from '@Redux/types';

import { kanbanBoardRelationActionsTypes } from './actionsTypes';

type TEntitiesState = Record<string, TKanbanBoardIdColumnIdTasksIds | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state: TEntitiesState = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.kanbanBoardRelations.entities, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.kanbanBoardRelations.entities,
      });
    }

    case kanbanBoardRelationActionsTypes.GET_LIST_FULFILLED:
      return update(state, { $set: arrayHelpers.normalizeArr(action.payload.boardRelations, '_id') });

    case kanbanBoardRelationActionsTypes.CREATE_TASK_FULFILLED: {
      const { boardRelations } = action.payload;
      return update(state, { [boardRelations._id.toString()]: { $set: boardRelations } });
    }

    case kanbanBoardRelationActionsTypes.REMOVE_TASK_FULFILLED: {
      const { boardRelations } = action.payload;
      return update(state, { [boardRelations._id.toString()]: { $set: boardRelations } });
    }

    case kanbanBoardRelationActionsTypes.MOVE_TASK_BETWEEN_COLUMNS_PENDING: {
      const [{
        columnStartId,
        columnFinishId,
        taskStartIdx,
        taskFinishIdx,
        taskId,
      }] = action.payload.args.slice(2) as
          [kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBetweenColumnsBodyReq];

      const arrState = Object.values(state) as TKanbanBoardIdColumnIdTasksIds[];

      const stateFromColumnStartId = arrState.find((el) => isEqualsId(el.columnId, columnStartId));
      const stateFromColumnFinishId = arrState.find((el) => isEqualsId(el.columnId, columnFinishId));

      if (!stateFromColumnStartId || !stateFromColumnFinishId) {
        return state;
      }

      const tasksIdsFromColumnStart = stateFromColumnStartId.tasksIds;
      const tasksIdsFromColumnFinish = stateFromColumnFinishId.tasksIds;

      if (!tasksIdsFromColumnStart || !tasksIdsFromColumnFinish) {
        return state;
      }

      const startTaskIds = Array.from(tasksIdsFromColumnStart);
      startTaskIds.splice(taskStartIdx, 1);

      const finishTaskIds = Array.from(tasksIdsFromColumnFinish);
      finishTaskIds.splice(taskFinishIdx, 0, taskId);

      return update(state, {
        [stateFromColumnStartId._id.toString()]: {
          tasksIds: { $set: startTaskIds },
        },
        [stateFromColumnFinishId._id.toString()]: {
          tasksIds: { $set: finishTaskIds },
        },
      });
    }

    case kanbanBoardRelationActionsTypes.MOVE_TASK_IN_COLUMN_PENDING: {
      const [
        columnId, {
          taskStartIdx,
          taskFinishIdx,
          taskId,
        }] = action.payload.args.slice(2) as
              [TEntityID, kanbanBoardIdColumnIdTasksIdsSchemas.TMoveTaskBodyReq];

      if (!columnId) {
        return state;
      }

      const arrState = Object.values(state) as TKanbanBoardIdColumnIdTasksIds[];

      const findRow = arrState.find((el) => isEqualsId(el.columnId, columnId));

      if (!findRow) {
        return state;
      }

      const _id = findRow._id.toString();
      const tasksIds = state[_id]?.tasksIds;

      if (!tasksIds) {
        return state;
      }

      const newTaskIds = Array.from(tasksIds);
      newTaskIds.splice(taskStartIdx, 1);
      newTaskIds.splice(taskFinishIdx, 0, taskId);

      return update(state, {
        [_id]: {
          tasksIds: { $set: newTaskIds },
        },
      });
    }

    default:
      return state;
  }
};

export const kanbanBoardRelationsReducer = combineReducers({
  entities: entitiesReducer,
});
