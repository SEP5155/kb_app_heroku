const express = require('express');
const testQueryDataController = require('../controllers/testQueryDataController');

const router = express.Router();

router.get('/test-query', testQueryDataController.getDataByQuery);

module.exports = router;