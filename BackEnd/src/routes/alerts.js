const express = require('express');
const Alert = require('../models/mongodb/alertsModel');
const router = express.Router();
const js2xmlparser = require("js2xmlparser");

// Rota para criar um novo alerta
router.post('/alerts', async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body); // Log dos dados recebidos
        const alert = new Alert(req.body);
        await alert.save();
        console.log('Alerta salvo:', alert); // Log do alerta salvo

        // Remover o campo _id antes de converter para XML
        const alertObject = alert.toObject();
        delete alertObject._id;

        // Converter o objeto para XML
        const xmlResponse = js2xmlparser.parse("alert", alertObject);
        res.set('Content-Type', 'text/xml');
        res.status(201).send(xmlResponse); // Retorna o código de status 201 e o conteúdo XML
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar alerta');
    }
});

module.exports = router;