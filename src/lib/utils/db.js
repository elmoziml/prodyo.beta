// lib/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function queryDB(text, params) {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err.stack);
    throw err;
  }
}
