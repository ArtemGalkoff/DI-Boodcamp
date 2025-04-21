const express = require('express');
const router = express.Router();
const authenticateToken = require('../authMiddleware');

router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! You are authenticated.` });
});

module.exports = router;