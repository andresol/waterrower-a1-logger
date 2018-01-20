const UPDATE_FREQ = 1000;
var timeOut;
var run = false;

$(document).ready(function(){
    //ugly ulgy
    get_rowInfo(false,"");

    var test = getUrlParameter("test");

    if (test) {
        $('#startSimulator').removeClass("invisible");
    }

    $('#startRow').click(function (e) {
        e.preventDefault();
        $.get( "/row/start", function() {
           get_rowInfo(true, "Rowing");
        });
    });


    $('#startSimulator').click(function (e) {
        e.preventDefault();
        $.get("/row/simulate", function() {
            get_rowInfo(true, "Simulate");
        });
    });

    $('#routes').each(function () {
        $.get("/row/routes", function(data) {
            var html = '';
            var index = 0;
            data.forEach(function (value) {
                html+= '<option value="'+ index + '">'+ value.name + ' (' + value.meters + 'm)</option>';
                index++;
            });
            $('#routes').html(html)
        });
    });

    $('#history').each(function () {
        $.get("/session", function(data) {
            var htmlCards = '';
            var htmlTable = '';
            var index = 0;
            data.forEach(function (session) {
                if (index < 3) {
                    htmlCards += '<div class="card col-sm gpx-track" data-name="' + session.name + '" style="width: 18rem;">';
                    htmlCards += '<div class="card-body">';
                    htmlCards += '<div class="card-map-top "></div> ';
                    htmlCards += '<h5 class="card-title">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</h5>';
                    htmlCards += '<p class="card-text">Lenght: ' + parseInt(session.endStats.meters) + 'm, Time: ' + fmtMSS(parseInt(session.endStats.seconds)) + '</p>';
                    htmlCards += '<a href="/strava/upload/' + session.name +'" class="btn btn-primary strava">Upload to strava</a>';
                    htmlCards += '</div>';
                    htmlCards += '</div>';
                }
                htmlTable += '<tr>';
                htmlTable += '<th scope="row">'+ (index + 1) + '</th>';
                htmlTable += '<td>' + session.name + '</td>';
                htmlTable += '<td><a id="" href="/sessions/' + session.name + '.gpx">Download</td>';
                htmlTable += '<td><a class="strava" href="/strava/upload/' + session.name +'"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a> <a class="del-session" href="#" data-name="' + session.name +'"><i aria-hidden="true" title="Delete session local" class="material-icons">delete</i></a></td>';
                htmlTable += '</tr>';
                index++;
            });
            $('#cards').html(htmlCards);
            $('#histor-table-body').html(htmlTable);

            $('.gpx-track').each(function () {
                var name = $(this).data('name');
                var element = $(this).find('.card-map-top');
                if (name) {
                    $.ajax({
                        type: "GET",
                        url: '/sessions/' + name + '.gpx',
                        success: function (xml) {
                            var points = [];
                            var map = new google.maps.Map(element[0], {
                                zoom: 16
                            });

                            var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

                            map.set('styles', styles);
                            var bounds = new google.maps.LatLngBounds();
                            $(xml).find("trkpt").each(function () {
                                var lat = $(this).attr("lat");
                                var lon = $(this).attr("lon");
                                var p = new google.maps.LatLng(lat, lon);
                                points.push(p);
                                bounds.extend(p);
                            });

                            var poly = new google.maps.Polyline({
                                // use your own style here
                                path: points,
                                strokeColor: "#FF00AA",
                                strokeOpacity: .7,
                                strokeWeight: 4
                            });

                            poly.setMap(map);

                            // fit bounds to track
                            map.fitBounds(bounds);
                        }
                    });
                }
            });
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
            $('#table-content').html(getHtml("Stopped", data));
        });
    })
});

function get_rowInfo(continues, title){
    run = continues;
    $.get( "/row", function(data) {
        var html = getHtml(title, data);
        if (html) {
            $('#table-content').html(html);
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

function getHtml(label, json) {
    if (parseInt(json.meters) === 0) {
        return ;
    }
    var html = "<div class='container'><div class='row'><h2>" + label +"</h2></div>";
    html += '<div class="row">Start: ' + json.start +'</div>';
    html += '<div class="row">Time: ' + fmtMSS(parseInt(json.seconds)) +'</div>';
    html += '<div class="row">Lenght: ' + parseInt(json.meters) +' m</div>';
    html += '<div class="row">Pace: ' + Math.round( parseFloat(json.pace) * 3.6 * 10) / 10 +' km/t</div>';
    html += '<div class="row">500m(p): ' + fmtMSS(parseInt(json.lapPace)) +'</div>';
    html += '<div class="row">2k(p): ' + fmtMSS(parseInt(json.towKPace)) +'</div>';
    html += '<div class="row">Avg. watt: ' + Math.round( parseFloat(json.watt)* 10) / 10 +'w</div>';
    if(json.fileName) {
        html += '<div class="row"><a href="/sessions/' + json.fileName + '">' + json.fileName+ '</a></div>';
    }
    if (parseInt(json.totalLaps) > 0) {
        html += '<div class="row"><div class="table-responsive"> <table class="table"><thead><tr><th>#</th><th>Meters</th><th>Time</th><th>Watt</th>';
        html += '</tr></thead><tbody>';
        var lapNum = 1;
        json.laps.forEach(function (value) {
                html += '<tr><th scope="row">' + lapNum + '</th><td>'+ parseInt(value.meters)+ '</td><td>'+ fmtMSS(parseInt(value.seconds)) +'</td>';
                html += '<td>' + Math.round( parseFloat(value.watt)* 10) / 10 +'w</td></tr>';
                lapNum++;
            }
        );
        html += "</tbody></table></div></div>"
    }
    return html + "</div>"
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