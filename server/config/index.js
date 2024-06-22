const mongoose = require('mongoose');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// MySQL connection
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const promisePool = pool.promise();

const mysqlConnection = async () => {
    try {
        const promisePool = pool.promise(); 
        const [rows, fields] = await promisePool.query('SELECT 1');
        console.log('MySQL connected successfully');
        return promisePool;
    } catch (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
};

module.exports = { mongoose, mysqlConnection, promisePool };