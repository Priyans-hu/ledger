require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { postgresPool } = require('../config/');

const jwtSecret = process.env.JWT_SECRET;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Register controller
const registerStore = async (req, res) => {
    const { storeName, phoneNumber, password } = req.body;

    const auth = password;

    if (!storeName || !phoneNumber || !auth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const checkStoreQuery = `
            SELECT * FROM store
            WHERE phoneNumber = $1
        `;
        const { rows: existingStores } = await postgresPool.query(checkStoreQuery, [phoneNumber]);

        if (existingStores.length > 0) {
            return res.status(400).json({ message: 'account already exists' });
        }

        const hashedPassword = await hashPassword(auth);

        const createStoreQuery = `
            INSERT INTO store (storeName, phoneNumber, auth)
            VALUES ($1, $2, $3)
            RETURNING id, storeName, phoneNumber
        `;
        const { rows } = await postgresPool.query(createStoreQuery, [storeName, phoneNumber, hashedPassword]);
        const newStore = rows[0];

        res.status(201).json({ message: 'Store registered successfully', store: newStore });
    } catch (error) {
        console.error('Error registering store:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login controller
const loginStore = async (req, res) => {
    const { phoneNumber, password } = req.body;

    const auth = password;

    if (!phoneNumber || !auth) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const findStoreQuery = `SELECT * FROM store WHERE phoneNumber = $1`;
        const { rows } = await postgresPool.query(findStoreQuery, [phoneNumber]);

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