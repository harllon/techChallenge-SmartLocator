const Sequelize = require('sequelize');
const sequelize = new Sequelize('apiCrud', 'root', 'root', {dialect: 'postgres'});

module.exports = sequelize;