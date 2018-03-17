var cuid = require('cuid');
var db = require('../db/db');
var routes = require('../models/routes');

function addRoute(route) {
    db.routes.put(route.name, JSON.stringify(route, null, 3));
}

function getAllRoutes(limit, reverse) {
    return db.routes.createReadStream({limit: limit, reverse: reverse});
}

function getAllRoutesPag() {
    return db.routes.createReadStream({reverse: true, keys: false});
}

function getRoute(id) {
    return db.routes.get(id);
}

function delRoute(id) {
    return db.routes.del(id);
}

function getAllKeys() {
    return db.routes.createReadStream({keys: true, values: false});
}

module.exports =  {
    add: addRoute,
    all: getAllRoutes,
    getDefaults: routes.routes,
    routes: routes,
    getAllPag: getAllRoutesPag,
    get: getRoute,
    del: delRoute,
    keys: getAllKeys
};