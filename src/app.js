const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname))
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));

const routes = require('./routes/routes');

app.use('/', routes);

module.exports = app;