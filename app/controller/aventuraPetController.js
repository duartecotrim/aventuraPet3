const petUserModel = require('../model/models/petUserModel');
const imagePetModel = require('../model/models/imagePetModel');
const userModel = require('../model/models/userModel');
const contactUserModel = require('../model/models/contactUserModel');
const searchCEP = require('../libs/searchCEP');
const viewPetUser = require('../model/models/viewPetUser');

userModel.belongsTo(petUserModel, { foreignKey: "id_usuario" });
petUserModel.belongsTo(imagePetModel, { foreignKey: "id_user_pet" })

module.exports = {
    index: async function (req, res) {
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
                disponivel: true,
                idade: req.body.idade,
                caracteristica: req.body.caracteristica
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

    viewPets: async function (req, res) {

        //let idUser = req.session.userAutentication.dataUser[0].id_usuario;
        let idUser = 1;
        let contactUser = await contactUserModel.findAll({
            where: { id_contato_usuario: idUser }
        });

        let arrContactUser = JSON.parse(JSON.stringify(contactUser, null));
        //seta cep e latitude e longitude do usuario para pegar os pets por perto
        let cep = arrContactUser[0].cep;
        let dataSerachCEPUser = await searchCEP(cep);
        let latitudeUser = dataSerachCEPUser.latitude;
        let longitudeUser = dataSerachCEPUser.longitude;

        


        


        res.render('aventura-pet/index', { fileName: 'principal' });
    }
    //apagar codigo no futuro
    /*getImgPet: async function (req, res, idUser) {
        let data = await userModel.findAll({
            where: { id_usuario: idUser },
            include: {
                model: petUserModel,
                include: [imagePetModel]
            }
        }
        );

        var img = Buffer.from(data[0].pet_user.image_pet.imagem, "base64");
       

        return { 
            "img": img,
            "id_user_pet": data[0].pet_user.id_user_pet,
            "nome_pet": data[0].pet_user.nome_pet,
            "idade": data[0].pet_user.idade,
            "caracteristica": data[0].pet_user.caracteristica
        };
        //console.log(JSON.parse(JSON.stringify(data[0].pet_user.image_pet, null)))
    }*/
}
