require('dotenv').config();
const { postgresPool } = require('../config/');

// Create a new customer
const createCustomer = async (req, res) => {
    const { storeid, phonenumber, name, email, address } = req.body;

    if (!storeid || !phonenumber || !name || !address) {
        return res.status(400).json({ message: 'Store ID, phone number, name, and address are required' });
    }

    try {
        const createCustomerQuery = `
            INSERT INTO customer ("storeid", "phonenumber", name, email, address)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const result = await postgresPool.query(createCustomerQuery, [storeid, phonenumber, name, email, address]);
        res.status(201).json({ message: 'Customer created successfully', customer: result.rows[0] });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { customerid } = req.body;

    if (!customerid) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const getCustomerQuery = `SELECT * FROM customer WHERE customerid = $1`;
        const result = await postgresPool.query(getCustomerQuery, [customerid]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ customer: result.rows[0] });
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all customers for a store
const getAllCustomers = async (req, res) => {
    const { storeid } = req.body;

    if (!storeid) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getCustomersQuery = `SELECT * FROM customer WHERE "storeid" = $1`;
        const result = await postgresPool.query(getCustomersQuery, [storeid]);
        res.status(200).json({ customers: result.rows });
    } catch (error) {
        console.error('Error fetching customers for store:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    const { customerid } = req.body;
    const { phonenumber, name, email, address, totalSpent } = req.body;

    if (!customerid) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const updateCustomerQuery = `
            UPDATE customer
            SET "phonenumber" = $1, name = $2, email = $3, address = $4, "totalSpent" = $5, "updatedAt" = CURRENT_TIMESTAMP
            WHERE "customerid" = $6
            RETURNING *
        `;
        const result = await postgresPool.query(updateCustomerQuery, [phonenumber, name, email, address, totalSpent, customerid]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully', customer: result.rows[0] });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    const { customerid } = req.body;

    if (!customerid) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const deleteCustomerQuery = `DELETE FROM customer WHERE "customerid" = $1 RETURNING *`;
        const result = await postgresPool.query(deleteCustomerQuery, [customerid]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', customer: result.rows[0] });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};