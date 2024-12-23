const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddlerware');
const {createProject,getAllProjects,getProjectById,updateProject,deleteProject,getUserProjects} = require('../controllers/projectController');

router.post('/', [authMiddleware, adminMiddleware], createProject);
router.get('/', [authMiddleware, adminMiddleware], getAllProjects);
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', [authMiddleware, adminMiddleware], updateProject);
router.delete('/:id', [authMiddleware, adminMiddleware], deleteProject);
router.get('/user/:id',[authMiddleware, adminMiddleware],getUserProjects)
module.exports = router;