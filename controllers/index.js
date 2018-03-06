var express = require('express')
    ,router = express.Router();

router.use('/row', require('./row'));
router.use('/session', require('./session'));
router.use('/strava', require('./strava'));
router.use('/users', require('./users'));
router.use('/routes', require('./routes'));

router.get('/', function(req, res) {
    res.sendFile('index.html', {root: './public'});
});

router.get('/main', function(req, res) {
    res.sendFile('main.html', {root: './public'});
});

router.get('/history', function(req, res) {
    res.sendFile('history.html', {root: './public'});
});

router.get('/sessions', function(req, res) {
    res.sendFile('session.html', {root: './public'});
});

router.get('/user/', function(req, res) {
    res.sendFile('user.html', {root: './public'});
});

router.get('/route/', function(req, res) {
    res.sendFile('route.html', {root: './public'});
});

module.exports = router;