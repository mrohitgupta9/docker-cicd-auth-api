const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Root Endpoint (Fixes "Cannot GET /")
app.get('/', (req, res) => {
    res.status(200).send('CI/CD Pipeline Engine is Live & Running Perfectly!');
});

// Health Check Endpoint (CI/CD Pipeline test karta hai)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'CI/CD Pipeline Updated Successfully!' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;