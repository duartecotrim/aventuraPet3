const express = require('express');
const loginRouter = express.Router();
const loginController = require('../controller/loginController');
const { checkSchema, validationResult } = require('express-validator');


loginRouter.get('/login', function (req, res) {
    loginController.index(req, res);
});

loginRouter.post('/login/enter',
    checkSchema({
        email: {
            in: ['body'],
            errorMessage: "email invalido",
            trim: true,
            escape: true,
            notEmpty: true,
            isEmail: true,
            isLength: {
                options: {
                    max: 100
                }
            }
        },
        pass: {
            in: ['body'],
            isLength: {
                options: { min: 8 }
            },
            matches: {
                options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
            },
            trim: true,
            escape: true
        }
    }),
    function (req, res) {
        let errorResult = validationResult(req);
        
        if (!errorResult.isEmpty()) {
            if (!req.session.strErrorMsg) {
                req.session.strErrorMsg = "";
            }
            req.session.strErrorMsg = "senha invalido tente novamente";
            return res.redirect('/login');
            
        }

        loginController.enter(req, res);
    });

loginRouter.get('/login/logout', function (req, res) {
    req.session.destroy();

    res.redirect('/login');

})

module.exports = loginRouter;
