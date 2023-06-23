'use strict';
module.exports = (sequelize, DataTypes) => {
    const factura = sequelize.define('factura', {
        numeroFactura: {type: DataTypes.INTEGER, allowNull: false },
        fecha: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        total:{type: DataTypes.FLOAT,defaultValue: null},
        externalId: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true,},
    }, { freezeTableName: true });

    factura.associate = function (models) {
        factura.hasMany(models.detalleFactura, { foreignKey: 'id_factura', as: "detalleFactura"});
        factura.belongsTo(models.persona, { foreignKey: 'id_persona'});
    };
    return factura;
};