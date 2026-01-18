const express = require('express');
const router = express.Router();
const {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByDate,
  getTransactionsByMonth,
  getTransactionsByPeriod,
  getTransactionsByCustomer,
  getNumberOfTransactionsInPast12months,
  getAllCreditTransactions,
  getAllDebitTransactions,
  exportTransactions,
  getExpenseSummary
} = require('../controllers/transactionControllers');
const { transactionValidators } = require('../middleware/validators');

// CRUD routes
router.post('/', transactionValidators.create, createTransaction);
router.get('/', getTransactions);
router.put('/:id', transactionValidators.update, updateTransaction);
router.delete('/:id', transactionValidators.delete, deleteTransaction);

// Filter routes
router.get('/date', transactionValidators.getByDate, getTransactionsByDate);
router.get('/month', transactionValidators.getByMonth, getTransactionsByMonth);
router.get('/period', transactionValidators.getByPeriod, getTransactionsByPeriod);
router.get('/past12months', getNumberOfTransactionsInPast12months);

// Type-specific routes
router.get('/credit', getAllCreditTransactions);
router.get('/debit', getAllDebitTransactions);

// Customer-specific transactions
router.get('/customer/:customerId', getTransactionsByCustomer);

// Export and analytics
router.get('/export', exportTransactions);
router.get('/expense-summary', getExpenseSummary);

module.exports = router;
