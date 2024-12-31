const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddlerware');
const {createProject,getAllProjects,getProjectById,updateProject,deleteProject,getUserProjects} = require('../controllers/projectController');
const allowCors = require('../middleware/corsMiddlerware');

router.post('/', [authMiddleware, adminMiddleware], allowCors(createProject));
router.get('/', [authMiddleware, adminMiddleware], allowCors(getAllProjects));
router.get('/:id', authMiddleware, getProjectById);
router.put('/:id', [authMiddleware, adminMiddleware], allowCors(updateProject));
router.delete('/:id', [authMiddleware, adminMiddleware], allowCors(deleteProject));
router.get('/user/:id',[authMiddleware, adminMiddleware],allowCors(getUserProjects))
module.exports = router;