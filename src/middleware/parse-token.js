const admin = require('../firebase.js');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Authentication failed:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;