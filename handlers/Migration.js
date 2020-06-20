let SERVER = require('../resources/SERVER');

module.exports = (processess) => {
    for (let index = SERVER["HIGH"].length; index > 0; index--) {
        const server = SERVER["HIGH"][index];

        if (server.jobs != 0 && server.jobs < (100 - SERVER["HIGH"][index - 1].jobs)) {
            SERVER["HIGH"][index - 1].jobs += server.jobs;
            SERVER["HIGH"][index - 1].process.concat(server.process);
            server.process.forEach(pro => {
                const pos = processess.findIndex(process => process.processID == pro);
                processess[pos].server = `h${index - 1}`;
            })
        }
    }

    for (let index = SERVER["MODERATE"].length; index > 0; index--) {
        const server = SERVER["MODERATE"][index];

        if (server.jobs != 0 && server.jobs < (100 - SERVER["MODERATE"][index - 1].jobs)) {
            SERVER["MODERATE"][index - 1].jobs += server.jobs;
            SERVER["MODERATE"][index - 1].process.concat(server.process);
            server.process.forEach(pro => {
                const pos = processess.findIndex(process => process.processID == pro);
                processess[pos].server = `m${index - 1}`;
            })
        }
    }

    for (let index = SERVER["LOW"].length; index > 0; index--) {
        const server = SERVER["LOW"][index];

        if (server.jobs != 0 && server.jobs < (100 - SERVER["LOW"][index - 1].jobs)) {
            SERVER["LOW"][index - 1].jobs += server.jobs;
            SERVER["LOW"][index - 1].process.concat(server.process);
            server.process.forEach(pro => {
                const pos = processess.findIndex(process => process.processID == pro);
                processess[pos].server = `l${index - 1}`;
            })
        }
    }

    return processess;
}

