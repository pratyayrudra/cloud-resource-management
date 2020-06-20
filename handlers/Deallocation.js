let SERVER = require('../resources/SERVER');

module.exports = (job) => {
    SERVER[job.priority][job.server.substr(1)].process.splice(SERVER[job.priority][job.server.substr(1)].process.indexOf(job.processID), 1);
    SERVER[job.priority][job.server.substr(1)].jobs += job.jobs;
}