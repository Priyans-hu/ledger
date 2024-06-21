const { mysqlConnection } = require('../config/');

// Create a new transaction
const createTransaction = async (req, res) => {
    const { amount, description, date, type, method, storeId, customerId } = req.body;

    if (!amount || !type || !method || !storeId) {
        return res.status(400).json({ message: 'Amount, type, method, and storeId are required' });
    }

    try {
        const createTransactionQuery = `
            INSERT INTO transaction (amount, description, date, type, method, storeId, customerId)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(createTransactionQuery, [amount, description, date, type, method, storeId, customerId]);
        client.release();

        res.status(201).json({ message: 'Transaction created successfully', transaction: rows[0] });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all transactions for a store
const getTransactions = async (req, res) => {
    const { storeId } = req.params;

    if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific date
const getTransactionsByDate = async (req, res) => {
    const { storeId, date } = req.params;

    if (!storeId || !date) {
        return res.status(400).json({ message: 'Store ID and date are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1 AND date = $2`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId, date]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching transactions by date:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific period
const getTransactionsByPeriod = async (req, res) => {
    const { storeId, startDate, endDate } = req.params;

    if (!storeId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Store ID, start date, and end date are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1 AND date BETWEEN $2 AND $3`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId, startDate, endDate]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching transactions by period:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific customer
const getTransactionsByCustomer = async (req, res) => {
    const { storeId, customerId } = req.params;

    if (!storeId || !customerId) {
        return res.status(400).json({ message: 'Store ID and customer ID are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1 AND customerId = $2`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId, customerId]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching transactions by customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all credit transactions
const getAllCreditTransactions = async (req, res) => {
    const { storeId } = req.params;

    if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1 AND type = 'credit'`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching credit transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all debit transactions
const getAllDebitTransactions = async (req, res) => {
    const { storeId } = req.params;

    if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE storeId = $1 AND type = 'debit'`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getTransactionsQuery, [storeId]);
        client.release();

        res.status(200).json({ transactions: rows });
    } catch (error) {
        console.error('Error fetching debit transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    getTransactionsByDate,
    getTransactionsByPeriod,
    getTransactionsByCustomer,
    getAllCreditTransactions,
    getAllDebitTransactions
};