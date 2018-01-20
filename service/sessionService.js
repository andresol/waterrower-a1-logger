var cuid = require('cuid');
var db = require('../db/db');

function addSession(session) {
    db.sessions.put(session.name, JSON.stringify(session, null, 3));
}

function getSession(id) {
    return db.sessions.get(id);
}

function delSession(id) {
    return db.sessions.del(id);
}

function getAllSessions(limit, reverse) {
    return db.sessions.createReadStream({limit: limit, reverse: reverse});
}
module.exports =  {
    addSession: addSession,
    getAll: getAllSessions,
    get: getSession,
    del: delSession
};