var express = require('express'),
    router = express.Router(),
    RowSession = require('../models/rowSession'),
    GpxFile = require('../helpers/gpxFile')
    TcxFile = require('../helpers/tcxFile');

const NOT_ROWING = new RowSession("NOT_ROWING");

var session = NOT_ROWING;

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(session.stats(), null, 3));
})

router.get('/start', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session = new RowSession("ROWING");
    session.startRow();
    res.send(JSON.stringify(session, null, 3));
})

router.get('/simulate', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session = new RowSession("ROWING");
    session.simulate();
    res.send(JSON.stringify(session, null, 3));
})

router.get('/stop', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session.stop();
    var gpxFile = new GpxFile(session);
    var fileName = gpxFile.createFile();
    var stats = session.stats();
    stats.fileName = fileName;
    res.send(JSON.stringify(stats, null, 3));
    session = NOT_ROWING;
})

router.get('/stop/strava', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session.stop();
    res.send(JSON.stringify(session.stats(), null, 3));
    session = NOT_ROWING;
})

module.exports = router;