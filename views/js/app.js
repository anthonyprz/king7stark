var express = require('express');
var bodyParser = require('body-parser'); //modulo para obtener la informacion de los formularios html
var cookieParser = require('cookie-parser');
var passport = require('passport');
var exphbs = require('express-handlebars');

var conexionBD = require('./controllers/conexion.js')// conectar a la base de datos
var registro = require('./controllers/registro.js');// registrar usuarios
var login = require('./controllers/login.js');// login de usuarios 

var app = express();
conexionBD.conexion();

app.use(bodyParser.urlencoded({extended: true}));

var session = require('express-session');

app.use(session({
  secret: 'appsecret',
  resave: true,
  saveUninitialized: true,
 // cookie: {
   // secure: true,
  //  maxAge: new Date(Date.now() + 3600000)
  //}
}));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//app.set('views', __dirname + '/views');
//app.use(express.urlencoded()); 


//Registrar un usuario 

app.use(express.static(__dirname + '/views'));

app.post('/usuario/registro', registro.registro);
app.post('/usuario/login', login.login);
app.get('/logout', login.logout);
app.get('/home',login.session)
//esto es para poder indicar la pagina de inicio
app.get('/', function (req, res) {
    res.render('index');
});


//app.set('port', (process.env.PORT || 5000));

//var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
var server = app.listen(process.env.PORT || 3000, function(){  
  var addr = server.address();
  console.log("el servidor esta escuchando en", addr.address + ":" + addr.port);
});


