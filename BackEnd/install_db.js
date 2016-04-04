"use strict";

var fs = require("fs");

require("./models/billModel.js");
require("./models/userModel.js");


var passwordHash = require('sha256');
var mongoose = require("mongoose");
var Factura = mongoose.model("Bill");
var User = mongoose.model("User");

/**
 * Cargamos las facturas
  que se encuentren en el archivo .JSON que tenemos creado por defecto. Los carga de manerá síncrona con un for (se precisa de mejor para realizarlo de manera asíncrona. PE: con async)
 */

function cargaFacturasDefect(callback) {
    Factura.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Facturas eliminadas");
        fs.readFile("./facturas.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else {
                var defecto = JSON.parse(data);
                for (var i = 0; i < defecto.facturas.length; i++) {
                    var factura = new Factura(defecto.facturas[i]);
                    factura.save(function(err, saved) {
                        if (err) {
                            console.log("Ha ocurrido un error con las facturas", err);
                            return;
                        }
                        console.log("Factura guardada con éxito");
                    });
                }
            }
            console.log(defecto);
            console.log("FIN");
        });
    });

}

/**
 * Cargamos los usuarios que se encuentren en el archivo .JSON que tenemos creado por defecto. Los carga de manerá síncrona con un for (se precisa de mejor para realizarlo de manera asíncrona. PE: con async)
 */

function cargaUsuariosDefect(callback) {
    User.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Usuarios eliminados");
        fs.readFile("./usuarios.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else {
                var defecto = JSON.parse(data);
                for (var i = 0; i < defecto.usuarios.length; i++) {
                    var user = new User(defecto.usuarios[i]);
                    //console.log(user["name"]);
                    //console.log(user["password"]);
                    user.password = passwordHash(user["password"]);
                    //console.log(user["pasword"]);
                    user.save(function(err, saved) {
                        if (err) {
                            console.log("Ha ocurrido un error con el usuario", err);
                            return;
                        }
                        console.log(defecto);
                        console.log("Usuario guardado con éxito");
                    });
                }
            }
            console.log("FIN");
        });
    });

}

/**
 * Llamamos a la función de carga de facturas
 */

cargaFacturasDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Facturas por defecto cargadas \n ", str);

});

/**
 * Llamamos a la función de carga de usuarios
 */

cargaUsuariosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Usuarios por defecto cargados \n ", str);

});
