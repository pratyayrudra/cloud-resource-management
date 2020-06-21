let SERVER = require('../resources/SERVER');

module.exports = (job) => {
    SERVER[job.priority][job.server.substr(1)].process.splice(SERVER[job.priority][job.server.substr(1)].process.indexOf(job.processID), 1);
    SERVER[job.priority][job.server.substr(1)].jobs += job.jobs;
    console.log(`[DEALLOCATION] Process ${job.processID} of ${job.priority} priority deallocated from ${job.server}`);
    console.log(`[SERVER] ${JSON.stringify(SERVER[job.priority][job.server.substr(1)])}`);
}