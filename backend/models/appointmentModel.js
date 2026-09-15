const db = require('../config/db');

// Naya appointment book karo
const createAppointment = (patientId, doctorId, slotTime, callback) => {
  const sql = 'INSERT INTO appointments (patient_id, doctor_id, slot_time) VALUES (?, ?, ?)';
  db.query(sql, [patientId, doctorId, slotTime], callback);
};

// Sab appointments dekho (patient aur doctor ka naam bhi saath mein)
const getAllAppointments = (callback) => {
  const sql = `
    SELECT 
      appointments.id,
      appointments.slot_time,
      appointments.status,
      patient_user.name AS patient_name,
      doctor_user.name AS doctor_name,
      doctors.specialization
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN users AS patient_user ON patients.user_id = patient_user.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    JOIN users AS doctor_user ON doctors.user_id = doctor_user.id
  `;
  db.query(sql, callback);
};

// Ek appointment ID se dhoondo
const getAppointmentById = (id, callback) => {
  const sql = `
    SELECT 
      appointments.id,
      appointments.slot_time,
      appointments.status,
      patient_user.name AS patient_name,
      doctor_user.name AS doctor_name,
      doctors.specialization
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN users AS patient_user ON patients.user_id = patient_user.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    JOIN users AS doctor_user ON doctors.user_id = doctor_user.id
    WHERE appointments.id = ?
  `;
  db.query(sql, [id], callback);
};

// Appointment ka status update karo (confirm/cancel/complete)
const updateAppointmentStatus = (id, status, callback) => {
  const sql = 'UPDATE appointments SET status = ? WHERE id = ?';
  db.query(sql, [status, id], callback);
};

module.exports = { createAppointment, getAllAppointments, getAppointmentById, updateAppointmentStatus };