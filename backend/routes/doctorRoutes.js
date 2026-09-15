const express = require('express');
const router = express.Router();
const { addDoctor, listDoctors, getDoctor, editDoctor, removeDoctor } = require('../controllers/doctorController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Sab dekhne ke liye sirf login chahiye
router.get('/', verifyToken, listDoctors);
router.get('/:id', verifyToken, getDoctor);

// Add/Edit/Delete sirf Admin kar sake
router.post('/', verifyToken, isAdmin, addDoctor);
router.put('/:id', verifyToken, isAdmin, editDoctor);
router.delete('/:id', verifyToken, isAdmin, removeDoctor);

module.exports = router;