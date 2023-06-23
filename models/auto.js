'use strict';
module.exports = (sequelize, DataTypes) => {
    const auto = sequelize.define('auto',{
        modelo:{type: DataTypes.STRING(20), defaultValue: 'NOT_DATA'},
        precio:{type: DataTypes.FLOAT, defaultValue: 0.0},
        color: {type: DataTypes.STRING(20), defaultValue: 'NOT_DATA'},
        placa: {type: DataTypes.STRING(10), defaultValue: 'NOT_DATA'},
        anio:{type: DataTypes.INTEGER,defaultValue: 2023},
        estado:{type: DataTypes.BOOLEAN, defaultValue: true,},
        stock:{type: DataTypes.INTEGER, defaultValue: 1},
        externalId: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true,},
    },{freezeTableName: true})

    auto.associate = function (models) {auto.belongsTo(models.marca,{ foreignKey: 'id_marca'});
        auto.hasMany(models.detalleFactura,{ foreignKey: 'id_auto', as: "detalleFactura"})
    }
    auto.beforeSave(async (auto) => {if (auto.stock === 0) {
            auto.estado = false;
        }
    });

    return auto;
}