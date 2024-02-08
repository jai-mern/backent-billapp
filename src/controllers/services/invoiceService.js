const Invoice = require('../models/invoice');

// Function to create a new invoice
const createInvoice = async (invoiceData) => {
    try {
        const newInvoice = new Invoice(invoiceData);
        await newInvoice.save();
        return { success: true, message: 'Invoice created successfully', invoice: newInvoice };
    } catch (error) {
        return { success: false, message: 'Failed to create invoice' };
    }
};

// Function to get all invoices
const getAllInvoices = async () => {
    try {
        const invoices = await Invoice.find();
        return { success: true, invoices };
    } catch (error) {
        return { success: false, message: 'Failed to fetch invoices' };
    }
};

// Function to get invoice by ID
const getInvoiceById = async (id) => {
    try {
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return { success: false, message: 'Invoice not found' };
        }
        return { success: true, invoice };
    } catch (error) {
        return { success: false, message: 'Failed to fetch invoice' };
    }
};

// Function to update an existing invoice
const updateInvoice = async (id, updatedData) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, { new: true });
        return { success: true, message: 'Invoice updated successfully', invoice: updatedInvoice };
    } catch (error) {
        return { success: false, message: 'Failed to update invoice' };
    }
};

// Function to delete an existing invoice
const deleteInvoice = async (id) => {
    try {
        await Invoice.findByIdAndDelete(id);
        return { success: true, message: 'Invoice deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete invoice' };
    }
};

module.exports = { createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice };
