const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Import the controller functions

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

module.exports = router;
