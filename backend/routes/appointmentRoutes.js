const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  listAppointments,
  getAppointment,
  changeAppointmentStatus
} = require('../controllers/appointmentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, bookAppointment);
router.get('/', verifyToken, listAppointments);
router.get('/:id', verifyToken, getAppointment);
router.put('/:id/status', verifyToken, changeAppointmentStatus);

module.exports = router;