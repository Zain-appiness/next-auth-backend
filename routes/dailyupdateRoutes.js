const express = require('express');
const router = express.Router();
const {createDailyUpdate,getDailyUpdates} = require('../controllers/dailyControlller');
const { authMiddleware } = require('../middleware/authMiddlerware');
const allowCors = require('../middleware/corsMiddlerware');

router.post('/:id', authMiddleware, allowCors(createDailyUpdate));
router.get('/project/:projectId', authMiddleware, allowCors(getDailyUpdates));

module.exports = router;