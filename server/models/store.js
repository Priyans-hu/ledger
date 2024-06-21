const bcrypt = require('bcryptjs');
const { pool } = require('../dbConfig');

const createStoreTable = async () => {
    try {
        const createStoreTableQuery = `
            CREATE TABLE IF NOT EXISTS store (
                id INT AUTO_INCREMENT PRIMARY KEY,
                storeName VARCHAR(255),
                phoneNumber VARCHAR(255) UNIQUE,
                auth VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        const client = await pool.connect();
        await client.query(createStoreTableQuery);
        console.log('Store table created successfully');
        client.release();
    } catch (error) {
        console.error('Error creating Store table:', error);
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const createStore = async (storeName, phoneNumber, auth) => {
    try {
        const hashedPassword = await hashPassword(auth);
        const createStoreQuery = `
            INSERT INTO store (storeName, phoneNumber, auth)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const client = await pool.connect();
        const { rows } = await client.query(createStoreQuery, [storeName, phoneNumber, hashedPassword]);
        console.log('Store inserted successfully:', rows[0]);
        client.release();
        return rows[0];
    } catch (error) {
        console.error('Error inserting store:', error);
        return null;
    }
};

module.exports = {
    createStoreTable,
    createStore
};