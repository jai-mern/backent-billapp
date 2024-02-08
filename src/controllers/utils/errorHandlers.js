// Function to handle validation errors
const handleValidationError = (err, res) => {
    const errors = Object.values(err.errors).map((error) => error.message);
    const statusCode = 400;
    res.status(statusCode).json({ errors });
};

// Function to handle database errors
const handleDatabaseError = (err, res) => {
    console.error('Database error:', err);
    const statusCode = 500;
    res.status(statusCode).json({ error: 'Database error occurred' });
};

// Function to handle generic server errors
const handleServerError = (err, res) => {
    console.error('Server error:', err);
    const statusCode = 500;
    res.status(statusCode).json({ error: 'Server error occurred' });
};

module.exports = {
    handleValidationError,
    handleDatabaseError,
    handleServerError,
};
