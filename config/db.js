const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('his-bd', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = {
  database: 'his-bd',
  username: 'root',
  password: '1234',
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
};
