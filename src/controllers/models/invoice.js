const mongoose = require('mongoose');

// Define the schema for the invoice
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  items: [{
    itemName: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Unpaid'],
    default: 'Unpaid'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the Invoice model based on the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Export the Invoice model
module.exports = Invoice;
