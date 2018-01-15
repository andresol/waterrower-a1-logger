
//var Gpio = require('onoff').Gpio;
var debounce = require('debounce');
var createGpx = require('gps-to-gpx');
var LatLon = require('geodesy').LatLonVectors

const RATION = 100 / 4.805; // 100 cm is 4.805 clicks. About 20.81 cm.
const PID = 4;
const DEBOUCE_TIME = 5; // 5ms
const SAMPLE_SIZE = 6;
const WATT_RATION = 2.80

var sensor;
var runSimulator = false;

function RowSession(status) {
    this.status = status;
    this.stroke = 0;
    this.counter = 0;
    this.start = Date.now();
    this.raw = [];
}

RowSession.prototype.stroke = function() {

};

RowSession.prototype.simulate = function() {
    console.log("Starting RowSession simulator");
    runSimulator = true;
    var that = this;
    (function loop() {
        if(runSimulator) {
            var rand = getRandomRowerSpeed((that.totalInMeters() % 1000) <= 500)
            setTimeout(function () {
                that.increase();
                loop();
            }, rand);
        }
    }());
};

RowSession.prototype.increase = function() {
    debounce(this.increment(), DEBOUCE_TIME);
};

RowSession.prototype.totalLaps = function () {
    return (this.totalInMeters() / 500)|0;
}

RowSession.prototype.laps = function () {
    var laps = [], totalLaps = this.totalLaps();
    if (totalLaps === 0) {
        return laps;
    }

    for (var i = 0; i < totalLaps; i++) {
        var lapSize = 500;
        var index = Math.floor(getClicksByMeters(500) / SAMPLE_SIZE);
        var startIndex = index * (i);
        var endIndex = index * (i + 1);
        var startTime = this.raw[startIndex];
        var endTime = this.raw[endIndex];
        var seconds = ((endTime - startTime) / 1000);
        var wattValue = watt(seconds/lapSize);
        laps.push({start: startTime, end: endTime, meters: lapSize, seconds: seconds, watt: wattValue});
    }
    return laps;
}

RowSession.prototype.increment = function() {
    this.counter = this.counter + 1;
    if (this.counter % SAMPLE_SIZE === 1) { //Total length
        this.raw.push(Date.now())
    }
};

RowSession.prototype.startRow = function() {
    sensor = new Gpio(PID, 'in', 'falling');
    var that = this;
    sensor.watch(function (err, value) {
        if (err) {
            throw err;
        }
        console.log("Registered event. " + value);
        that.increase()
    });
};

RowSession.prototype.stop = function() {
    console.log("Stopping RowSession");
    if (sensor) {
        sensor.unexport();
    }

    if (runSimulator) {
        runSimulator = false;
    }
}

RowSession.prototype.getTotalLength = function() {
    return this.counter * RATION;
}

RowSession.prototype.stats = function() {
    var stats = {};
    stats.length = this.getTotalLength();
    stats.meters = this.totalInMeters();
    stats.seconds = this.totalTimeInSec();
    stats.start = this.start;
    stats.pace = this.meterPerSeconds();
    stats.lapPace = this.fiveHundrePace();
    stats.towKPace = this.twoKPace();
    stats.totalLaps = this.totalLaps();
    stats.laps = this.laps();
    stats.watt = watt(this.totalTimeInSec() / this.totalInMeters());
    return stats;
}

RowSession.prototype.totalInMeters = function () {
    return this.getTotalLength() / 100
}

RowSession.prototype.totalTimeInSec = function () {
    return this.totalTime() / 1000
}

RowSession.prototype.totalTime = function () {
    return Date.now() - this.start
}

RowSession.prototype.meterPerSeconds = function () {
    return this.totalInMeters() / this.totalTimeInSec()
}

RowSession.prototype.fiveHundrePace = function () {
    return 500 / this.meterPerSeconds();
}

RowSession.prototype.twoKPace = function () {
    return 2000 / this.meterPerSeconds();
}

RowSession.prototype.gpxFile = function () {
    var wayPoints = [];
    for (var i = 0; i < this.raw.length; i++) {

    }
    return createGpx(waypoints, {
        activityName: "ROWING",
        startTime: this.start,
    });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomRowerSpeed(fast) {
    return getRandomArbitrary(10, 120) * ( fast ? 0.7 : 1)
}

function getClicksByMeters(meters) {
    var cm = meters * 100;
    return Math.floor(cm / RATION);
}

function watt(pace) {
    return WATT_RATION / Math.pow(pace, 3);
}

// export the class
module.exports = RowSession;