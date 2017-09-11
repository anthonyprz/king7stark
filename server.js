var express = require('express');
var bodyParser = require('body-parser'); //modulo para obtener la informacion de los formularios html
var cookieParser = require('cookie-parser');
var passport = require('passport');
var exphbs = require('express-handlebars');
//var cool = require('cool-ascii-faces');

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


//app.get('/cool', function(request, response) {
  //response.send(cool());
//});


//app.set('port', (process.env.PORT || 5000));

//var server = app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
var server = app.listen(process.env.PORT || 5000, function(){  
  var addr = server.address();
  console.log("el servidor esta escuchando en", addr.address + ":" + addr.port);
});


















/*

//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
*/