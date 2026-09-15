const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} = require('../models/doctorModel');

const addDoctor = (req, res) => {
  const { userId, specialization, availability, contact } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId zaroori hai' });
  }

  createDoctor(userId, specialization, availability, contact, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.status(201).json({ message: 'Doctor add ho gaya!' });
  });
};

const listDoctors = (req, res) => {
  getAllDoctors((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results);
  });
};

const getDoctor = (req, res) => {
  const { id } = req.params;
  getDoctorById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Doctor nahi mila' });
    res.json(results[0]);
  });
};

const editDoctor = (req, res) => {
  const { id } = req.params;
  const { specialization, availability, contact } = req.body;

  updateDoctor(id, specialization, availability, contact, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Doctor nahi mila' });
    res.json({ message: 'Doctor update ho gaya!' });
  });
};

const removeDoctor = (req, res) => {
  const { id } = req.params;

  deleteDoctor(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Doctor nahi mila' });
    res.json({ message: 'Doctor delete ho gaya!' });
  });
};

module.exports = { addDoctor, listDoctors, getDoctor, editDoctor, removeDoctor };