const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { mysqlConnection } = require('./config');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(morgan('dev')); 

mysqlConnection().then((connection) => {
    global.mysqlConnection = connection;
}).catch((err) => {
    console.error('MySQL connection error:', err);
});

// const userRoutes = require('./routes/userRoutes');
// const customerRoutes = require('./routes/customerRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const invoiceRoutes = require('./routes/invoiceRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const authRoutes = require('./routes/authRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/customers', customerRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/invoices', invoiceRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Ledger API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});