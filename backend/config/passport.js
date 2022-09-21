require('dotenv').config();

const passport = require('passport');
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = new PrismaClient();

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
            errors: [
              {
                username: 'User not found',
              },
            ],
          });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return cb(null, false, {
            errors: [
              {
                password: 'Wrong password.',
              },
            ],
          });
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
