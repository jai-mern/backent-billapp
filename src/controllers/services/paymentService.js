const Payment = require('../models/payment');

// Function to process a payment
const processPayment = async (paymentData) => {
    try {
        const newPayment = new Payment(paymentData);
        await newPayment.save();
        return { success: true, message: 'Payment processed successfully', payment: newPayment };
    } catch (error) {
        return { success: false, message: 'Failed to process payment' };
    }
};

// Function to retrieve all payments
const getAllPayments = async () => {
    try {
        const payments = await Payment.find();
        return { success: true, payments };
    } catch (error) {
        return { success: false, message: 'Failed to fetch payments' };
    }
};

// Function to retrieve a payment by ID
const getPaymentById = async (id) => {
    try {
        const payment = await Payment.findById(id);
        if (!payment) {
            return { success: false, message: 'Payment not found' };
        }
        return { success: true, payment };
    } catch (error) {
        return { success: false, message: 'Failed to fetch payment' };
    }
};

// Function to update an existing payment
const updatePayment = async (id, updatedData) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: 'Payment updated successfully', payment: updatedPayment };
    } catch (error) {
        return { success: false, message: 'Failed to update payment' };
    }
};

// Function to delete an existing payment
const deletePayment = async (id) => {
    try {
        await Payment.findByIdAndDelete(id);
        return { success: true, message: 'Payment deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete payment' };
    }
};

module.exports = { processPayment, getAllPayments, getPaymentById, updatePayment, deletePayment };
