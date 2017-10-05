var schema = require("../models/users.js");
var md5 = require('md5');

exports.login = function(req,res){
    var username = req.body.username;
    var password = md5(req.body.password);
  
    schema.findOne({
        'usuario': username,
        'password':password
    }, function(err,user){
        if(!user){
            console.error("no se ha iniciado session")
            res.redirect('/');
        }
        else{
            req.session.usuario = user.usuario
            
            if (user.usuario == "admin") {
                console.log("entrando al administrador")
                res.redirect("/admin");
            } 
            else{
                res.redirect("/home");
            }
           
        }
    });
};

exports.session = function(req,res){
    if (req.session.usuario){
          
        schema.findOne({'usuario':req.session.usuario},function(err,user){
            res.render("home",{
                nombre: user.nombre,
                apellido: user.apellido
            });
            
        })
    }
    else {res.render('index');}
}

exports.logout = function(req, res) {
 req.session.destroy();
 res.redirect('/');
};