import { uiActionsTypes } from '@Redux/domains/ui/actionsTypes';
import { TOnboardingState } from '@Redux/domains/ui/reducers';
import { uiTypes } from '@Redux/domains/ui/types';

import { SIDE_BAR_TYPE } from '@components/domains/layouts/SideBar/types';

// is document hidden
const isDocumentHiddenSet = (isDocumentHidden: boolean) => ({
  type: uiActionsTypes.IS_DOCUMENT_HIDDEN_SET,
  payload: {
    isDocumentHidden,
  },
}) as const;

// modal
const modalOpen = (type: uiTypes.MODAL_TYPES, params: uiTypes.TModalParams = {}) => ({
  type: uiActionsTypes.MODAL_OPEN,
  payload: {
    type,
    params,
  },
} as const);

const modalHide = () => ({
  type: uiActionsTypes.MODAL_HIDE,
  payload: {},
}) as const;

const modalUpdateParams = (params: Record<string, any>) => ({
  type: uiActionsTypes.MODAL_PARAMS_UPDATE,
  payload: {
    params,
  },
}) as const;

const modalPreventCloseSet = (preventClose: boolean) => ({
  type: uiActionsTypes.MODAL_PREVENT_CLOSE_SET,
  payload: {
    preventClose,
  },
}) as const;

// popper
const popperOpen = (popperId: string) => ({
  type: uiActionsTypes.POPPER_OPEN,
  payload: { popperId },
}) as const;

const popperHide = (popperId: string) => ({
  type: uiActionsTypes.POPPER_HIDE,
  payload: { popperId },
}) as const;

const popperHideAll = () => ({
  type: uiActionsTypes.POPPER_HIDE_ALL,
  payload: {},
}) as const;

const popperToggle = (popperId: string) => ({
  type: uiActionsTypes.POPPER_TOGGLE,
  payload: { popperId },
}) as const;

// onboarding
const onboardingSet = (onboarding: TOnboardingState) => ({
  type: uiActionsTypes.ONBOARDING_SET,
  payload: {
    onboarding,
  },
}) as const;

// story side bar
const sideBarOpen = (payload: { type: SIDE_BAR_TYPE }) => ({
  type: uiActionsTypes.SIDE_BAR_OPEN,
  payload,
}) as const;

const sideBarClose = () => ({
  type: uiActionsTypes.SIDE_BAR_CLOSE,
  payload: {},
}) as const;

// space side bar
const spaceSideBarToggle = () => ({
  type: uiActionsTypes.SPACE_SIDE_BAR_TOGGLE,
  payload: {},
}) as const;

const spaceSideBarClose = () => ({
  type: uiActionsTypes.SPACE_SIDE_BAR_CLOSE,
  payload: {},
}) as const;

export const uiActions = {
  modalOpen,
  modalHide,
  modalUpdateParams,
  modalPreventCloseSet,
  onboardingSet,
  isDocumentHiddenSet,
  sideBarOpen,
  sideBarClose,
  spaceSideBarToggle,
  spaceSideBarClose,
  popperOpen,
  popperHide,
  popperHideAll,
  popperToggle,
};
