'use strict';

var express = require('express'),
    exphbs  = require('express3-handlebars');

var config = require('./config');

var app = module.exports = express();

// -- Configure App ------------------------------------------------------------

app.set('views', config.dirs.views);
app.set('view engine', '.hbs');
app.enable('strict routing');
app.enable('case sensitive routing');

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname      : '.hbs',
    layoutsDir   : config.dirs.layouts,
    partialsDir  : config.dirs.partials
}));

// -- Middleware ---------------------------------------------------------------

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
// favicon
app.use(app.router);
app.use(express.static(config.dirs.pub));
// nofound

if (config.isDevelopment) {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack     : true
    }));
}

// -- Routes -------------------------------------------------------------------

app.get('/', function (req, res) {
    res.render('home');
});

// -- Locals -------------------------------------------------------------------

app.locals.title = 'Economic Growth and Environmental Constraints';
