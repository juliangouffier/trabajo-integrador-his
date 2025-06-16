module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Personal', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        fecha_nacimiento: DataTypes.DATE,
        sexo: {
            type: DataTypes.ENUM('M', 'F'),
            allowNull: false,
        },
        documento: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('ENFERMERO', 'MEDICO'),
        },
    }, {
        tableName: 'personal',
        timestamps: false,
    });
};
