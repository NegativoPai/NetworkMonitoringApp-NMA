const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conectado ao MongoDataBase');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDatabase:', error);
    }
};

module.exports = connectMongo;