const petUserModel = require('../model/models/petUserModel');
const imagePetModel = require('../model/models/imagePetModel');
const userModel = require('../model/models/userModel');
const contactUserModel = require('../model/models/contactUserModel');
var searchCEP = require('../libs/searchCEP');
const notViewUserPetModel = require('../model/models/notViewUserPetModel');
const calcDistance = require('../libs/calcDistance');
const configUserModel = require('../model/models/configUserModel');
const viewPetUserModel = require('../model/models/viewPetUser');



userModel.hasMany(petUserModel, { foreignKey: 'id_usuario' });
petUserModel.belongsTo(userModel, { foreignKey: 'id_usuario' });


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
        
         res.render('aventura-pet/index', { fileName: 'main' });
    },

    viewPets: async function (req, res) {

        //let idUser = req.session.userAutentication.dataUser[0].id_usuario;
        let idUser = 1;
        let contactUser = await contactUserModel.findAll({
            where: { id_contato_usuario: idUser }
        });

        let configUser = await configUserModel.findAll({
            where:{id_usuario: idUser}
        });

        let arrConfigUser = JSON.parse(JSON.stringify(configUser, null));
        let arrContactUser = JSON.parse(JSON.stringify(contactUser, null));
        
        //seta cep e latitude e longitude do usuario para pegar os pets por perto
        let cep = arrContactUser[0].cep;
        let dataSerachCEPUser = await searchCEP(cep);
        let latitudeUser = dataSerachCEPUser.latitude;
        let longitudeUser = dataSerachCEPUser.longitude;
        //console.log(dataSerachCEPUser);
        
        //verificar se o pet esta dentro da configuraçao de distancia
        let notViewUserPetAvaliable = await notViewUserPetModel.findAll(/*{limit:1, offset: 2}*/);

        //funcao que gera offset dinamicamente
        let numberPetDataBaseAvaliable = JSON.parse(JSON.stringify(notViewUserPetAvaliable, null)).length;

        if (!req.session.offsetPet) { 
            req.session.offsetPet = 2;
        }

        let notViewUserPet = await notViewUserPetModel.findAll({ limit: 1, offset: req.session.offsetPet });
        console.log(notViewUserPet)
        let arrNotViewUserPet = JSON.parse(JSON.stringify(notViewUserPet, null));
        
        let cepUserPet = arrNotViewUserPet[0].cep;
        let dataSerachCEPUserPet = await this.promisseGetLatLong(cepUserPet)

        

        let latitudeUserPet = dataSerachCEPUserPet.latitude;
        let longitudeUserPet = dataSerachCEPUserPet.longitude;
        let cidadeUserPet = dataSerachCEPUserPet.cidade.nome
        let distance = calcDistance(latitudeUser, longitudeUser, latitudeUserPet, longitudeUserPet);
        //verifica se a distancia e menor que a distancia da configuração do usuario
        if(distance <= arrConfigUser[0].distancia){
            //req.session.offsetPet += 1;
            var data = [];
            console.log(arrNotViewUserPet);
            arrNotViewUserPet.forEach(pet=>{
                data.push({
                    img: Buffer.from(pet.imagem).toString('base64'),
                    nome_pet: pet.nome_pet,
                    idade: pet.idade,
                    cidade: cidadeUserPet,
                    caracteristica: pet.caracteristica,
                    distancia: distance,
                    idUserPet: pet.id_user_pet,
                    telefone : pet.telefone
                });
           });

           //res.send(data);
            res.render('aventura-pet/index', { fileName: 'principal', data: data })
        }
        
        //verificar se o pet ja nao foi visto pelo usuario






        //res.render('aventura-pet/index', { fileName: 'principal' });
    },
    promisseGetLatLong: function (cep) {
        //funcao que gera uma promise com um tempo de 2 segundos de diferença da primeira requisição
        //a api bloqueia varias requisiçoes ao mesmo tempo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    searchCEP(cep)
                )
            }, 2000)
        })
    },

    dislike: async function(req, res){
        let idUserPet  = req.params.idUserPet;
         //let idUser = req.session.userAutentication.dataUser[0].id_usuario;
        let idUser = 1;

        await viewPetUserModel.create({
            id_usuario : idUser,
            id_user_pet: idUserPet,
            pet_like : false
        });

    },
    like: async function(req, res){
        let idUserPet  = req.params.idUserPet;
         //let idUser = req.session.userAutentication.dataUser[0].id_usuario;
        let idUser = 1;

        await viewPetUserModel.create({
            id_usuario : idUser,
            id_user_pet: idUserPet,
            pet_like : true
        });
    }
    
}
