module.exports = (sequelize, DataTypes) => {
  const Cama = sequelize.define('Cama', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    numero: { type: DataTypes.STRING(10), allowNull: false },
    habitacion_id: { type: DataTypes.INTEGER, allowNull: false },
    estado: {
      type: DataTypes.ENUM('LIBRE','OCUPADA','HIGIENIZANDO'),
      allowNull: false,
      defaultValue: 'LIBRE'
    }
  }, {
    tableName: 'cama', timestamps: false
  });
  Cama.associate = models => {
    Cama.belongsTo(models.Habitacion, { foreignKey: 'habitacion_id' });
  };
  return Cama;
};