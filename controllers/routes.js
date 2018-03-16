var express = require('express'),
    router = express.Router(),
    routeService = require('../service/routeService'),
    bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

router.put('/add', jsonParser, function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.body) return res.sendStatus(400);
    var route = {... req.body}
    var gps = req.body.gps;
    gps = gps.replace(/(.*),(.*),(.*)/gm, '{ "lat": $1, "lon": $2, "el": $3 },');
    gps = JSON.parse("[" + gps.replace(/,\s*$/, "") + "]");
    route.gps = gps; 
    routeService.add(route);
    res.send(JSON.stringify(route, null, 3));
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
        var resRoute = routeService.routes[id.toUpperCase().replace(/ /g, '_')];
        if (resRoute) {
            res.send(resRoute);
            return;
        }
        routeService.get(id).then(function (value) {
            res.send(value);
        }).catch(function (err) { console.error(err); res.status(404).send('Cannot find route.'); });
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