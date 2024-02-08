const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to process a payment transaction
router.post('/process-payment', paymentController.processPayment);

// Route to manage user subscriptions
router.post('/manage-subscription', paymentController.manageSubscription);

// Route to handle refund requests
router.post('/handle-refund', paymentController.handleRefund);

module.exports = router;
