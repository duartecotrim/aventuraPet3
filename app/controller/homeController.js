const petUserModel = require('../model/models/petUserModel');
const imagePetModel = require('../model/models/imagePetModel');
const userModel = require('../model/models/userModel');

userModel.belongsTo(petUserModel, { foreignKey: "id_usuario" });
petUserModel.belongsTo(imagePetModel, { foreignKey: "id_user_pet" })

module.exports = {
    index: async function(req, res){
        let user = await userModel.findAll({
            where: { id_usuario: 1 },
            include: {
                model: petUserModel,
                include: [imagePetModel]
            }
        }
        );

        var img = Buffer.from(user[0].pet_user.image_pet.imagem).toString('base64');
        var data = { 
            "img": img,
            "id_user_pet": user[0].pet_user.id_user_pet,
            "nome_pet": user[0].pet_user.nome_pet,
            "idade": user[0].pet_user.idade,
            "caracteristica": user[0].pet_user.caracteristica
        };
        
        res.render('home/index', {fileName: 'main', "data": data});
    },
    pets: function(req, res){
        res.render('home/index', {fileName: 'pets'});
    },
    about: function(req, res){
         res.render('home/index', {fileName: 'about'});
    },
    //criar funcao que pegar os ids dos cadastros dos pets que estejam disponivel, seleciona de forma aleatoria os id
    //e manda para o front end no maximo 4 pets
    getRandomPet: async function(){},

    //criar funcoa que soma a quantidade de pets que nao estao disponivel para indicar o numero de pets que ja foram adotado na plataforma
    //e manda para o front end
    getNumberadopted: async function() {}


}