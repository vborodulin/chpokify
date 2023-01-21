import { createSelector } from '@reduxjs/toolkit';

import { TAppState } from '@Redux/types';

import { ONBOARDING_TYPE } from '@components/domains/marketing/types';

/**
 * root
 */

const getUi = ({ ui }: TAppState) => ui;

/**
 * direct
 */

const getModal = createSelector(
  getUi,
  (ui) => ui.modal
);

const getPreventCloseModal = createSelector(
  getUi,
  (ui) => ui.preventCloseModal
);

const getPopperIsOpen = createSelector(
  getUi,
  (ui) => (popperId: string) => !!ui.popper[popperId]
);

const getPoppersList = createSelector(
  getUi,
  (ui) => Object.keys(ui.popper)
);

const getHasAnyPoppersOpen = createSelector(
  [
    getPoppersList,
    getPopperIsOpen,
  ],
  (poppersList, getPopperIsOpenSelector) => {
    if (!poppersList.length) {
      return false;
    }

    return poppersList.some((popper) => getPopperIsOpenSelector(popper));
  }
);

const getOnboarding = createSelector(
  getUi,
  (ui) => ui.onboarding
);

const getIsDocumentHidden = createSelector(
  getUi,
  (ui) => ui.isDocumentHidden
);

const getSideBar = createSelector(
  getUi,
  (ui) => ui.sideBar
);

const getIsSpaceSideBarOpen = createSelector(
  getUi,
  (ui) => ui.isSpaceSideBarOpen
);

// complex
const getIsSpaceOnboardingOpen = createSelector(
  getOnboarding,
  (onboarding) => onboarding?.type === ONBOARDING_TYPE.SPACE
);

export const uiSelectors = {
  getModal,
  getPreventCloseModal,
  getPopperIsOpen,
  getOnboarding,
  getIsDocumentHidden,
  getIsSpaceOnboardingOpen,
  getSideBar,
  getIsSpaceSideBarOpen,
  getPoppersList,
  getHasAnyPoppersOpen,
};
