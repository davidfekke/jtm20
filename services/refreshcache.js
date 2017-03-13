
const cache = require('memory-cache');
const fetch = require('node-fetch');

const httpsOptions = {
    hostname: 'api.meetup.com',
    port: 443,
    path: '/2/open_events?&sign=true&photo-host=public&zip=32246&category=34&radius=25&page=50&key=' + process.env.meetupapi_key,
    method: 'GET'
};

const options = {
    hostname: 'api.meetup.com',
    port: 443,
    path: '/2/groups?&sign=true&zip=32246&category_id=34&radius=25&page=50&key=' + process.env.meetupapi_key,
    method: 'GET'
};

// Meetup API is adding witches to feed. Non-technical and needs to be removed.
function removeWitchesFromArray (meetupArray) {
    return meetupArray.filter(el => el.group.name !== 'Jacksonville Witches');
}

function refeshCache() {
    fetch('https://' + httpsOptions.hostname + httpsOptions.path)
        .then(response => response.json())
        .then(events => {
            const cleanEventArray = removeWitchesFromArray(events.results);
            cache.put('events', cleanEventArray, 3600000);
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
