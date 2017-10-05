var express = require('express');
var bodyParser = require('body-parser'); //modulo para obtener la informacion de los formularios html
var cookieParser = require('cookie-parser');
var passport = require('passport');
var exphbs = require('express-handlebars');
//var cool = require('cool-ascii-faces');

var conexionBD = require('./controllers/conexion.js')// conectar a la base de datos
var registro = require('./controllers/registro.js');// registrar usuarios
var login = require('./controllers/login.js');// login de usuarios 
var admin = require('./controllers/admin.js')

var app = express();
conexionBD.conexion();

app.use(bodyParser.urlencoded({extended: true}));

var session = require('express-session');

app.use(session({
  secret: 'appsecret',
  resave: true,
  saveUninitialized: true,
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//Registrar un usuario 

app.use(express.static(__dirname + '/views'));

app.post('/usuario/registro', registro.registro);
app.post('/usuario/login', login.login);
app.post('/photo/insert', admin.photoinsert);
app.post('/gallery/insert', admin.galleryinsert);
app.get('/logout', login.logout);
app.get('/home',login.session)
app.get('/admin',admin.myadmin)
//esto es para poder indicar la pagina de inicio
app.get('/', function (req, res) {
    res.render('index');
});



var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",function(){  
  var addr = server.address();
  console.log("el servidor esta escuchando en", addr.address + ":" + addr.port);
});




