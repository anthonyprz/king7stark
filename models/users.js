'use strict';

var mongoose = require('mongoose')

var user_model = function(){
    var usuario_esquema = mongoose.Schema({
        usuario:  String,
        password: String,
        email:    String,
        nombre: String,  
        apellido: String,
        poblacion: String,
    },{collection : 'usuario'}); return mongoose.model('user',usuario_esquema)
};
module.exports = new user_model();