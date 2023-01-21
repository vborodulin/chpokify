import { arrayHelpers, objectHelpers } from '@chpokify/helpers';
import {
  TEntityID, TInviteTokenPayload, TSpace, TSpaceStat,
} from '@chpokify/models-types';
import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';
import { isEqual } from 'lodash';
import { HYDRATE } from 'next-redux-wrapper';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';
import { TAppAction } from '@Redux/types';

type TEntitiesState = Record<string, TSpace | undefined>;

const entitiesInitialState: TEntitiesState = {};

const entitiesReducer = (state: TEntitiesState = entitiesInitialState, action: TAppAction): TEntitiesState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.spaces.entities, state)
        || objectHelpers.isEmptyObject(action.payload.spaces.entities)
      ) {
        return state;
      }

      return update(state, {
        $set: action.payload.spaces.entities,
      });
    }

    case spacesActionsTypes.LIST_GET_FULFILLED:
      return update(state, { $set: arrayHelpers.normalizeArr(action.payload.spaces, '_id') });

    case spacesActionsTypes.GET_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.CREATE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.UPDATE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.UPSERT: {
      const { space } = action.payload;

      if (space.isDeleted) {
        return update(state, { $unset: [space._id.toString()] });
      }

      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.LEAVE_FULFILLED: {
      const [spaceId] = action.meta.args;
      return update(state, { $unset: [spaceId.toString()] });
    }

    case spacesActionsTypes.TEAMS_REMOVE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.TEAMS_CREATE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.TEAMS_UPDATE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.INVITE_ACCEPT_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.PARTICIPANTS_REMOVE_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.PARTICIPANT_UPDATE_TEAMS_FULFILLED: {
      const { space } = action.payload;
      return update(state, { $merge: { [space._id.toString()]: space } });
    }

    case spacesActionsTypes.REMOVE: {
      const { spaceId } = action.payload;
      return update(state, { $unset: [spaceId.toString()] });
    }

    default:
      return state;
  }
};

type TSpaceIdState = TEntityID;

const spaceIdInitialState: TSpaceIdState = '';

const spaceIdReducer = (state: TSpaceIdState = spaceIdInitialState, action: TAppAction): TSpaceIdState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.spaces.spaceId, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.spaces.spaceId,
      });
    }

    case spacesActionsTypes.CURRENT_ID_SET:
      return action.payload.spaceId;
    default:
      return state;
  }
};

type TInviteState = {
  token: string;
  payload: TInviteTokenPayload;
} | null;

const inviteInitialState: TInviteState = null;

const inviteReducer = (
  state: TInviteState = inviteInitialState,
  action: TAppAction
): TInviteState => {
  switch (action.type) {
    case HYDRATE: {
      const { invite } = action.payload.spaces;

      if (isEqual(invite, state) || !invite) {
        return state;
      }

      return update(state, {
        $set: {
          token: invite.token,
          payload: invite.payload,
        },
      });
    }

    case spacesActionsTypes.INVITE_TOKEN_VALIDATE_FULFILLED:
      return {
        token: action.meta.args[0].token,
        payload: action.payload.inviteTokenPayload,
      };
    case spacesActionsTypes.INVITE_TOKEN_CLEAR:
      return inviteInitialState;
    default:
      return state;
  }
};

type TStatState = Record<string, TSpaceStat | undefined>;

const initialStatState: TStatState = {};

const statReducer = (state: TStatState = initialStatState, action: TAppAction): TStatState => {
  switch (action.type) {
    case HYDRATE: {
      if (isEqual(action.payload.spaces.stat, state)) {
        return state;
      }

      return update(state, {
        $set: action.payload.spaces.stat,
      });
    }

    case spacesActionsTypes.STAT_GET_FULFILLED: {
      const spaceId = action.meta.args[0];
      return update(state, { [spaceId]: { $set: action.payload } });
    }

    default:
      return state;
  }
};

const showUpgradePlanOpenReducer = (state: boolean = false, action: TAppAction): boolean => {
  switch (action.type) {
    case spacesActionsTypes.UPGRADE_PRICING_PLAN_OPEN_SET:
      return action.payload.isOpen;
    default:
      return state;
  }
};

export const spacesReducer = combineReducers({
  entities: entitiesReducer,
  spaceId: spaceIdReducer,
  invite: inviteReducer,
  stat: statReducer,
  showUpgradePlanOpen: showUpgradePlanOpenReducer,
});
