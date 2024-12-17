const topicController = require('../controllers/topicController');
const express = require('express');

const router = express.Router();

router
    .route('/')
    .get(topicController.getTopics);

module.exports = router;