const express= require('express');
const router= express.Router();
const {login,createUser,getAllUsers,getUserById,searchUsers,getUserProjects}= require('../controllers/userController');
const { authMiddleware,adminMiddleware } = require('../middleware/authMiddlerware');

// Public routes
router.post('/signup', createUser);
router.post('/login',login);

// Protected routes
router.get('/', [authMiddleware, adminMiddleware], getAllUsers);
router.get('/search', [authMiddleware, adminMiddleware], searchUsers);
router.get('/:id', authMiddleware, getUserById);
router.get('/:id/projects', authMiddleware, getUserProjects);

module.exports = router;