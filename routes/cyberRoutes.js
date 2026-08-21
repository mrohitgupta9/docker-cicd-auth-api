const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ThreatReport = require('../models/ThreatReport');

// 1. Phishing & Malicious URL Scanner
router.post('/check-url', auth, (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'Please provide a URL to scan' });
  }

  const suspiciousKeywords = ['free-money', 'login-verify', 'claim-gift', 'bank-update', 'lottery-win', 'kbc-winner', 'offer-deal'];
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

// 2. Report Spam / Scammer (URL, Phone Number, UPI ID)
router.post('/report-threat', auth, async (req, res) => {
  try {
    const { type, value, description, severity } = req.body;

    if (!type || !value || !description) {
      return res.status(400).json({ message: 'Type (URL/PHONE/UPI), value, and description are required.' });
    }

    const newReport = new ThreatReport({
      reportedBy: req.user.id,
      type: type.toUpperCase(),
      value: value.toLowerCase().trim(),
      description,
      severity: severity || 'HIGH'
    });

    await newReport.save();

    res.status(201).json({
      message: 'Scam threat reported successfully to CyberSafe database!',
      report: newReport
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while reporting threat', error: err.message });
  }
});

// 3. Search Spam Phone Number or UPI ID
router.get('/check-spam', auth, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Please provide a phone number, UPI ID, or URL to check' });
    }

    const searchValue = query.toLowerCase().trim();
    const reports = await ThreatReport.find({ value: searchValue });

    if (reports.length > 0) {
      return res.status(200).json({
        status: 'SPAM / SCAMMER DETECTED 🚨',
        query: searchValue,
        totalReports: reports.length,
        riskLevel: 'CRITICAL',
        reports: reports
      });
    }

    return res.status(200).json({
      status: 'CLEAN ✅',
      query: searchValue,
      totalReports: 0,
      riskLevel: 'LOW',
      message: 'No user reports found in CyberSafe database for this entity.'
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error while checking database', error: err.message });
  }
});

// 4. Email Data Breach Checker
router.post('/check-email-breach', auth, (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please provide an email address' });
  }

  // Simulated breach databases
  const breachedDomains = ['testuser', 'hacked', 'admin', 'test'];
  const emailPrefix = email.split('@')[0];
  const isCompromised = breachedDomains.some(domain => emailPrefix.includes(domain));

  if (isCompromised) {
    return res.status(200).json({
      email: email,
      status: 'COMPROMISED ⚠️',
      foundInBreaches: 2,
      leakedData: ['Passwords', 'IP Addresses', 'Phone Numbers'],
      recommendation: 'Change your passwords immediately and enable 2FA.'
    });
  }

  return res.status(200).json({
    email: email,
    status: 'SAFE ✅',
    foundInBreaches: 0,
    recommendation: 'Your email address was not found in known public data leaks.'
  });
});

module.exports = router;