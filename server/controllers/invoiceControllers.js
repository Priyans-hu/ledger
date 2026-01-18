const { postgresPool } = require('../config/');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

// Generate unique invoice number
const generateInvoiceNumber = (storeId) => {
  const timestamp = format(new Date(), 'yyyyMMdd');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV-${storeId}-${timestamp}-${random}`;
};

// Helper to format invoice for response
const formatInvoice = (invoice, items = []) => ({
  invoiceId: invoice.invoice_id,
  storeId: invoice.store_id,
  customerId: invoice.customer_id,
  customerName: invoice.customer_name,
  invoiceNumber: invoice.invoice_number,
  billingAddress: invoice.billing_address,
  subtotal: parseFloat(invoice.subtotal),
  taxRate: parseFloat(invoice.tax_rate),
  taxAmount: parseFloat(invoice.tax_amount),
  discount: parseFloat(invoice.discount),
  totalAmount: parseFloat(invoice.total_amount),
  status: invoice.status,
  notes: invoice.notes,
  dueDate: invoice.due_date,
  createdAt: invoice.created_at,
  updatedAt: invoice.updated_at,
  items: items.map(i => ({
    itemId: i.item_id,
    name: i.name,
    description: i.description,
    quantity: i.quantity,
    unitPrice: parseFloat(i.unit_price),
    totalPrice: parseFloat(i.total_price)
  }))
});

// Create a new invoice
const createInvoice = async (req, res) => {
  const storeId = req.storeId;
  const { customerId, billingAddress, items, taxRate = 0, discount = 0, notes, dueDate } = req.body;

  const client = await postgresPool.connect();

  try {
    await client.query('BEGIN');

    // Verify customer if provided
    let customerName = null;
    if (customerId) {
      const customerCheck = await client.query(
        'SELECT name FROM customer WHERE customer_id = $1 AND store_id = $2',
        [customerId, storeId]
      );
      if (customerCheck.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: 'Customer not found'
        });
      }
      customerName = customerCheck.rows[0].name;
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxAmount = (subtotal - discount) * (taxRate / 100);
    const totalAmount = subtotal - discount + taxAmount;

    const invoiceNumber = generateInvoiceNumber(storeId);

    // Create invoice
    const invoiceQuery = `
      INSERT INTO invoice (
        store_id, customer_id, invoice_number, billing_address,
        subtotal, tax_rate, tax_amount, discount, total_amount,
        status, notes, due_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const { rows: invoiceRows } = await client.query(invoiceQuery, [
      storeId,
      customerId || null,
      invoiceNumber,
      billingAddress,
      subtotal,
      taxRate,
      taxAmount,
      discount,
      totalAmount,
      'draft',
      notes || null,
      dueDate || null
    ]);

    const invoice = invoiceRows[0];

    // Create invoice items
    const itemInsertQuery = `
      INSERT INTO invoice_item (invoice_id, name, description, quantity, unit_price, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const insertedItems = [];
    for (const item of items) {
      const { rows } = await client.query(itemInsertQuery, [
        invoice.invoice_id,
        item.name,
        item.description || null,
        item.quantity,
        item.unitPrice,
        item.quantity * item.unitPrice
      ]);
      insertedItems.push(rows[0]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: formatInvoice({ ...invoice, customer_name: customerName }, insertedItems)
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('createInvoice: Error creating invoice:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice'
    });
  } finally {
    client.release();
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  const storeId = req.storeId;
  const invoiceId = req.params.id;

  try {
    const invoiceQuery = `
      SELECT i.*, c.name as customer_name
      FROM invoice i
      LEFT JOIN customer c ON i.customer_id = c.customer_id
      WHERE i.invoice_id = $1 AND i.store_id = $2
    `;
    const { rows: invoiceRows } = await postgresPool.query(invoiceQuery, [invoiceId, storeId]);

    if (invoiceRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    const itemsQuery = 'SELECT * FROM invoice_item WHERE invoice_id = $1 ORDER BY item_id';
    const { rows: itemRows } = await postgresPool.query(itemsQuery, [invoiceId]);

    res.status(200).json({
      success: true,
      data: formatInvoice(invoiceRows[0], itemRows)
    });
  } catch (error) {
    console.error('getInvoiceById: Error fetching invoice:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice'
    });
  }
};

// Get all invoices for a store
const getAllInvoices = async (req, res) => {
  const storeId = req.storeId;
  const { status, customerId, limit = 50, offset = 0 } = req.query;

  try {
    let query = `
      SELECT i.*, c.name as customer_name
      FROM invoice i
      LEFT JOIN customer c ON i.customer_id = c.customer_id
      WHERE i.store_id = $1
    `;
    const params = [storeId];
    let paramIndex = 2;

    if (status) {
      query += ` AND i.status = $${paramIndex++}`;
      params.push(status);
    }

    if (customerId) {
      query += ` AND i.customer_id = $${paramIndex++}`;
      params.push(customerId);
    }

    query += ` ORDER BY i.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(parseInt(limit), parseInt(offset));

    const { rows } = await postgresPool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM invoice WHERE store_id = $1';
    const countParams = [storeId];
    if (status) {
      countQuery += ' AND status = $2';
      countParams.push(status);
    }
    const countResult = await postgresPool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      data: {
        invoices: rows.map(inv => formatInvoice(inv)),
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: parseInt(offset) + rows.length < total
        }
      }
    });
  } catch (error) {
    console.error('getAllInvoices: Error fetching invoices:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoices'
    });
  }
};

// Update invoice status
const updateInvoice = async (req, res) => {
  const storeId = req.storeId;
  const invoiceId = req.params.id;
  const { status, notes, dueDate } = req.body;

  try {
    const updateQuery = `
      UPDATE invoice
      SET status = COALESCE($1, status),
          notes = COALESCE($2, notes),
          due_date = COALESCE($3, due_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE invoice_id = $4 AND store_id = $5
      RETURNING *
    `;

    const { rows } = await postgresPool.query(updateQuery, [
      status,
      notes,
      dueDate,
      invoiceId,
      storeId
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    // If marking as paid, create a transaction
    if (status === 'paid') {
      const invoice = rows[0];
      await postgresPool.query(`
        INSERT INTO transaction (store_id, customer_id, amount, description, date, type, method, category)
        VALUES ($1, $2, $3, $4, CURRENT_DATE, 'credit', 'cash', 'none')
      `, [
        storeId,
        invoice.customer_id,
        invoice.total_amount,
        `Payment for Invoice #${invoice.invoice_number}`
      ]);
    }

    const itemsQuery = 'SELECT * FROM invoice_item WHERE invoice_id = $1';
    const { rows: itemRows } = await postgresPool.query(itemsQuery, [invoiceId]);

    res.status(200).json({
      success: true,
      message: 'Invoice updated successfully',
      data: formatInvoice(rows[0], itemRows)
    });
  } catch (error) {
    console.error('updateInvoice: Error updating invoice:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update invoice'
    });
  }
};

// Delete invoice
const deleteInvoice = async (req, res) => {
  const storeId = req.storeId;
  const invoiceId = req.params.id;

  try {
    // Check if invoice can be deleted (only drafts)
    const checkQuery = 'SELECT status FROM invoice WHERE invoice_id = $1 AND store_id = $2';
    const { rows: checkRows } = await postgresPool.query(checkQuery, [invoiceId, storeId]);

    if (checkRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Invoice not found'
      });
    }

    if (checkRows[0].status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Only draft invoices can be deleted'
      });
    }

    // Delete will cascade to invoice_items due to FK constraint
    await postgresPool.query(
      'DELETE FROM invoice WHERE invoice_id = $1 AND store_id = $2',
      [invoiceId, storeId]
    );

    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    console.error('deleteInvoice: Error deleting invoice:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete invoice'
    });
  }
};

// Get invoice summary/stats
const getInvoiceSummary = async (req, res) => {
  const storeId = req.storeId;

  try {
    const query = `
      SELECT
        status,
        COUNT(*) as count,
        COALESCE(SUM(total_amount), 0) as total
      FROM invoice
      WHERE store_id = $1
      GROUP BY status
    `;
    const { rows } = await postgresPool.query(query, [storeId]);

    const summary = {
      draft: { count: 0, total: 0 },
      sent: { count: 0, total: 0 },
      paid: { count: 0, total: 0 },
      cancelled: { count: 0, total: 0 }
    };

    rows.forEach(r => {
      summary[r.status] = {
        count: parseInt(r.count),
        total: parseFloat(r.total)
      };
    });

    const totalInvoices = Object.values(summary).reduce((sum, s) => sum + s.count, 0);
    const totalAmount = Object.values(summary).reduce((sum, s) => sum + s.total, 0);

    res.status(200).json({
      success: true,
      data: {
        byStatus: summary,
        totalInvoices,
        totalAmount,
        paidPercentage: totalInvoices > 0 ? ((summary.paid.count / totalInvoices) * 100).toFixed(1) : 0
      }
    });
  } catch (error) {
    console.error('getInvoiceSummary: Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice summary'
    });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
  getInvoiceSummary
};
