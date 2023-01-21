import { kanbanBoardSchemas } from '@chpokify/api-schemas';
import { arrayHelpers, isEqualsId } from '@chpokify/helpers';
import { TEntityID, TKanbanBoard } from '@chpokify/models-types';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { TAppAction } from '@Redux/types';

import { kanbanBoardActionsTypes } from './actionsTypes';

type TEntitiesState = Record<string, TKanbanBoard | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state: TEntitiesState = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.kanbanBoards.entities, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.kanbanBoards.entities,
      });
    }

    case kanbanBoardActionsTypes.GET_LIST_FULFILLED: {
      return update(state, { $set: arrayHelpers.normalizeArr(action.payload.boards, '_id') });
    }

    case kanbanBoardActionsTypes.GET_FULFILLED: {
      const { board } = action.payload;
      return update(state, { [board._id.toString()]: { $set: board } });
    }

    case kanbanBoardActionsTypes.CREATE_FULFILLED: {
      const { board } = action.payload;
      return update(state, { $merge: { [board._id.toString()]: board } });
    }

    case kanbanBoardActionsTypes.UPDATE_FULFILLED: {
      const { board } = action.payload;
      return update(state, { [board._id.toString()]: { $set: board } });
    }

    case kanbanBoardActionsTypes.REMOVE_FULFILLED: {
      const { boardId } = action.payload;
      return update(state, { $unset: [boardId.toString()] });
    }

    case kanbanBoardActionsTypes.MOVE_COLUMN_PENDING: {
      const [
        boardId,
        {
          columnId,
          columnStartIdx,
          columnFinishIdx,
        }] = action.payload.args.slice(1) as
        [TEntityID, kanbanBoardSchemas.TMoveColumnBodyReq];

      if (!boardId) {
        return state;
      }

      const boardIdStr = boardId.toString();
      const board = state[boardIdStr];

      if (!board) {
        return state;
      }

      const { columns } = board;
      const findColumn = columns.find((column) => isEqualsId(column._id, columnId));

      if (!findColumn) {
        return state;
      }

      const newColumns = Array.from(columns);
      newColumns.splice(columnStartIdx, 1);
      newColumns.splice(columnFinishIdx, 0, findColumn);

      return update(state, {
        [boardIdStr]: {
          columns: { $set: newColumns },
        },
      });
    }

    case kanbanBoardActionsTypes.CREATE_COLUMN_FULFILLED:
    case kanbanBoardActionsTypes.UPDATE_COLUMN_FULFILLED:
    case kanbanBoardActionsTypes.REMOVE_COLUMN_FULFILLED:
      return update(state, { $set: { [action.payload.board._id.toString()]: action.payload.board } });

    default:
      return state;
  }
};

type TBoardIdState = TEntityID;

const boardIdInitialState: TBoardIdState = '';

const boardIdReducer = (state: TBoardIdState = boardIdInitialState, action: TAppAction): TBoardIdState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.kanbanBoards.boardId, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.kanbanBoards.boardId,
      });
    }

    case kanbanBoardActionsTypes.CURRENT_ID_SET:
      return action.payload.boardId;
    default:
      return state;
  }
};

export const kanbanBoardsReducer = combineReducers({
  entities: entitiesReducer,
  boardId: boardIdReducer,
});
