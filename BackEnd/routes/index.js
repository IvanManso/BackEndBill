var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passwordHash = require('sha256');

//Aquí validaremos el login del usuario para comprobar si el username y la pw coinciden con la de al BBDD

router.post("/", function(req, res) {
    console.log("Entro en el post de index.js");
    var user = new User(req.body);
    var name = req.body.name;
    var password = req.body.password;
    if (name === "" || password === "") {
        return console.error("Campos vacíos");
    } else {
        var filter = {};
        filter.name = name;
        console.log("El nombre que lleva el filtro es", filter.name);
        var queryName = User.find({ name: filter.name });
        queryName.exec(function(err, rows) {
            if (err) {
                return console.error("error al logear");
            } else if (rows.length === 0) {
                return console.error("El nombre de usuario no existe");
            } else {
                console.log("La pw antes del hash es", user.password);
                user.password = passwordHash(user["password"]);
                console.log("La pw después del hash es", user.password);
                filter.password = user.password;
                console.log("La pw en el filtro tras ser hasheada es", filter.password);
                var queryPassword = User.find({ password: filter.password });
                queryPassword.exec(function(err, rows) {
                    if (err) {
                        return console.error("error al logear");
                    } else if (rows.length === 0) {
                        return console.error("La contraseña para el dicho usuario no existe");
                    } else {
                        user.save(function(err, saved) {
                            if (err) {
                                return res.json({ result: false, err: err });
                            } else {
                                console.log("Login completado");
                                return res.json({ result: true, row: saved });
                            }
                        });
                    };
                });
            };
        });
    }
});

module.exports = router;
