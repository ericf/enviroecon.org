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

function bustCache(req, res, next) {
    // Make sure response isn't cached.
    res.locals._now = Date.now();
    res.set('Cache-Control', 'no-cache');

    next();
}

function getEvent(req, res, next) {
    eventbrite.getEvent()
        .catch(function (err) {
            if (config.isDevelopment) {
                console.warn(err);
                console.warn('[Warn: Using mock event data.]');
                return require('./config/mock-event');
            }

            throw err;
        })
        .then(function (event) {
            console.log(event);

            res.locals.event = {
                name : event.name.text,
                url  : event.url,
                start: moment.tz(event.start.local, event.start.timezone),
                end  : moment.tz(event.end.local, event.end.timezone),
                venue: event.venue
            };

            setImmediate(next);
        })
        .catch(next);
}

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

function render(view) {
    return function (req, res) {
        res.render(view);
    };
}

app.get('/',          bustCache, getEvent, render('home'));
app.get('/speakers/', bustCache, getEvent, render('speakers'));
app.get('/videos/',   bustCache, getEvent, render('videos'));

// -- Expose -------------------------------------------------------------------

app.expose(config.mapbox, 'mapbox', {cache: true});

// -- Locals -------------------------------------------------------------------

app.locals({
    title: 'Investing in a Sustainable Future',
    brand: 'Economic Growth & Environmental Constraints',

    ga     : config.isProduction && config.ga,
    mapbox : config.mapbox.version,
    pure   : config.pure,
    typekit: config.typekit
});

app.locals(data);
