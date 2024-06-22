const { promisePool } = require('../config/');

const createCustomerTable = async () => {
    try {
        const createCustomerTableQuery = `
            CREATE TABLE IF NOT EXISTS customer (
                customerId INT AUTO_INCREMENT PRIMARY KEY,
                storeId INT NOT NULL,
                phoneNumber VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255),
                address VARCHAR(255) NOT NULL,
                totalSpent DECIMAL(10, 2) DEFAULT 0,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_store_phone (storeId, phoneNumber)
            )
        `;
        await promisePool.query(createCustomerTableQuery);
        console.log('Customer table created successfully');
    } catch (error) {
        console.error('Error creating Customer table:', error);
    }
};

module.exports = {
    createCustomerTable
};