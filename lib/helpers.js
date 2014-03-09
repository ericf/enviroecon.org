'use strict';

var Handlebars = require('handlebars');

exports.eventDay  = eventDay;
exports.eventTime = eventTime;
exports.speaker   = speaker;

// -----------------------------------------------------------------------------

var createFrame = Handlebars.createFrame,
    escape      = Handlebars.Utils.escapeExpression,
    extend      = Handlebars.Utils.extend,
    SafeString  = Handlebars.SafeString;

function eventDay(moment) {
    return moment.format('MMMM D, YYYY');
}

function eventTime(start, end) {
    var weekday = start.format('dddd');

    function format(moment) {
        if (moment.minutes()) {
            return moment.format('h:mma');
        }

        return moment.format('ha');
    }

    start = format(start);
    end   = format(end);

    return new SafeString(weekday + ', ' + start + ' &ndash; ' + end);
}

function speaker(options) {
    var context   = options.hash,
        firstName = context.name.split(' ')[0].toLowerCase();

    context.photo = firstName + '.jpg';

    return options.fn(context);
}
