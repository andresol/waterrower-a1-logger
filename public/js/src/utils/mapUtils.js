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
    map.liveMap.fitBounds(map.liveBounds);
}

function initMap() {
    map.liveMap = new google.maps.Map(document.getElementById('live-map'), {
        zoom: 8,
        maxZoom: 16
    });

    map.liveBounds = new google.maps.LatLngBounds();
    map.liveMap.set('styles', styles);
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

export default { cleanMap, initMap, styles, createPolyLine }