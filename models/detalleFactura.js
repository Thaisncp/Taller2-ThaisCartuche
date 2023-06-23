'use strict';
module.exports = (sequelize, DataTypes) =>{
    const detalleFactura = sequelize.define('detalleFactura',{
        numeroDetalle:{type: DataTypes.INTEGER, allowNull: false},
        cantidad:{type: DataTypes.INTEGER, defaultValue: null },
        precioUnitario:{ type: DataTypes.FLOAT, defaultValue: null},
        total:{ type: DataTypes.FLOAT, defaultValue: null},
        externalId: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true,},
    }, {freezeTableName: true})

    detalleFactura.associate = function(models){
        detalleFactura.belongsTo(models.factura,{foreignKey: 'id_factura'});
        detalleFactura.belongsTo(models.auto, {foreignKey: 'id_auto'});
    }

    return detalleFactura;
}