const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/test-api-connection', apiController.getApi);

module.exports = router;
