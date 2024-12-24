const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/seu_banco_de_dados');
        console.log('MongoDB conectado com sucesso');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;