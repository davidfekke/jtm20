
const cache = require('memory-cache');
const fetch = require('node-fetch');
const moment = require('moment-timezone');

const eventHttpsOptions = {
    hostname: 'api.meetup.com',
    port: 443,
    path:'find/upcoming_events?&sign=true&photo-host=public&lon=-81.77&lat=30.33&topic_category=34&radius=25&page=50&key=' + process.env.meetupapi_key,
    method: 'GET'
};

const groupHttpsOptions = {
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

async function getLocalTechEvents() {
    const cEvents = cache.get('events');
    if (cEvents !== null) {
        return cEvents;
    } else {
        const response = await fetch('https://' + eventHttpsOptions.hostname + eventHttpsOptions.path);
        const json = await response.json();
        const cleanEventArray = removeWitchesFromArray(json.results);
        const eventArrayCorrectedTimes = cleanEventArray.map(mapTimeToNewYork);
        cache.put('events', eventArrayCorrectedTimes, 3600000);
        return eventArrayCorrectedTimes;
    }
}

async function getLocalGroups() {
    const cGroups = cache.get('groups');
    if (cGroups !== null) {
        return cGroups;
    } else {
        const response = await fetch('https://' + groupHttpsOptions.hostname + groupHttpsOptions.path);
        const json = await response.json();
        cache.put('groups', json.results, 3600000);
        return json.results;
    }
}

exports.getLocalTechEvents = getLocalTechEvents;
exports.getLocalGroups = getLocalGroups;
