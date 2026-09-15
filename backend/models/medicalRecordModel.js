const db = require('../config/db');

// Naya medical record banao (appointment complete hone ke baad)
const createRecord = (appointmentId, diagnosis, prescription, visitDate, callback) => {
  const sql = 'INSERT INTO medical_records (appointment_id, diagnosis, prescription, visit_date) VALUES (?, ?, ?, ?)';
  db.query(sql, [appointmentId, diagnosis, prescription, visitDate], callback);
};

// Sab records dikhao (Admin/Doctor ke liye)
const getAllRecords = (callback) => {
  const sql = `
    SELECT medical_records.id, medical_records.diagnosis, medical_records.prescription, medical_records.visit_date,
           patient_user.name AS patient_name, doctor_user.name AS doctor_name
    FROM medical_records
    JOIN appointments ON medical_records.appointment_id = appointments.id
    JOIN patients ON appointments.patient_id = patients.id
    JOIN users AS patient_user ON patients.user_id = patient_user.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    JOIN users AS doctor_user ON doctors.user_id = doctor_user.id
  `;
  db.query(sql, callback);
};

// Sirf ek specific patient (user) ke records dikhao
const getRecordsByUserId = (userId, callback) => {
  const sql = `
    SELECT medical_records.id, medical_records.diagnosis, medical_records.prescription, medical_records.visit_date,
           doctor_user.name AS doctor_name
    FROM medical_records
    JOIN appointments ON medical_records.appointment_id = appointments.id
    JOIN patients ON appointments.patient_id = patients.id
    JOIN doctors ON appointments.doctor_id = doctors.id
    JOIN users AS doctor_user ON doctors.user_id = doctor_user.id
    WHERE patients.user_id = ?
  `;
  db.query(sql, [userId], callback);
};

module.exports = { createRecord, getAllRecords, getRecordsByUserId };
