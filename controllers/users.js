var express = require('express'),
    router = express.Router(),
    strava = require('strava-v3'),
    userService = require('../service/userService'),
    bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

router.put('/add', jsonParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.body) return res.sendStatus(400);
    res.send(JSON.stringify(req.body, null, 3));
});

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var array = [];
    userService.getAll(50, true).on('data', function (data) {
        array.push(JSON.parse(data.value));
    }).on('error', function (err) {
        console.log('Oh my!', err)
    }).on('end', function () {
        res.send(JSON.stringify(array, null, 3));
    });
});

router.get(':id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        userService.get(id).then(function (value) {
            res.send(value);
        }).catch(function (err) { console.error(err) });
    } else{
        res.status(404).send('Cannot find session');
    }
});

router.get(':id/code', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    //get auth url
    //strava.oauth.getRequestAccessURL({scope:"view_private,write"};
    strava.oauth.getToken(code,function(err,payload,limits) {
        console.log(payload); //access_token
    });
    res.send(JSON.stringify({}), null, 3);
});

router.delete(':id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        userService.del(id);
    }
    res.send(JSON.stringify({status: "deleted"}, null, 3));
});

module.exports = router;