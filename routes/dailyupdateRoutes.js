const express = require('express');
const router = express.Router();
const {createDailyUpdate,getDailyUpdates} = require('../controllers/dailyControlller');
const { authMiddleware } = require('../middleware/authMiddlerware');
const allowCors = require('../middleware/corsMiddlerware');

router.post('/:id', authMiddleware, createDailyUpdate);
router.get('/project/:projectId', authMiddleware, getDailyUpdates);

module.exports = router;