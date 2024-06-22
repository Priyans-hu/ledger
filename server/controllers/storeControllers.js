const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisePool } = require('../config/');

// Secret key for JWT
const jwtSecret = 'your_jwt_secret_key';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Register controller
const registerStore = async (req, res) => {
    const { storeName, phoneNumber, auth } = req.body;

    if (!storeName || !phoneNumber || !auth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = await hashPassword(auth);
        const createStoreQuery = `
            INSERT INTO store (storeName, phoneNumber, auth)
            VALUES (?, ?, ?)
        `;
        const [result] = await promisePool.query(createStoreQuery, [storeName, phoneNumber, hashedPassword]);
        const newStore = { id: result.insertId, storeName, phoneNumber };

        res.status(201).json({ message: 'Store registered successfully', store: newStore });
    } catch (error) {
        console.error('Error registering store:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login controller
const loginStore = async (req, res) => {
    const { phoneNumber, auth } = req.body;

    if (!phoneNumber || !auth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const findStoreQuery = `SELECT * FROM store WHERE phoneNumber = ?`;
        const [rows] = await promisePool.query(findStoreQuery, [phoneNumber]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Store not found' });
        }

        const store = rows[0];
        const isMatch = await bcrypt.compare(auth, store.auth);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: store.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in store:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerStore,
    loginStore
};