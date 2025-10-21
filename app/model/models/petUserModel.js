const connect = require('../connect');
const { DataTypes } = require('sequelize');

const petUserModel = connect.define(
    'pet_user', {
    id_user_pet: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  
    nome_pet: {
        type: DataTypes.CHAR(50),
        allowNull: null
    },
    disponivel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = petUserModel;
