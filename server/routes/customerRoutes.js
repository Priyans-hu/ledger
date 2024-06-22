const express = require('express');
const router = express.Router();
const {
    createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer
    } = require('../controllers/customerControllers');

router.post('/create', createCustomer);
router.get('/:customerId', getCustomerById);
router.get('/store/:storeId', getAllCustomers);
router.put('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

module.exports = router;
