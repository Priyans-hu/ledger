const { postgresPool } = require('../config');

const createTransactionTable = async () => {
    try {
        const createTransactionTableQuery = `
            CREATE TABLE IF NOT EXISTS "transaction" (
                transactionId SERIAL PRIMARY KEY,
                amount NUMERIC(10, 2) NOT NULL,
                description TEXT,
                date DATE,
                type VARCHAR(10) CHECK(type IN ('debit', 'credit')) NOT NULL,
                method VARCHAR(10) CHECK(method IN ('cash', 'upi', 'neft', 'cheque')) NOT NULL,
                storeId INT NOT NULL,
                customerId INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        const client = await postgresPool.connect();
        await client.query(createTransactionTableQuery);
        client.release();
        console.log('Transaction table created successfully');
    } catch (error) {
        console.error('Error creating Transaction table:', error);
    }
};

module.exports = {
    createTransactionTable
};