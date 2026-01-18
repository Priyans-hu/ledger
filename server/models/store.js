const { postgresPool } = require('../config/');

const createStoreTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS store (
      id SERIAL PRIMARY KEY,
      store_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE,
      auth VARCHAR(255) NOT NULL,
      address TEXT,
      gst_number VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_store_phone ON store(phone_number);
    CREATE INDEX IF NOT EXISTS idx_store_email ON store(email);
  `;

  try {
    const client = await postgresPool.connect();
    await client.query(query);
    client.release();
    console.log('Store table created successfully');
  } catch (error) {
    console.error('Error creating Store table:', error.message);
    throw error;
  }
};

module.exports = { createStoreTable };
