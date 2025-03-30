// This function allows running database migrations from Netlify
const { execSync } = require('child_process');
const { Pool } = require('pg');

// Test database connection
async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  
  try {
    const client = await pool.connect();
    console.log('Successfully connected to database');
    client.release();
    return true;
  } catch (err) {
    console.error('Failed to connect to database:', err.message);
    return false;
  } finally {
    await pool.end();
  }
}

exports.handler = async function(event, context) {
  console.log('Running database migrations...');
  
  try {
    // First test if we can connect to the database
    const connected = await testConnection();
    if (!connected) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Database connection failed. Check DATABASE_URL environment variable.'
        })
      };
    }
    
    // Run the drizzle-kit migration
    console.log('Running drizzle-kit push...');
    const output = execSync('npx drizzle-kit push').toString();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Database migrations completed successfully',
        output
      })
    };
  } catch (error) {
    console.error('Error running migrations:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error running migrations',
        error: error.message,
        stack: error.stack
      })
    };
  }
};