var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passwordHash = require('sha256');



/* GET users listing. */
/*
router.get('/', function(req, res, next) {
    var User = mongoose.model("User");
    User.list({}, null, function(err, rows) {
         if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: rows });
        }
    });
});
*/
router.get('/', function(req, res) {
    var sort = req.query.sort;
    User.list(sort, function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: rows });
        }
    });
});

/*router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
*/

/**
 * Aquí validaremos el usuario cuando se le intenta registrar. Para ello comprobamos que ningún campo se encuentre vacío.
Tras esto comprobamos si el nombre ya se encuentra en nuestra DB y si este no se encuentra realizamos la misma comprobación con el email. Si no se encuentran en la DB se registrará con éxito.
 */

/**
 * @api {post} /routes/users
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *       "nombre": "Jacinto",
 *       "email": "jacinto@gmail.com",
 *       "clave": "hash(jacinto)"
 *     }
 */

router.post("/", function(req, res) {
   /* validar(req, res);
});

function validar(req, res) {*/
    var user = new User(req.body);
    var name = req.body.name;
    var amount = req.body.amount;
    var password = req.body.password;
    if (name === "" || amount === "" || password === "") {
        return console.error("Campos vacíos");
    } else {
        var filter = {};
        filter.name = name;
        filter.amount = amount;
        var queryName = User.find({ name: req.body.name });
        queryName.exec(function(err, rows) {
            if (err) {
                return console.error("error al registrar");
            } else if (rows.length !== 0) {
                return console.error("Algún campo se encuentra repetido");
            } else {
                var queryAmount = User.find({ amount: req.body.amount });
                queryAmount.exec(function(err, rows) {
                    if (err) {
                        return console.error("error al registrar");
                    } else if (rows.length !== 0) {
                        return console.error("Algún campo se encuentra repetido");
                    } else {
                        user.password = passwordHash(user["password"]);
                        user.save(function(err, saved) {
                            if (err) {
                                return res.json({ result: false, err: err });
                            } else {
                                console.log("Registro completado");
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
