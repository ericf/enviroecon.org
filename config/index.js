'use strict';

var env  = process.env,
    path = require('path');

module.exports = {
    env          : env.NODE_ENV,
    isDevelopment: env.NODE_ENV !== 'production',
    isProduction : env.NODE_ENV === 'production',

    port: env.PORT || 5000,

    eventbrite: {
        token   : env.EVENTBRITE_OAUTH_TOKEN,
        hostname: 'www.eventbriteapi.com',
        version : 'v3',
        eventId : '6156778089'
    },

    mapbox: {
        version: 'v1.6.1',
        map    : 'ericf.hbcooh59'
    },

    pure   : '0.4.2',
    ga     : env.GOOGLE_ANALYTICS,
    typekit: env.TYPEKIT
};
