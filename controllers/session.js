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

module.exports = router;