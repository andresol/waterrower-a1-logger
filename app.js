var express = require('express')
    , app = express(),
 compression = require('compression');

const PORT = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'test';

app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(require('./controllers'));


app.listen(PORT, function() {
    console.log("Environment is " + env);
    console.log('Listening on port ' + PORT)
});