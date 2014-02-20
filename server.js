'use strict';

var http = require('http');

var config = require('./config'),
    app    = require('./app');

http.createServer(app).listen(config.port, function () {
    console.log('EnviroEcon Server listening on ' + config.port);
});
