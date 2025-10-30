const connect = require('../connect');
const {DataTypes} = require('sequelize');

const viewPetUserModel = connect.define(
    "view_pet_user",
    {
        id_view_pet_user:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_user_pet:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = viewPetUserModel;