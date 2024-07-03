const express = require('express');
const router = express.Router();
const {
    createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer
    } = require('../controllers/customerControllers');

router.post('/', createCustomer);
router.get('/', getCustomerById);
router.get('/store/', getAllCustomers);
router.put('/', updateCustomer);
router.delete('/', deleteCustomer);

module.exports = router;
