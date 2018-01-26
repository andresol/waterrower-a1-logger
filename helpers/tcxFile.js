
var LatLon = require('geodesy').LatLonVectors;
var fs = require('fs');
var path = require("path");
var builder = require('xmlbuilder');
var RowSession = require('../models/rowSession');
var DateDiff = require('date-diff');
var sanitize = require("sanitize-filename");

//MISSING SPEED OSV
const METER_RATION = (100 / 4.805);

function TcxFile(rowSession, route) {
    this.rowSession = rowSession;
    this.route = route;
}

TcxFile.prototype.createFile = function() {

    var root = builder.create(this.getRootObject());

    var object = {
        Activities: {
            Activity: {
                '@Sport': 'other',
                Id: new Date(this.rowSession.start).toISOString(),
            }
        }
    };

    var trackPoints = [];
    var p = null;
    var skip = 5;
    if (this.rowSession.raw.length < 30) {
        skip = 1;
    }
    var laps = [];
    var start = 0;
    var lapLength = 0;
    var i = 0;
    for (; i < this.rowSession.raw.length; i++) {
        var rawTime = new Date(this.rowSession.raw[i]);
        var distance = RowSession.prototype.getLengthInMetersByClicks(6); //6 click per raw.
        p = this.route.nextPoint(p, distance.toFixed(4));
        lapLength += distance;
        var trackPoint = {
            Time: rawTime.toISOString(),
            Position: {
                LatitudeDegrees: p.lat.toFixed(7),
                LongitudeDegrees: p.lon.toFixed(7)
            },
            AltitudeMeters: 0,
            DistanceMeters: distance.toFixed(4)
        };
        trackPoints.push(trackPoint);

        if (lapLength >= 500 || i === (this.rowSession.raw.length -1) ) {
            var date1 = this.rowSession.raw[start];

            var diff = new DateDiff(rawTime, date1);

            var lap = {
                '@StartTime': new Date(this.rowSession.start).toISOString(),
                TotalTimeSeconds: diff.seconds(),
                DistanceMeters: lapLength,
                Intensity: 'Active',
                TriggerMethod: 'Manual',
                track: {
                    Trackpoint: trackPoints
                }
            };
            laps.push(lap);
            lapLength = 0;
            trackPoints = [];
            this.start = i;
        }
    }



    object.Activities.Activity.lap = laps;

    root.ele(object);
    console.log(root.end(({ pretty: true})));
    var filePath = path.sep + '..' + path.sep + 'public' + path.sep +
        'sessions' + path.sep + sanitize(object.Activities.Activity.Id) +".tcx";
    this.writeFile(__dirname  + filePath , root.end(({ pretty: true})));

    return sanitize(object.Activities.Activity.Id +".tcx");
};

TcxFile.prototype.writeFile = function (path, data) {
    fs.writeFile(path, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

};

TcxFile.prototype.getRootObject = function () {
    return {
        TrainingCenterDatabase: {
            '@xsi:schemaLocation': "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd",
            '@xmlns:ns5': "http://www.garmin.com/xmlschemas/ActivityGoals/v1",
            '@xmlns:ns3': "http://www.garmin.com/xmlschemas/ActivityExtension/v2",
            '@xmlns:ns2': "http://www.garmin.com/xmlschemas/UserProfile/v2",
            '@xmlns': "http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2",
            '@xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance"
        }
    }
};

// export the class
module.exports = TcxFile;


