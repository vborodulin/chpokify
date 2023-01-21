import { usersSchemas } from '@chpokify/api-schemas';

// import { transServer } from '@chpokify/i18n';
//
// import { ERROR_CODES, ForbiddenError } from '@core/lib/errors';
import { createHandler } from '@core/middleware/createHandler';
import { TAppRequest, TAppResponse } from '@core/types';

import { TUserDocument, UserModel } from '@models/user';

const getList = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TGetListBodyReq>,
  res: TAppResponse<usersSchemas.TGetListResResp>
) => {
  const { ids } = req.body;
  const users = await UserModel.find({ _id: { $in: ids } });

  const usersProtected = users.map((user) => user.protect());

  res.locals.result = {
    users: usersProtected,
  };
});

const get = createHandler(async (
  req: TAppRequest<{id: string}>,
  res: TAppResponse<usersSchemas.TGetResResp>
) => {
  const user = res.locals.get('user') as TUserDocument;

  res.locals.result = {
    user,
  };
});

const update = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TUpdateBodyReq>,
  res: TAppResponse<usersSchemas.TUpdateResResp>
) => {
  const user = res.locals.get('user') as TUserDocument;

  user.set({ ...req.body });
  await user.save();

  res.locals.result = {
    user,
  };
});

const updatePassword = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TUpdatePasswordBodyReq>,
  res: TAppResponse<usersSchemas.TUpdatePasswordResResp>
) => {
  const user = res.locals.get('user') as TUserDocument;
  const { newPassword } = req.body;

  // const isEqualPasswords = user.validatePassword(password);
  //
  // if (!isEqualPasswords) {
  //   throw new ForbiddenError(ERROR_CODES.WRONG_AUTH, [
  //     {
  //       path: ['body', 'password'],
  //       message: transServer.t('errors.auth.resetPasswordInvalid'),
  //     },
  //   ]);
  // }

  user.set({ password: newPassword });
  await user.save();

  res.locals.result = {
    user,
  };
});

const updateEmail = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TUpdateEmailBodyReq>,
  res: TAppResponse<usersSchemas.TUpdateEmailResResp>
) => {
  const user = res.locals.get('user') as TUserDocument;
  const { email } = req.body;

  user.set({ email });
  await user.save();

  res.locals.result = {
    user,
  };
});

const updateSettings = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TUpdateSettingsBodyReq>,
  res: TAppResponse<usersSchemas.TUpdateSettingsResResp>
) => {
  const user = res.locals.get('user') as TUserDocument;

  user.set({
    settings: req.body,
  });
  await user.save();

  res.locals.result = {
    user,
  };
});

const updateOnboarding = createHandler(async (
  req: TAppRequest<{}, usersSchemas.TUpdateOnboardingBodyReq>,
  res: TAppResponse<usersSchemas.TUpdateOnboardingResResp>
) => {
  const {
    showPokerOnboarding,
    showSpaceOnboarding,
  } = req.body;
  const user = res.locals.get('user') as TUserDocument;

  if (showSpaceOnboarding !== undefined) {
    user.set({
      showSpaceOnboarding,
    });
  }

  if (showPokerOnboarding !== undefined) {
    user.set({
      showPokerOnboarding,
    });
  }

  await user.save();

  res.locals.result = {
    user,
  };
});

export const usersController = {
  get,
  getList,
  update,
  updatePassword,
  updateEmail,
  updateSettings,
  updateOnboarding,
};
