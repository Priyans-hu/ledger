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

// Route imports
const storeRoutes = require('./routes/storeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Use routes
app.use('/api/users', storeRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/transaction', transactionRoutes);


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
