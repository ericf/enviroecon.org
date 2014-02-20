'use strict';

var express    = require('express'),
    exphbs     = require('express3-handlebars'),
    handlebars = require('handlebars'),
    https      = require('https'),
    moment     = require('moment-timezone'),
    path       = require('path');

var config     = require('./config'),
    eventbrite = require('./lib/eventbrite'),
    helpers    = require('./lib/helpers');

var app = module.exports = express();

// -- Configure App ------------------------------------------------------------

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
    extname   : '.hbs',
    handlebars: handlebars,
    helpers   : helpers
}));

// -- Middleware ---------------------------------------------------------------

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
// favicon
app.use(app.router);
app.use(express.static(path.resolve('public')));
// nofound

if (config.isDevelopment) {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack     : true
    }));
}

// -- Routes -------------------------------------------------------------------

app.get('/', function (req, res, next) {
    eventbrite.getEvent().then(function (event) {
        res.locals.event = {
            name : event.name.text,
            url  : event.url,
            start: moment.tz(event.start.local, event.start.timezone),
            end  : moment.tz(event.end.local, event.end.timezone)
        };

        res.render('home');
    }, next);
});

// -- Locals -------------------------------------------------------------------

app.locals.title = 'Economic Growth and Environmental Constraints';
