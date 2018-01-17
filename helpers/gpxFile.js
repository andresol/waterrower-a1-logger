
var LatLon = require('geodesy').LatLonVectors;
var fs = require('fs');
var builder = require('xmlbuilder');
var RowSession = require('../models/rowSession');

const METER_RATION = (100 / 4.805);

function GpxFile(rowSession) {
    this.rowSession = rowSession;
    this.start = new LatLon(59.884932, 10.760809);
}

GpxFile.prototype.createFile = function() {

    var root = builder.create(this.getRootObject(),  {version: '1.0', encoding: 'UTF-8'});
    root.ele(this.getMetaData());

    var object = {
        trk: {
            name: new Date(this.rowSession.start).toISOString(),
            trkseg: {}
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
            '@lat': p.lat.toFixed(7),
            '@lon': p.lon.toFixed(7),
            ele: 0,
            time: rawTime.toISOString(),
        };
        trackPoints.push(trackPoint);
    }

    object.trk.trkseg.trkpt = trackPoints;


    root.ele(object);
    //console.log(root.end(({ pretty: true})));
    this.writeFile(__dirname +'/../public/sessions/' + object.trk.name +".gpx", root.end(({ pretty: true})));
};

GpxFile.prototype.writeFile = function (path, data) {
    fs.writeFile(path, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

};

GpxFile.prototype.getMetaData = function () {
    return {
        metadata: {
            time: new Date(this.rowSession.start).toISOString()
        }
    }
}

GpxFile.prototype.getRootObject = function () {
    return {
        gpx: {
            '@creator': 'Waterrower A1',
            '@version': '1.1',
            '@xmlns': "http://www.topografix.com/GPX/1/1",
            '@xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
            '@xsi:schemaLocation': "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd"
        }
    }
};

// export the class
module.exports = GpxFile;


