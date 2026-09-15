const { createRecord, getAllRecords, getRecordsByUserId } = require('../models/medicalRecordModel');

// Naya record add karo (Doctor/Admin karega, appointment ke baad)
const addRecord = (req, res) => {
  const { appointmentId, diagnosis, prescription, visitDate } = req.body;

  if (!appointmentId || !visitDate) {
    return res.status(400).json({ message: 'appointmentId aur visitDate zaroori hain' });
  }

  createRecord(appointmentId, diagnosis, prescription, visitDate, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.status(201).json({ message: 'Medical record add ho gaya!' });
  });
};

// Sab records dikhao (Admin/Doctor)
const listAllRecords = (req, res) => {
  getAllRecords((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results);
  });
};

// Apne records dikhao (jo bhi logged-in user hai, uske apne records)
const listMyRecords = (req, res) => {
  const userId = req.user.id; // token se aaya, verifyToken middleware ne set kiya tha

  getRecordsByUserId(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results);
  });
};

module.exports = { addRecord, listAllRecords, listMyRecords };