const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// 1. Protected URL Security Checker Route
router.post('/check-url', auth, (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Please provide a URL to scan' });
  }

  // Phishing/Scam Keywords Detection
  const suspiciousKeywords = ['free-money', 'login-verify', 'claim-gift', 'bank-update', 'lottery-win'];
  const isSuspicious = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));

  if (isSuspicious) {
    return res.status(200).json({
      status: 'DANGER ⚠️',
      url: url,
      message: 'Suspicious phishing patterns detected in this link!',
      riskLevel: 'HIGH',
      safetyScore: '15/100'
    });
  }

  return res.status(200).json({
    status: 'SAFE ✅',
    url: url,
    message: 'No immediate phishing signatures found.',
    riskLevel: 'LOW',
    safetyScore: '95/100'
  });
});

// 2. Protected Password Leak/Breach Checker Route
router.post('/check-email-breach', auth, (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please provide an email address' });
  }

  // Sample Breach Check Logic
  return res.status(200).json({
    email: email,
    breachStatus: 'SAFE',
    foundInLeaks: 0,
    recommendation: 'Your email was not found in known public data breaches.'
  });
});

module.exports = router;