var cuid = require('cuid');
var db = require('../db/db');

function addUser(user) {
    db.users.put(user.id, user);
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
    add: addUser
};