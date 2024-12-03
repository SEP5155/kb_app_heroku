const loadTestController = require('../controllers/loadTestController');
const express = require('express');

const router = express.Router();

router
    .route('/')
    .get(loadTestController.memoryHog)

    module.exports = router;
