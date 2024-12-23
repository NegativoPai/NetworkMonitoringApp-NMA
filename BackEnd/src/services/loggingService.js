const { createLog } = require('../models/postgres/logsModel');

const logMessage = async (message, level = 'INFO') => {
    const logData = {
        message,
        level,
        timestamp: new Date(),
    };
    return await createLog(logData);
};

module.exports = { logMessage };