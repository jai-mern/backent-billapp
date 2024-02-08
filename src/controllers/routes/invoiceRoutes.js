const express = require('express');
const router = express.Router();
const invoiceService = require('../services/invoiceService');

// Route for creating a new invoice
router.post('/', async (req, res, next) => {
  try {
    const newInvoice = await invoiceService.createInvoice(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    next(error);
  }
});

// Route for retrieving all invoices
router.get('/', async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (error) {
    next(error);
  }
});

// Route for retrieving a specific invoice by ID
router.get('/:id', async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoiceById(req.params.id);
    res.json(invoice);
  } catch (error) {
    next(error);
  }
});

// Route for updating an existing invoice
router.put('/:id', async (req, res, next) => {
  try {
    const updatedInvoice = await invoiceService.updateInvoice(req.params.id, req.body);
    res.json(updatedInvoice);
  } catch (error) {
    next(error);
  }
});

// Route for deleting an existing invoice
router.delete('/:id', async (req, res, next) => {
  try {
    await invoiceService.deleteInvoice(req.params.id);
    res.send('Invoice deleted successfully');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
