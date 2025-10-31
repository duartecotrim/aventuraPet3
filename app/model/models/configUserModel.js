const connect = require('../connect');
const { DataTypes } = require('sequelize');

const configUserModel = connect.define(
    'configuracao_usuario',
    {
        id_configuracao_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        distancia: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }
);

module.exports = configUserModel;