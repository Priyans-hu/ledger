const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store', // Assuming 'Store' is the correct model name
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    items: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    subtotal: {
        type: Number,
        required: true
    },
    taxAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
