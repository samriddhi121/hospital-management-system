const db = require('../config/db');

const getDashboardCounts = (callback) => {
  const sql = `
    SELECT
      (SELECT COUNT(*) FROM patients) AS total_patients,
      (SELECT COUNT(*) FROM doctors) AS total_doctors,
      (SELECT COUNT(*) FROM appointments WHERE DATE(slot_time) = CURDATE()) AS today_appointments
  `;
  db.query(sql, callback);
};

module.exports = { getDashboardCounts };