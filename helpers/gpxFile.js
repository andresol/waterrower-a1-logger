var LatLon = require('geodesy').LatLonVectors;
var fs = require('fs');
var path = require("path");
var builder = require('xmlbuilder');
var RowSession = require('../models/rowSession');
var sanitize = require("sanitize-filename");

const METER_RATION = (100 / 4.805);
const SEGMENT_LENGTH = 500; //meters

function GpxFile(rowSession, route ) {
    this.rowSession = rowSession;
    this.route = route;
}

GpxFile.prototype.createFile = function() {

    var root = builder.create(this.getRootObject(),  {version: '1.0', encoding: 'UTF-8'});
    root.ele(this.getMetaData());

    var object = {
        trk: {
            name: new Date(this.rowSession.start).toISOString(),
            trkseg: []
        }
    };

    var p = null;
    var skip = 5;
    if (this.rowSession.raw.length < 30) {
        skip = 1;
    }

    var trkseg = {};
    var trackPoints = [];
    var length = 0.0;
    var i = 0;
    for (; i < this.rowSession.raw.length; i = i + skip) {
        var rawTime = new Date(this.rowSession.raw[i]);
        var distance = RowSession.prototype.getLengthInMetersByClicks(skip * 6); //6 click per raw.
        p = this.route.nextPoint(p, distance.toFixed(4));
        length += distance;
        var trackPoint = {
            '@lat': p.lat.toFixed(7),
            '@lon': p.lon.toFixed(7),
            ele: 0,
            time: rawTime.toISOString()
        };
        if (this.rowSession.usingHr) {
            var hr = parseInt( this.rowSession.rawHr[i]);
            if (hr < 0) {
                hr = 0;
            }
            trackPoint.extensions = {
                'gpxtpx:TrackPointExtension': {
                    'gpxtpx:hr': this.rowSession.rawHr[i]
                }
            }
        }

        trackPoints.push(trackPoint);
    }
    //add last point.
    if (i !== (this.rowSession.raw.length - 1)) {
        var rawTime = new Date(this.rowSession.raw[this.rowSession.raw.length - 1]);
        var distance = RowSession.prototype.getLengthInMetersByClicks(skip * 6); //6 click per raw.
        p = this.route.nextPoint(p, distance.toFixed(4));
        var trackPoint = {
            '@lat': p.lat.toFixed(7),
            '@lon': p.lon.toFixed(7),
            ele: 0,
            time: rawTime.toISOString()
        };
        trackPoints.push(trackPoint);
    }
    //

    trkseg.trkpt = trackPoints;

    object.trk.trkseg = trkseg;
    root.ele(object);
    var filePath = path.sep + '..' + path.sep + 'public' + path.sep +
        'sessions' + path.sep + sanitize(object.trk.name) +".gpx";
    this.writeFile(__dirname  + filePath , root.end(({ pretty: true})));

    return sanitize(object.trk.name +".gpx");
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
};

GpxFile.prototype.getRootObject = function () {
    return {
        gpx: {
            '@creator': 'Waterrower A1',
            '@version': '1.1',
            '@xmlns': "http://www.topografix.com/GPX/1/1",
            '@xmlns:xsi': "http://www.w3.org/2001/XMLSchema-instance",
            '@xsi:schemaLocation': "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd",
            '@xmlns:gpxtpx': 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1',
            '@xmlns:gpxx': 'http://www.garmin.com/xmlschemas/GpxExtensions/v3'
        }
    }
};

// export the class
module.exports = GpxFile;


