const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

pool.on('connect', () => {
    console.log('Conectado ao banco de dados PostgreSQL.');
});

pool.on('erro', (err) => {
    console.error('Erro insperado no cliente inativo', err);
    process.exit(-1);
});

module.exports = pool;