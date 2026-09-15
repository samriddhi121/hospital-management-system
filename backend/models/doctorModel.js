const db = require('../config/db');

// Naya doctor add karo
const createDoctor = (userId, specialization, availability, contact, callback) => {
  const sql = 'INSERT INTO doctors (user_id, specialization, availability, contact) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, specialization, availability, contact], callback);
};

// Sab doctors ki list lao (users table se naam/email bhi jodke)
const getAllDoctors = (callback) => {
  const sql = `
    SELECT doctors.id, users.name, users.email, doctors.specialization, doctors.availability, doctors.contact
    FROM doctors
    JOIN users ON doctors.user_id = users.id
  `;
  db.query(sql, callback);
};

// Ek doctor ID se dhoondo
const getDoctorById = (id, callback) => {
  const sql = `
    SELECT doctors.id, users.name, users.email, doctors.specialization, doctors.availability, doctors.contact
    FROM doctors
    JOIN users ON doctors.user_id = users.id
    WHERE doctors.id = ?
  `;
  db.query(sql, [id], callback);
};

// Doctor details update karo
const updateDoctor = (id, specialization, availability, contact, callback) => {
  const sql = 'UPDATE doctors SET specialization = ?, availability = ?, contact = ? WHERE id = ?';
  db.query(sql, [specialization, availability, contact, id], callback);
};

// Doctor delete karo
const deleteDoctor = (id, callback) => {
  const sql = 'DELETE FROM doctors WHERE id = ?';
  db.query(sql, [id], callback);
};

module.exports = { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };