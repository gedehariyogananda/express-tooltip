const express = require('express');

const postController = require('../controllers/post_controller');
const authenticateController = require('../controllers/authenticate_controller');
const authMiddleware = require('../middleware/auth-guard');

// define route object 
const router = express.Router();

// authenticate page
router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login);

// define enpoint another page with Middleware Route to Assign Id Token User
router.post('/posts', authMiddleware.checkAuth ,postController.index);
router.get('/posts/:id', authMiddleware.checkAuth,postController.show);
router.patch('/posts/:id/update', authMiddleware.checkAuth, postController.update);

module.exports = router;

