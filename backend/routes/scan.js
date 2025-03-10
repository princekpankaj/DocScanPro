// routes/scan.js
const express = require('express');
const router = express.Router();
const scanController = require('../controllers/scanController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/', scanController.scanDocument);

module.exports = router;
