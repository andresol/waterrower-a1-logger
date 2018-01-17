
var LatLon = require('geodesy').LatLonVectors;
var fs = require('fs');
var builder = require('xmlbuilder');
var RowSession = require('../models/rowSession');
//MISSING SPEED OSV
const METER_RATION = (100 / 4.805);

function TcxFile(rowSession) {
    this.rowSession = rowSession;
    this.start = new LatLon(59.884932, 10.760809);
}

TcxFile.prototype.createFile = function() {

    var root = builder.create(this.getRootObject());

    var object = {
        Activities: {
            Activity: {
                '@Sport': 'other',
                Id: new Date(this.rowSession.start).toISOString(),
                Lap: {
                    '@StartTime': new Date(this.rowSession.start).toISOString(),
                    TotalTimeSeconds: this.rowSession.totalTimeInSec(),
                    DistanceMeters: this.rowSession.totalInMeters()
                }
            }
        }
    };

    var trackPoints = [];
    var p = this.start;
    var skip = 5;
    if (this.rowSession.raw.length < 30) {
        skip = 1;
    }
    for (var i = 0; i < this.rowSession.raw.length; i = i + skip) {
        var rawTime = new Date(this.rowSession.raw[i]);
        var distance = RowSession.prototype.getLengthInMetersByClicks(skip * 6); //6 click per raw.
        p = p.destinationPoint(distance.toFixed(4), 0, 6362170);
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
    }


    var track = {};
    track.Trackpoint = trackPoints;

    object.Activities.Activity.Lap.Track = track;

//     <Extensions>
//     <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
//         <Speed>0.0</Speed>
//         </TPX>
//         </Extensions>
//         </Trackpoint>

    // for (var i = 0; i < this.raw.length; i++) {
    //
    //     var p1 = p1
    //     console.log(p1)
    // }

    root.ele(object);
    console.log(root.end(({ pretty: true})));
    this.writeFile('', root.end(({ pretty: true})));
};

TcxFile.prototype.writeFile = function (path, data) {
    fs.writeFile("/tmp/test.tcx", data, function(err) {
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


