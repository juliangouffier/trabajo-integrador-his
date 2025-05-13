const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db');

const sequelize = new Sequelize(dbConfig);

const Personal = require('./personal')(sequelize, DataTypes);
const Usuario = require('./usuario')(sequelize, DataTypes);

Usuario.belongsTo(Personal, { foreignKey: 'persona_id' });
Personal.hasOne(Usuario, { foreignKey: 'persona_id' });

const db = {
    sequelize,
    Personal,
    Usuario
};

module.exports = db;
