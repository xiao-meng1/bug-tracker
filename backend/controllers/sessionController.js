require('dotenv').config();

const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.login = function (req, res, next) {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    console.log(info);
    if (!user) {
      return res.status(400).json(info);
    }

    try {
      req.login(user, { session: false }, (error) => {
        if (error) {
          return next(err);
        }

        const filteredUser = Object.keys(user)
          .filter((key) => key !== 'password')
          .reduce((obj, key) => {
            obj[key] = user[key];
            return obj;
          }, {});
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET);

        return res.json({ token, user: filteredUser });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
