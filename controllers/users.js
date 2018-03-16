var express = require('express'),
    router = express.Router(),
    strava = require('strava-v3'),
    userService = require('../service/userService'),
    bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.put('/add', jsonParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.body) return res.sendStatus(400);
    userService.add(req.body);
    res.send(JSON.stringify(req.body, null, 3));
});

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var array = [];
    userService.all(50, true).on('data', function (data) {
        array.push(JSON.parse(data.value));
    }).on('error', function (err) {
        console.log('Oh my!', err)
    }).on('end', function () {
        res.send(JSON.stringify(array, null, 3));
    });
});

router.get('/:id', function(req, res) {
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

router.get('/strava/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    var code = req.query.code;
    if (id && code) {
        userService.get(id).then(function (value) {
            strava.oauth.getToken(code, function(err,payload,limits) {
                if (value) {
                    var user = JSON.parse(value);
                    user.stravaKey = payload.access_token;
                    userService.add(user);
                    res.redirect('/user');
                } else {
                    res.status(404).send('Cannot find user');
                }
            });

        }).catch(function (err) { console.error(err) });
    } else{
        res.status(404).send('Cannot find user');
    }
});


router.delete('/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        userService.del(id);
    }
    res.send(JSON.stringify({status: "deleted"}, null, 3));
});

module.exports = router;