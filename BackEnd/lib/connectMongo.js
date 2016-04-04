"use strict";

var client = require('mongodb').MongoClient;
var dbConnection = {
    db: null
};

/**
 * Conectaremos nuestro cliente con mongodb a través de la url en cuestión
 */

client.connect('mongodb://localhost:27017/facturas', function(err, conn) {
    if (err) {
        console.log("Cant connect");
        process.exit(1);
    }
    console.log("Connected to", conn.databaseName, "on", conn.options.url);
    dbConnection.db = conn;
});


module.exports = dbConnection;
