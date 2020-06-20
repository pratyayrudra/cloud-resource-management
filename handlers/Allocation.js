let SERVER = require('../resources/SERVER');

module.exports = (priority, processID, jobs) => {
    SERVER[priority].forEach(server => {
        if (server.jobs > jobs) {
            server.process.push(processID);
            server.jobs -= jobs;
            return { "success": true, "server": `l${SERVER.HIGH.indexOf(server)}` };
        }
    })
    return { "success": false };
}