module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('Sector', {
    id:    { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre:{ type: DataTypes.STRING(100), allowNull: false }
  }, {
    tableName: 'sector',
    timestamps: false
  });

  Sector.associate = models => {
    Sector.hasMany(models.Habitacion, {
    foreignKey: 'sector_id'
    });
  };

  return Sector;
};
