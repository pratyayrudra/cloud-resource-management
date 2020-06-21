const Cloud = require('./handlers/Scheduler');

const requests = require('./tests/Requests.json');

requests.forEach(request => {
    setTimeout(() => {
        Cloud.requestResource(request);
    }, 1000);
})