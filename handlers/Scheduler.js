const Allocate = require('./Allocation');
const Deallocate = require('./Deallocation');
const Migration = require('./Migration');

let activeProcesses = [];
let waitingProcesses = [];

requestResource = (req) => {
    const priority = req.time < 1000 ? "HIGH" : req.time < 5000 ? "MODERATE" : "LOW";
    const processID = activeProcesses.length;
    let obj;
    let response;
    response = Allocate(priority, processID, req.jobs);

    if (!response.success) {
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
    active.push(obj);
    deleteResource(obj, req.time);
    return { "success": true, "processID": processNo }
}

deleteResource = async (process, time) => {
    setTimeout(() => {
        await Deallocate(process);
        activeProcesses.splice(process.processID, 1);
        activeProcesses = await Migration(activeProcesses);
        requestResource(waitingProcesses.pop())
    }, time);
}