
async function events(req, res) {
    const events = await req.service.getLocalTechEvents();
    res.render('events', { title: 'Events', eventArray: events });
}

async function groups(req, res) {
    const groups = await req.service.getLocalGroups();
    res.render('groups', { title: 'Groups', groupArray: groups });
}

exports.events = events;
exports.groups = groups;
