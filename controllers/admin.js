var schemausers = require("../models/users.js");
var schemaphoto = require("../models/photos.js");
var schemagallery = require("../models/gallery.js");

exports.myadmin = function(req, res) {
    if (req.session.usuario) {
        
        schemaphoto.find({}, function(err, photo) {
            if (err) {
                res.send(err);
            }
            console.log(photo);
            //res.json(photo);
            res.render("admin", { photo: photo });
        
        });


    }
    else { res.render('index'); }
};

exports.photoinsert = function(req, res) {
    var galleryname = req.body.galleryname
    var photoname = req.body.photoname
    var photoruta = req.body.photoruta

    var insertar_photo = new schemaphoto({
        galleryname: galleryname,
        phoname: photoname,
        photoruta: photoruta,
        usuario: req.session.usuario,
    });
    insertar_photo.save(function(err, anadirphoto, numberAffected) {
        if (err) {
            console.error(err);
            res.send('Error');
        }
        else {
            console.log('photo añadida')
            res.redirect('/admin');
        }

    });
};

exports.galleryinsert = function(req, res) {
    var galleryname = req.body.galleryname

    var insertar_gallery = new schemagallery({
        galleryname: galleryname,

    });
    insertar_gallery.save(function(err, anadirgallery, numberAffected) {
        if (err) {
            console.error(err);
            res.send('Error');
        }
        else {
            console.log('galería añadida')
            res.redirect('/admin');
        }

    });
};
