require('dotenv').config();//permet l'accès au variable d'environnement
const express =  require('express');
const app = express();
const path = require('path')
const logger = require('morgan');
// const cookies = require('cookie-parser');



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
/*==============================
Paramètre de la vue
================================*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/*==============================
Middlewares
================================*/
app.use(logger('dev'));
/*
 middleware utilisé pour analyser les requêtes entrantes ayant une
 charge utile (payload) pour les rendre disponible sur l'objet req.body
*/
app.use(express.json());
app.use(express.urlencoded({extend: false}));
// app.use(cookiesParser());

/*==============================
Chargement des Routes avec Express
================================*/

app.use('/', indexRouter); //charge toutes les routes dans le  fichier index.js
app.use('/', authRouter);//charge toutes les routes dans le  fichier user.js
app.use('/user', userRouter); //charge toutes les routes dans le  fichier user.js


module.exports = app;

