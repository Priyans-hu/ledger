const { promisePool } = require('../config/');

const createTransactionTable = async () => {
    try {
        const createTransactionTableQuery = `
            CREATE TABLE IF NOT EXISTS transaction (
                transactionId INT AUTO_INCREMENT PRIMARY KEY,
                amount DECIMAL(10, 2) NOT NULL,
                description TEXT,
                date DATE,
                type ENUM('debit', 'credit') NOT NULL,
                method ENUM('cash', 'upi', 'neft', 'cheque') NOT NULL,
                storeId INT NOT NULL,
                customerId INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (storeId) REFERENCES store(id),
                FOREIGN KEY (customerId) REFERENCES customer(customerId)
            )
        `;
        await promisePool.query(createTransactionTableQuery);
        console.log('Transaction table created successfully');
    } catch (error) {
        console.error('Error creating Transaction table:', error);
    }
};

module.exports = {
    createTransactionTable
};