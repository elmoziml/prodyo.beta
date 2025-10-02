require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Error: Could not connect to the database.', err.stack);
  } finally {
    await client.end();
  }
}

testConnection();
