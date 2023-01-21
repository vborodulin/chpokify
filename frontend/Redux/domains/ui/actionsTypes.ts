export const uiActionsTypes = {
  // is document hidden
  IS_DOCUMENT_HIDDEN_SET: 'ui/isDocumentHidden/set',

  // modal
  MODAL_OPEN: 'ui/modal/open',
  MODAL_HIDE: 'ui/modal/hide',
  MODAL_PARAMS_UPDATE: 'ui/modal/params',
  MODAL_PREVENT_CLOSE_SET: 'ui/modal/preventClose/set',

  // popper
  POPPER_OPEN: 'ui/popper/open',
  POPPER_HIDE: 'ui/popper/hide',
  POPPER_TOGGLE: 'ui/popper/toggle',
  POPPER_HIDE_ALL: 'ui/popper/hide/all',

  // onboarding
  ONBOARDING_SET: 'ui/onboarding/set',

  // side bar
  SIDE_BAR_OPEN: 'ui/sideBar/open',
  SIDE_BAR_CLOSE: 'ui/sideBar/close',

  // space side bar
  SPACE_SIDE_BAR_TOGGLE: 'ui/spaceSideBar/toggle',
  SPACE_SIDE_BAR_CLOSE: 'ui/spaceSideBar/close',
} as const;
