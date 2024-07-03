const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Check if environment variables are loaded correctly
if (!process.env.PG_USER || !process.env.PG_PASSWORD) {
    console.error('PostgreSQL connection error: PG_USER or PG_PASSWORD is not defined in environment variables');
    process.exit(1);
}

// MongoDB connection
// Uncomment and ensure process.env.MONGO_URI is defined in your .env file
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected successfully'))
//     .catch((err) => console.error('MongoDB connection error:', err));

// PostgreSQL connection
const postgresPool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {rejectUnauthorized: false,},
});

const postgresConnection = async () => {
    try {
        const client = await postgresPool.connect();
        await client.query('SELECT 1');
        console.log('PostgreSQL connected successfully');
        client.release();
    } catch (err) {
        console.error('PostgreSQL connection error:', err);
        throw err;
    }
};

// Call the postgresConnection function to test the connection
postgresConnection().catch(err => {
    console.error('Failed to connect to PostgreSQL:', err);
    process.exit(1);
});

module.exports = { mongoose, postgresConnection, postgresPool };