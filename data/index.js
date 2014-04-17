'use strict';

var path = require('path'),
    YAML = require('yamljs');

exports.speakers = require('./speakers.yml').map(function (speaker) {
    var firstName = speaker.name.split(' ')[0],
        id        = firstName.toLowerCase();

    speaker.id        = id;
    speaker.firstName = firstName;
    speaker.photo     = id + '.jpg';

    return speaker;
});

exports.schedule = require('./schedule.yml').map(function (meeting) {
    var speaker;

    exports.speakers.some(function (s) {
        if (s.id === meeting.speaker) {
            speaker = s;
            return true;
        }
    });

    meeting.speaker = speaker;

    return meeting;
});
