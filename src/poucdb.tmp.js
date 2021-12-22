const PouchDB = require('pouchdb');

const localDB = new PouchDB('local')
const remoteDB = new PouchDB('http://admin:123@localhost:5984/foo2')

const localLog = new PouchDB('localLog')
const remoteLog = new PouchDB('http://admin:123@localhost:5984/icarus_log')

console.log('init')

async function console_status(){
    x = await localDB.get("icarus-current-status");
    console.log('status:', x["time"])
}

async function console_log(change){
    docs = change.change.docs
    console.log('change:', docs)
}

localDB.sync(remoteDB, {
    live: true
  }).on('change', function (change) {
    console_status()
  }).on('error', function (err) {
    console.log('err en status:', err)
});

localLog.sync(remoteLog, {
    live: true
  }).on('change', function (change) {
    console_log(change)
  }).on('error', function (err) {
    console.log('err en log:', err)
});
