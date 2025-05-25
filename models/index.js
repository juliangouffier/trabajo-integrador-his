const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const db = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

const Personal = require('./personal')(db, DataTypes);
const Usuario = require('./usuario')(db, DataTypes);
const Paciente = require('./paciente')(db, DataTypes);

Usuario.belongsTo(Personal, { foreignKey: 'persona_id' });
Personal.hasOne(Usuario, { foreignKey: 'persona_id' });
module.exports = {
  sequelize: db,
  Sequelize,
  Usuario,
  Personal,
  Paciente
};
