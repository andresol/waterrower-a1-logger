var express = require('express'),
    router = express.Router(),
    path = require("path"),
    sessionService = require('../service/sessionService'),
    fs = require('fs'),
    request = require('request'),
    strava = require('strava-v3');

router.get('/upload/:id', function(req, res) {
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
                    'data_type':'gpx'
                    , 'file': file
                    , 'name': name
                    , 'activity_type': 'rowing'
                    , 'statusCallback': function(err,payload) {
                        if (payload.status === 'Your activity is ready.' || err) {
                            var result = {};
                            result.payload = payload;
                            result.error = err;
                            res.send(JSON.stringify(result, null, 3));
                        }
                    }
                },function(err,payload,limits) {
                    console.log(err);
                });

            }
        }, function (reason) { console.log(reason) });
    }

});

router.get('/url', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({url: strava.oauth.getRequestAccessURL({scope:"view_private,write"})}, null, 3));
});

module.exports = router;