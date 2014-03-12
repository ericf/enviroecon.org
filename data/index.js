'use strict';

var path = require('path'),
    YAML = require('yamljs');

exports.schedule = loadSchedule();
exports.speakers = loadSpeakers();

// -----------------------------------------------------------------------------

function loadSpeakers() {
    return require('./speakers.yml').map(function (speaker) {
        var firstName = speaker.name.split(' ')[0],
            id        = firstName.toLowerCase();

        speaker.id        = id;
        speaker.firstName = firstName;
        speaker.photo     = id + '.jpg';

        return speaker;
    });
}

function loadSchedule() {
    return require('./schedule.yml');
}
