var express = require('express'),
    router = express.Router(),
    RowSession = require('../models/rowSession'),
    GpxFile = require('../helpers/gpxFile'),
    Route = require('../models/route'),
    Routes = require('../models/routes'),
    sessionService = require('../service/sessionService'),
    sanitize = require("sanitize-filename");

const NOT_ROWING = new RowSession("NOT_ROWING", new Route(Routes.routes[0].gps));

var session = NOT_ROWING;

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(session.stats(), null, 3));
});

router.get('/routes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(Routes.routes, null, 3));
});

router.get('/start', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (session === NOT_ROWING) {
        var routeParam = req.query.routes;
        if (isNaN(routeParam)) {
            routeParam = 1;
        }
        var r = Routes.routes[routeParam];
        session = new RowSession("ROWING", new Route(r.gps));
        try {
            session.startRow();
            session.route = routeParam;
        } catch (e) {
            session = NOT_ROWING;
            console.log("Cannot start row. Look at error" + e);
        }
    }
    res.send(JSON.stringify(session, null, 3));
});

router.get('/simulate', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (session === NOT_ROWING) {
        var routeParam = req.query.routes;
        if (isNaN(routeParam)) {
            routeParam = 1;
        }
        var r = Routes.routes[routeParam];
        session = new RowSession("SIMULATE", new Route(r.gps));
        session.route = routeParam;
        session.simulate();
    }
    res.send(JSON.stringify(session, null, 3));
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