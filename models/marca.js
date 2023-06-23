'use strict';
module.exports = (sequelize, DataTypes) =>{
    const marca = sequelize.define('marca',{
        nombre:{type: DataTypes.STRING(20), defaultValue: null},
        pais:{type: DataTypes.STRING(15),defaultValue: "NOT_DATA"},
        externalId: {type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,unique: true,},
        createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
        updatedAt: {type: DataTypes.DATE,defaultValue: DataTypes.NOW}
    }, {freezeTableName: true})

    marca.associate = function(models){
        marca.hasMany(models.auto, {foreignKey: 'id_marca', as: "auto"} );
    }

    return marca;
}