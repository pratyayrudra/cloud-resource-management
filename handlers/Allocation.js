let SERVER = require('../resources/SERVER');

module.exports = (priority, processID, jobs) => {
    for (let index = 0; index < SERVER[priority].length; index++) {
        if (SERVER[priority][index].jobs >= jobs) {
            SERVER[priority][index].process.push(processID);
            SERVER[priority][index].jobs -= jobs;
            console.log(`[ALLOCATION] Process ${processID} of ${priority} priority allocated to ${SERVER[priority][index].id}`);
            console.log(`[SERVER] ${JSON.stringify(SERVER[priority][index])}`);
            return { "success": true, "server": SERVER[priority][index].id };
        }
    }
    return { "success": false };
}