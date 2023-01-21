import { combineReducers } from '@reduxjs/toolkit';
import update from 'immutability-helper';

import { uiActionsTypes } from '@Redux/domains/ui/actionsTypes';
import { uiTypes } from '@Redux/domains/ui/types';
import { TAppAction } from '@Redux/types';

import { SIDE_BAR_TYPE } from '@components/domains/layouts/SideBar/types';
import { ONBOARDING_TYPE } from '@components/domains/marketing/types';

type TModalState = {
  type: uiTypes.MODAL_TYPES,
  params: uiTypes.TModalParams
} | null;

const modalReducer = (state: TModalState = null, action: TAppAction): TModalState => {
  switch (action.type) {
    case uiActionsTypes.MODAL_OPEN:
      return {
        type: action.payload.type,
        params: action.payload.params,
      };

    case uiActionsTypes.MODAL_PARAMS_UPDATE:
      if (state) {
        return update(state, {
          params: { $merge: action.payload.params },
        });
      }

      return state;
    case uiActionsTypes.MODAL_HIDE:
      return null;
    default:
      return state;
  }
};

const preventCloseModalReducer = (state: boolean = false, action: TAppAction): boolean => {
  switch (action.type) {
    case uiActionsTypes.MODAL_PREVENT_CLOSE_SET:
      return action.payload.preventClose;
    default:
      return state;
  }
};

type TPopperState = Record<string, boolean | undefined>;

const initialPopperState: TPopperState = {};

const popperReducer = (state: TPopperState = initialPopperState, action: TAppAction): TPopperState => {
  switch (action.type) {
    case uiActionsTypes.POPPER_OPEN:
      return {
        ...state,
        [action.payload.popperId]: true,
      };
    case uiActionsTypes.POPPER_HIDE:
      return {
        ...state,
        [action.payload.popperId]: false,
      };
    case uiActionsTypes.POPPER_TOGGLE:
      return {
        ...state,
        [action.payload.popperId]: !state[action.payload.popperId],
      };
    case uiActionsTypes.POPPER_HIDE_ALL:
      return initialPopperState;
    default:
      return state;
  }
};

export type TOnboardingState = {
  type: ONBOARDING_TYPE
} | null;

const initialOnboardState: TOnboardingState = null;

const onboardingReducer = (state: TOnboardingState = initialOnboardState, action: TAppAction): TOnboardingState => {
  switch (action.type) {
    case uiActionsTypes.ONBOARDING_SET:
      return update(state, {
        $set: action.payload.onboarding,
      });
    default:
      return state;
  }
};

export type TIsDocumentHiddenState = boolean;

const isDocumentHiddenInitialState: TIsDocumentHiddenState = false;

const isDocumentHiddenReducer = (state: TIsDocumentHiddenState = isDocumentHiddenInitialState, action: TAppAction) => {
  switch (action.type) {
    case uiActionsTypes.IS_DOCUMENT_HIDDEN_SET:
      return action.payload.isDocumentHidden;
    default:
      return state;
  }
};

export type TSideBarIdState = {
  type: SIDE_BAR_TYPE
} | null;

const initialSideBarState = null;

const sideBarReducer = (state: TSideBarIdState = initialSideBarState, action: TAppAction): TSideBarIdState => {
  switch (action.type) {
    case uiActionsTypes.SIDE_BAR_OPEN:
      return {
        type: action.payload.type,
      };
    case uiActionsTypes.SIDE_BAR_CLOSE:
      return initialSideBarState;
    default:
      return state;
  }
};

const isSpaceSideBarOpenReducer = (state: boolean = false, action: TAppAction): boolean => {
  switch (action.type) {
    case uiActionsTypes.SPACE_SIDE_BAR_TOGGLE:
      return !state;
    case uiActionsTypes.SPACE_SIDE_BAR_CLOSE:
      return false;
    default:
      return state;
  }
};

export const uiReducer = combineReducers({
  isDocumentHidden: isDocumentHiddenReducer,
  modal: modalReducer,
  preventCloseModal: preventCloseModalReducer,
  popper: popperReducer,
  onboarding: onboardingReducer,
  sideBar: sideBarReducer,
  isSpaceSideBarOpen: isSpaceSideBarOpenReducer,
});
