const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// define routes api
const apiRoute = require('./routes/api');
app.use(bodyParser.json());

app.use('/api', apiRoute);

module.exports = app;



    