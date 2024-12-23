const express = require('express');
const { createLog } = require('../controllers/loggingController');
const router = express.Router();

router.post('/', createLog);

module.exports = router;