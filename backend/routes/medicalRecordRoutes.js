const express = require('express');
const router = express.Router();
const { addRecord, listAllRecords, listMyRecords } = require('../controllers/medicalRecordController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Sirf Admin naya record add kar sake (asal project mein Doctor bhi karega, abhi simple rakhte hain)
router.post('/', verifyToken, isAdmin, addRecord);

// Admin sab records dekh sake
router.get('/all', verifyToken, isAdmin, listAllRecords);

// Koi bhi logged-in user apne records dekh sake
router.get('/my-records', verifyToken, listMyRecords);

module.exports = router;