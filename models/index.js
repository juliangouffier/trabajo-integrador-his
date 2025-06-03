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

// Inicializar modelos
const Personal = require('./Personal')(db, DataTypes);
const Usuario = require('./Usuario')(db, DataTypes);
const Paciente = require('./Paciente')(db, DataTypes);
const Sector = require('./sector')(db, DataTypes);
const Habitacion = require('./Habitacion')(db, DataTypes);
const Cama = require('./Cama')(db, DataTypes);
const Admision = require('./Admision')(db, DataTypes);

const models = { Usuario, Personal, Paciente, Habitacion, Sector, Cama, Admision };
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

Usuario.belongsTo(Personal, { foreignKey: 'persona_id' });
Personal.hasOne(Usuario, { foreignKey: 'persona_id' });
Cama.belongsTo(Habitacion, { foreignKey: 'habitacion_id' });
Cama.hasMany(Admision, { foreignKey: 'cama_id' });

Habitacion.belongsTo(Sector, { foreignKey: 'sector_id' });
Habitacion.hasMany(Cama, { foreignKey: 'habitacion_id' });

Admision.belongsTo(Paciente, { foreignKey: 'paciente_id' });
Admision.belongsTo(Cama, { foreignKey: 'cama_id' });

module.exports = {
  sequelize: db,
  Sequelize,
  ...models 
};
