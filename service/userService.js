var cuid = require('cuid');
var db = require('../db/db');

function addUser(user) {
    user.id = cuid();
    db.users.put(user.id, JSON.stringify(user, null, 3));
}

function getUser(id) {
    return db.users.get(id);
}

function delUser(id) {
    return db.users.del(id);
}

function getAllUsers() {
    var values = [];
    db.users.createReadStream()
        .on('data', function (data) {
            //console.log(data.key, '=', data.value)
            values.push(data);
        });
    return values;
}

module.exports =  {
    add: addUser,
    get: getUser,
    del: delUser,
    all: getAllUsers
};