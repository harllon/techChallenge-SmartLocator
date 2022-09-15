const Sequelize = require('sequelize');
const sequelize = new Sequelize('crud', 'harllon', 'flamengo', {dialect: 'postgres'});

module.exports = sequelize;