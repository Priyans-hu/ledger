const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['PG_USER', 'PG_PASSWORD', 'PG_HOST', 'PG_DATABASE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  process.exit(1);
}

// PostgreSQL connection pool configuration
const poolConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Enable SSL for production environments
if (process.env.NODE_ENV === 'production' || process.env.PG_SSL === 'true') {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const postgresPool = new Pool(poolConfig);

// Test database connection
const testConnection = async () => {
  try {
    const client = await postgresPool.connect();
    await client.query('SELECT NOW()');
    console.log('PostgreSQL connected successfully');
    client.release();
  } catch (err) {
    console.error('PostgreSQL connection error:', err.message);
    throw err;
  }
};

// Initialize connection on module load
testConnection().catch(err => {
  console.error('Failed to connect to PostgreSQL:', err.message);
  process.exit(1);
});

// Graceful shutdown handler
const gracefulShutdown = async () => {
  console.log('Closing PostgreSQL pool...');
  await postgresPool.end();
  console.log('PostgreSQL pool closed');
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

module.exports = { postgresPool, testConnection };
