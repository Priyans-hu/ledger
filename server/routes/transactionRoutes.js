const express = require('express');
const router = express.Router();
const {
    createTransaction, getTransactions, getTransactionsByDate, getTransactionsByMonth, getTransactionsByPeriod,
    getTransactionsByCustomer, getAllCreditTransactions, getAllDebitTransactions
    } = require('../controllers/transactionControllers');

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/date', getTransactionsByDate);
router.get('/month', getTransactionsByMonth);
router.get('/period', getTransactionsByPeriod);
router.get('/customer', getTransactionsByCustomer);
router.get('/credit', getAllCreditTransactions);
router.get('/debit', getAllDebitTransactions);

module.exports = router;
