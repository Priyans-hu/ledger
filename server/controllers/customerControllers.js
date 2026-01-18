const { postgresPool } = require('../config/');

// Create a new customer
const createCustomer = async (req, res) => {
  const storeId = req.storeId;
  const { name, phoneNumber, email, address } = req.body;

  try {
    // Check if customer with same phone exists for this store
    const checkQuery = `
      SELECT customer_id FROM customer
      WHERE store_id = $1 AND phone_number = $2
    `;
    const { rows: existing } = await postgresPool.query(checkQuery, [storeId, phoneNumber]);

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'A customer with this phone number already exists'
      });
    }

    const insertQuery = `
      INSERT INTO customer (store_id, phone_number, name, email, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING customer_id, store_id, phone_number, name, email, address, total_spent, created_at
    `;

    const { rows } = await postgresPool.query(insertQuery, [
      storeId,
      phoneNumber,
      name,
      email || null,
      address
    ]);

    const customer = rows[0];

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: {
        customerId: customer.customer_id,
        storeId: customer.store_id,
        name: customer.name,
        phoneNumber: customer.phone_number,
        email: customer.email,
        address: customer.address,
        totalSpent: parseFloat(customer.total_spent),
        createdAt: customer.created_at
      }
    });
  } catch (error) {
    console.error('createCustomer: Error creating customer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer'
    });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  const storeId = req.storeId;
  const customerId = req.params.id;

  try {
    const query = `
      SELECT customer_id, store_id, phone_number, name, email, address, total_spent, created_at, updated_at
      FROM customer
      WHERE customer_id = $1 AND store_id = $2
    `;
    const { rows } = await postgresPool.query(query, [customerId, storeId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const customer = rows[0];

    res.status(200).json({
      success: true,
      data: {
        customerId: customer.customer_id,
        storeId: customer.store_id,
        name: customer.name,
        phoneNumber: customer.phone_number,
        email: customer.email,
        address: customer.address,
        totalSpent: parseFloat(customer.total_spent),
        createdAt: customer.created_at,
        updatedAt: customer.updated_at
      }
    });
  } catch (error) {
    console.error('getCustomerById: Error fetching customer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customer'
    });
  }
};

// Get all customers for a store with optional search
const getAllCustomers = async (req, res) => {
  const storeId = req.storeId;
  const { search, sortBy = 'name', order = 'asc', limit = 100, offset = 0 } = req.query;

  try {
    const allowedSortFields = ['name', 'total_spent', 'created_at'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'name';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

    let query = `
      SELECT customer_id, store_id, phone_number, name, email, address, total_spent, created_at
      FROM customer
      WHERE store_id = $1
    `;
    const params = [storeId];

    if (search) {
      query += ` AND (name ILIKE $2 OR phone_number ILIKE $2 OR email ILIKE $2)`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY ${sortField} ${sortOrder} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const { rows } = await postgresPool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM customer WHERE store_id = $1';
    const countParams = [storeId];
    if (search) {
      countQuery += ` AND (name ILIKE $2 OR phone_number ILIKE $2 OR email ILIKE $2)`;
      countParams.push(`%${search}%`);
    }
    const countResult = await postgresPool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      data: {
        customers: rows.map(c => ({
          customerId: c.customer_id,
          storeId: c.store_id,
          name: c.name,
          phoneNumber: c.phone_number,
          email: c.email,
          address: c.address,
          totalSpent: parseFloat(c.total_spent),
          createdAt: c.created_at
        })),
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + rows.length < total
        }
      }
    });
  } catch (error) {
    console.error('getAllCustomers: Error fetching customers:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers'
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  const storeId = req.storeId;
  const customerId = req.params.id;
  const { name, phoneNumber, email, address } = req.body;

  try {
    // Check if customer exists and belongs to this store
    const checkQuery = `SELECT customer_id FROM customer WHERE customer_id = $1 AND store_id = $2`;
    const { rows: existing } = await postgresPool.query(checkQuery, [customerId, storeId]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check phone number uniqueness if being updated
    if (phoneNumber) {
      const phoneCheck = await postgresPool.query(
        'SELECT customer_id FROM customer WHERE store_id = $1 AND phone_number = $2 AND customer_id != $3',
        [storeId, phoneNumber, customerId]
      );
      if (phoneCheck.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Another customer with this phone number already exists'
        });
      }
    }

    const updateQuery = `
      UPDATE customer
      SET name = COALESCE($1, name),
          phone_number = COALESCE($2, phone_number),
          email = COALESCE($3, email),
          address = COALESCE($4, address),
          updated_at = CURRENT_TIMESTAMP
      WHERE customer_id = $5 AND store_id = $6
      RETURNING customer_id, store_id, name, phone_number, email, address, total_spent, updated_at
    `;

    const { rows } = await postgresPool.query(updateQuery, [
      name,
      phoneNumber,
      email,
      address,
      customerId,
      storeId
    ]);

    const customer = rows[0];

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: {
        customerId: customer.customer_id,
        storeId: customer.store_id,
        name: customer.name,
        phoneNumber: customer.phone_number,
        email: customer.email,
        address: customer.address,
        totalSpent: parseFloat(customer.total_spent),
        updatedAt: customer.updated_at
      }
    });
  } catch (error) {
    console.error('updateCustomer: Error updating customer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer'
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  const storeId = req.storeId;
  const customerId = req.params.id;

  try {
    const deleteQuery = `
      DELETE FROM customer
      WHERE customer_id = $1 AND store_id = $2
      RETURNING customer_id, name
    `;
    const { rows } = await postgresPool.query(deleteQuery, [customerId, storeId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Customer "${rows[0].name}" deleted successfully`
    });
  } catch (error) {
    console.error('deleteCustomer: Error deleting customer:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer'
    });
  }
};

module.exports = {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
