var LatLon = require('geodesy').LatLonVectors;

function Route() {
    this.index = 0;
    this.coordinates = osloRow;
    this.start = osloRow[0];
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
}





var osloRow = [
        { lat: 59.88458761, lon: 10.76097965, el: 3.0 },
        { lat: 59.88488907, lon: 10.75823307, el: 1.0 },
        { lat: 59.88544890, lon: 10.75488567, el: 1.0 },
        { lat: 59.88536277, lon: 10.75050830, el: 1.0 },
        { lat: 59.88510439, lon: 10.74767589, el: 1.0 },
        { lat: 59.88437229, lon: 10.74467182, el: 1.0 },
        { lat: 59.88303724, lon: 10.74312686, el: 1.0 },
        { lat: 59.88230509, lon: 10.74166774, el: 1.0 },
        { lat: 59.88118530, lon: 10.74106693, el: 1.0 },
        { lat: 59.88028084, lon: 10.74063777, el: 1.0 },
        { lat: 59.87963477, lon: 10.74089527, el: 1.0 },
        { lat: 59.87864411, lon: 10.74149608, el: 1.0 },
        { lat: 59.87795494, lon: 10.74192523, el: 1.0 },
        { lat: 59.87739498, lon: 10.74252605, el: 1.0 },
        { lat: 59.87640426, lon: 10.74321269, el: 1.0 },
        { lat: 59.87554274, lon: 10.74235439, el: 1.0 },
        { lat: 59.87463811, lon: 10.74115276, el: 1.0 },
        { lat: 59.87356115, lon: 10.74072360, el: 1.0 },
        { lat: 59.87274263, lon: 10.74132442, el: 1.0 },
        { lat: 59.87231183, lon: 10.74304103, el: 1.0 },
        { lat: 59.87226874, lon: 10.74492931, el: 1.0 },
        { lat: 59.87218258, lon: 10.74681758, el: 1.0 },
        { lat: 59.87269955, lon: 10.74827671, el: 1.0 },
        { lat: 59.87356115, lon: 10.75025081, el: 1.0 },
        { lat: 59.87437964, lon: 10.75179576, el: 1.0 },
        { lat: 59.87519812, lon: 10.75265407, el: 1.0 },
        { lat: 59.87610273, lon: 10.75394153, el: 1.0 },
        { lat: 59.87743806, lon: 10.75522899, el: 1.0 },
        { lat: 59.87825646, lon: 10.75591564, el: 1.0 },
        { lat: 59.87890255, lon: 10.75703144, el: 1.0 },
        { lat: 59.88010855, lon: 10.75780391, el: 1.0 },
        { lat: 59.88105610, lon: 10.75883388, el: 1.0 },
        { lat: 59.88200361, lon: 10.75917720, el: 1.0 },
        { lat: 59.88312337, lon: 10.75969219, el: 1.0 },
        { lat: 59.88394163, lon: 10.76029300, el: 1.0 },
        { lat: 59.88428616, lon: 10.76097965, el: 1.0 }
    ];


// export the class
module.exports = Route;