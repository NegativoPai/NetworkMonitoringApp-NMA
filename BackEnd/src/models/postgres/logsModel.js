const pool = require('../../config/database');

const createLog = async (logData) => {
    const query = `INSERT INTO logs (message, level, timestamp) VALUES ($1, $2, $3) RETURNING *`;
    const values = [logData.message, logData.level, logData.timestamp];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = { createLog };