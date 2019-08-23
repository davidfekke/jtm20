
async function events(req, res) {
    res.render('home');
}

// async function groups(req, res) {
//     const groups = await req.service.getLocalGroups();
//     res.render('groups', { title: 'Groups', groupArray: groups });
// }

exports.events = events;
