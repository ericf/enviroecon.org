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
    meeting.speaker = getSpeaker(meeting.speaker);

    return meeting;
});

exports.breakouts = require('./breakouts.yml').map(function (session) {
    if (session.speaker) {
        session.speaker = getSpeaker(session.speaker);
        session.name    = session.speaker.name;
        session.url     = '/speakers/#' + session.speaker.id;
    }

    return session;
});

function getSpeaker(id) {
    var speaker = null;

    exports.speakers.some(function (s) {
        if (s.id === id) {
            speaker = s;
            return true;
        }
    });

    return speaker;
}
