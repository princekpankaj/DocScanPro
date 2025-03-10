// userModel.js
const db = require('../database/dbSetup');

module.exports = {
  createUser: (email, passwordHash, callback) => {
    const initialCredits = 20;
    db.run(`INSERT INTO users (email, passwordHash, credits) VALUES (?, ?, ?)`,
      [email, passwordHash, initialCredits],
      function(err) {
        if (err) return callback(err);
        // Return the newly created user's id
        callback(null, this.lastID);
      }
    );
  },

  findByEmail: (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      callback(err, row);
    });
  },

  findById: (id, callback) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
      callback(err, row);
    });
  },

  updateCredits: (id, newCredits, callback) => {
    db.run(`UPDATE users SET credits = ? WHERE id = ?`, [newCredits, id], callback);
  },

  decrementCredit: (id, callback) => {
    // Decrement credits by 1
    db.run(`UPDATE users SET credits = credits - 1 WHERE id = ?`, [id], callback);
  },

  setRequestPending: (id, flag, callback) => {
    db.run(`UPDATE users SET requestPending = ? WHERE id = ?`, [flag ? 1 : 0, id], callback);
  },

  getPendingRequests: (callback) => {
    // Get all users who have requestPending = 1
    db.all(`SELECT id, email, credits FROM users WHERE requestPending = 1`, [], (err, rows) => {
      callback(err, rows);
    });
  }
};
