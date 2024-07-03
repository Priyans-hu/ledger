const { postgresPool } = require('../config/');

const createCustomerTable = async () => {
    try {
        const createCustomerTableQuery = `
            CREATE TABLE IF NOT EXISTS customer (
                customerId SERIAL PRIMARY KEY,
                storeId INT NOT NULL,
                phoneNumber VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                address VARCHAR(255) NOT NULL,
                totalSpent NUMERIC(10, 2) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const client = await postgresPool.connect();
        await client.query(createCustomerTableQuery);
        client.release();
        console.log('Customer table created successfully');
    } catch (error) {
        console.error('Error creating Customer table:', error);
    }
};

module.exports = {
    createCustomerTable
};