const { Pool } = require('pg');

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco_de_dados',
    password: 'sua_senha',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connectado ao PostgreSQL');
});

module.exports = pool;