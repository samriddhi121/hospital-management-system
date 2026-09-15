const express = require('express');
const router = express.Router();
const { addPatient, listPatients, getPatient, editPatient, removePatient } = require('../controllers/patientController');
const { verifyToken } = require('../middleware/authMiddleware');

// Saare routes pe verifyToken lagaya hai - matlab bina login kiye koi bhi patient data access nahi kar sakta
router.post('/', verifyToken, addPatient);
router.get('/', verifyToken, listPatients);
router.get('/:id', verifyToken, getPatient);
router.put('/:id', verifyToken, editPatient);
router.delete('/:id', verifyToken, removePatient);

module.exports = router;