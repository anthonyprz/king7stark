var mongoose = require("mongoose");

exports.conexion = function(){
    mongoose.connect('mongodb://anthonyprz:testpass@ds143131.mlab.com:43131/dbepidemy');
    var db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'No se ha podido conectar a la Base de Datos'));
        
        db.once('open', function callback() {
    	console.log('Se ha conectado correctamente con la base de datos');
                                            }
            );
}

//anthonyprz testpass  mongodb://<dbuser>:<dbpassword>@ds143131.mlab.com:43131/dbepidemy

