"use strict";


require('../models/userModel.js');
var passwordHash = require('sha256');
var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var User = mongoose.model("User");

/**
 * Dicha función se encarga de la autentificación del usuario. Para ello comprobará que el nombre y la clave nos sean vacíos y, una vez comprobado esto, se dispondrá a hashear la clave introducida y buscar el nombre de usuario introducido en la DB y comprobar si corresponde la clave con la del usuario buscado.
 */

var fn = function() {
    return function(req, res, next) {
        var userRequest = basicAuth(req);
        var userEnc;
        console.log(userRequest);
        if (!userRequest || userRequest.pass === "" || userRequest.name === "") {
            res.set("WWW-Authenticate", "Basic realm=Authorization Required"); //pone algo en la cabecera de la respuesta,
            res.sendStatus(401); //ENVIA LA RESPUESTA -> 401="necesita autorización"
            return;
        }
        var claveSinHash = userRequest.pass;
        console.log("La clave introducida sin hash es", claveSinHash);

        var claveHash = passwordHash(claveSinHash);
        console.log("La clave introducida hasheada es", claveHash);

        User.findOne({ "name": userRequest.name }, function(err, rows) {
            console.log("Las rows son", rows);
            console.log(rows.clave);
            console.log("La clave encontrada es y la hasheada con la que comparar", rows.clave, claveHash);
            if (err || rows.length === 0) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.sendStatus(401);
            }
            if (rows.length !== 0) {
                userEnc = rows.clave;
                console.log("Las rows no están vacías");
            }

            if (rows !== null && userEnc === claveHash) {
                next();
            } else {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.sendStatus(401);
            }
        });
    };
};

module.exports = fn;
