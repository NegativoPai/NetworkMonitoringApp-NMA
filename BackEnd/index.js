const express = require('express');
const mongoose = require('mongoose');
const pool = require('./src/config/database'); // Importa a configuração do PostgreSQL
const connectDB = require('./src/config/mongo'); // Importa a função de conexão com o MongoDB
const logsRouter = require('./src/routes/logs'); // Importa as rotas de logs
const alertsRouter = require('./src/routes/alerts'); // Importa as rotas de alertas

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conecta ao MongoDB
connectDB();

// Rota de teste para PostgreSQL
app.get('/test-postgres', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao conectar ao PostgreSQL');
    }
});

// Rota de teste para MongoDB
app.get('/test-mongo', async (req, res) => {
    try {
        const result = await mongoose.connection.db.admin().ping();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao conectar ao MongoDB');
    }
});

// Usar as rotas
app.use('/api', logsRouter);
app.use('/api', alertsRouter);

app.get('/', (req, res) => {
    res.send('Servidor Backend está rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});