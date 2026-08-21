const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cyberRoutes = require('./routes/cyberRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Serve Static Frontend Files (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
if (process.env.MONGO_URI) {
  connectDB();
}

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'CyberSafe Engine Running Perfectly' });
});

// API Routes Binding
app.use('/api/auth', authRoutes);
app.use('/api/cyber', cyberRoutes);

// Root & Fallback Route - Serves the CyberSafe UI Dashboard
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`CyberSafe Server running on port ${PORT}`));
}

module.exports = app;