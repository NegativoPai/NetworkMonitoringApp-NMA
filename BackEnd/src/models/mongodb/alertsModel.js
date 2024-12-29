const mongoose = require('mongoose');

// Definição do esquema para a coleção 'alerts'
const alertSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Tipo de alerta
    message: { type: String, required: true }, // Mensagem do alerta
    timestamp: { type: Date, required: true }, // Data e hora do alerta
    resolved: { type: Boolean, default: false }, // Status de resolução do alerta
});

// Exporta o modelo 'Alert' baseado no esquema 'alertSchema'
module.exports = mongoose.model('Alert', alertSchema);