var mongoose = require('mongoose');
var schema = require("../models/users.js");
var md5 = require('md5');

exports.registro = function(req,res){
    
    var usuario = req.body.username
    var password = md5(req.body.password)
    var nombre = req.body.nombre
    var apellido = req.body.apellido
    
   
    
    var registar_Usuario = new schema({
        usuario: usuario,
        password:password,
        nombre:nombre,
        apellido:apellido
    });
    registar_Usuario.save(function(err, anadirusuario, numberAffected) {
        if (err) {
            console.error(err);
            res.send('Error');
        }
        else {
            console.log('usuario creado')
            res.redirect('/');
        }
          
      });
}