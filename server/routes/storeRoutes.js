const express = require('express');
const router = express.Router();
const {
  registerStore,
  loginStore,
  getProfile,
  updateProfile,
  changePassword,
  verifyToken
} = require('../controllers/storeControllers');
const { storeValidators } = require('../middleware/validators');
const authenticate = require('../middleware/authenticate');

// Public routes
router.post('/register', storeValidators.register, registerStore);
router.post('/login', storeValidators.login, loginStore);

// Protected routes (require authentication)
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, storeValidators.updateProfile, updateProfile);
router.put('/change-password', authenticate, storeValidators.changePassword, changePassword);
router.get('/verify-token', authenticate, verifyToken);

module.exports = router;
