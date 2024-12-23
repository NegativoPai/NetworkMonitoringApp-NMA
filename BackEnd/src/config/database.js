const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

pool.on('connect', () => {
    console.log('Connectado ao PostgreSQL');
});

module.exports = pool;