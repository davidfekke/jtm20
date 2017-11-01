
const fs = require('fs');
const promisfy = require('util').promisify;
const readFileAsync = promisfy(fs.readFile);

async function getLocalTechEvents() {
    const fEvents = await readFileAsync('./services/events.json');
    return fEvents;
}

async function getLocalGroups() {
    const fGroups = await readFileAsync('./services/groups.json');
    return fGroups;
}

exports.getLocalTechEvents = getLocalTechEvents;
exports.getLocalGroups = getLocalGroups;
