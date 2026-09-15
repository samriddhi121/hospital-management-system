const { getDashboardCounts } = require('../models/dashboardModel');

const getDashboard = (req, res) => {
  getDashboardCounts((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error', error: err.message });
    res.json(results[0]);
  });
};

module.exports = { getDashboard };