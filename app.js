'use strict';

var express    = require('express'),
    exphbs     = require('express3-handlebars'),
    expslash   = require('express-slash'),
    expstate   = require('express-state'),
    handlebars = require('handlebars'),
    https      = require('https'),
    moment     = require('moment-timezone'),
    path       = require('path');

var config     = require('./config'),
    data       = require('./data'),
    eventbrite = require('./lib/eventbrite'),
    helpers    = require('./lib/helpers');

var app = module.exports = express();

// -- Configure App ------------------------------------------------------------

expstate.extend(app);

app.set('view engine', '.hbs');
app.engine('.hbs', exphbs({
    extname   : '.hbs',
    handlebars: handlebars,
    helpers   : helpers
}));

app.enable('strict routing');

app.set('state namespace', 'app');

// -- Middleware ---------------------------------------------------------------

if (config.isDevelopment) {
    app.use(express.logger('tiny'));
}

app.use(express.compress());
// favicon
app.use(app.router);
app.use(expslash());
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
            end  : moment.tz(event.end.local, event.end.timezone),
            venue: event.venue
        };

        // Make sure response isn't cached.
        res.locals._now = Date.now();
        res.set('Cache-Control', 'no-cache');

        res.render('home');
    }).catch(next);
});

// -- Expose -------------------------------------------------------------------

app.expose(config.mapbox, 'mapbox', {cache: true});

// -- Locals -------------------------------------------------------------------

app.locals({
    title: 'Investing in a Sustainable Future',
    brand: 'Economic Growth & Environmental Constraints',

    mapbox : config.mapbox.version,
    pure   : config.pure,
    typekit: config.typekit
});

app.locals(data);
