require('dotenv').config();

const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

console.log('is this production? ', isProduction);

const connectionString = 'postgresql://jessebreuer-penello@localhost:5432/imdbest';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: false
});

module.exports = { pool };
