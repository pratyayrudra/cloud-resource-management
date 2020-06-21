let SERVER = require('../resources/SERVER');

module.exports = (priority, processess) => {

    const maxJobs = priority === "HIGH" ? 100 : priority === "MODERATE" ? 70 : 30;

    for (let index = SERVER[priority].length - 1; index > 0; index--) {
        const server = SERVER[priority][index];
        if (server.jobs != maxJobs && (maxJobs - server.jobs) <= (SERVER[priority][index - 1].jobs)) {
            SERVER[priority][index - 1].jobs -= (maxJobs - server.jobs);
            SERVER[priority][index].jobs = maxJobs;
            SERVER[priority][index - 1].process.concat(server.process);
            server.process.forEach(pro => {
                const pos = processess.findIndex(process => process.processID == pro);
                processess[pos].server = processess[pos].server.substring(0, 1) + (index - 1);
                console.log(`[MIGRATION] Process ${processess[pos].processID} migrated from ${SERVER[priority][index].id} to ${SERVER[priority][index - 1].id}`);
            })
        }
    }

    return processess;
}

