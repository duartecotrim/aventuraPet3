const multer = require('multer');

/*const savePath = multer.diskStorage({
    //determina o diretorio onde sera salvo o arquivo
    destination: function(req, file, callback){
        callback(null,'uploads/');
    },
    //determina o nome do arquivo
    filename: function(req, file, callback){
        callback(null, file.fieldname + '-' + Date.now());
    }
    
    
});*/

const uploads = multer({
    storage:savePath,
    //determina o filtro do tipo do arquivo
    fileFilter: function(req, file, callback){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
            callback(null, true);
        }else{
            callback(null, false);
        }
    },
    limits:{
        fileSize: 5*1024*1024,
        files:3
    }
});


module.exports = uploads;