'use strict';

var mongoose = require('mongoose')

var galery_model = function(){
    var galery_esquema = mongoose.Schema({
        galerycod: String,
        galeryname:  String,
        usuario: String,
    },{collection : 'galery'}); return mongoose.model('galery',galery_esquema)
};
module.exports = new galery_model();