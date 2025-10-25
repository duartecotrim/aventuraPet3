const express = require('express');
const homeRouter = express.Router();
const homeController = require('../controller/homeController');

homeRouter.get('/', function (req, res) {
    homeController.index(req, res);
});

homeRouter.get('/pets', function (req, res) {
    homeController.pets(req, res);
});

homeRouter.get('/about', function (req, res) {
    homeController.about(req, res);
});

//excluir funcao no futuro
/*homeRouter.get('/getrandompet', async function (req, res) {
    //criar funcao que pegar os ids dos cadastros dos pets que estejam disponivel, seleciona de forma aleatoria os id
    //e manda para o front end no maximo 4 pets
    const petUserModel = require('../model/models/petUserModel');
    const imagePetModel = require('../model/models/imagePetModel');
    const userModel = require('../model/models/userModel');

    // Associações com alias padronizados
    userModel.hasMany(petUserModel, { foreignKey: 'id_usuario', as: 'pets' });
    petUserModel.belongsTo(userModel, { foreignKey: 'id_usuario', as: 'owner' });

    petUserModel.hasOne(imagePetModel, { foreignKey: 'id_user_pet', as: 'image' });
    imagePetModel.belongsTo(petUserModel, { foreignKey: 'id_user_pet', as: 'pet' });

    const users = await userModel.findAll({
        include:{
            model:petUserModel,
            where:{disponivel:1},
            as: 'pets',
            include: {
                model: imagePetModel,
                as: 'image'
            }
        }
    });
    const arrUsers = JSON.parse(JSON.stringify(users, null));
    let ids = [];
    arrUsers.forEach(user => {
        ids.push(user.id_usuario);
    });
    
    //console.log(arrUsers);
    // Consulta com aliases explícitos

    let data = [];
 
    for(id of ids){
       
       let user = await userModel.findAll({
        where: { id_usuario: id },
        include: {
            model: petUserModel,
            as: 'pets',
            include: {
                model: imagePetModel,
                as: 'image'
            }
        }
        });

        data.push(JSON.parse(JSON.stringify(user[0].pets, null, 2)));
    }
   

    console.log(data);



})*/

module.exports = homeRouter;
