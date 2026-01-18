/**
 * @fileoverview JSDoc Type Definitions for Ledger Server
 * These types provide IDE support and documentation for the server codebase.
 */

/**
 * @typedef {Object} Store
 * @property {number} id
 * @property {string} storeName
 * @property {string} phoneNumber
 * @property {string} [email]
 * @property {string} [address]
 * @property {string} [gstNumber]
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {Object} Customer
 * @property {number} customerId
 * @property {number} storeId
 * @property {string} name
 * @property {string} phoneNumber
 * @property {string} [email]
 * @property {string} address
 * @property {number} totalSpent
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {'credit' | 'debit'} TransactionType
 */

/**
 * @typedef {'cash' | 'upi' | 'neft' | 'cheque' | 'card'} PaymentMethod
 */

/**
 * @typedef {'none' | 'rent' | 'utilities' | 'supplies' | 'salary' | 'marketing' | 'maintenance' | 'transport' | 'inventory' | 'other'} ExpenseCategory
 */

/**
 * @typedef {Object} Transaction
 * @property {number} transactionId
 * @property {number} storeId
 * @property {number} [customerId]
 * @property {number} amount
 * @property {TransactionType} type
 * @property {PaymentMethod} method
 * @property {ExpenseCategory} [category]
 * @property {string} [description]
 * @property {Date} date
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {'draft' | 'sent' | 'paid' | 'cancelled'} InvoiceStatus
 */

/**
 * @typedef {Object} InvoiceItem
 * @property {number} [itemId]
 * @property {string} name
 * @property {string} [description]
 * @property {number} quantity
 * @property {number} unitPrice
 * @property {number} totalPrice
 */

/**
 * @typedef {Object} Invoice
 * @property {number} invoiceId
 * @property {string} invoiceNumber
 * @property {number} storeId
 * @property {number} [customerId]
 * @property {string} [billingAddress]
 * @property {InvoiceItem[]} items
 * @property {number} subtotal
 * @property {number} discount
 * @property {number} taxRate
 * @property {number} taxAmount
 * @property {number} totalAmount
 * @property {InvoiceStatus} status
 * @property {string} [notes]
 * @property {Date} [dueDate]
 * @property {Date} createdAt
 * @property {Date} [updatedAt]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} [message]
 * @property {Object} [data]
 */

/**
 * @typedef {Object} Pagination
 * @property {number} total
 * @property {number} limit
 * @property {number} offset
 * @property {boolean} hasMore
 */

/**
 * @typedef {Object} TransactionSummary
 * @property {number} totalCredit
 * @property {number} totalDebit
 * @property {number} netBalance
 */

/**
 * @typedef {Object} InvoiceSummary
 * @property {number} totalInvoices
 * @property {number} totalAmount
 * @property {number} paidAmount
 * @property {number} pendingAmount
 */

module.exports = {};
