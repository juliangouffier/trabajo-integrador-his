module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        email: DataTypes.STRING(255),
        telefono: DataTypes.STRING(50),
    }, {
        tableName: 'usuarios',
        timestamps: false,
    });
};
