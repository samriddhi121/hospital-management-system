const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus
} = require('../models/appointmentModel');

// Naya appointment book karo
const bookAppointment = (req, res) => {
  const { patientId, doctorId, slotTime } = req.body;

  if (!patientId || !doctorId || !slotTime) {
    return res.status(400).json({ message: 'patientId, doctorId, aur slotTime zaroori hain' });
  }

  createAppointment(patientId, doctorId, slotTime, (err, result) => {
    if (err) {
      // Yahi wo important check hai - agar UNIQUE constraint break hua, matlab slot already booked hai
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Ye time slot pehle se booked hai, doosra time chuno' });
      }
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.status(201).json({ message: 'Appointment book ho gaya!' });
  });
};

// Sab appointments dikhao
const listAppointments = (req, res) => {
  getAllAppointments((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results);
  });
};

// Ek appointment dikhao
const getAppointment = (req, res) => {
  const { id } = req.params;
  getAppointmentById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Appointment nahi mila' });
    res.json(results[0]);
  });
};

// Appointment confirm/cancel/complete karo
const changeAppointmentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Status galat hai. Valid options: pending, confirmed, cancelled, completed' });
  }

  updateAppointmentStatus(id, status, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Appointment nahi mila' });
    res.json({ message: `Appointment ${status} ho gaya!` });
  });
};

module.exports = { bookAppointment, listAppointments, getAppointment, changeAppointmentStatus };