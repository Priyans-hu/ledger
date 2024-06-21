const { createStoreTable } = require('./store');
const { createCustomerTable } = require('./customer');

const setupDatabase = async () => {
    try {
        await createStoreTable();
        await createCustomerTable();
        console.log('All tables created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating tables:', error);
        process.exit(1);
    }
};

setupDatabase();
