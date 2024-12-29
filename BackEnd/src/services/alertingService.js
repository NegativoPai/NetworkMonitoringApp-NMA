const pool = require('./src/config/database');

//Emitindo alertas via websocket
const sendAlert = (io, message, level = 'critical') => {
    io.emit('alert', { message, level, timestamp: new Date().toISOString() });

    //Registrando no database
    pool.query(
        'INSERT INTO network_logs (message, level) VALUES ($1, $2)',
        [message, level],
        (err) => {
            if (err) console.error('Erro ao salvar alerta:', err.message);
        }
    );
};