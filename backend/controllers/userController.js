// userController.js
const userModel = require('../models/userModel');

exports.getProfile = (req, res) => {
  const userId = req.user.id;
  userModel.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // return basic profile info (here just email and credits)
    res.json({ email: user.email, credits: user.credits });
  });
};

exports.requestCredits = (req, res) => {
  const userId = req.user.id;
  // Mark that this user has requested more credits (if not already requested)
  userModel.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.requestPending) {
      // Already has a pending request
      return res.json({ requested: false, message: 'Request already pending' });
    }
    // Set requestPending = 1 for this user
    userModel.setRequestPending(userId, true, (err2) => {
      if (err2) return res.status(500).json({ error: 'Failed to update request status' });
      res.json({ requested: true });
    });
  });
};
