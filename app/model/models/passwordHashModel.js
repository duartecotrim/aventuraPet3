const connect = require('../connect');
const { DataTypes } = require('sequelize');
const passwordHashModel = connect.define(
    'password_hash',
    {
        id_password_hash:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password_hash:{
            type: DataTypes.STRING(300),
            allowNull: false
        },
        ativo:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data_criacao:{
            type: DataTypes.DATE,
            allowNull: false
        },
        data_inativacao:{
            type: DataTypes.DATE,
           
        }
    },
        {
          timestamps:false,
        freezeTableName:true
    }
);


module.exports = passwordHashModel;