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

function cleanMap() {
    initMap();
    map.livePoints = [];
    var poly = createPolyLine(map.livePoints);
    poly.setMap(map.liveMap);

    // fit bounds to track
    if (typeof map.liveMap.fitBounds === 'function' ) {
        map.liveMap.fitBounds(map.liveBounds);
    }
   
}

function initMap() {
    var mapDiv = document.getElementById('live-map');
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
                var points = [];
                var map = new google.maps.Map(element[0], {
                    zoom: 8,
                    maxZoom: 16
                });

                map.set('styles', styles);

                var bounds = new google.maps.LatLngBounds();

                data.gps.forEach(function (point) {
                    var lat = point.lat;
                    var lon = point.lon;
                    var p = new google.maps.LatLng(lat, lon);
                    points.push(p);
                    bounds.extend(p);
                });

                var poly = createPolyLine(points);

                poly.setMap(map);

                // fit bounds to track
                map.fitBounds(bounds);
            }
        });
    }
};

var addGpxTrackToMap = function (name, element) {
    if (name) {
        $.ajax({
            type: "GET",
            url: '/sessions/' + name + '.gpx',
            success: function (xml) {
                var points = [];
                var map = new google.maps.Map(element[0], {
                    zoom: 16
                });

                map.set('styles', styles);

                var bounds = new google.maps.LatLngBounds();

                $(xml).find("trkpt").each(function () {
                    var lat = $(this).attr("lat");
                    var lon = $(this).attr("lon");
                    var p = new google.maps.LatLng(lat, lon);
                    points.push(p);
                    bounds.extend(p);
                });

                var poly = createPolyLine(points);

                poly.setMap(map);

                // fit bounds to track
                map.fitBounds(bounds);
            }
        });
    }
};

function loadGpxMap() {
    var name = $(this).data('name');
    var element = $(this).find('.card-map-top');
    addGpxTrackToMap(name, element);
}


export default { cleanMap, initMap, styles, addRouteTrackToMap, addGpxTrackToMap, loadGpxMap,
    createPolyLine }