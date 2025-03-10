// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

// All admin routes require a valid JWT and admin privileges
router.use(auth);
// Additional admin check middleware
router.use((req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
});

router.get('/requests', adminController.getRequests);
router.post('/approve', adminController.approveRequest);
router.post('/reject', adminController.rejectRequest);

module.exports = router;
