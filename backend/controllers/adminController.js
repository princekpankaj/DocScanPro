// adminController.js
const userModel = require('../models/userModel');

exports.getRequests = (req, res) => {
  userModel.getPendingRequests((err, users) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    // Return list of users who requested credits (with id, email, credits)
    res.json(users || []);
  });
};

exports.approveRequest = (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'No userId provided' });
  // Add credits to the user (e.g., +20 credits) and clear request flag
  userModel.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const newCreditTotal = user.credits + 20;  // grant 20 extra scans
    userModel.updateCredits(userId, newCreditTotal, (err2) => {
      if (err2) return res.status(500).json({ error: 'Failed to update credits' });
      // Clear the requestPending flag
      userModel.setRequestPending(userId, false, (err3) => {
        if (err3) {
          // If flag clear fails, still proceed with success (credits given)
          return res.json({ success: true });
        }
        res.json({ success: true });
      });
    });
  });
};

exports.rejectRequest = (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'No userId provided' });
  // Simply clear the requestPending flag without changing credits
  userModel.setRequestPending(userId, false, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to update request status' });
    res.json({ success: true });
  });
};
