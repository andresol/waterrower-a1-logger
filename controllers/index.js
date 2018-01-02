var express = require('express')
    , router = express.Router()

router.use('/row', require('./row'))

router.get('/', function(req, res) {
})

module.exports = router