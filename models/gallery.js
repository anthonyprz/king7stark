'use strict';

var mongoose = require('mongoose')

var gallery_model = function(){
    var gallery_esquema = mongoose.Schema({
        galleryname:  String
    },{collection : 'galery'}); return mongoose.model('galery',gallery_esquema)
};
module.exports = new gallery_model();


//https://stackoverflow.com/questions/14363065/mongoose-mongodb-query-joins-but-i-come-from-a-sql-background