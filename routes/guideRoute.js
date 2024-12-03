const express = require('express');
const guideController = require('../controllers/guideController');

const router = express.Router();

router
    .route('/')
    .get(guideController.getAllGuides)
    .post(guideController.createGuide);

router
    .route('/:id')
    .get(guideController.getGuideById)
    .patch(guideController.updateGuide)
    .delete(guideController.deleteGuide)

router
    .route('/technology/:technology')
    .get(guideController.getAllGuidesByTechnology)

module.exports = router;