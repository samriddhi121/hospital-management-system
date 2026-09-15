const db = require('../config/db');

// Naya patient add karo
const createPatient = (userId, age, gender, contact, address, callback) => {
  const sql = 'INSERT INTO patients (user_id, age, gender, contact, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userId, age, gender, contact, address], callback);
};

// Sab patients ki list lao (users table se naam/email bhi jodke)
const getAllPatients = (callback) => {
  const sql = `
    SELECT patients.id, users.name, users.email, patients.age, patients.gender, patients.contact, patients.address
    FROM patients
    JOIN users ON patients.user_id = users.id
  `;
  db.query(sql, callback);
};

// Ek patient ID se dhoondo
const getPatientById = (id, callback) => {
  const sql = `
    SELECT patients.id, users.name, users.email, patients.age, patients.gender, patients.contact, patients.address
    FROM patients
    JOIN users ON patients.user_id = users.id
    WHERE patients.id = ?
  `;
  db.query(sql, [id], callback);
};

// Patient details update karo
const updatePatient = (id, age, gender, contact, address, callback) => {
  const sql = 'UPDATE patients SET age = ?, gender = ?, contact = ?, address = ? WHERE id = ?';
  db.query(sql, [age, gender, contact, address, id], callback);
};

// Patient delete karo
const deletePatient = (id, callback) => {
  const sql = 'DELETE FROM patients WHERE id = ?';
  db.query(sql, [id], callback);
};

module.exports = { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient };