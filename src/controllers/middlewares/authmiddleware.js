const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware function to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        // Retrieve token from request header
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed');
        }

        // Verify token
        const decoded = jwt.verify(token, 'your_secret_key');
        if (!decoded) {
            throw new Error('Authentication failed');
        }

        // Find user by ID and attach to request object
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error('Authentication failed');
        }

        // Attach user and token to request object
        req.user = user;
        req.token = token;
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).send({ error: 'Authentication failed' });
    }
};

// Middleware function to authorize user
const authorizeUser = (req, res, next) => {
    try {
        // Check if user has necessary permissions
        if (!req.user.isAdmin) {
            throw new Error('Authorization failed');
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(403).send({ error: 'Authorization failed' });
    }
};

module.exports = { authenticateUser, authorizeUser };
