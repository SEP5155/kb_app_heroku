const express = require('express');
const basicController = require('../controllers/basicController');
const topicRoute = require('../controllers/topicController');

const router = express.Router();

router
    .route('/')
    .get(basicController.getHomePage);

module.exports = router;