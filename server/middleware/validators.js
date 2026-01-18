const { body, param, query, validationResult } = require('express-validator');

// Helper to handle validation errors
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Store validators
const storeValidators = {
  register: [
    body('storeName')
      .trim()
      .notEmpty().withMessage('Store name is required')
      .isLength({ min: 2, max: 255 }).withMessage('Store name must be 2-255 characters'),
    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[0-9]{10,15}$/).withMessage('Invalid phone number format'),
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email format'),
    handleValidation
  ],
  login: [
    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required'),
    body('password')
      .notEmpty().withMessage('Password is required'),
    handleValidation
  ],
  updateProfile: [
    body('storeName')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 }).withMessage('Store name must be 2-255 characters'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email format'),
    body('address')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Address must be less than 500 characters'),
    body('gstNumber')
      .optional()
      .trim()
      .matches(/^[0-9A-Z]{15}$/).withMessage('Invalid GST number format'),
    handleValidation
  ],
  changePassword: [
    body('currentPassword')
      .notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .notEmpty().withMessage('New password is required')
      .isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    handleValidation
  ]
};

// Customer validators
const customerValidators = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Customer name is required')
      .isLength({ min: 2, max: 255 }).withMessage('Name must be 2-255 characters'),
    body('phoneNumber')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^[0-9]{10,15}$/).withMessage('Invalid phone number format'),
    body('address')
      .trim()
      .notEmpty().withMessage('Address is required'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email format'),
    handleValidation
  ],
  update: [
    param('id')
      .isInt({ min: 1 }).withMessage('Invalid customer ID'),
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 }).withMessage('Name must be 2-255 characters'),
    body('phoneNumber')
      .optional()
      .matches(/^[0-9]{10,15}$/).withMessage('Invalid phone number format'),
    body('email')
      .optional()
      .isEmail().withMessage('Invalid email format'),
    handleValidation
  ],
  delete: [
    param('id')
      .isInt({ min: 1 }).withMessage('Invalid customer ID'),
    handleValidation
  ]
};

// Transaction validators
const transactionValidators = {
  create: [
    body('amount')
      .notEmpty().withMessage('Amount is required')
      .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('type')
      .notEmpty().withMessage('Transaction type is required')
      .isIn(['credit', 'debit']).withMessage('Type must be credit or debit'),
    body('method')
      .notEmpty().withMessage('Payment method is required')
      .isIn(['cash', 'upi', 'neft', 'cheque', 'card']).withMessage('Invalid payment method'),
    body('date')
      .optional()
      .isISO8601().withMessage('Invalid date format'),
    body('category')
      .optional()
      .isIn(['none', 'rent', 'utilities', 'supplies', 'salary', 'marketing', 'maintenance', 'transport', 'inventory', 'other'])
      .withMessage('Invalid expense category'),
    body('customerId')
      .optional()
      .isInt({ min: 1 }).withMessage('Invalid customer ID'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    handleValidation
  ],
  update: [
    param('id')
      .isInt({ min: 1 }).withMessage('Invalid transaction ID'),
    body('amount')
      .optional()
      .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
    body('type')
      .optional()
      .isIn(['credit', 'debit']).withMessage('Type must be credit or debit'),
    body('method')
      .optional()
      .isIn(['cash', 'upi', 'neft', 'cheque', 'card']).withMessage('Invalid payment method'),
    body('category')
      .optional()
      .isIn(['none', 'rent', 'utilities', 'supplies', 'salary', 'marketing', 'maintenance', 'transport', 'inventory', 'other'])
      .withMessage('Invalid expense category'),
    handleValidation
  ],
  delete: [
    param('id')
      .isInt({ min: 1 }).withMessage('Invalid transaction ID'),
    handleValidation
  ],
  getByMonth: [
    query('month')
      .notEmpty().withMessage('Month is required')
      .isInt({ min: 1, max: 12 }).withMessage('Month must be between 1 and 12'),
    query('year')
      .optional()
      .isInt({ min: 2000, max: 2100 }).withMessage('Invalid year'),
    handleValidation
  ],
  getByDate: [
    query('date')
      .notEmpty().withMessage('Date is required')
      .isISO8601().withMessage('Invalid date format'),
    handleValidation
  ],
  getByPeriod: [
    query('startDate')
      .notEmpty().withMessage('Start date is required')
      .isISO8601().withMessage('Invalid start date format'),
    query('endDate')
      .notEmpty().withMessage('End date is required')
      .isISO8601().withMessage('Invalid end date format'),
    handleValidation
  ]
};

// Invoice validators
const invoiceValidators = {
  create: [
    body('customerId')
      .optional()
      .isInt({ min: 1 }).withMessage('Invalid customer ID'),
    body('billingAddress')
      .trim()
      .notEmpty().withMessage('Billing address is required'),
    body('items')
      .isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.name')
      .trim()
      .notEmpty().withMessage('Item name is required'),
    body('items.*.quantity')
      .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.unitPrice')
      .isFloat({ min: 0 }).withMessage('Unit price must be non-negative'),
    body('taxRate')
      .optional()
      .isFloat({ min: 0, max: 100 }).withMessage('Tax rate must be between 0 and 100'),
    body('discount')
      .optional()
      .isFloat({ min: 0 }).withMessage('Discount must be non-negative'),
    body('dueDate')
      .optional()
      .isISO8601().withMessage('Invalid due date format'),
    handleValidation
  ],
  update: [
    param('id')
      .isInt({ min: 1 }).withMessage('Invalid invoice ID'),
    body('status')
      .optional()
      .isIn(['draft', 'sent', 'paid', 'cancelled']).withMessage('Invalid invoice status'),
    handleValidation
  ]
};

module.exports = {
  handleValidation,
  storeValidators,
  customerValidators,
  transactionValidators,
  invoiceValidators
};
