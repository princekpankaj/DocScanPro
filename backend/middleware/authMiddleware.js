// authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecretkey';  // in production, use env variable

module.exports = function(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1]; // "Bearer <token>"
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    // Attach user info to request (for controllers to use)
    req.user = {
      id: payload.userId || null,
      admin: payload.admin || false
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
