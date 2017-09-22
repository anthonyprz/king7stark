'use strict';

var mongoose = require('mongoose')

var photo_model = function(){
    var photo_esquema = mongoose.Schema({
        photocod: String,
        galeryname:  String,
        galeryruta:  String,
        usuario: String,
    },{collection : 'photo'}); return mongoose.model('photo',photo_esquema)
};
module.exports = new photo_model();