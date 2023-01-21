import { TEntityID, TSpace, } from '@chpokify/models-types';

import { spacesActionsTypes } from '@Redux/domains/spaces/actionsTypes';

const showUpgradePlanOverlay = (isOpen: boolean) => ({
  type: spacesActionsTypes.UPGRADE_PRICING_PLAN_OPEN_SET,
  payload: {
    isOpen,
  },
}) as const;

const setCurrId = (spaceId: TEntityID) => ({
  type: spacesActionsTypes.CURRENT_ID_SET,
  payload: {
    spaceId,
  },
}) as const;

const upsert = (space: TSpace) => ({
  type: spacesActionsTypes.UPSERT,
  payload: {
    space,
  },
}) as const;

const remove = (spaceId: TEntityID) => ({
  type: spacesActionsTypes.REMOVE,
  payload: {
    spaceId,
  },
}) as const;

const inviteTokenClear = () => ({
  type: spacesActionsTypes.INVITE_TOKEN_CLEAR,
  payload: {},
}) as const;

export const spacesActions = {
  setCurrId,
  showUpgradePlanOverlay,
  upsert,
  remove,
  inviteTokenClear,
};
