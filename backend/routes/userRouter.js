const express = require('express');
const router = express.Router();
const passport = require('passport');

require('../config/passport');

const userController = require('../controllers/userController');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  userController.getUsers
);

router.post('/', userController.createUser);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getUserById
);

module.exports = router;
