// authController.js
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecretkey';  // same secret as in authMiddleware

exports.register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  // Check if user already exists
  userModel.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (user) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    // If not exists, hash password and create new user
    try {
      const hash = await bcrypt.hash(password, 10);
      userModel.createUser(email, hash, (err2, userId) => {
        if (err2) return res.status(500).json({ error: 'Failed to create user' });
        return res.json({ success: true });
      });
    } catch (hashErr) {
      return res.status(500).json({ error: 'Error processing password' });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  // If the email matches the admin's email, handle admin login
  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASS = "adminpassword"; // In practice, hash or env var
  if (email === ADMIN_EMAIL) {
    if (password === ADMIN_PASS) {
      // Admin authenticated - issue token with admin flag
      const token = jwt.sign({ admin: true }, SECRET_KEY, { expiresIn: '1h' });
      return res.json({ token: token, admin: true });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }
  // Normal user login
  userModel.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Compare password with hash
    try {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Password correct -> generate JWT
      const payload = { userId: user.id, admin: false };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token: token, admin: false });
    } catch (errComp) {
      res.status(500).json({ error: 'Error verifying credentials' });
    }
  });
};
