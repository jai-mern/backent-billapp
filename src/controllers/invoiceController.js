// invoiceController.js

// Import required modules
const Invoice = require('../models/Invoice'); // Assuming you have an Invoice model

// Controller method to create a new invoice
const createInvoice = async (req, res) => {
    try {
        // Extract invoice data from request body
        const { title, description, amount } = req.body;

        // Create a new invoice instance
        const newInvoice = new Invoice({
            title,
            description,
            amount,
            user: req.user._id // Assuming authenticated user's ID is stored in req.user
        });

        // Save the invoice to the database
        await newInvoice.save();

        res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to get all invoices for a user
const getAllInvoices = async (req, res) => {
    try {
        // Fetch all invoices associated with the authenticated user
        const invoices = await Invoice.find({ user: req.user._id });

        res.status(200).json({ invoices });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to get a single invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        // Fetch the invoice by ID
        const invoice = await Invoice.findById(req.params.id);

        // Check if the invoice exists
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check if the invoice belongs to the authenticated user
        if (invoice.user.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.status(200).json({ invoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to update an existing invoice
const updateInvoice = async (req, res) => {
    try {
        // Extract updated invoice data from request body
        const { title, description, amount } = req.body;

        // Fetch the invoice by ID
        let invoice = await Invoice.findById(req.params.id);

        // Check if the invoice exists
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check if the invoice belongs to the authenticated user
        if (invoice.user.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Update the invoice data
        invoice.title = title;
        invoice.description = description;
        invoice.amount = amount;

        // Save the updated invoice
        await invoice.save();

        res.status(200).json({ message: 'Invoice updated successfully', invoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Controller method to delete an invoice
const deleteInvoice = async (req, res) => {
    try {
        // Fetch the invoice by ID
        let invoice = await Invoice.findById(req.params.id);

        // Check if the invoice exists
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        // Check if the invoice belongs to the authenticated user
        if (invoice.user.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Delete the invoice
        await invoice.remove();

        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};
