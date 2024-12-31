const express= require('express');
const router= express.Router();
const {login,createUser,getAllUsers,getUserById,searchUsers,getUserProjects,getByemail}= require('../controllers/userController');
const { authMiddleware,adminMiddleware } = require('../middleware/authMiddlerware');
const allowCors = require('../middleware/corsMiddlerware');

// Public routes
router.post('/signup', allowCors(createUser));
router.post('/login',allowCors(login));
router.get('/email/:email',allowCors(getByemail));

// Protected routes
router.get('/', [authMiddleware, adminMiddleware], allowCors(getAllUsers));
router.get('/search', [authMiddleware, adminMiddleware], allowCors(searchUsers));
router.get('/:id', authMiddleware, allowCors(getUserById));
router.get('/:id/projects', authMiddleware, allowCors(getUserProjects));

module.exports = router;