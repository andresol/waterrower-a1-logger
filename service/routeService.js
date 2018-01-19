var cuid = require('cuid');
var db = require('../db/db');

function addRoute(route) {
    db.routes.put(route.name, route);
}

function getAllRoutes() {
    var values = [];
    db.routes.createReadStream()
        .on('data', function (data) {
            //console.log(data.key, '=', data.value)
            values.push(data);
        });
    return values;
}
module.exports =  {
    addRoute: addRoute
}