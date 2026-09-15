const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, isAdmin, getDashboard);

module.exports = router;