

const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure to import the auth middleware

const router = express.Router();

// routes
router.post('/register', registerUser); // Route for user registration
router.post('/login', loginUser); // Route for user login
router.get('/profile', authMiddleware, getUserProfile); // Route to get user profile

module.exports = router; // Export the router
