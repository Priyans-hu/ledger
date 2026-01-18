const { postgresPool } = require('../config/');

const createCustomerTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS customer (
      customer_id SERIAL PRIMARY KEY,
      store_id INT NOT NULL REFERENCES store(id) ON DELETE CASCADE,
      phone_number VARCHAR(20) NOT NULL,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      address TEXT NOT NULL,
      total_spent NUMERIC(12, 2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(store_id, phone_number)
    );

    CREATE INDEX IF NOT EXISTS idx_customer_store ON customer(store_id);
    CREATE INDEX IF NOT EXISTS idx_customer_phone ON customer(phone_number);
    CREATE INDEX IF NOT EXISTS idx_customer_name ON customer(name);
  `;

  try {
    const client = await postgresPool.connect();
    await client.query(query);
    client.release();
    console.log('Customer table created successfully');
  } catch (error) {
    console.error('Error creating Customer table:', error.message);
    throw error;
  }
};

module.exports = { createCustomerTable };
