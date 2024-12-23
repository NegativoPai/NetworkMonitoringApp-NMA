const express = require('express');
const cors = require('cors');
const bodyParses = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Importando Routes
app.use('/api/monitoring', require('./routes/monitoring'));
app.use('/api/logging', require('./routes/logging'));

module.exports = app;