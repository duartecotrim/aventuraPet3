const msgSession = require('../libs/msgSession');
const bcrypt = require('bcryptjs');
const passwordHashModel = require('../model/models/passwordHashModel');
const contactModel = require('../model/models/contactUserModel');
const userModel = require('../model/models/userModel');
const aventuraPetController = require('../controller/aventuraPetController');

module.exports = {
    index: function(req, res){
       
        res.render('login/index', {
            fileName: 'main', 
            msgError: msgSession.getMsgError(req),
            msgSuccess: msgSession.getMsgSuccess(req)
        });

        msgSession.cleanMsgError(req);
        msgSession.cleanMsgSuccess(req);
       
    },
    enter: async function(req, res){

        let contactUser = await contactModel.findAll({where:{
            email: req.body.email
        }});
        
        //verifica se o usuario existe
        if(contactUser.length == 0){
            if (!req.session.strErrorMsg) {
                req.session.strErrorMsg = "";
            }
            req.session.strErrorMsg = "email nao encontrado tente novamente ou cria uma nova conta";
            return res.redirect('/login');
        }
        
        let arrContactUser = JSON.parse(JSON.stringify(contactUser, null));
        let idUser = arrContactUser[0].id_usuario;
        let passwordHash = await passwordHashModel.findAll({
            id_usuario: idUser
        });

        //verifica se o usuario tem senha cadastrada
        if(passwordHash.length == 0){
            if (!req.session.strErrorMsg) {
                req.session.strErrorMsg = "";
            }
            req.session.strErrorMsg = "erro desconhecido favor entrar em contato com o administrador";
            return res.redirect('/login');
        }

        let passwordHashUser = JSON.parse(JSON.stringify(passwordHash, null));

        //verifica se a senha passada na requisição é o mesmo que  esta salve
        //negando a verificação para se a senha nao for valida ja direcionar para a tela de login novamente
        
        if(!bcrypt.compareSync(req.body.pass, passwordHashUser[0].password_hash)){
            if (!req.session.strErrorMsg) {
                req.session.strErrorMsg = "";
            }
            req.session.strErrorMsg = "senha invalida. por favor tente novamente2";
            return res.redirect('/login');
        }
        
        let user = await userModel.findAll({
            where:{
                id_usuario: idUser
            }
        });

        if(!req.session.autentication){
            req.session.autentication = true;
        }

        if(!req.session.userAutentication){
            req.session.userAutentication = {
                dataUser: user,
                dataContactUser: contactUser
            }
        }

        res.redirect('/aventura-pet');

    }
    
}
