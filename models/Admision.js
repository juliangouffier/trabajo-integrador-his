module.exports = (sequelize, DataTypes) => {
  const Admision = sequelize.define('Admision', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    paciente_id: { type: DataTypes.INTEGER, allowNull: false },
    fecha_ingreso: { type: DataTypes.DATE, allowNull: false },
    motivo: { type: DataTypes.TEXT },
    cama_id: { type: DataTypes.INTEGER },
    estado: {
      type: DataTypes.ENUM('ACTIVA', 'CANCELADA', 'ALTA'),
      defaultValue: 'ACTIVA'
    },
    derivado_guardia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    llegada_emergencia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'admision',
    timestamps: false
  });

  Admision.associate = (models) => {
    Admision.belongsTo(models.Paciente, { foreignKey: 'paciente_id' });
    Admision.belongsTo(models.Cama, { foreignKey: 'cama_id' });
  };

  Admision.afterCreate(async (admision, options) => {
    if (admision.cama_id) {
      const { Cama } = sequelize.models;
      await Cama.update(
        { estado: 'OCUPADA' },
        { where: { id: admision.cama_id } }
      );
    }
  });

  return Admision;
};
