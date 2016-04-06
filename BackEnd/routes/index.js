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
        var queryName = User.find({ name: req.body.name });
        queryName.exec(function(err, rows) {
            if (err) {
                return console.error("error al logear");
            } else if (rows.length === 0) {
                return console.error("El nombre de usuario no existe");
            } else {
                user.password = passwordHash(user["password"]);
                filter.password = password;
                var queryPassword = User.find({ password: req.body.password });
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
