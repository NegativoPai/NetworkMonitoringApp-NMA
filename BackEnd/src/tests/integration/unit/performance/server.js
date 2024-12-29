const express = require('express');
const http = require('http');
const configureWebSocket = require('./src/config/socket');
const AlertsService = require('./src/services/alertsService');
const PacketAnalyzer = require('./src/services/packetAnalyzer');
const app = express();
const pool = require('./src/config/database');
const devicesRouter = require('./src/routes/devices');

//middleware
app.use(express.json());

//rotas
app.use('/devices', deviceRouter);

//criar o server http
const server = http.createServer(app);

const io = configureWebSocket(server);

const alertsService = new AlertsService(io);

const packetAnalyzer = new PacketAnalyzer();
packetAnalyzer.startCapture('eth0');

setInterval(() => {
    alertsService.createAlert('Exemplo de alerta crítico!', 'critical');
}, 10000);

setTimeout(() => {
    packetAnalyzer.stopCapture();
}, 60000);

pool.connect((err, client, release) => {
    if (err) {
        console.error('Erro ao conectarse ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao database com sucesso.');
        release();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});