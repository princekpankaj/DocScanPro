// scanModel.js
const db = require('../database/dbSetup');

module.exports = {
  saveDocument: (userId, text, callback) => {
    db.run(`INSERT INTO scans (userId, text) VALUES (?, ?)`, [userId, text],
      function(err) {
        if (err) return callback(err);
        callback(null, this.lastID);  // return new document ID
      }
    );
  },

  getAllDocumentsExcept: (excludeId, callback) => {
    db.all(`SELECT * FROM scans WHERE id != ?`, [excludeId], (err, rows) => {
      callback(err, rows);
    });
  }
};
