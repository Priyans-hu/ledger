const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
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
const mysqlConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
        console.log('MySQL connected successfully');
        return connection;
    } catch (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
};

module.exports = { mongoose, mysqlConnection };

// const { Pool } = require('pg');
// PostgreSQL connection
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URI,
// });
// pool.connect()
//     .then(() => console.log('PostgreSQL connected successfully'))
//     .catch((err) => console.error('PostgreSQL connection error:', err));

// module.exports = { mongoose, pool };
