
const cache = require('memory-cache');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

const httpsOptions = {
    hostname: 'api.meetup.com',
    port: 443,
    path:'find/upcoming_events?&sign=true&photo-host=public&lon=-81.77&lat=30.33&topic_category=34&radius=25&page=50&key=' + process.env.meetupapi_key,
    method: 'GET'
};

const options = {
    hostname: 'api.meetup.com',
    port: 443,
    path: '/find/groups?&sign=true&photo-host=public&zip=32246&category=34&radius=25&page=50&key=' + process.env.meetupapi_key,
    method: 'GET'
};

// Meetup API is adding witches to feed. Non-technical and needs to be removed.
function removeWitchesFromArray (meetupArray) {
    return meetupArray.filter(el => el.group.name !== 'Jacksonville Witches');
}

/*
 * Map function to set meeting times to correct timezone
 */
const mapTimeToNewYork = meeting => {
    const currTime = moment(meeting.time).utc().clone();
    return Object.assign({}, meeting, { time: currTime.tz('America/New_York') });
};

function refeshCache() {
    fetch('https://' + httpsOptions.hostname + httpsOptions.path)
        .then(response => response.json())
        .then(events => {
            const cleanEventArray = removeWitchesFromArray(events.results);
            const eventArrayCorrectedTimes = cleanEventArray.map(mapTimeToNewYork);
            cache.put('events', eventArrayCorrectedTimes, 3600000);
        })
        .catch(err => {
            console.error(err);
        });
    fetch('https://' + options.hostname + options.path)
        .then(response => response.json())
        .then(groupsObject => {
            cache.put('groups', groupsObject.results, 3600000);
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = refeshCache;
