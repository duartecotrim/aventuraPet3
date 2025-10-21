module.exports = {
    index: function(req, res){
        res.render('home/index', {fileName: 'main'});
    },
    pets: function(req, res){
        res.render('home/index', {fileName: 'pets'});
    },
    about: function(req, res){
         res.render('home/index', {fileName: 'about'});
    }
}