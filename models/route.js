var LatLon = require('geodesy').LatLonVectors;

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

// export the class
module.exports = Route;