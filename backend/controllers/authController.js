const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign(
        {
            user: {
                userId: user._id,
                role: user.role,
            },
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Register User
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            email,
            password,  
            role,
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        const isMatch = await bcrypt.compare(password, user.password);  // Compare the plain text password with the hashed one
        if (!isMatch) {
            console.log("Password hash mismatch");
            console.log('User password (hashed):', user.password);
            console.log('Entered password:', password);
            //console.log('Entered password (hashed):', hashedPassword);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
