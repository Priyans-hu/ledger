require('dotenv').config();
const { postgresPool } = require('../config/');

// Create a new transaction
const createTransaction = async (req, res) => {
    let { amount, description, date, type, method, storeid, customerid } = req.body;

    if (!amount || !type || !method || !storeid) {
        return res.status(400).json({ message: 'Amount, type, method, and storeid are required' });
    }

    amount = parseInt(amount, 10);
    customerid = customerid ? parseInt(customerid, 10) : null;

    try {
        const createTransactionQuery = `
            INSERT INTO transaction (amount, description, date, type, method, "storeid", "customerid")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const result = await postgresPool.query(createTransactionQuery, [amount, description, date, type, method, storeid, customerid]);
        res.status(201).json({ message: 'Transaction created successfully', transaction: result.rows[0] });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all transactions for a store
const getTransactions = async (req, res) => {
    const { storeid } = req.body;

    if (!storeid) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific date
const getTransactionsByDate = async (req, res) => {
    const { storeid } = req.body;
    const { date } = req.query;
    console.log(storeid, date);

    if (!storeid || !date) {
        return res.status(400).json({ message: 'Store ID and date are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1 AND date = $2`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid, date]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching transactions by date:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific period
const getTransactionsByPeriod = async (req, res) => {
    const { storeid, startDate, endDate } = req.body;

    if (!storeid || !startDate || !endDate) {
        return res.status(400).json({ message: 'Store ID, start date, and end date are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1 AND date BETWEEN $2 AND $3`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid, startDate, endDate]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching transactions by period:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get transactions for a specific customer
const getTransactionsByCustomer = async (req, res) => {
    const { storeid, customerid } = req.body;

    if (!storeid || !customerid) {
        return res.status(400).json({ message: 'Store ID and customer ID are required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1 AND "customerid" = $2`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid, customerid]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching transactions by customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all credit transactions
const getAllCreditTransactions = async (req, res) => {
    const { storeid } = req.body;

    if (!storeid) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1 AND type = 'credit'`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching credit transactions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all debit transactions
const getAllDebitTransactions = async (req, res) => {
    const { storeid } = req.body;

    if (!storeid) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getTransactionsQuery = `SELECT * FROM transaction WHERE "storeid" = $1 AND type = 'debit'`;
        const result = await postgresPool.query(getTransactionsQuery, [storeid]);
        res.status(200).json({ transactions: result.rows });
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