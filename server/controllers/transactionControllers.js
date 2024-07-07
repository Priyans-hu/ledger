require('dotenv').config();
const { postgresPool } = require('../config/');
const { format, subMonths, lastDayOfMonth } = require('date-fns');

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

// Get transactions for a specific month
const getTransactionsByMonth = async (req, res) => {
    const { storeid } = req.body;
    const { month } = req.query;

    if (!storeid || !month) {
        return res.status(400).json({ message: 'Store ID and month are required' });
    }

    try {
        const getTransactionsQuery = `
            SELECT * 
            FROM transaction 
            WHERE "storeid" = $1 
            AND EXTRACT(MONTH FROM date) = $2`;
        
        const result = await postgresPool.query(getTransactionsQuery, [storeid, month]);
        res.status(200).json({ transactions: result.rows });
    } catch (error) {
        console.error('Error fetching transactions by month:', error);
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

const getNumberOfTransactionsInPast12months = async (req, res) => {
    const { storeid } = req.body;

    if (!storeid) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        // Create an array of the last 12 months
        const months = [];
        for (let i = 0; i < 12; i++) {
            const date = subMonths(new Date(), i);
            months.push(format(date, 'yyyy-MM'));
        }

        // Query the database for each month
        const monthlyTransactionCounts = await Promise.all(
            months.map(async (month) => {
                const [year, monthNumber] = month.split('-');
                const startDate = `${year}-${monthNumber}-01`;
                const endDate = format(lastDayOfMonth(new Date(startDate)), 'yyyy-MM-dd');

                const getTransactionCountQuery = `
                    SELECT COUNT(*) AS count
                    FROM transaction
                    WHERE "storeid" = $1
                    AND date BETWEEN $2 AND $3
                `;
                const result = await postgresPool.query(getTransactionCountQuery, [storeid, startDate, endDate]);
                return {
                    month,
                    count: parseInt(result.rows[0].count, 10),
                };
            })
        );

        // Return the results
        res.status(200).json({ monthlyTransactionCounts });
    } catch (error) {
        console.error('Error fetching number of transactions in past 12 months:', error);
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
    getTransactionsByMonth,
    getTransactionsByPeriod,
    getTransactionsByCustomer,
    getNumberOfTransactionsInPast12months,
    getAllCreditTransactions,
    getAllDebitTransactions
};