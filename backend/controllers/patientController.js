const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../models/patientModel');

// Naya patient add karo
const addPatient = (req, res) => {
  const { userId, age, gender, contact, address } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userId zaroori hai (pehle us user ka register/login hona chahiye)' });
  }

  createPatient(userId, age, gender, contact, address, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.status(201).json({ message: 'Patient add ho gaya!' });
  });
};

// Sab patients dikhao
const listPatients = (req, res) => {
  getAllPatients((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results);
  });
};

// Ek patient dikhao
const getPatient = (req, res) => {
  const { id } = req.params;
  getPatientById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Patient nahi mila' });
    res.json(results[0]);
  });
};

// Patient update karo
const editPatient = (req, res) => {
  const { id } = req.params;
  const { age, gender, contact, address } = req.body;

  updatePatient(id, age, gender, contact, address, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient nahi mila' });
    res.json({ message: 'Patient update ho gaya!' });
  });
};

// Patient delete karo
const removePatient = (req, res) => {
  const { id } = req.params;

  deletePatient(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Patient nahi mila' });
    res.json({ message: 'Patient delete ho gaya!' });
  });
};

module.exports = { addPatient, listPatients, getPatient, editPatient, removePatient };