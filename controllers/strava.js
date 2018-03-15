var express = require('express'),
    router = express.Router(),
    path = require("path"),
    sessionService = require('../service/sessionService'),
    routeService = require('../service/routeService'),
    fs = require('fs'),
    request = require('request'),
    strava = require('strava-v3');

router.get('/upload/:id', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        var session = sessionService.get(id);
        session.then(function (value) {
            value = JSON.parse(value);
            if (value) {
                var name = String(value.name);
                var file = path.join(__dirname, '..', 'public', 'sessions', name
                    + '.gpx');
                strava.uploads.post({
                    'data_type': 'gpx'
                    , 'file': file
                    , 'name': name
                    , 'activity_type': 'rowing'
                    , 'statusCallback': function (err, payload) {
                        if (payload.status === 'Your activity is ready.' || err) {
                            var result = {};
                            result.payload = payload;
                            result.error = err;
                            res.send(JSON.stringify(result, null, 3));
                        }
                    }
                }, function (err, payload, limits) {
                    console.log(err);
                });

            }
        }, function (reason) { console.log(reason) });
    }

});

router.get('/route/:name', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var name = req.params.name;
    if (name) {
        var resRoute = routeService.routes[name.toUpperCase().replace(/ /g, '_')];
        if (resRoute) {
            getSegment(resRoute, res);
            return;
        }
        routeService.get(name).then(function (value) {
            var route = JSON.parse(value);
            getSegment(resRoute, res);
        }).catch(function (err) {
            console.error(err); res.status(404).send('Not found.');
        });
    } else {
        res.status(404).send('Not found.');
    }
});

router.get('/route/leaderboard/:name', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var name = req.params.name;
    if (name) {
        var resRoute = routeService.routes[name.toUpperCase().replace(/ /g, '_')];
        if (resRoute) {
            getLeaderboard(resRoute, res);
            return;
        }
        routeService.get(name).then(function (value) {
            var route = JSON.parse(value);
            getLeaderboard(resRoute, res);
        }).catch(function (err) {
            console.error(err); res.status(404).send('Not found.');
        });
    } else {
        res.status(404).send('Not found.');
    }
});

router.get('/url', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ url: strava.oauth.getRequestAccessURL({ scope: "view_private,write" }) }, null, 3));
});

module.exports = router;

function getLeaderboard(resRoute, res) {
    strava.segments.listLeaderboard({ id: resRoute.segementId }, function (err, payload, limits) {
        if (err) {
            res.status(400).send('Error strava api');
        }
        else {
            res.send(JSON.stringify(payload, null, 3));
        }
    });
}

function getSegment(resRoute, res) {
    strava.segments.get({ id: resRoute.segementId }, function (err, payload, limits) {
        if (err) {
            res.status(400).send('Error strava api');
        }
        else {
            res.send(JSON.stringify(payload, null, 3));
        }
    });
}
