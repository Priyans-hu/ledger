const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerControllers');
const { customerValidators } = require('../middleware/validators');

// RESTful routes for customers
router.post('/', customerValidators.create, createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.put('/:id', customerValidators.update, updateCustomer);
router.delete('/:id', customerValidators.delete, deleteCustomer);

module.exports = router;
