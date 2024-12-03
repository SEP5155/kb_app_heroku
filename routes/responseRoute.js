const express = require('express');
const responseController = require('../controllers/responseController');

const router = express.Router();

router
    .route('/')
    .get(responseController.getAllResponses)
    .post(responseController.createResponse)

router
    .route('/:id')
    .get(responseController.getOneResponse)
    .delete(responseController.deleteResponse)
    .patch(responseController.updateResponse)

router
    .route('/category/:subCategory')
    .get(responseController.getAllEntriesBySubcatigorie)


module.exports = router;