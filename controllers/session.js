var express = require('express'),
    router = express.Router(),
    path = require("path"),
    sessionService = require('../service/sessionService'),
    fs = require('fs');

router.get('/files', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var filePath = path.sep + '..' + path.sep + 'public' + path.sep +
        'sessions' + path.sep;
    var files = [];
    fs.readdirSync(__dirname + filePath).filter(function (file) { file.endsWith(".gpx") }).forEach(function (file) {
            files.push(file);
    });
    res.send(JSON.stringify(files, null, 3));
});

router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    var array = [];
    sessionService.getAll(50, true).on('data', function (data) {
        array.push(JSON.parse(data.value));
    }).on('error', function (err) {
        console.log('Oh my!', err)
    }).on('end', function () {
        res.send(JSON.stringify(array, null, 3));
    });
});

router.get('/:start/:stop', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var start = req.params.start;
    var stop = req.params.stop;
    var result = [];
    var index = 0;
    return sessionService.getAllPag().on('data', function (data) {
        if (index >= start && index <= stop) {
            result.push(JSON.parse(data));
        }
        index++;
        if (index <= stop) {
            return;
        }
    }).on('error', function (err) {
        console.log('Oh my!', err)
    }).on('end', function () {
        res.send(JSON.stringify(result, null, 3));
    });
});

router.get('/size', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var index = 0;
    return sessionService.keys().on('data', function () {
        index++;
    }).on('error', function (err) {
        console.log('Oh my!', err)
    }).on('end', function () {
        res.send(JSON.stringify(index, null, 3));
    });
});

router.get('/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        sessionService.get(id).then(function (value) {
            res.send(value);
        }).catch(function (err) { 
            console.error(err);
            res.status(404).send('Cannot find session'); 
        });
    } else{
        res.status(404).send('Cannot find session');
    }
});

router.delete('/del/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;
    if (id) {
        sessionService.del(id);
    }
    res.send(JSON.stringify({status: "deleted"}, null, 3));
});

module.exports = router;