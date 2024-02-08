// Import required modules
const Payment = require('../models/Payment'); // Assuming you have a Payment model

// Controller method to process a payment transaction
const processPayment = async (req, res) => {
    try {
        // Extract payment data from request body
        const { amount, description, cardNumber, expiryDate, cvv, nameOnCard } = req.body;

        // Perform payment processing logic (e.g., contacting payment gateway)

        // Create a new payment instance
        const newPayment = new Payment({
            amount,
            description,
            cardNumber, // In a real-world scenario, you might want to encrypt sensitive data like card numbers
            expiryDate,
            cvv,
            nameOnCard,
            user: req.user._id // Assuming authenticated user's ID is stored in req.user
        });

        // Save the payment to the database
        await newPayment.save();

        // Respond with success message and payment details
        res.status(201).json({ message: 'Payment processed successfully', payment: newPayment });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to retrieve all payments for a user
const getAllPayments = async (req, res) => {
    try {
        // Fetch all payments associated with the authenticated user
        const payments = await Payment.find({ user: req.user._id });

        // Respond with the list of payments
        res.status(200).json({ payments });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    processPayment,
    getAllPayments
};
