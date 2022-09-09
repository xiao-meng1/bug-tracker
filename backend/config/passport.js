require('dotenv').config();

const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');

const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const prisma = new PrismaClient();

const cookieExtractor = function (req) {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    async (username, password, cb) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          return cb(null, false, {
            message: 'User not found.',
          });
        }

        const validate = password === user.password;

        if (!validate) {
          return cb(null, false, { message: 'Wrong Password' });
        }

        return cb(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async (token, cb) => {
      try {
        return cb(null, token.user);
      } catch (error) {
        cb(error);
      }
    }
  )
);
