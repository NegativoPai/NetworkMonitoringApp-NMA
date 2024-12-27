const express = require('express');
const pool = require('../config/database');
const router = express.Router();

//Listando todos os dispositivos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM devices ORDER BY last_updated DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
});

//Adicionando um novo dispositivo
router.post('/', async (req, res) => {
    const { name, ip_adress, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO devices (nome, endereco_ip, status) VALUES ($1, $2, $3) RETURNING *',
            [nome, endereco_ip, status]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;