const connect = require('../connect');
const { DataTypes } = require('sequelize');


const imagePetModel = connect.define(
    'image_pet',
    {
        id_imagem_pet:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        id_user_pet:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        imagem:{
            type: DataTypes.BLOB('long'),
            allowNull: false
        },
    },
    {
        timestamps:false,
        freezeTableName:true
    }
);

module.exports = imagePetModel;
