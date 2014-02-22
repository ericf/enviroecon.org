'use strict';

var env  = process.env,
    path = require('path');

module.exports = {
    env          : env.NODE_ENV,
    isDevelopment: env.NODE_ENV !== 'production',
    isProduction : env.NODE_ENV === 'production',

    port: env.PORT || 5000,

    eventbrite: {
        hostname: 'www.eventbriteapi.com',
        version : 'v3',
        token   : 'Z6JFNQHVKSLB37RU4DML',
        eventId : '6156778089'
    },

    pure   : '0.4.2',
    typekit: 'uin1ziu'
};
