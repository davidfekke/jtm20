
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
function removeWitchesFromArray(meetupArray) {
	return meetupArray.filter(function (el) { return el.group.name !== "Jacksonville Witches"});
}

function events(req, res) {
  //res.send('Hello World!')
    let cEvents = cache.get('events');
    if (cEvents !== null) {
        console.log('Cached Events ran');
        res.render('events', { title: 'Events', eventArray: cEvents });
    } else {
        fetch('https://' + httpsOptions.hostname + httpsOptions.path)
            .then(response => response.json())
            .then(events => {
                const cleanEventArray = removeWitchesFromArray(events.results);
                cache.put('events', cleanEventArray, 3600000);
                res.render('events', { title: 'Events', eventArray: cleanEventArray });
            })
            .catch(err => {
                console.error(err);
                let eventsObject = {};
                eventsObject.results = [];
                res.render('events', { title: 'Events', eventArray: eventsObject.results });
            });
    }
}

function groups(req, res) {
    var cGroups = cache.get('groups');
	if (cGroups !== null)
	{
        console.log('Groups cached');
		res.render('groups', { title: 'Groups', groupArray: cGroups });
	} else {
        fetch('https://' + options.hostname + options.path)
            .then(response => response.json())
            .then(groupsObject => {
                console.log(groupsObject.results);
                cache.put('groups', groupsObject.results, 3600000);
                res.render('groups', { title: 'Groups', groupArray: groupsObject.results });
            })
            .catch(err => {
                console.error(err);
                let groupsObject = {};
                groupsObject.results = [];
                res.render('groups', { title: 'Groups', groupArray: groupsObject.results });
            });
    }
}

exports.events = events;
exports.groups = groups;