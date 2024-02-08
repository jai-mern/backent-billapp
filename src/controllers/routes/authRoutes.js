const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Route for user registration (signup)
router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await authService.signUp(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Route for user login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

// Route for user logout (optional, if using token-based authentication)
router.post('/logout', (req, res) => {
  // Logic for logging out the user (destroying session, removing token, etc.)
  res.send('User logged out');
});

module.exports = router;
