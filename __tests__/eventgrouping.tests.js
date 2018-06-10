/* eslint-disable */
'use strict';
const events = require('../services/events.json');
const moment = require('moment');

test('check for meetup events', (done) => {
    console.log(events.results[1]);
    const eventsGroupedByDate = events.results.reduce((acc, item) => {
        const date = moment(item.time).format('dddd, MMMM Do YYYY');
        console.log(date);
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
    }, {});
    
    //1528903800000
    const someValue = true;
    expect(someValue).toBe(true);
    done();
});