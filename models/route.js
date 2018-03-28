var LatLon = require('geodesy').LatLonVectors;
var LatLonV = require('geodesy').LatLonSpherical;

function Route(route) {
    this.index = 0;
    this.coordinates = route;
    this.start = route[0];
}

Route.prototype.nextPoint = function (p, meters) {
    if (!p) {
        p = new LatLon(this.start.lat, this.start.lon)
    }
    var next = this.getNext(this.index);
    var coo = this.coordinates[next];
    var nextP = new LatLon(coo.lat, coo.lon);
    var bearing = p.bearingTo(nextP);
    if (p.distanceTo(nextP, 6362170) < 10) {
        this.index = next;
    }
    return p.destinationPoint(meters, bearing, 6362170);
};

Route.prototype.getIndex = function (i) {
  return i < this.coordinates.length ? i : 0 ;
};

Route.prototype.getNext = function (i) {
    return this.getIndex(i + 1);
};

/** Get the length of the route in meters */
Route.prototype.getRouteLength = function () {
    var meters = 0;
    for (var i = 0; i < this.coordinates.length - 1 ; i++ ) {
        var latLon = new LatLonV(this.coordinates[i].lat,this.coordinates[i].lon);
        meters += latLon.distanceTo(new LatLonV(this.coordinates[i + 1].lat, this.coordinates[i + 1].lon));
    }
    return meters | 0;
};

// export the class
module.exports = Route;