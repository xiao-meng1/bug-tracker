require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

require('./config/passport');

const userRouter = require('./routes/userRouter');
const issueRouter = require('./routes/issueRouter');
const sessionRouter = require('./routes/sessionRouter');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

app.use('/session', sessionRouter);
app.use('/users', userRouter);
app.use(
  '/issues',
  passport.authenticate('jwt', { session: false }),
  issueRouter
);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
