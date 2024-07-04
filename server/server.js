const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { postgresPool } = require('./config');
const decodeTokenMiddleware = require('./middleware/authenticate');

dotenv.config();

const app = express();

const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://192.168.1.87:3000',
    'https://ledger-yqdz.onrender.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        const isAllowed = allowedOrigins.includes(origin) || !origin;
        callback(null, isAllowed);
    },
    credentials: true, // Enable credentials (e.g., cookies, HTTP authentication)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Route imports
const storeRoutes = require('./routes/storeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Use routes
app.use('/api/store', storeRoutes);
app.use('/api/customer', decodeTokenMiddleware, customerRoutes);
app.use('/api/transaction', decodeTokenMiddleware, transactionRoutes);

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
