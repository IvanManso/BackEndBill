var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../../lib/auth"); //nos traemos el módulo auth.js para que nos los traiga y usarlo donde quiera
var Factura = mongoose.model("Bill");
var User = mongoose.model("User");

//res.json({ result: true, rows: rows });
//Lanzamos la autentificación
//router.use(auth());

/**
 * Aquí realizamos la petición de anuncios a través de filtros, para ello obtenelos los parámetros de la query de nuestra request y para el filtro de precio utilizaremos patrones y la el método "split()" que nos dividirá un string a partir del carácter que le digamos en un array.
 */

/**
 * @api {get} /api/v1/anuncio
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *      "nombre": "Bicicleta",
 *       "venta": true,
 *       "precio": 230.15,
 *       "foto": "bici.jpg",
 *       "tags": ["lifestyle", "motor"]
 *     }
 */

router.get('/', function(req, res) {
    var owner = req.query.owner || "";
    var company = req.query.company || "";
    var paid = req.query.paid || "";
    var price = req.query.price || "";
    var foto = req.query.foto || "";
    var sort = req.query.sort || "nombre";
    var limit = req.query.limit || "";
    var start = req.query.start || "";
    var filter = {};
    var priceSplit = price.split("-");
    patternMenor = /-\d/;
    patternMayor = /\d-/;
    patternBetween = /\d-\d/;
    patternDigito = /\d/;
    if (owner !== "") {
        filter.owner = new RegExp('^' + owner, "i");
    }
    if (company !== "") {
        filter.company = new RegExp('^' + company, "i");
    }
    if (paid !== "") {
        filter.paid = paid;
    }
    if (limit !== "") {
        limit = parseInt(limit);
    }
    if (start !== "") {
        start = parseInt(start);
    }
    if (price !== "") {
        if (patternBetween.test(price)) {
            filter.price = { '$gte': priceSplit[0], '$lte': priceSplit[1] };
        } else if (patternMayor.test(price)) {
            filter.price = { '$gte': priceSplit[0] };
        } else if (patternMenor.test(price)) {
            filter.price = { '$lte': priceSplit[1] };
        } else if (patternDigito.test(price)) {
            filter.price = priceSplit[0];
        }
    }


    Factura.list(filter.data, sort, limit, start, function(err, rows) {
        if (err) {
            console.log("Correcto en factura list");
            return res.json({ result: false, err: err });
        } else {
            console.log("Error en factura list");
            return res.json({ result: true, rows: rows });
        }
    });

});

/**
 * Ruta establecida a partir de la cual podremos ver la lista de anuncios
 */

router.post("/", function(req, res) {
    //validarFact(req, res);
//});

//function validarFact(req, res) {
    console.log("Estoy en validarFact dentro del post en factura.js");
    var factura = new Factura(req.body);
    //var owner = req.body.owner;
    var detail = req.body.detail;
    var price = req.body.price;
    //var date = req.body.date;
    //var payment_date = req.body.payment_date;
    var company = req.body.company;
    var paid = req.body.paid;
    if (detail === "" || price === "" || company === "" || paid === "") {
        return console.error("Campos vacíos");
    } else {
        factura.save(function(err, saved) {
            if (err) {
                return res.json({ result: false, err: err });
            } else {
                console.log("Registro completado");
                return res.json({ result: true, row: saved });
            }
        });
    }
});
//}


module.exports = router;
