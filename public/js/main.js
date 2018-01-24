const UPDATE_FREQ = 1000;
var timeOut;
var run = false;
var liveMap;
var liveBounds;
var livePoints = [];

const styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65},
        {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51},
        {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100},
        {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100},
        {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100},
        {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100},
        {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
    {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]},
    {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];


$(document).ready(function(){
    //ugly ulgy
    get_rowInfo(false,"");

    var test = getUrlParameter("test");

    if (test) {
        $('#startSimulator').removeClass("sr-only");
    }

    $('#startRow').click(function (e) {
        e.preventDefault()
        var routes = $('#routes').val();
        $.get( "/row/start",{ routes: routes }, function() {
            get_rowInfo(true, "Rowing");
            cleanMap();
            $("#startSimulator").attr('disabled','disabled');
            $(this).attr('disabled','disabled');
        });
    });

    $('#startSimulator').click(function (e) {
        e.preventDefault();
        var routes = $('#routes').val();
        $.get("/row/simulate", { routes: routes }, function() {
            get_rowInfo(true, "Simulate");
            cleanMap();
            $("#startRow").attr('disabled','disabled');
            $(this).attr('disabled','disabled');
        });
    });

    $('#routes').each(function () {
        $.get("/row/routes", function(data) {
            var html = '';
            var index = 0;
            var group = '';
            data.sort(function(a,b) {return (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0);} );

            data.forEach(function (value) {
                if (value.country !== group) {
                    html+= '<optgroup label="' + value.country + '">';
                    group = value.country;
                }
                html+= '<option value="'+ value.index + '">'+ value.name + ' (' + value.meters + 'm)</option>';
                index++;
            });
            $('#routes').html(html)
        });
    });

    $('#history-session').each(function () {
        var key = getLastPart();
        var title = "History";
        $.get("/session/" + key, function(data) {
            var html = getHtml(title, data.endStats, true);
            $('#routes').val(data.route);
            if (html) {
                $('#table-content').html(html);
                $('#laps-body').html(getLapHtml(title, data.endStats));
                addGpxTrackToMap(key, $("#live-map"));
            }
        });
    });

    $('#history').each(function () {
        $.get("/session", function(data) {
            var htmlCards = '';
            var htmlTable = '';
            var index = 0;
            data.forEach(function (session) {
                if (index < 3) {
                    htmlCards = createCard(htmlCards, session);
                }
                htmlTable = createLapTableRecord(htmlTable, index, session);
                index++;
            });

            $('#cards').html(htmlCards);
            $('#histor-table-body').html(htmlTable);

            $('.gpx-track').each(function () {
                var name = $(this).data('name');
                var element = $(this).find('.card-map-top');
                addGpxTrackToMap(name, element);
            });
        });
    });

    $( "#save-user" ).on( "click", function( event ) {
        event.preventDefault();
        var form =  $("#addUserForm");
        var firstName = form.find('#firstName').val();
        var lastName = form.find('#lastName').val();
        var id = form.find('#userId').val();
        var user = {};
        user.firstName = firstName;
        user.lastName = lastName;
        user.id = id;
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            url: "/users/add",
            data: JSON.stringify(user)
        });
    });

    $(document).on("click", '.strava', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $.get( href, function( data ) {
            console.log(data);
            alert( "Uploaded to strava!" );
        });
    });

    $(document).on("click", '.del-session', function(e) {
        e.preventDefault();
        var name = $(this).data('name');
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            $.get( '/session/del/' + name, function( data ) {
                alert( "Session deleted" );
                location.reload();
            });
        }
    });

    $('#stopRow').click(function (e) {
        e.preventDefault();
        clearTimeout(timeOut);
        run = false;
        var routes = $('#routes').val();
        $.get( "/row/stop", { routes: routes }, function(data) {
            $('#table-content').html(getHtml("Stopped", data, false));
            $("#startRow").removeAttr('disabled');
            $("#startSimulator").removeAttr('disabled');
        });
    })
});

function get_rowInfo(continues, title){
    run = continues;
    $.get( "/row", function(data) {
        var html = getHtml(title, data);
        if (html) {
            $('#table-content').html(html);
            $('#laps-body').html(getLapHtml(title, data, true));
            var lat = data.gps.lat;
            var lon = data.gps.lon;
            var p = new google.maps.LatLng(lat, lon);
            livePoints.push(p);
            liveBounds.extend(p);
            var poly = createPolyLine(livePoints)
            poly.setMap(liveMap);
            liveMap.fitBounds(liveBounds);
        }
    }).done(function(){
        if (run) {
            timeOut = setTimeout(function(){get_rowInfo(true, title);}, UPDATE_FREQ);
        }
    });
}

function fmtMSS(s){
    var date = new Date(null);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
}

function getHtml(label, json, day) {
    if (parseInt(json.meters) === 0) {
        return ;
    }
    var html = '<div class="container">';
    if (day) {
        html += '<div class="row"><span class="label">Day:</span> ' + json.start.substr(0, json.start.lastIndexOf('T')) +'</div>';
    }
    html += '<div class="row"><span class="label">Start:</span> ' + json.start.substr(json.start.lastIndexOf('T') + 1, 8) +'</div>';
    html += '<div class="row"><span class="label">Time:</span> ' + fmtMSS(parseInt(json.seconds)) +'</div>';
    html += '<div class="row"><span class="label">Length:</span> ' + parseInt(json.meters) +' m</div>';
    html += '<div class="row"><span class="label">Pace:</span> ' + Math.round( parseFloat(json.pace) * 3.6 * 10) / 10 +' km/t</div>';
    html += '<div class="row"><span class="label">500m(p):</span> ' + fmtMSS(parseInt(json.lapPace)) +'</div>';
    html += '<div class="row"><span class="label">2k(p):</span> ' + fmtMSS(parseInt(json.towKPace)) +'</div>';
    html += '<div class="row"><span class="label">Avg. watt:</span> ' + Math.round( parseFloat(json.watt)* 10) / 10 +'w</div>';
    html += '<div class="row"><span class="label">Strokerate:</span> ' + Math.round( parseFloat(json.stroke)* 10) / 10 +'</div>';
    if(json.fileName) {
        html += '<div class="row"><span class="label">Actions:</span> <a id="" href="/sessions/' + json.fileName;
        html += '"><i class="material-icons">file_download</i> <a class="strava" href="/strava/upload/' + json.name;
        html += '"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a></div>';
    }
    return html + "</div>"
}

function getLapHtml(label, json, reverse) {
    var html = '';
    if (parseInt(json.totalLaps) > 0) {
        var lapNum = 1;
        var laps = json.laps;
        if (reverse) {
            laps.reverse();
            lapNum = laps.length;
        }
        laps.forEach(function (value) {
                html += '<tr><th scope="row">' + lapNum + '</th><td>'+ parseInt(value.meters)+ '</td><td>'+ fmtMSS(parseInt(value.seconds)) +'</td>';
                html += '<td>' + Math.round( parseFloat(value.watt)* 10) / 10 +'w</td></tr>';
                if (reverse) {
                    lapNum--;
                } else {
                    lapNum++;
                }
            }
        );
    }
    return html;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function getLastPart() {
    return window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
}

function cleanMap() {
    initMap();
    livePoints = [];
    var poly = createPolyLine(livePoints);
    poly.setMap(liveMap);

    // fit bounds to track
    liveMap.fitBounds(liveBounds);
}

function createPolyLine(points) {
    return new google.maps.Polyline({
        // use your own style here
        path: points,
        strokeColor: "#FF00AA",
        strokeOpacity: .7,
        strokeWeight: 4
    });
}

var createCard = function (htmlCards, session) {
    htmlCards += '<div class="card col-sm gpx-track" data-name="' + session.name + '" style="width: 18rem;">';
    htmlCards += '<div class="card-body">';
    htmlCards += '<div class="card-map-top "></div>';
    htmlCards += '<h5 class="card-title mt-2"><a href="/history/' + session.name +'">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></h5>';
    htmlCards += '<p class="card-text">Length: ' + parseInt(session.endStats.meters) + 'm, Time: ' + fmtMSS(parseInt(session.endStats.seconds)) + '</p>';
    htmlCards += '<a href="/strava/upload/' + session.name + '" class="btn btn-primary strava btn-block">Upload to Strava</a>';
    htmlCards += '</div>';
    htmlCards += '</div>';
    return htmlCards;
};

function initMap() {
    liveMap = new google.maps.Map(document.getElementById('live-map'), {
        zoom: 8,
        maxZoom: 16
    });

    liveBounds = new google.maps.LatLngBounds();
    liveMap.set('styles', styles);
}

var createLapTableRecord = function (htmlTable, index, session) {
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a href="/history/' + session.name +'">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></td>';
    htmlTable += '<td>Length: ' + parseInt(session.endStats.meters) + 'm</td>';
    htmlTable += '<td> <a id="" href="/sessions/' + session.name + '.gpx"><i class="material-icons">file_download</i><a class="strava" href="/strava/upload/' + session.name + '"><i aria-hidden="true" title="Upload to Strava" class="material-icons">cloud_upload</i></a> <a class="del-session" href="#" data-name="' + session.name + '"><i aria-hidden="true" title="Delete session local" class="material-icons">delete</i></a></td>';
    htmlTable += '</tr>';
    return htmlTable;
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
