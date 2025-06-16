module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dni: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    sexo: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    contacto_emergencia: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'paciente',
    timestamps: false
  });

  Paciente.associate = models => {
    Paciente.belongsTo(models.ObraSocial, {
      foreignKey: 'obra_social_id',
      as: 'obraSocial'
    });
  };

  return Paciente;
};
