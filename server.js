const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Health Check Endpoint (CI/CD Pipeline isko test karega)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', message: 'CI/CD Engine is Active & Healthy!' });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;