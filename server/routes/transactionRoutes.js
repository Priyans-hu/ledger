const express = require('express');
const router = express.Router();
const {
    createTransaction, getTransactions, getTransactionsByDate, getTransactionsByPeriod,
    getTransactionsByCustomer, getAllCreditTransactions, getAllDebitTransactions
    } = require('../controllers/transactionControllers');

router.post('/create', createTransaction);
router.get('/:storeId', getTransactions);
router.get('/:storeId/date/:date', getTransactionsByDate);
router.get('/:storeId/period/:startDate/:endDate', getTransactionsByPeriod);
router.get('/:storeId/customer/:customerId', getTransactionsByCustomer);
router.get('/:storeId/credit', getAllCreditTransactions);
router.get('/:storeId/debit', getAllDebitTransactions);

module.exports = router;
