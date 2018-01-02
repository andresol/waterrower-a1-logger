var express = require('express')
    , router = express.Router(),
    RowSession = require('../models/rowSession')

const NOT_ROWING = new RowSession("NOT_ROWING")

session = NOT_ROWING

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(session.stats(), null, 3));
})

router.get('/start', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session = new RowSession("ROWING");
    session.simulate();
    res.send(JSON.stringify(session, null, 3));
})

router.get('/stop', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    session.stop();
    res.send(JSON.stringify(session.stats(), null, 3));
    session = NOT_ROWING;
})

module.exports = router