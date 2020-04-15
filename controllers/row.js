var express = require('express'),
    router = express.Router(),
    RowSession = require('../models/rowSession'),
    GpxFile = require('../helpers/gpxFile'),
    Route = require('../models/route'),
    Routes = require('../models/routes'),
    sessionService = require('../service/sessionService'),
    sanitize = require("sanitize-filename");

const env = process.env.NODE_ENV || 'test';
const NOT_ROWING = new RowSession("NOT_ROWING", new Route(Routes.routes[0].gps));

var session = NOT_ROWING;
const STATUS_ROWING = {status: 'ROWING'};
const STATUS_NOT_ROWING = {status: 'NOT_ROWING'};

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(session.stats(), null, 3));
});

router.get('/gpx', function(req, res) {
    res.setHeader('Content-Type', 'application/xml');
    let route = session.routeObject;
    let gpxFile = new GpxFile(JSON.parse(JSON.stringify(session)), new Route(route.coordinates));
    let xml = gpxFile.createXml();
    let stringXml = xml.root.end(({ pretty: true}));
    res.send(stringXml, null, 3);
});

router.get('/status', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (session === NOT_ROWING) {
        res.send(JSON.stringify({status: STATUS_NOT_ROWING.status, user: "", route: 1 }, null, 3)); //Default
    } else {
        res.send(JSON.stringify({status: STATUS_ROWING.status, user: session.userId, route: session.route }, null, 3));
    }
});

router.get('/routes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(Routes.routes, null, 3));
});

function startRow(req) {
    let routeParam = req.query.routes;
    let userId = req.query.user;
    if (isNaN(routeParam)) {
        routeParam = 1;
    }

    var r = Routes.routes[routeParam];
    session = new RowSession("ROWING", new Route(r.gps), userId);
    try {
        session.startRow();
        session.route = routeParam;
    } catch (e) {
        session = NOT_ROWING;
        console.log("Cannot start row. Look at error" + e);
    }
}

router.get('/start', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (session === NOT_ROWING) {
        simulateRow(req);
    }
    let val = Object.assign({}, session);
    delete val.waterrower
    res.send(JSON.stringify(val, null, 3));
});

function simulateRow(req) {
    let routeParam = req.query.routes;
    let userId = req.query.user;
    if (isNaN(routeParam)) {
        routeParam = 1;
    }
    var r = Routes.routes[routeParam];
    session = new RowSession("SIMULATE", new Route(r.gps), userId);
    session.heartRate();
    session.route = routeParam;
    session.simulate();
}

router.get('/simulate', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (session === NOT_ROWING) {
        simulateRow(req);
    }
    let val = Object.assign({}, session);
    delete val.waterrower
    res.send(JSON.stringify(val, null, 3));
});

router.get('/stop', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var routeParam = req.query.routes;
    if (isNaN(routeParam)) {
        routeParam = 1;
    }
    var user = req.query.user;
    if (session !== NOT_ROWING) {
        session.route = routeParam;
        session.user = user;
        session.stop();
        sessionService.addSession(session);
        var r = Routes.routes[routeParam];
        var gpxFile = new GpxFile(session, new Route(r.gps));
        var fileName = gpxFile.createFile();
        var stats = session.stats();
        stats.name = session.name;
        stats.fileName = sanitize(fileName);
        res.send(JSON.stringify(stats, null, 3));
        session = NOT_ROWING;
    }
});

router.get('/stop/strava', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session.stop();
    session = NOT_ROWING;
    res.send(JSON.stringify(session.stats(), null, 3));
});

module.exports = router;
