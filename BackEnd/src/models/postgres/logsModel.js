const pool = require('../../config/database'); // Importa o pool de conexão do PostgreSQL

// Função para criar um novo log
const createLog = async (logData) => {
    const query = `INSERT INTO logs (message, level, timestamp) VALUES ($1, $2, $3) RETURNING *`; // Query SQL para inserir um novo log
    const values = [logData.message, logData.level, logData.timestamp]; // Valores a serem inseridos
    const result = await pool.query(query, values); // Executa a query
    return result.rows[0]; // Retorna o registro inserido
};

// Função para listar todos os logs
const getLogs = async () => {
    const query = `SELECT * FROM logs ORDER BY timestamp DESC`; // Query SQL para listar todos os logs
    const result = await pool.query(query); // Executa a query
    return result.rows; // Retorna os registros
};

// Função para buscar um log por ID
const getLogById = async (id) => {
    const query = `SELECT * FROM logs WHERE id = $1`; // Query SQL para buscar um log por ID
    const values = [id]; // Valor do ID
    const result = await pool.query(query, values); // Executa a query
    return result.rows[0]; // Retorna o registro
};

module.exports = { createLog, getLogs, getLogById }; // Exporta as funções