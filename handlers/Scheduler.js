const Allocate = require('./Allocation');
const Deallocate = require('./Deallocation');
const Migration = require('./Migration');

let activeProcesses = [];
let waitingProcesses = [];

requestResource = (req) => {
    const priority = req.time < 1000 ? "HIGH" : req.time < 5000 ? "MODERATE" : "LOW";
    const processID = "PRO" + req.clientID;
    let obj;
    let response;
    response = Allocate(priority, processID, req.jobs);

    if (!response.success) {
        console.log(`[SCHEDULER] Process not allocated for ${req.clientID} waiting`);
        waitingProcesses.push(req);
        return { "success": false }
    }

    obj = {
        clientID: req.clientID,
        processID: processID,
        priority: priority,
        jobs: req.jobs,
        server: response.server
    }
    activeProcesses.push(obj);
    deleteResource(obj, req.time);
    return { "success": true, "processID": processID }
}

deleteResource = (process, time) => {
    setTimeout(async () => {
        await Deallocate(process);
        activeProcesses.splice(process.processID, 1);
        activeProcesses = await Migration(process.priority, activeProcesses);
        if (waitingProcesses.length) {
            console.log(`[SCHEDULER] Trying again with waiting process`);
            requestResource(waitingProcesses.shift())
        }
    }, time);
}

module.exports = {
    "requestResource": requestResource
}