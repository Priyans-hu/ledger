const { promisePool } = require('../config/');

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
        await promisePool.query(createStoreTableQuery);
        console.log('Store table created successfully');
    } catch (error) {
        console.error('Error creating Store table:', error);
    }
};

module.exports = {
    createStoreTable,
};