// scanController.js
const scanModel = require('../models/scanModel');
const userModel = require('../models/userModel');
const textMatch = require('../utils/textMatching');

exports.scanDocument = (req, res) => {
  const userId = req.user.id;
  const text = req.body.text || '';
  if (!text) {
    return res.status(400).json({ error: 'No text provided for scanning' });
  }
  // Check user credits
  userModel.findById(userId, (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.credits <= 0) {
      return res.status(403).json({ error: 'No credits remaining. Please request more credits.' });
    }
    // Save the document text in the database
    scanModel.saveDocument(userId, text, (err2, newDocId) => {
      if (err2) return res.status(500).json({ error: 'Failed to save document' });
      // Document saved, now retrieve others to compare
      scanModel.getAllDocumentsExcept(newDocId, (err3, docs) => {
        if (err3) return res.status(500).json({ error: 'Failed to retrieve documents' });
        const matches = [];
        for (let doc of docs) {
          const otherText = doc.text || '';
          if (!otherText) continue;
          const sim = textMatch.similarity(text, otherText);
          if (sim >= 0.8) {  // using 80% as a similarity threshold
            matches.push({ id: doc.id, similarity: sim });
          }
        }
        // Decrement user credit by 1
        userModel.decrementCredit(userId, (err4) => {
          // Even if decrement fails, we still proceed to return results
          const remaining = user.credits - 1;
          return res.json({ 
            matches: matches, 
            remainingCredits: remaining 
          });
        });
      });
    });
  });
};
