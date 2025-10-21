const express = require('express');
const homeRouter = express.Router();
const homeController  = require('../controller/homeController');

homeRouter.get('/', function(req, res){
    homeController.index(req, res);
});

homeRouter.get('/pets', function(req, res){
    homeController.pets(req, res);
});

homeRouter.get('/about', function(req, res){
    homeController.about(req, res);
})

module.exports = homeRouter;
