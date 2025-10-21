require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const homeRouter = require('./app/router/homeRouter');
const newAccountRouter = require('./app/router/newAccountRouter');
const loginRouter = require('./app/router/loginRouter');
const session = require('express-session');
const aventuraPetRouter = require('./app/router/aventuraPetRouter');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'chaveSecreta',
    resave: false, // evita salvar sessoes nao modificadas
    saveUninitialized: false, //evita salvar sessao vazia
    coockie:{
        maxAge: 60000 //tempo de vida do coockie
    }
}));
app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/', newAccountRouter);
app.use('/', aventuraPetRouter);

app.listen(PORT, function(){
    console.log(`app online in http://localhost:${PORT}`);
});
