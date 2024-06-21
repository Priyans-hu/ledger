const { mysqlConnection } = require('../config/');

// Create a new customer
const createCustomer = async (req, res) => {
    const { storeId, phoneNumber, name, email, address } = req.body;

    if (!storeId || !phoneNumber || !name || !address) {
        return res.status(400).json({ message: 'Store ID, phone number, name, and address are required' });
    }

    try {
        const createCustomerQuery = `
            INSERT INTO customer (storeId, phoneNumber, name, email, address)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(createCustomerQuery, [storeId, phoneNumber, name, email, address]);
        client.release();

        res.status(201).json({ message: 'Customer created successfully', customer: rows[0] });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { customerId } = req.params;

    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const getCustomerQuery = `SELECT * FROM customer WHERE customerId = $1`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getCustomerQuery, [customerId]);
        client.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ customer: rows[0] });
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all customers for a store
const getAllCustomers = async (req, res) => {
    const { storeId } = req.params;

    if (!storeId) {
        return res.status(400).json({ message: 'Store ID is required' });
    }

    try {
        const getCustomersQuery = `SELECT * FROM customer WHERE storeId = $1`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(getCustomersQuery, [storeId]);
        client.release();

        res.status(200).json({ customers: rows });
    } catch (error) {
        console.error('Error fetching customers for store:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update customer
const updateCustomer = async (req, res) => {
    const { customerId } = req.params;
    const { phoneNumber, name, email, address, totalSpent } = req.body;

    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const updateCustomerQuery = `
            UPDATE customer
            SET phoneNumber = $1, name = $2, email = $3, address = $4, totalSpent = $5, updatedAt = CURRENT_TIMESTAMP
            WHERE customerId = $6
            RETURNING *
        `;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(updateCustomerQuery, [phoneNumber, name, email, address, totalSpent, customerId]);
        client.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer updated successfully', customer: rows[0] });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete customer
const deleteCustomer = async (req, res) => {
    const { customerId } = req.params;

    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required' });
    }

    try {
        const deleteCustomerQuery = `DELETE FROM customer WHERE customerId = $1 RETURNING *`;
        const client = await mysqlConnection.connect();
        const { rows } = await client.query(deleteCustomerQuery, [customerId]);
        client.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully', customer: rows[0] });
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