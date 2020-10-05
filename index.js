const { Messenger } = require('./messenger.js');

const messenger = new Messenger();

messenger.on('connect', () => {
    console.log("Connected");
});

messenger.on('data', (data) => {
    console.log("data");
});

messenger.on('error', (e) => {
    console.log("error", e);
});

