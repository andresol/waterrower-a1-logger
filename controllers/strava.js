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
                        console.log(err);
                        console.log(payload);
                    }
                },function(err,payload,limits) {
                    console.log(err);
                    console.log(payload);
                    console.log(limits);
                });

            }
        }, function (reason) { console.log(reason) });
    }
    res.send(JSON.stringify({status: "Uploading!!"}, null, 3));
});

router.get('/test', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log( strava.oauth.getRequestAccessURL({scope:"view_private,write"}))
    res.send(JSON.stringify({status: "Uploading!!"}, null, 3));
});

module.exports = router;