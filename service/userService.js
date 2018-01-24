var cuid = require('cuid');
var db = require('../db/db');

function addUser(user) {
    if (!user.id) {
        user.id = cuid();
    }
    db.users.put(user.id, JSON.stringify(user, null, 3));
}

function getUser(id) {
    return db.users.get(id);
}

function delUser(id) {
    return db.users.del(id);
}

function getAllUsers(limit, reverse) {
    return db.users.createReadStream({limit: limit, reverse: reverse});
}

module.exports =  {
    add: addUser,
    get: getUser,
    del: delUser,
    all: getAllUsers
};