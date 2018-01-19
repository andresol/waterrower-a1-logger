var express = require('express'),
    router = express.Router(),
    path = require("path");
    fs = require('fs');


router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var filePath = path.sep + '..' + path.sep + 'public' + path.sep +
        'sessions' + path.sep;
    var files = [];
    fs.readdirSync(__dirname + filePath).filter(function (file) { file.endsWith(".gpx") }).forEach(function (file) {
            files.push(file);
    });
    res.send(JSON.stringify(files, null, 3));
});

module.exports = router;