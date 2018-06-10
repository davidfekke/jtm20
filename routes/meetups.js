const moment = require('moment');

//.format('dddd, MMMM Do YYYY, hA')
const formatTimes = meeting => {
    const currTime = meeting.time.format('dddd, MMMM Do YYYY, hA');
    return Object.assign({}, meeting, { time: currTime });
};

async function events(req, res) {
    try {
        const events = await req.service.getLocalTechEvents();
        const eventsGroupedByDate = events.reduce((acc, item) => {
            const date = moment(item.time).format('dddd, MMMM Do YYYY');
            acc[date] = acc[date] || [];
            acc[date].push(item);
            return acc;
        }, {});
        res.render('events', { title: 'Events', eventArray: eventsGroupedByDate });
    } catch (err) {
        throw err;
    }
    
}

async function groups(req, res) {
    const groups = await req.service.getLocalGroups();
    res.render('groups', { title: 'Groups', groupArray: groups });
}

exports.events = events;
exports.groups = groups;
