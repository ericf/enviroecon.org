'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('enviroecon.org, it works!');
});

app.listen(process.env.PORT || 5000);
