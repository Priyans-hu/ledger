const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoiceSummary
} = require('../controllers/invoiceControllers');
const { invoiceValidators } = require('../middleware/validators');

// RESTful routes for invoices
router.post('/', invoiceValidators.create, createInvoice);
router.get('/', getAllInvoices);
router.get('/summary', getInvoiceSummary);
router.get('/:id', getInvoiceById);
router.put('/:id', invoiceValidators.update, updateInvoice);
router.delete('/:id', deleteInvoice);

module.exports = router;
