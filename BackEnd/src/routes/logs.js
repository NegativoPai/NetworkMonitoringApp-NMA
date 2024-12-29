const express = require('express');
const { createLog, getLogs, getLogById } = require('../models/postgres/logsModel');
const router = express.Router();

// Rota para criar um novo log
router.post('/logs', async (req, res) => {
    try {
        const log = await createLog(req.body);
        res.status(201).json(log);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar log');
    }
});

// Rota para listar todos os logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await getLogs();
        res.status(200).json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao listar logs');
    }
});

// Rota para buscar um log por ID
router.get('/logs/:id', async (req, res) => {
    try {
        const log = await getLogById(req.params.id);
        if (log) {
            res.status(200).json(log);
        } else {
            res.status(404).send('Log não encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar log');
    }
});

module.exports = router;