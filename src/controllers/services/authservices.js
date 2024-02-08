// Import necessary dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Function to register a new user
const registerUser = async (userData) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user object with hashed password
        const newUser = new User({
            email: userData.email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to register user' };
    }
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password doesn't match, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { success: true, token };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

module.exports = { registerUser, authenticateUser };
