const express = require('express');
const basicController = require('../controllers/basicController');

const router = express.Router();

router
    .route('/')
    .get(basicController.getHomePage);

module.exports = router;