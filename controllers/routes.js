var express = require('express'),
    router = express.Router(),
    routeService = require('../service/routeService'),
    bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.put('/add', jsonParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.body) return res.sendStatus(400);
    //routeService.add(req.body);
    res.send(JSON.stringify('', null, 3));
});

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var array = [];
    array.push.apply(array, routeService.getDefaults);
    routeService.all(50, true).on('data', function (data) {
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
        routeService.get(id).then(function (value) {
            res.send(value);
        }).catch(function (err) { console.error(err) });
    } else{
        res.status(404).send('Cannot find route');
    }
});


router.delete('/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        routeService.del(id);
    }
    res.send(JSON.stringify({status: "deleted"}, null, 3));
});

module.exports = router;