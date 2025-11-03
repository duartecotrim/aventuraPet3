const connect = require('../connect');
const {DataTypes} = require('sequelize');

const notViewUserPetModel = connect.define(
    "not_view_user_pet",
    {
        id_usuario:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nome_pet:{
            type: DataTypes.CHAR
        },
        idade:{
            type: DataTypes.INTEGER
        },
        caracteristica:{
            type: DataTypes.CHAR
        },
        disponivel:{
            type: DataTypes.BOOLEAN
        },
        id_user_pet:{
            type: DataTypes.INTEGER
        },
        nome_usuario:{
            type: DataTypes.CHAR
        },
        telefone:{
            type: DataTypes.CHAR
        },
        cep:{
            type: DataTypes.CHAR
        },
        imagem:{
            type: DataTypes.BLOB
        },
    },
    {
        timestamps:false,
        freezeTableName:true,
        
    }
)

module.exports = notViewUserPetModel
