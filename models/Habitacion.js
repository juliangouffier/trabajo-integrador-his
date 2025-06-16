module.exports = (sequelize, DataTypes) => {
  const Habitacion = sequelize.define('Habitacion', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.STRING(10), allowNull: false },
    sector_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'habitacion', timestamps: false
  });
  Habitacion.associate = models => {
    Habitacion.belongsTo(models.Sector, {
    foreignKey: 'sector_id'
  });
    Habitacion.hasMany(models.Cama, { foreignKey: 'habitacion_id' });
  };
  return Habitacion;
};