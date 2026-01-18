const { postgresPool } = require('../config/');

const createTransactionTable = async () => {
  const query = `
    DO $$ BEGIN
      CREATE TYPE transaction_type AS ENUM ('credit', 'debit');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE payment_method AS ENUM ('cash', 'upi', 'neft', 'cheque', 'card');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE expense_category AS ENUM (
        'none', 'rent', 'utilities', 'supplies', 'salary',
        'marketing', 'maintenance', 'transport', 'inventory', 'other'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS transaction (
      transaction_id SERIAL PRIMARY KEY,
      store_id INT NOT NULL REFERENCES store(id) ON DELETE CASCADE,
      customer_id INT REFERENCES customer(customer_id) ON DELETE SET NULL,
      amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
      description TEXT,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      type transaction_type NOT NULL,
      method payment_method NOT NULL,
      category expense_category DEFAULT 'none',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_transaction_store ON transaction(store_id);
    CREATE INDEX IF NOT EXISTS idx_transaction_customer ON transaction(customer_id);
    CREATE INDEX IF NOT EXISTS idx_transaction_date ON transaction(date);
    CREATE INDEX IF NOT EXISTS idx_transaction_type ON transaction(type);
    CREATE INDEX IF NOT EXISTS idx_transaction_store_date ON transaction(store_id, date);
  `;

  try {
    const client = await postgresPool.connect();
    await client.query(query);
    client.release();
    console.log('Transaction table created successfully');
  } catch (error) {
    console.error('Error creating Transaction table:', error.message);
    throw error;
  }
};

module.exports = { createTransactionTable };
