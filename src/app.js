const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const db = require('./database/queries')
const path = require('path');

app.use(express.static(__dirname))
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/plain" }));

const indexRoute = require('./routes/indexRoute');
const usersRoute = require('./routes/usersRoute')

app.get('/', function(req, res) {
    res.render(path.join(__dirname, '/login.html'));
});
app.get('/beer', function(req, res) {
    res.render(path.join(__dirname, '/beer.html'));
});
//app.use('/', indexRoute);
//app.use('/users', usersRoute);
app.get('/users', db.getUsers)
app.post('/login', db.loginUser)
app.get('/logout', db.logoutUser)
app.get('/users/me', db.authUser)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

module.exports = app;