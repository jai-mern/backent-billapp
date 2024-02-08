const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const paymentRoutes = require('./routes/paymentRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandlers = require('./utils/errorHandlers');

const app = express();

// Middleware
app.use(express.json());

// Database connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', authMiddleware.authenticateUser, invoiceRoutes);
app.use('/api/payments', authMiddleware.authenticateUser, paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
