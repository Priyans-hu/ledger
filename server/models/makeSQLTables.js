const { createStoreTable } = require('./store');
const { createCustomerTable } = require('./customer');
const { createTransactionTable } = require('./transaction');
const { postgresPool } = require('../config/');

const setupDatabase = async () => {
    try {
        await createStoreTable();
        await createCustomerTable();
        await createTransactionTable();
        console.log('All tables created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating tables:', error);
        process.exit(1);
    }
};

setupDatabase();