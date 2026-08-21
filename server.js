const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cyberRoutes = require('./routes/cyberRoutes'); // CyberSafe routes imported

const app = express();

app.use(express.json());
app.use(cors());

// Database Connection
if (process.env.NODE_ENV !== 'test' && process.env.MONGO_URI) {
  connectDB();
}

// Basic Endpoints
app.get('/', (req, res) => {
  res.status(200).send('CyberSafe Security Engine & CI/CD Pipeline is Live!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'CyberSafe Engine Running Perfectly' });
});

// Routes Binding
app.use('/api/auth', authRoutes);
app.use('/api/cyber', cyberRoutes); // CyberSafe API mounted

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`CyberSafe Server running on port ${PORT}`));
}

module.exports = app;