// server.js
const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');
const db = require('./database/dbSetup');  // Initialize/connect to SQLite
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const scanRoutes = require('./routes/scan');
const adminRoutes = require('./routes/admin');


app.use(cors()); 
// Middleware for parsing JSON bodies
app.use(express.json());
// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Mount API routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/scan', scanRoutes);
app.use('/admin', adminRoutes);

// Fallback: serve home page for any unmatched route (for simplicity)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'home.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
