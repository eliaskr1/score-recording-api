const admin = require('../firebase.js')

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];

  if (!token) return res.status(401).send('Missing token');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};
