var cuid = require('cuid');
var db = require('../db/db');
var routes = require('../models/routes');

function addRoute(route) {
    db.routes.put(route.name, route);
}

function getAllRoutes(limit, reverse) {
    return db.routes.createReadStream({limit: limit, reverse: reverse});
}

module.exports =  {
    addRoute: addRoute,
    all: getAllRoutes,
    getDefaults: routes.routes
}