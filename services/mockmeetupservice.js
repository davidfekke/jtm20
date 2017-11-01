
const fs = require('fs');
const promisfy = require('util').promisify;
const readFileAsync = promisfy(fs.readFile);

async function getLocalTechEvents() {
    return await readFileAsync('./services/events.json');
}

async function getLocalGroups() {
    return await readFileAsync('./services/groups.json');
}

exports.getLocalTechEvents = getLocalTechEvents;
exports.getLocalGroups = getLocalGroups;
