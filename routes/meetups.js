const moment = require('moment');

//.format('dddd, MMMM Do YYYY, hA')
const formatTimes = meeting => {
    const currTime = meeting.time.format('dddd, MMMM Do YYYY, hA');
    return Object.assign({}, meeting, { time: currTime });
};

async function events(req, res) {
    res.render('home');
}

async function groups(req, res) {
    const groups = await req.service.getLocalGroups();
    res.render('groups', { title: 'Groups', groupArray: groups });
}

exports.events = events;
exports.groups = groups;
