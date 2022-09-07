const express = require('express');
const router = express.Router();

const issueController = require('../controllers/issueController');

router.get('/', issueController.getIssues);

router.post('/', issueController.createIssue);

router.get('/:id', issueController.getIssueById);

router.put('/:id', issueController.updateIssueById);

router.delete('/:id', issueController.deleteIssueById);

module.exports = router;
