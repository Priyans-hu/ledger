const { postgresPool } = require('../config/');

const createInvoiceTable = async () => {
  const query = `
    DO $$ BEGIN
      CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'cancelled');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS invoice (
      invoice_id SERIAL PRIMARY KEY,
      store_id INT NOT NULL REFERENCES store(id) ON DELETE CASCADE,
      customer_id INT REFERENCES customer(customer_id) ON DELETE SET NULL,
      invoice_number VARCHAR(50) UNIQUE NOT NULL,
      billing_address TEXT NOT NULL,
      subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
      tax_rate NUMERIC(5, 2) DEFAULT 0,
      tax_amount NUMERIC(12, 2) DEFAULT 0,
      discount NUMERIC(12, 2) DEFAULT 0,
      total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
      status invoice_status DEFAULT 'draft',
      notes TEXT,
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS invoice_item (
      item_id SERIAL PRIMARY KEY,
      invoice_id INT NOT NULL REFERENCES invoice(invoice_id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      quantity INT NOT NULL CHECK (quantity > 0),
      unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
      total_price NUMERIC(12, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_invoice_store ON invoice(store_id);
    CREATE INDEX IF NOT EXISTS idx_invoice_customer ON invoice(customer_id);
    CREATE INDEX IF NOT EXISTS idx_invoice_number ON invoice(invoice_number);
    CREATE INDEX IF NOT EXISTS idx_invoice_status ON invoice(status);
    CREATE INDEX IF NOT EXISTS idx_invoice_item_invoice ON invoice_item(invoice_id);
  `;

  try {
    const client = await postgresPool.connect();
    await client.query(query);
    client.release();
    console.log('Invoice tables created successfully');
  } catch (error) {
    console.error('Error creating Invoice tables:', error.message);
    throw error;
  }
};

module.exports = { createInvoiceTable };
