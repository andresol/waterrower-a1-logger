var cuid = require('cuid');
var db = require('../db/db');
var routes = require('../models/routes');

function addRoute(route) {
    db.routes.put(route.name, route);
}

function getAllRoutes(limit, reverse) {
    return db.routes.createReadStream({limit: limit, reverse: reverse});
}

function getRoute(id) {
    return db.routes.get(id);
}


module.exports =  {
    add: addRoute,
    all: getAllRoutes,
    getDefaults: routes.routes,
    routes: routes,
    get: getRoute
}