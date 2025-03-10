// dbSetup.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (creates file if not exists)
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Create tables if they do not exist
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    passwordHash TEXT,
    credits INTEGER,
    requestPending INTEGER DEFAULT 0
  )`);
  // Scanned documents table
  db.run(`CREATE TABLE IF NOT EXISTS scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    text TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;
