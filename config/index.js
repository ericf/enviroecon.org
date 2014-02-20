'use strict';

var env  = process.env,
    path = require('path');

module.exports = {
    env          : env.NODE_ENV,
    isDevelopment: env.NODE_ENV !== 'production',
    isProduction : env.NODE_ENV === 'production',

    port: env.PORT || 5000,

    version: require('../package').version,

    dirs: {
        pub     : path.resolve('public'),
        views   : path.resolve('views/pages'),
        layouts : path.resolve('views/layouts'),
        partials: path.resolve('views/partials')
    },

    eventbrite: 'MVQTG24UT442A2UHMU'
};
