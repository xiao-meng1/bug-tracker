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

        const body = { id: user.id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

        res.cookie('jwt', token, { httpOnly: true });
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
