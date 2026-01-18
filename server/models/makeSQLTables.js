const { createStoreTable } = require('./store');
const { createCustomerTable } = require('./customer');
const { createTransactionTable } = require('./transaction');
const { createInvoiceTable } = require('./invoice');

const setupDatabase = async () => {
  console.log('Starting database setup...\n');

  try {
    // Order matters due to foreign key constraints
    console.log('1. Creating store table...');
    await createStoreTable();

    console.log('2. Creating customer table...');
    await createCustomerTable();

    console.log('3. Creating transaction table...');
    await createTransactionTable();

    console.log('4. Creating invoice tables...');
    await createInvoiceTable();

    console.log('\n✅ All tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating tables:', error.message);
    process.exit(1);
  }
};

setupDatabase();
