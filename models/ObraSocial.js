module.exports = (sequelize, DataTypes) => {
  const ObraSocial = sequelize.define('ObraSocial', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    descripcion: { type: DataTypes.TEXT }
  }, {
    tableName: 'obra_social',
    timestamps: false
  });

  ObraSocial.associate = models => {
    ObraSocial.hasMany(models.Paciente, { foreignKey: 'obra_social_id' });
  };

  return ObraSocial;
};
