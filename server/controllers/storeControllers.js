const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { postgresPool } = require('../config/');

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

// Helper to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

// Register a new store
const registerStore = async (req, res) => {
  const { storeName, phoneNumber, password, email, address, gstNumber } = req.body;

  try {
    // Check if store already exists
    const checkQuery = 'SELECT id FROM store WHERE phone_number = $1';
    const { rows: existing } = await postgresPool.query(checkQuery, [phoneNumber]);

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'A store with this phone number already exists'
      });
    }

    // Check email uniqueness if provided
    if (email) {
      const emailCheck = await postgresPool.query(
        'SELECT id FROM store WHERE email = $1',
        [email]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'A store with this email already exists'
        });
      }
    }

    const hashedPassword = await hashPassword(password);

    const insertQuery = `
      INSERT INTO store (store_name, phone_number, auth, email, address, gst_number)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, store_name, phone_number, email, address, gst_number, created_at
    `;

    const { rows } = await postgresPool.query(insertQuery, [
      storeName,
      phoneNumber,
      hashedPassword,
      email || null,
      address || null,
      gstNumber || null
    ]);

    const store = rows[0];

    // Generate token for immediate login
    const token = jwt.sign({ id: store.id }, jwtSecret, { expiresIn: JWT_EXPIRY });

    res.status(201).json({
      success: true,
      message: 'Store registered successfully',
      data: {
        store: {
          id: store.id,
          storeName: store.store_name,
          phoneNumber: store.phone_number,
          email: store.email,
          address: store.address,
          gstNumber: store.gst_number,
          createdAt: store.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('registerStore: Error registering store:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to register store'
    });
  }
};

// Login store
const loginStore = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const query = `
      SELECT id, store_name, phone_number, email, address, gst_number, auth, created_at
      FROM store WHERE phone_number = $1
    `;
    const { rows } = await postgresPool.query(query, [phoneNumber]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const store = rows[0];
    const isMatch = await bcrypt.compare(password, store.auth);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: store.id }, jwtSecret, { expiresIn: JWT_EXPIRY });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        store: {
          id: store.id,
          storeName: store.store_name,
          phoneNumber: store.phone_number,
          email: store.email,
          address: store.address,
          gstNumber: store.gst_number,
          createdAt: store.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('loginStore: Error logging in:', error.message);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

// Get store profile
const getProfile = async (req, res) => {
  const storeId = req.storeId;

  try {
    const query = `
      SELECT id, store_name, phone_number, email, address, gst_number, created_at, updated_at
      FROM store WHERE id = $1
    `;
    const { rows } = await postgresPool.query(query, [storeId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const store = rows[0];

    res.status(200).json({
      success: true,
      data: {
        id: store.id,
        storeName: store.store_name,
        phoneNumber: store.phone_number,
        email: store.email,
        address: store.address,
        gstNumber: store.gst_number,
        createdAt: store.created_at,
        updatedAt: store.updated_at
      }
    });
  } catch (error) {
    console.error('getProfile: Error fetching profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
};

// Update store profile
const updateProfile = async (req, res) => {
  const storeId = req.storeId;
  const { storeName, email, address, gstNumber } = req.body;

  try {
    // Check email uniqueness if being updated
    if (email) {
      const emailCheck = await postgresPool.query(
        'SELECT id FROM store WHERE email = $1 AND id != $2',
        [email, storeId]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Email is already in use by another store'
        });
      }
    }

    const query = `
      UPDATE store
      SET store_name = COALESCE($1, store_name),
          email = COALESCE($2, email),
          address = COALESCE($3, address),
          gst_number = COALESCE($4, gst_number),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, store_name, phone_number, email, address, gst_number, updated_at
    `;

    const { rows } = await postgresPool.query(query, [
      storeName,
      email,
      address,
      gstNumber,
      storeId
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const store = rows[0];

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: store.id,
        storeName: store.store_name,
        phoneNumber: store.phone_number,
        email: store.email,
        address: store.address,
        gstNumber: store.gst_number,
        updatedAt: store.updated_at
      }
    });
  } catch (error) {
    console.error('updateProfile: Error updating profile:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  const storeId = req.storeId;
  const { currentPassword, newPassword } = req.body;

  try {
    // Get current password hash
    const { rows } = await postgresPool.query(
      'SELECT auth FROM store WHERE id = $1',
      [storeId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, rows[0].auth);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password and update
    const hashedPassword = await hashPassword(newPassword);
    await postgresPool.query(
      'UPDATE store SET auth = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [hashedPassword, storeId]
    );

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('changePassword: Error changing password:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
};

// Verify token (for frontend auth check)
const verifyToken = async (req, res) => {
  // If we reach here, the token is valid (middleware passed)
  res.status(200).json({
    success: true,
    message: 'Token is valid',
    data: {
      storeId: req.storeId
    }
  });
};

module.exports = {
  registerStore,
  loginStore,
  getProfile,
  updateProfile,
  changePassword,
  verifyToken
};
