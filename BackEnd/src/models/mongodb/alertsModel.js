const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: String,
    message: String,
    timestamp: Date,
    resolved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Alert', alertSchema);