var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//modelos
require("./models/userModel");
require("./models/billModel");

//rutas web
var routes = require('./routes/index');
var users = require('./routes/users');

//API
//var apiFactura = require("./routes/api/v1/factura/:id");
var apiFacturas = require("./routes/api/v1/factura");
var apiUsers = require("./routes/users");
var apiIndex = require("./routes/index");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*app.get('*', function(req, res) {
        res.sendfile('./public/views/MoviesList.html');
    });

*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//Rutas de API V1
//app.use("/api/v1/factura/:id", apiFacturas);
app.use("/api/v1/factura", apiFacturas);
app.use("/routes/users", apiUsers);
app.use("/routes/index", apiIndex);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
