'use strict';

var Promise = global.Promise || require('ypromise');

var https = require('https'),
    path  = require('path'),
    util  = require('util');

var eventbrite = require('../config').eventbrite;

exports.getEvent = getEvent;

// -----------------------------------------------------------------------------

var EVENT_PATH = util.format('/events/%s/?token=%s',
        eventbrite.eventId,
        eventbrite.token);

var TTL = 1000 * 60 * 5; // 5 minutes

var eventData = null,
    requested = null;

function getEvent() {
    if (!eventData) {
        requested = Date.now();
        eventData = fetchEvent();
    }

    // Make sure data was fetched as it's fresh.
    return eventData.then(function (data) {
        if (!(data && data.statusCode === 200)) {
            eventData = null;
            throw new Error('No Eventbrite data retreived.');
        }

        // Don't block the current request for stale data, fetch in background.
        if (Date.now() - requested > TTL) {
            eventData = null;
            getEvent();
        }

        return data.body;
    }, function () {
        eventData = null;
    });
}

function fetchEvent() {
    return new Promise(function (resolve, reject) {
        console.log('Making Eventbrite request on %s', new Date());

        var req = https.get({
            hostname: eventbrite.hostname,
            path    : path.join('/', eventbrite.version, EVENT_PATH)
        });

        req.on('error', reject);
        req.on('response', function (res) {
            var body = '';

            res.setEncoding('utf8');
            res.on('error', reject);
            res.on('data', function (chunk) { body += chunk; });
            res.on('end', function () {
                try {
                    resolve({
                        statusCode: res.statusCode,
                        body      : JSON.parse(body)
                    });
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
}
