const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shopkeeper',
        required: true
    },
    sales: [
        {
            date: Date,
            totalAmount: Number
        }
    ],
    profit: [
        {
            date: Date,
            amount: Number
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;