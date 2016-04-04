"use strict";

var mongoose = require('mongoose');
var conn = mongoose.connection;

/**
 * Conectaremos mongoose
 */

conn.on('error', console.error.bind(console, 'mongodb connection error: '));
conn.once('open', function() {
    console.info('Connected to mongodb.');
});
mongoose.connect('mongodb://localhost/anuncios');
