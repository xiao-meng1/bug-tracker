const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessionController');

router.post('/login', sessionController.login);

module.exports = router;
