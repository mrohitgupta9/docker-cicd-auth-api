const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Header se Authorization token check karein
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // 'Bearer <token>' format handle karein
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    
    req.user = verified;
    next(); // Token valid hai, next route execution allow karein
  } catch (err) {
    res.status(400).json({ message: 'Invalid or Expired Token' });
  }
};