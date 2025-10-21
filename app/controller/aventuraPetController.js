const petUserModel = require('../model/models/petUserModel');
const imagePetModel = require('../model/models/imagePetModel');
const userModel = require('../model/models/userModel');

userModel.belongsTo(petUserModel, {foreignKey: "id_usuario"});
petUserModel.belongsTo(imagePetModel, {foreignKey:"id_user_pet"})

module.exports = {
    index: function (req, res) {
        res.render('aventura-pet/index', { fileName: 'main' });
    },
    addPetPage: function (req, res) {

        res.render('aventura-pet/index', { fileName: 'add-pet' });
    },
    insertImgPet: async function (req, res) {

        
        let idUser = req.session.userAutentication.dataUser[0].id_usuario;

        try {
            const userPet = await petUserModel.create({
                id_usuario: idUser,
                nome_pet: req.body.namepet,
                disponivel: true
            });

            const idPetUser = userPet.id_user_pet;
            
            await imagePetModel.create({
                id_user_pet: idPetUser,
                imagem: req.file.buffer
            });

        } catch (error) {
            console.log(error)
        }


    },

    getImgPet: async function(req, res){
        let data = await userModel.findAll(
            {
                include: {
                    model: petUserModel,
                    include: [imagePetModel]
                }
            }
        );

        Buffer.from(data.imgpet, "base64")

        console.log(JSON.parse(JSON.stringify(data, null)))
    }
}
