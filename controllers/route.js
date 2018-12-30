var express = require('express'),
    router = express.Router(),
    routeService = require('../service/routeService'),
    bodyParser = require('body-parser'),
    Route = require('../models/route');

var jsonParser = bodyParser.json();


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



module.exports = router;