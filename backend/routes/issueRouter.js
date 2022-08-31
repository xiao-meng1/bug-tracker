const express = require('express');
const router = express.Router();

const issueController = require('../controllers/issueController');

router.get('/', issueController.test);

module.exports = router;
