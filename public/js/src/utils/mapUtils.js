import map from '../map/index'


const styles = [{
    "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 },
        { "visibility": "on" }]
}, {
    "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 },
        { "visibility": "simplified" }]
}, {
    "featureType": "road.highway", "stylers": [{ "saturation": -100 },
        { "visibility": "simplified" }]
}, {
    "featureType": "road.arterial", "stylers": [{ "saturation": -100 },
        { "lightness": 30 }, { "visibility": "on" }]
}, {
    "featureType": "road.local", "stylers": [{ "saturation": -100 },
        { "lightness": 40 }, { "visibility": "on" }]
}, {
    "featureType": "transit", "stylers": [{ "saturation": -100 },
        { "visibility": "simplified" }]
}, { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] },
    { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] }];

function cleanMap(init = true) {
    if (init) {
        initMap();
    }

    map.livePoints = [];
    map.markers = [];
    let poly = createPolyLine(map.livePoints);
    poly.setMap(map.liveMap);

    // fit bounds to track
    if (typeof map.liveMap !== 'undefined' && typeof map.liveMap.fitBounds === 'function' ) {
        map.liveMap.fitBounds(map.liveBounds);
    }
   
}

function initMap() {
    let mapDiv = document.getElementById('live-map');
    if (mapDiv) {
        map.liveMap = new google.maps.Map(mapDiv, {
            zoom: 8,
            maxZoom: 16
        });
        map.liveBounds = new google.maps.LatLngBounds();
        map.liveMap.set('styles', styles);
    }
}

//TODO: Change color by speed or hr.
function createPolyLine(points) {
    return new google.maps.Polyline({
        path: points,
        strokeColor: "#FF00AA",
        strokeOpacity: .7,
        strokeWeight: 4
    });
}

var addRouteTrackToMap = function (name, element) {
    if (name) {
        $.ajax({
            type: "GET",
            url: '/routes/' + name,
            success: function (data) {
                let gps = data.gps;
                let mapElement = element[0];
                let points = [];
                let map = new google.maps.Map(mapElement, {
                    zoom: 8,
                    maxZoom: 16
                });

                map.set('styles', styles);

                let bounds = new google.maps.LatLngBounds();

                gps.forEach(function (point) {
                    let lat = point.lat;
                    let lon = point.lon;
                    let p = new google.maps.LatLng(lat, lon);
                    points.push(p);
                    bounds.extend(p);
                });

                let poly = createPolyLine(points);
                poly.setMap(map);

                // fit bounds to track
                map.fitBounds(bounds);
            }
        });
    }
};

var addGpxTrackToMap = function (name, element) {
    let map = new google.maps.Map(element[0], {
        zoom: 16
    });
    var succesXml = addXml.bind(null, map);
    if (name) {
        $.ajax({
            type: "GET",
            url: '/sessions/' + name + '.gpx',
            success: succesXml
        });
    }
};

var addSessionTrackToMap = function (complete) {
    var succesXml = addXml.bind(null, map.liveMap);
    $.ajax({
        type: "GET",
        url: 'row/gpx',
        success: succesXml,
        complete: complete
    });
};


function addXml(map, xml) {
    let points = [];

    map.set('styles', styles);

    let bounds = new google.maps.LatLngBounds();
    let laps = 1;
    let marker = 1;
    $(xml).find("trkpt").each(function () {
        let lat = $(this).attr("lat");
        let lon = $(this).attr("lon");
        let p = new google.maps.LatLng(lat, lon);

        points.push(p);
        let km = createPolyLine(points).inKm();
        laps = parseInt(km / 0.5) + 1; // 0.5 is 500 lap
        console.log(laps);
        if (marker < laps ) {
            addMarker(p, "Runde: " + (laps-1), String(laps - 1), map);
            marker++;
        }
        bounds.extend(p);
    });

    let poly = createPolyLine(points);

    poly.setMap(map);

    // fit bounds to track
    map.fitBounds(bounds);
}

function loadGpxMap() {
    let name = $(this).data('name');
    let element = $(this).find('.card-map-top');
    addGpxTrackToMap(name, element);
}

function addMarker(p, title, round, liveMap=map.liveMap) {
    map.markers.push(new google.maps.Marker({
        position:p,
        map: liveMap,
        title: title,
        label: round
    }));
}

export default { cleanMap, initMap, styles, addRouteTrackToMap, addGpxTrackToMap, loadGpxMap,
    createPolyLine, addMarker, addSessionTrackToMap }