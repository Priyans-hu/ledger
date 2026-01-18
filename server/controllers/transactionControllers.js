const { postgresPool } = require('../config/');
const { format, subMonths, lastDayOfMonth, startOfMonth, endOfMonth } = require('date-fns');
const { stringify } = require('csv-stringify/sync');

// Helper to format transaction for response
const formatTransaction = (t) => ({
  transactionId: t.transaction_id,
  storeId: t.store_id,
  customerId: t.customer_id,
  amount: parseFloat(t.amount),
  description: t.description,
  date: t.date,
  type: t.type,
  method: t.method,
  category: t.category,
  createdAt: t.created_at,
  updatedAt: t.updated_at
});

// Create a new transaction
const createTransaction = async (req, res) => {
  const storeId = req.storeId;
  const { amount, description, date, type, method, customerId, category } = req.body;

  try {
    // Verify customer belongs to store if provided
    if (customerId) {
      const customerCheck = await postgresPool.query(
        'SELECT customer_id FROM customer WHERE customer_id = $1 AND store_id = $2',
        [customerId, storeId]
      );
      if (customerCheck.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Customer not found or does not belong to your store'
        });
      }
    }

    const insertQuery = `
      INSERT INTO transaction (store_id, customer_id, amount, description, date, type, method, category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const { rows } = await postgresPool.query(insertQuery, [
      storeId,
      customerId || null,
      amount,
      description || null,
      date || new Date().toISOString().split('T')[0],
      type,
      method,
      category || 'none'
    ]);

    // Update customer total spent if this is a debit transaction (customer purchase)
    if (customerId && type === 'credit') {
      await postgresPool.query(
        'UPDATE customer SET total_spent = total_spent + $1 WHERE customer_id = $2',
        [amount, customerId]
      );
    }

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: formatTransaction(rows[0])
    });
  } catch (error) {
    console.error('createTransaction: Error creating transaction:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction'
    });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  const storeId = req.storeId;
  const transactionId = req.params.id;
  const { amount, description, date, type, method, category } = req.body;

  try {
    const checkQuery = 'SELECT * FROM transaction WHERE transaction_id = $1 AND store_id = $2';
    const { rows: existing } = await postgresPool.query(checkQuery, [transactionId, storeId]);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    const updateQuery = `
      UPDATE transaction
      SET amount = COALESCE($1, amount),
          description = COALESCE($2, description),
          date = COALESCE($3, date),
          type = COALESCE($4, type),
          method = COALESCE($5, method),
          category = COALESCE($6, category),
          updated_at = CURRENT_TIMESTAMP
      WHERE transaction_id = $7 AND store_id = $8
      RETURNING *
    `;

    const { rows } = await postgresPool.query(updateQuery, [
      amount,
      description,
      date,
      type,
      method,
      category,
      transactionId,
      storeId
    ]);

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: formatTransaction(rows[0])
    });
  } catch (error) {
    console.error('updateTransaction: Error updating transaction:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update transaction'
    });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  const storeId = req.storeId;
  const transactionId = req.params.id;

  try {
    const deleteQuery = `
      DELETE FROM transaction
      WHERE transaction_id = $1 AND store_id = $2
      RETURNING transaction_id
    `;
    const { rows } = await postgresPool.query(deleteQuery, [transactionId, storeId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('deleteTransaction: Error deleting transaction:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction'
    });
  }
};

// Get all transactions for a store
const getTransactions = async (req, res) => {
  const storeId = req.storeId;
  const { type, method, category, limit = 100, offset = 0 } = req.query;

  try {
    let query = 'SELECT * FROM transaction WHERE store_id = $1';
    const params = [storeId];
    let paramIndex = 2;

    if (type) {
      query += ` AND type = $${paramIndex++}`;
      params.push(type);
    }
    if (method) {
      query += ` AND method = $${paramIndex++}`;
      params.push(method);
    }
    if (category && category !== 'none') {
      query += ` AND category = $${paramIndex++}`;
      params.push(category);
    }

    query += ` ORDER BY date DESC, created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
    params.push(parseInt(limit), parseInt(offset));

    const { rows } = await postgresPool.query(query, params);

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        count: rows.length
      }
    });
  } catch (error) {
    console.error('getTransactions: Error fetching transactions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

// Get transactions for a specific date
const getTransactionsByDate = async (req, res) => {
  const storeId = req.storeId;
  const { date } = req.query;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1 AND date = $2
      ORDER BY created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId, date]);

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        count: rows.length,
        date
      }
    });
  } catch (error) {
    console.error('getTransactionsByDate: Error fetching transactions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

// Get transactions for a specific month
const getTransactionsByMonth = async (req, res) => {
  const storeId = req.storeId;
  const { month, year = new Date().getFullYear() } = req.query;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1
        AND EXTRACT(MONTH FROM date) = $2
        AND EXTRACT(YEAR FROM date) = $3
      ORDER BY date DESC, created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId, month, year]);

    // Calculate totals
    let totalCredit = 0;
    let totalDebit = 0;
    rows.forEach(t => {
      if (t.type === 'credit') totalCredit += parseFloat(t.amount);
      else totalDebit += parseFloat(t.amount);
    });

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        summary: {
          count: rows.length,
          totalCredit,
          totalDebit,
          net: totalCredit - totalDebit
        },
        month: parseInt(month),
        year: parseInt(year)
      }
    });
  } catch (error) {
    console.error('getTransactionsByMonth: Error fetching transactions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

// Get transactions for a specific period
const getTransactionsByPeriod = async (req, res) => {
  const storeId = req.storeId;
  const { startDate, endDate } = req.query;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1 AND date BETWEEN $2 AND $3
      ORDER BY date DESC, created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId, startDate, endDate]);

    let totalCredit = 0;
    let totalDebit = 0;
    rows.forEach(t => {
      if (t.type === 'credit') totalCredit += parseFloat(t.amount);
      else totalDebit += parseFloat(t.amount);
    });

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        summary: {
          count: rows.length,
          totalCredit,
          totalDebit,
          net: totalCredit - totalDebit
        },
        startDate,
        endDate
      }
    });
  } catch (error) {
    console.error('getTransactionsByPeriod: Error fetching transactions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

// Get transaction count for past 12 months
const getNumberOfTransactionsInPast12months = async (req, res) => {
  const storeId = req.storeId;

  try {
    const months = [];
    for (let i = 11; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      months.push({
        month: format(date, 'yyyy-MM'),
        label: format(date, 'MMM yyyy'),
        startDate: format(startOfMonth(date), 'yyyy-MM-dd'),
        endDate: format(endOfMonth(date), 'yyyy-MM-dd')
      });
    }

    const monthlyData = await Promise.all(
      months.map(async ({ month, label, startDate, endDate }) => {
        const query = `
          SELECT
            COUNT(*) as count,
            COALESCE(SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END), 0) as credit,
            COALESCE(SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END), 0) as debit
          FROM transaction
          WHERE store_id = $1 AND date BETWEEN $2 AND $3
        `;
        const { rows } = await postgresPool.query(query, [storeId, startDate, endDate]);
        return {
          month,
          label,
          count: parseInt(rows[0].count),
          credit: parseFloat(rows[0].credit),
          debit: parseFloat(rows[0].debit)
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        monthlyTransactionCounts: monthlyData
      }
    });
  } catch (error) {
    console.error('getNumberOfTransactionsInPast12months: Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch monthly data'
    });
  }
};

// Get transactions for a specific customer
const getTransactionsByCustomer = async (req, res) => {
  const storeId = req.storeId;
  const { customerId } = req.params;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1 AND customer_id = $2
      ORDER BY date DESC, created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId, customerId]);

    let totalCredit = 0;
    let totalDebit = 0;
    rows.forEach(t => {
      if (t.type === 'credit') totalCredit += parseFloat(t.amount);
      else totalDebit += parseFloat(t.amount);
    });

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        summary: {
          count: rows.length,
          totalCredit,
          totalDebit
        },
        customerId: parseInt(customerId)
      }
    });
  } catch (error) {
    console.error('getTransactionsByCustomer: Error fetching transactions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions'
    });
  }
};

// Get credit transactions
const getAllCreditTransactions = async (req, res) => {
  const storeId = req.storeId;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1 AND type = 'credit'
      ORDER BY date DESC, created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId]);

    const total = rows.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        total,
        count: rows.length
      }
    });
  } catch (error) {
    console.error('getAllCreditTransactions: Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credit transactions'
    });
  }
};

// Get debit transactions
const getAllDebitTransactions = async (req, res) => {
  const storeId = req.storeId;

  try {
    const query = `
      SELECT * FROM transaction
      WHERE store_id = $1 AND type = 'debit'
      ORDER BY date DESC, created_at DESC
    `;
    const { rows } = await postgresPool.query(query, [storeId]);

    const total = rows.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        total,
        count: rows.length
      }
    });
  } catch (error) {
    console.error('getAllDebitTransactions: Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch debit transactions'
    });
  }
};

// Export transactions to CSV
const exportTransactions = async (req, res) => {
  const storeId = req.storeId;
  const { startDate, endDate, type, format: exportFormat = 'csv' } = req.query;

  try {
    let query = `
      SELECT t.*, c.name as customer_name
      FROM transaction t
      LEFT JOIN customer c ON t.customer_id = c.customer_id
      WHERE t.store_id = $1
    `;
    const params = [storeId];
    let paramIndex = 2;

    if (startDate && endDate) {
      query += ` AND t.date BETWEEN $${paramIndex++} AND $${paramIndex++}`;
      params.push(startDate, endDate);
    }

    if (type) {
      query += ` AND t.type = $${paramIndex}`;
      params.push(type);
    }

    query += ' ORDER BY t.date DESC, t.created_at DESC';

    const { rows } = await postgresPool.query(query, params);

    if (exportFormat === 'csv') {
      const csvData = rows.map(t => ({
        'Transaction ID': t.transaction_id,
        'Date': format(new Date(t.date), 'yyyy-MM-dd'),
        'Type': t.type.toUpperCase(),
        'Amount': parseFloat(t.amount).toFixed(2),
        'Method': t.method.toUpperCase(),
        'Category': t.category,
        'Description': t.description || '',
        'Customer': t.customer_name || '-',
        'Created At': format(new Date(t.created_at), 'yyyy-MM-dd HH:mm:ss')
      }));

      const csvString = stringify(csvData, { header: true });

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=transactions_${format(new Date(), 'yyyyMMdd')}.csv`);
      return res.send(csvString);
    }

    // JSON export
    res.status(200).json({
      success: true,
      data: {
        transactions: rows.map(formatTransaction),
        exportedAt: new Date().toISOString(),
        count: rows.length
      }
    });
  } catch (error) {
    console.error('exportTransactions: Error exporting:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to export transactions'
    });
  }
};

// Get expense summary by category
const getExpenseSummary = async (req, res) => {
  const storeId = req.storeId;
  const { startDate, endDate } = req.query;

  try {
    let query = `
      SELECT category, COUNT(*) as count, SUM(amount) as total
      FROM transaction
      WHERE store_id = $1 AND type = 'debit'
    `;
    const params = [storeId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN $2 AND $3';
      params.push(startDate, endDate);
    }

    query += ' GROUP BY category ORDER BY total DESC';

    const { rows } = await postgresPool.query(query, params);

    const summary = rows.map(r => ({
      category: r.category,
      count: parseInt(r.count),
      total: parseFloat(r.total)
    }));

    const grandTotal = summary.reduce((sum, r) => sum + r.total, 0);

    res.status(200).json({
      success: true,
      data: {
        categories: summary,
        grandTotal,
        startDate: startDate || null,
        endDate: endDate || null
      }
    });
  } catch (error) {
    console.error('getExpenseSummary: Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch expense summary'
    });
  }
};

module.exports = {
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsByDate,
  getTransactionsByMonth,
  getTransactionsByPeriod,
  getTransactionsByCustomer,
  getNumberOfTransactionsInPast12months,
  getAllCreditTransactions,
  getAllDebitTransactions,
  exportTransactions,
  getExpenseSummary
};
