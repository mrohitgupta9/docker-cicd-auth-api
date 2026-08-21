const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cyberRoutes = require('./routes/cyberRoutes');

const app = express();

// Body Parser Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Local development flexibility
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

// Fallback Route for Undefined API Endpoints
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint Not Found' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`CyberSafe Server running on port ${PORT}`));
}

module.exports = app;