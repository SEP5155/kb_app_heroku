const loadTestController = require('../controllers/loadTestController');
const express = require('express');

const router = express.Router();

router
    .route('/')
    .get(loadTestController.memoryHogHard);

router
    .route('/light')
    .get(loadTestController.memoryHogLight);

router
    .route('/moderate')
    .get(loadTestController.memoryHogModerate)

    module.exports = router;
