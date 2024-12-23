const { logMessage } = require('../services/loggingService');

const createLog = async (req, res) => {
    try{
        const { message, level } = req.body;
        const log = await logMessage(message, level);
        res.status(201).json(log);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao criar o log' });
    }
};

module.exports = { createLog };