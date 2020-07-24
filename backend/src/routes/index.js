const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController')

router.get('/topScores',matchController.topScores);
router.get('/lastUpdated',matchController.lastUpdated);

module.exports = router;