const jwt = require('jsonwebtoken');

// Ye check karta hai ki user logged in hai ya nahi
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token nahi mila, login zaroori hai' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>" mein se sirf token nikalna

  if (!token) {
    return res.status(401).json({ message: 'Token format galat hai' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalid ya expire ho chuka hai' });
    }
    req.user = decoded; // decoded mein { id, role } hoga, isko request ke saath aage bhejte hain
    next(); // sab sahi hai, aage badho
  });
};

// Ye check karta hai ki user "admin" hai ya nahi
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Sirf Admin ye kaam kar sakta hai' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };