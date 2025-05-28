const express = require('express');
const router = express.Router();
const appealsController = require('../controllers/appealsController');

router.post('/', appealsController.createAppeal);

router.patch('/:id/start', appealsController.startAppeal);

router.patch('/:id/complete', appealsController.completeAppeal);

router.patch('/:id/cancel', appealsController.cancelAppeal);

router.get('/', appealsController.getAppeals);

router.patch('/cancel/in-progress/all', appealsController.cancelAllInProgress);

module.exports = router;
