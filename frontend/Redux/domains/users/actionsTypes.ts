export const usersActionsTypes = {
  // update
  UPSERT: 'users/upsert',

  UPDATE_PENDING: 'users/update/pending',
  UPDATE_FULFILLED: 'users/update/fulfilled',
  UPDATE_REJECTED: 'users/update/rejected',

  // update password
  UPDATE_PASSWORD_PENDING: 'users/update/password/pending',
  UPDATE_PASSWORD_FULFILLED: 'users/update/password/fulfilled',
  UPDATE_PASSWORD_REJECTED: 'users/update/password/rejected',

  // update email
  UPDATE_EMAIL_PENDING: 'users/update/email/pending',
  UPDATE_EMAIL_FULFILLED: 'users/update/email/fulfilled',
  UPDATE_EMAIL_REJECTED: 'users/update/email/rejected',

  // update settings
  UPDATE_SETTINGS_PENDING: 'users/update/settings/pending',
  UPDATE_SETTINGS_FULFILLED: 'users/update/settings/fulfilled',
  UPDATE_SETTINGS_REJECTED: 'users/update/settings/rejected',

  // update onboarding
  UPDATE_ONBOARDING_PENDING: 'users/update/onboarding/pending',
  UPDATE_ONBOARDING_FULFILLED: 'users/update/onboarding/fulfilled',
  UPDATE_ONBOARDING_REJECTED: 'users/update/onboarding/rejected',

  // users in space
  LIST_GET_PENDING: 'users/list/get/pending',
  LIST_GET_FULFILLED: 'users/list/get/fulfilled',
  LIST_GET_REJECTED: 'users/list/get/rejected',
} as const;
