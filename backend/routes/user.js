// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// All routes in this router require authentication
router.use(auth);

router.get('/profile', userController.getProfile);
router.post('/request-credits', userController.requestCredits);

module.exports = router;
