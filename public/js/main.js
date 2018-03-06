const UPDATE_FREQ = 1000;
var timeOut;
var run = false;
var liveMap;
var liveBounds;
var livePoints = [];
const RATION = (100 / 4.805) * 6;

const styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65},
        {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51},
        {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100},
        {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100},
        {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100},
        {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100},
        {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
    {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]},
    {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

$(function() {
    /** Init shared */
    get_rowInfo(false,"");

    function loadSession(name) {
        $('#load').load('/sessions', function () {
            $(this).find('#routes').each(loadRoutes);
            $(this).find('#session-user').each(loadUsers);
            $(this).find('#history-session').each(function () {
                var title = "History";
                $.get("/session/" + name, function (data) {
                    var html = getHtml(title, data.endStats, true);
                    $('#routes').val(data.route);
                    $('#session-user').val(data.user);
                    if (html) {
                        $('#table-content').html(html);
                        $('#laps-body').html(getLapHtml(title, data.endStats));
                        addGpxTrackToMap(name, $("#live-map"));
                    }
                    addGraph(data.raw, data.rawHr, parseInt(data.start));
                });
            });
        });
    }

    /** All load functions */
    var loadRoutes = function () {
        var that = this;
        $.get("/row/routes", function(data) {
            var html = '';
            var index = 0;
            var group = '';
            data.sort(function(a,b) {return (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0);} );

            var selected = 'selected="selected"';
            data.forEach(function (value) {
                if (value.country !== group) {
                    html+= '<optgroup label="' + value.country + '">';
                    group = value.country;
                }
                html+= '<option '+selected+' value="'+ value.index + '" data-lat="' +value.gps[0].lat +'" data-lon="'+ value.gps[0].lon +'">'+ value.name + ' (' + value.meters + 'm)</option>';
                selected = '';
                index++;
            });
            $(that).html(html);
            var selected = $('#routes').find(":selected");
            cleanMap();
            var p = new google.maps.LatLng($(selected).data("lat"), $(selected).data("lon"));
            liveMap.panTo(p);
        });

    };

    function loadUser () {
        $('#load').load('/user', function () {
            $( this ).find('#users-body').each(function () {
                var that = this;
                $.get( "/users/", function(data) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var user = data[i];
                        html += '<tr><td><a href="#" data-id="'+ user.id +'">' + (i + 1) + '</a></td><td>'+user.firstName +'</td><td>'+ user.lastName +'</td>';
                        html +=  '<td><a class="edit-user" href="#" data-id="'+ user.id +'"><i class="material-icons">create</i></a><a class="del-user" href="#" data-id="' + user.id + '"><i aria-hidden="true" title="Delete user" class="material-icons">delete</i></a></td>'+'</tr>'
                    }
                    $(that).html(html);
                    $('#addUserModal').on('hidden.bs.modal', function (e) {
                        loadUser();
                    })
                });
            });
        });
    }

    function loadMain () {
        $('#load').load('/main', function () {
            $(this).find('#routes').each(loadRoutes);
            $(this).find('#session-user').each(loadUsers);

            //Run simulator if test.
            if (getUrlParameter("test")) {
                $('#startRow').attr("id", "startSimulator");
            }

        });
    }

    function loadHistory() {
        $('#load').load('/history', function () {
            $(this).find('#history').each(function () {
                $.get("/session/0/24", function (data) {
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

                    $('#cards').html('<div class="col"><div class="card-deck">' + htmlCards + '</div></div>');
                    $('#histor-table-body').html(htmlTable);

                    $('.gpx-track').each(function () {
                        var name = $(this).data('name');
                        var element = $(this).find('.card-map-top');
                        addGpxTrackToMap(name, element);
                    });
                });
            });
        });
    }

    var loadUsers = function () {
        var that = this;
        $.get("/users", function(data) {
            var html = '';
            data.forEach(function (value) {
                html += '<option value="' + value.id + '">' + value.firstName + ' ' + value.lastName +'</option>'
            });
            $(that).html(html)
        });
    };

    var clickSession = function (e) {
        e.preventDefault();
        var name = $(this).data('name');
        loadSession(name);
    };

    $(document).on("click",'#user', function (e) {
        e.preventDefault();
        loadUser();
    });

    $(document).on("click",'.main', function (e) {
        e.preventDefault();
        loadMain();
    });

    $(document).on("click",'.nav-link', function (e) {
        $('#main-nav').find(".nav-item").each(function () {
            $(this).removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    $(document).on("click",'.sessions', clickSession);

    $(document).on("click",'a#history', function (e) {
        e.preventDefault();
        loadHistory();
    });

    $(document).on("click",'a#route', function (e) {
        e.preventDefault();
        $('#load').load('/route', function () {
            $(this).find('#routes-t').each(function () {
                $.get("/routes", function (data) {
                    var htmlTable = '';
                    var index = 0;
                    data.forEach(function (route) {
                        htmlTable = createRouteRecord(htmlTable, index, route);
                        index++;
                    });

                    $('#routes-table-body').html(htmlTable);

                });
            });
        });
    });

    $(document).on("click",'button#startRow', function (e) {
        e.preventDefault();
        var routes = $('#routes').val();
        $.get( "/row/start",{ routes: routes }, function() {
            $(window).scrollTop($('#main').offset().top); //Scroll
            get_rowInfo(true, "Rowing");
            cleanMap();
            $('#routes').attr('disabled', 'disabled');
            $('#session-user').attr('disabled', 'disabled');
            $("#startSimulator").attr('disabled','disabled');
            $(this).attr('disabled','disabled');
            $(this).html('Rowing...');
        });
    });

    $(document).on("click", 'button#stopRow', function(e) {
        e.preventDefault();
        clearTimeout(timeOut);
        run = false;
        var routes = $('#routes').val();
        var user = $('#session-user').val();
        $.get( "/row/stop", { routes: routes, user: user }, function(data) {
            $('#table-content').html(getHtml("Stopped", data, false));
            var startRow = $("#startRow");
            startRow.removeAttr('disabled');
            startRow.html('Start row');
            $('#routes').removeAttr('disabled');
            $('#session-user').removeAttr('disabled');
            $("#startSimulator").removeAttr('disabled');
        });
    });

    $(document).on("click", 'button#startSimulator', function(e) {
        e.preventDefault();
        var routes = $('#routes').val();
        $.get("/row/simulate", { routes: routes }, function() {
            $(window).scrollTop($('#main').offset().top); //Scroll
            get_rowInfo(true, "Simulate");
            cleanMap();
            $('#routes').attr('disabled', 'disabled');
            $('#session-user').attr('disabled', 'disabled');
            var startRow = $("#startRow");
            startRow.attr('disabled','disabled');
            startRow.html('Rowing...');
            $(this).attr('disabled','disabled');
        });
    });

    $(document).on("click", '.edit-user', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: '/users/' + id,
            type: 'GET',
            success: function(result) {
                var form = $("#addUserForm");
                form.find('#firstName').val(result.firstName);
                form.find('#lastName').val(result.lastName);
                form.find('#userId').val(result.id);
                $.get( '/strava/url', function( data ) {
                    var url = data.url.replace("%24", result.id);
                    $('.strava-url').attr('href', url);
                });
                var connect = $(".strava-connect");
                connect.removeClass("sr-only");
                $('#addUserModal').modal('show');
            }
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
                loadHistory();
            });
        }
    });

    $(document).on("click", "#save-user", function(event) {
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
            data: JSON.stringify(user),
            success: function () {
                $('#addUserModal').modal('hide');
            }
        });

    });

    $(document).on("click", '.del-user', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            $.ajax({
                url: '/users/' + id,
                type: 'DELETE',
                success: function(result) {
                    loadUser();
                }
            });
        }
    });


    $('#load').each(loadMain);

    $('#routes').each(loadRoutes);

    $('#session-user').each(loadUsers);


    $(document).on("change", '#routes', function(e) {
        var selected = $('#routes').find(":selected");
        cleanMap();
        var p = new google.maps.LatLng($(selected).data("lat"), $(selected).data("lon"));
        liveMap.panTo(p);
    });


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
            var poly = createPolyLine(livePoints);
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
    var html = '';
    if (day) {
        html += '<div class="row"><div class="col">Day</div><div class="col">' + json.start.substr(2, json.start.lastIndexOf('T') - 2) +'</div></div>';
    }
    html += '<div class="row"><div class="col">Start:</div><div class="col">' + json.start.substr(json.start.lastIndexOf('T') + 1, 8) +'</div></div>';
    html += '<div class="row"><div class="col">Time:</div><div class="col">' + fmtMSS(parseInt(json.seconds)) +'</div></div>';
    html += '<div class="row"><div class="col">Length:</div><div class="col">' + parseInt(json.meters) +' m</div></div>';
    html += '<div class="row"><div class="col">Pace:</div><div class="col">' + Math.round( parseFloat(json.pace) * 3.6 * 10) / 10 +' km/t</div></div>';
    html += '<div class="row"><div class="col">500m(p):</div><div class="col">' + fmtMSS(parseInt(json.lapPace)) +'</div></div>';
    html += '<div class="row"><div class="col">2k(p):</div><div class="col">' + fmtMSS(parseInt(json.towKPace)) +'</div></div>';
    html += '<div class="row"><div class="col">Avg.W:</div><div class="col">' + Math.round( parseFloat(json.watt)* 10) / 10 +'w</div></div>';
    html += '<div class="row"><div class="col">SR:</div><div class="col">' + Math.round( parseFloat(json.stroke)* 10) / 10 +'</div></div>';
    if (parseInt(json.hr) > 0) {
        html += '<div class="row"><div class="col">HR:</div><div class="col '+ getHeartRateColor(parseInt(json.hr)) +'">' + parseInt(json.hr) +'</div></div>';
    }
    if(json.fileName) {
        html += '<div class="row"><div class="col">Actions:</div><div class="col"><a id="" href="/sessions/' + json.fileName;
        html += '"><i class="material-icons">file_download</i><a class="strava" href="/strava/upload/' + json.name;
        html += '"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a>';
        html += '<a class="sessions" data-name="'+ json.name +'" href="/sessions"><i aria-hidden="true" title="Session" class="material-icons">fiber_new</i></a></div></div>';
    }
    return html + "";
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

function cleanMap() {
    initMap();
    livePoints = [];
    var poly = createPolyLine(livePoints);
    poly.setMap(liveMap);

    // fit bounds to track
    liveMap.fitBounds(liveBounds);
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

var createCard = function (htmlCards, session) {
    htmlCards += '<div class="card gpx-track" data-name="' + session.name + '"">';
    htmlCards += '<div class="card-body">';
    htmlCards += '<div class="card-map-top "></div>';
    htmlCards += '<h5 class="card-title mt-2"><a class="sessions" data-name="'+ session.name +'" href="/session">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></h5>';
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
    htmlTable += '<td><a class="sessions" data-name="'+ session.name +'" href="/session">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></td>';
    htmlTable += '<td>Length: ' + parseInt(session.endStats.meters) + 'm</td>';
    htmlTable += '<td> <a id="" href="/sessions/' + session.name + '.gpx"><i class="material-icons md-36">file_download</i><a class="strava" href="/strava/upload/' + session.name + '"><i aria-hidden="true" title="Upload to Strava" class="material-icons md-36">cloud_upload</i></a> <a class="del-session" href="#" data-name="' + session.name + '"><i aria-hidden="true" title="Delete session local" class="material-icons md-36">delete</i></a></td>';
    htmlTable += '</tr>';
    return htmlTable;
};

var createRouteRecord = function (htmlTable, index, route) {
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a href="/routes/' + route.name +'">' + route.name + '</a></td>';
    htmlTable += '<td>' + parseInt(route.meters) + 'm</td>';
    htmlTable += '<td>' + route.country + '</td>';
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

var addRouteTrackToMap = function (name, element) {
    if (name) {
        $.ajax({
            type: "GET",
            url: '/routes/' + name,
            success: function (data) {
                var points = [];
                var map = new google.maps.Map(element[0], {
                    zoom: 16
                });

                map.set('styles', styles);

                var bounds = new google.maps.LatLngBounds();

                data.gps.each(function (point) {
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

function addGraph(time,hr, start) {
    var speed = [];
    for (var i = 1; i < time.length; i++) {
        var sec = ((parseInt(time[i]) - start) / 1000);
        speed.push((( (RATION / 100) / sec) ) * 3.6);
        start = parseInt(time[i]);
    }

    //Remove ever second element
    var speedMerged = [];
    var hrMerged = [];
    var labelsMerged = [];
    var mergeSize = 10;
    if (time.length > 1000) {
        mergeSize = 20;
    }

    while(time.length) {
        var a = time.splice(0,mergeSize);
        var timeV = parseInt(a.reduce(function(a, b) { return a + b; }) / a.length);
        labelsMerged.push(new Date(timeV).toISOString().substr(new Date(timeV).toISOString().lastIndexOf('T') + 1, 8));
        if (hr) {
            var h = hr.splice(0,mergeSize);
            hrMerged.push(parseInt(h.reduce(function(a, b) { return a + b; }) / h.length));
        }
        if (speed) {
            var s = speed.splice(0,mergeSize);
            speedMerged.push(Math.round( parseFloat(s.reduce(function(a, b) { return a + b; }) / s.length)* 10) / 10 );
        }
    }

    var ctx = $('#hr-graph');
    var lineChartData = {
        labels: labelsMerged,
        datasets: [{
            label: 'Heart rate (bpm)',
            borderColor: '#dc3545',
            backgroundColor: '#dc3545',
            fill: false,
            data: hrMerged,
            yAxisID: 'y-axis-1',
        }, {
            label: 'Speed (km/t)',
            borderColor: '#007bff',
            backgroundColor: '#007bff',
            fill: false,
            data: speedMerged,
            yAxisID: 'y-axis-2'
        }]
    };
    var myLineChart = Chart.Line(ctx, {
        data: lineChartData,
        options: {
            responsive: true,
            hoverMode: 'index',
            stacked: false,
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    ticks: {
                        suggestedMin: 30,
                        min: 0,
                        stepSize: 5
                    }
                }, {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    ticks: {
                        stepSize: 2
                    },
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false // only want the grid lines for one axis to show up
                    }
                }]
            }
        }
    });
}

function getHeartRateColor(hr) {
    if (hr < 125) {
        return 'text-success'
    } else if (hr < 150) {
        return 'text-primary'
    } else if (hr < 175) {
        return 'text-warning';
    } else {
        return 'text-danger';
    }
}
