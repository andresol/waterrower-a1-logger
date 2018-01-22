var express = require('express'),
    router = express.Router(),
    strava = require('strava-v3');

router.put('/add/user', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}, null, 3));
});

router.post('/modify/user', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}, null, 3));
});

router.get('/user/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}), null, 3);
});

router.get('/user/:id/code', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //get auth url
    //strava.oauth.getRequestAccessURL({scope:"view_private,write"};
    strava.oauth.getToken(code,function(err,payload,limits) {
        console.log(payload); //access_token
    });
    res.send(JSON.stringify({}), null, 3);
});

router.delete('/user/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({}, null, 3));
});

module.exports = router;