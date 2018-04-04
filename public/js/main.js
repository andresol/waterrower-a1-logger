const UPDATE_FREQ = 1000;
var timeOut;
var run = false;
var liveMap;
var liveBounds;
var livePoints = [];
const RATION = (100 / 4.805) * 6;
const PAGE_SIZE = 10;
const WATT_RATION = 2.80;

/**
 * Declares a new object in the window namely QueryString that contains every get parameter from the current URL as a property
 */
window.QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");

        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    return query_string;
}();


/**
 * This function returns an object that contains every get parameter from a URL (first argument) as a property
 * 
 * @param URL {String}
 */
function QueryString(URL) {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var usefulParam = URL.split("?")[1] || "";
    var query = usefulParam || "";
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    return query_string;
}

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

$(function () {
    /** Init shared */
    get_rowInfo(false, "");

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
                    addGraph(data.raw, data.rawHr, parseInt(data.start), data.stroke);
                });
            });
        });
    }

    /** All load functions */
    var loadRoutes = function () {
        var that = this;
        $.get("/row/routes", function (data) {
            var html = '';
            var index = 0;
            var group = '';
            data.sort(function (a, b) { return (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0); });

            var selected = 'selected="selected"';
            data.forEach(function (value) {
                if (value.country !== group) {
                    html += '<optgroup label="' + value.country + '">';
                    group = value.country;
                }
                html += '<option ' + selected + ' value="' + value.index + '" data-lat="' + value.gps[0].lat + '" data-lon="' + value.gps[0].lon + '">' + value.name + ' (' + value.meters + 'm)</option>';
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

    function loadUser() {
        $('#load').load('/user', function () {
            $(this).find('#users-body').each(function () {
                var that = this;
                $.get("/users/", function (data) {
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        var user = data[i];
                        html += '<tr><td><a href="#" data-id="' + user.id + '">' + (i + 1) + '</a></td><td>' + user.firstName + '</td><td>' + user.lastName + '</td>';
                        html += '<td><a class="edit-user" href="#" data-id="' + user.id + '"><i class="material-icons">create</i></a><a class="del-user" href="#" data-id="' + user.id + '"><i aria-hidden="true" title="Delete user" class="material-icons">delete</i></a></td>' + '</tr>'
                    }
                    $(that).html(html);
                    $('#addUserModal').on('hidden.bs.modal', function (e) {
                        loadUser();
                    })
                });
            });
        });
    }

    function loadMain() {
        $('#load').load('/main', function () {
            $(this).find('#routes').each(loadRoutes);
            $(this).find('#session-user').each(loadUsers);
            $.get("/row/status", function (data) {
                if (data.status === 'ROWING') {
                    var startButton = $('#startRow');
                    if (getUrlParameter("test")) {
                        startButton = $('#startSimulator')
                    }
                    start(startButton);
                }
            });
            //Run simulator if test.
            if (getUrlParameter("test")) {
                $('#startRow').attr("id", "startSimulator");
            }
        });
    }

    function loadHistoryIndex(index) {
        loadHistory(index);
    }

    function loadHistory(mainIndex) {
        $('#load').load('/history', function () {
            $(this).find('#history').each(function () {
                loadLast3Sessions();
                loadHistoryList($(this), mainIndex);
            });
        });
    }

    function loadLast3Sessions() {
        $.get('/session/' + 0 + '/' + 2, function (data) {
            var htmlCards = '';
            data.forEach(function (session) {
                htmlCards = createCard(htmlCards, session);
            });

            $('#cards').html('<div class="col"><div class="card-deck">' + htmlCards + '</div></div>');
            $('.gpx-track').each(function () {
                $(this).trigger("load-map", this);
            });
        });
    }

    function loadHistoryList(that, mainIndex) {
        var start = mainIndex * PAGE_SIZE, stop = (((mainIndex + 1) * PAGE_SIZE)) - 1;
        $.get('/session/' + start + '/' + stop, function (data) {
            $.get('/users', function (users) {
                var htmlTable = '', index = 0;
                var userMap = users.reduce(function(map, obj) {
                    map[obj.id] = obj;
                    return map;
                }, {});
                data.forEach(function (session) {
                    htmlTable = createLapTableRecord(htmlTable, index + (mainIndex * PAGE_SIZE), session, userMap);
                    index++;
                });

                $('#histor-table-body').html(htmlTable);
                var pag = that.find('.page');
                createHistoryNavPage(pag, mainIndex);
            });
        });
    }

    function loadGpxMap() {
        var name = $(this).data('name');
        var element = $(this).find('.card-map-top');
        addGpxTrackToMap(name, element);
    }

    function createHistoryNavPage(page, index) {
        var htmlElement = $('<ul id="history-page" data-index="' + index + '"></ul>').addClass("pagination pagination-lg");
        $.get("session/size", function (data) {
            var size = parseInt(parseInt(data) / PAGE_SIZE) + 1;
            var prevDisabled = (index === 0 ? 'disabled' : '');
            var nextDisabled = (index === size - 1 ? 'disabled' : '');
            var prev = $('<li class="page-item ' + prevDisabled + '"></li>').append('<a class="page-link" href="#" data-next="-1" tabindex="-1">Previous</a>');
            var next = $('<li class="page-item ' + nextDisabled + '"></li>').append('<a class="page-link" data-next="1" href="#">Next</a>');

            htmlElement.append(prev);
            for (var i = 0; i < size; i++) {
                var active = '';
                if (index === i) {
                    active = "active";
                }
                var item = $('<li class="page-item ' + active + '"><a class="page-link" data-index="' + i + '" href="#">' + (i + 1) + '</a></li>');
                htmlElement.append(item);
            }
            htmlElement.append(next);
            $(page).html(htmlElement);
        });
    }

    function createRouteNavPage(page, index) {
        var htmlElement = $('<ul id="route-page" data-index="' + index + '"></ul>').addClass("pagination pagination-lg");
        $.get("routes/size", function (data) {
            var size = parseInt(parseInt(data) / PAGE_SIZE) + 1;
            var prevDisabled = (index === 0 ? 'disabled' : '');
            var nextDisabled = (index === size - 1 ? 'disabled' : '');
            var prev = $('<li class="page-item ' + prevDisabled + '"></li>').append('<a class="page-link" href="#" data-next="-1" tabindex="-1">Previous</a>');
            var next = $('<li class="page-item ' + nextDisabled + '"></li>').append('<a class="page-link" data-next="1" href="#">Next</a>');

            htmlElement.append(prev);
            for (var i = 0; i < size; i++) {
                var active = '';
                if (index === i) {
                    active = "active";
                }
                var item = $('<li class="page-item ' + active + '"><a class="page-link" data-index="' + i + '" href="#">' + (i + 1) + '</a></li>');
                htmlElement.append(item);
            }
            htmlElement.append(next);
            $(page).html(htmlElement);
        });
    }

    var loadUsers = function () {
        var that = this;
        $.get("/users", function (data) {
            var html = '';
            data.forEach(function (value) {
                html += '<option value="' + value.id + '">' + value.firstName + ' ' + value.lastName + '</option>'
            });
            $(that).html(html)
        });
    };

    var clickSession = function (e) {
        e.preventDefault();
        var name = $(this).data('name');
        loadSession(name);
    };

    $(document).on("click", '#user', function (e) {
        loadUser();
    });

    $(document).on("click", '#history-page a', function (e) {
        e.preventDefault();
        var next = parseInt($(this).data('next')), index = parseInt($(this).data('index')),
            mainIndex = parseInt($('#history-page').data('index'));
        if (!isNaN(next)) {
            mainIndex += next;
        } else if (!isNaN(index)) {
            mainIndex = index;
        }
        loadHistoryList($('#history-table'), mainIndex);
    });

    //TODO: refactory
    $(document).on("click", '#route-page a', function (e) {
        e.preventDefault();
        var next = parseInt($(this).data('next')), index = parseInt($(this).data('index')),
            mainIndex = parseInt($('#route-page').data('index'));
        if (!isNaN(next)) {
            mainIndex += next;
        } else if (!isNaN(index)) {
            mainIndex = index;
        }
        var pag = $('#routes-table').find('.page');
        createRouteNavPage(pag[0], mainIndex);
        loadRouteTable(mainIndex);
    });

    $(document).on("click", '.main', function (e) {
        loadMain();
    });

    $(document).on("click", '.nav-link', function (e) {
        $('#main-nav').find(".nav-item").each(function () {
            $(this).removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    $(document).on("click", '.sessions', clickSession);

    $(document).on("click", 'a#history', function (e) {
        loadHistoryIndex(0, 0);
    });

    $(document).on("click", 'a#route', function (e) {
        loadRoute(0);
    });

    function loadRoute(mainIndex) {
        $('#load').load('/route', function () {
            $(this).find('#routes-t').each(function () {
                loadRouteTable(0);
                var pag = $('#routes-table').find('.page');
                createRouteNavPage(pag[0], mainIndex);
            });
        });
    }

    function loadRouteTable(mainIndex) {
        var start = mainIndex * PAGE_SIZE, stop = (((mainIndex + 1) * PAGE_SIZE)) - 1;
        $.get('/routes/' + start + '/' + stop, function (data) {
            var htmlTable = '';
            var index = 0;
            data.forEach(function (route) {
                htmlTable = createRouteRecord(htmlTable, index + (mainIndex * PAGE_SIZE), route);
                index++;
            });

            $('#routes-table-body').html(htmlTable);
            $('#add-route-modal').on('hidden.bs.modal', function (e) {
                loadRoute(0);
            })
        });
    }


    $(document).on("load-map", '.gpx-track', loadGpxMap);

    $(document).on("click", 'button#startRow', function (e) {
        e.preventDefault();
        var routes = $('#routes').val();
        var that = this;
        $.get("/row/start", { routes: routes }, function () {
            start(that);
        });
    });

    function start(startButton) {
        $(window).scrollTop($('#main').offset().top); //Scroll
        get_rowInfo(true, "Rowing");
        cleanMap();
        $('#routes').attr('disabled', 'disabled');
        $('#session-user').attr('disabled', 'disabled');
        $("#startSimulator").attr('disabled', 'disabled');
        $(startButton).attr('disabled', 'disabled');
        $(startButton).html('Rowing...');
        $(startButton).addClass('d-none');
        $('#stopRow').removeClass('d-none');
    }

    $(document).on("click", 'button#stopRow', function (e) {
        e.preventDefault();
        var that = $(this);
        clearTimeout(timeOut);
        run = false;
        var routes = $('#routes').val();
        var user = $('#session-user').val();
        $.get("/row/stop", { routes: routes, user: user }, function (data) {
            $('#table-content').html(getHtml("Stopped", data, false));
            var startRow = $("#startRow");
            startRow.removeAttr('disabled');
            startRow.removeClass('d-none');
            startRow.html('Start row');
            that.addClass('d-none');
            $('#routes').removeAttr('disabled');
            $('#session-user').removeAttr('disabled');
            $("#startSimulator").removeAttr('disabled');
        });
    });

    $(document).on("click", '.edit-user', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: '/users/' + id,
            type: 'GET',
            success: function (result) {
                var form = $("#addUserForm");
                form.find('#firstName').val(result.firstName);
                form.find('#lastName').val(result.lastName);
                form.find('#userId').val(result.id);
                $.get('/strava/url', function (data) {
                    var url = data.url.replace("%24", result.id);
                    $('.strava-url').attr('href', url);
                });
                var connect = $(".strava-connect");
                connect.removeClass("sr-only");
                $('#addUserModal').modal('show');
            }
        });
    });
    $(document).on("click", '.edit-route', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: '/routes/' + id,
            type: 'GET',
            success: function (result) {
                var form = $("#addRoute");
                form.find('#name').val(result.name);
                form.find('#meters').val(result.meters);
                form.find('#segmentId').val(result.segmentId);
                form.find('#countries').val(result.country);
                //gps.replace(/(.*),(.*),(.*)/gm, '{ "lat": $1, "lon": $2, "el": $3 },');
                var gpsCvs = JSON.stringify(result.gps);
                form.find('#gps').append(gpsCvs);
                $('#add-route-modal').modal('show');
            }
        });
    });

    $(document).on("click", '.strava', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $.get(href, function (data) {
            console.log(data);
            alert("Uploaded to strava!");
        });
    });

    $(document).on("click", '.del-session', function (e) {
        e.preventDefault();
        var name = $(this).data('name');
        var result = confirm("Are you sure you want to delete session?");
        if (result) {
            $.ajax({
                url: '/session/del/' + name,
                type: 'DELETE',
                success: function (result) {
                    alert("Session deleted");
                    loadHistoryIndex(0, 0);
                }
            });
        }
    });

    $(document).on("click", "#save-route", function (event) {
        event.preventDefault();
        var form = $("#addRoute");
        var route = {};
        route.name = form.find('#name').val();
        route.meters = form.find('#meters').val();
        route.stravaId = form.find('#segmentId').val();
        route.country = form.find('#countries').val();
        route.gps = form.find('textarea').val();
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            url: "/routes/add",
            data: JSON.stringify(route),
            success: function () {
                $('#add-route-modal').modal('hide');
            }
        });
    });

    $(document).on("click", "#save-user", function (event) {
        event.preventDefault();
        var form = $("#addUserForm");
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

    $(document).on("click", '.del-user', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            $.ajax({
                url: '/users/' + id,
                type: 'DELETE',
                success: function (result) {
                    loadUser();
                }
            });
        }
    });

    $(document).on("click", '.del-route', function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var result = confirm("Are you sure you want to delete route?");
        if (result) {
            $.ajax({
                url: '/routes/' + id,
                type: 'DELETE',
                success: function (result) {
                    loadRoute(0);
                }
            });
        }
    });


    $('#load').each(function () {
        var hash = window.location.hash;
        switch (hash) {
            case '#route':
                loadRoute(0);
                break;
            case '#user':
                loadUser();
                break;
            case '#history':
                loadHistory(0);
                break;
            case '#session':
                loadSession(QueryString["name"]);
                break;
            default:
                loadMain();
        }
    });

    $('#routes').each(loadRoutes);

    $('#session-user').each(loadUsers);

    $(document).on('show.bs.modal', '#show-route-modal', function (e) {
        var name = $(e.relatedTarget).data('route-name');
        var that = $(this);
        $.get("/routes/" + name, function (data) {
            var title = data.name;
            if (data.segementId) {
                title = '<a target="_blank" href="https://www.strava.com/segments/' + data.segementId + '">' + title + ' </a>';
            }
            that.find('#show-route-modal-title').html(title);
            var html = '<li class="list-group-item"><h5 class="card-title">Display Lenght:</h5>' + data.meters + ' m</li>';
            html += '<li class="list-group-item"><h5 class="card-title">Gps Lenght:</h5>' + data.gpsLenght + ' m</li>';
            html += '<li class="list-group-item"><h5 class="card-title">Country:</h5>' + data.country + '</li>';
            that.find('.card .list-group').html(html);
        });
    });

    $(document).on('shown.bs.modal', '#show-route-modal', function (e) {
        var name = $(e.relatedTarget).data('route-name');
        addRouteTrackToMap(name, $("#live-route-map"));
    });

    $(document).on("change", '#routes', function (e) {
        var selected = $('#routes').find(":selected");
        cleanMap();
        var p = new google.maps.LatLng($(selected).data("lat"), $(selected).data("lon"));
        liveMap.panTo(p);
    });
});

function get_rowInfo(continues, title) {
    run = continues;
    $.get("/row", function (data) {
        var html = getHtml(title, data);
        if (html) {
            $('#table-content').html(html);
            $('#laps-body').html(getLapHtml(title, data, true));
            var lat = data.gps.lat;
            var lon = data.gps.lon;
            var p = new google.maps.LatLng(lat, lon);
            livePoints.push(p);
            if (liveBounds) {
                liveBounds.extend(p);
                var poly = createPolyLine(livePoints);
                poly.setMap(liveMap);
                liveMap.fitBounds(liveBounds);
            }

        }
    }).done(function () {
        if (run) {
            timeOut = setTimeout(function () { get_rowInfo(true, title); }, UPDATE_FREQ);
        }
    });
}

function fmtMSS(s) {
    var date = new Date(null);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
}

function getHtml(label, json, day) {
    if (parseInt(json.meters) === 0) {
        return;
    }
    var html = '';
    if (day) {
        html += '<div class="row"><div class="col-sm-4">Day</div><div class="col">' + json.start.substr(2, json.start.lastIndexOf('T') - 2) + '</div></div>';
    }
    html += '<div class="row"><div class="col-sm-4">Start:</div><div class="col">' + json.start.substr(json.start.lastIndexOf('T') + 1, 8) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Time:</div><div class="col">' + fmtMSS(parseInt(json.seconds)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Length:</div><div class="col">' + parseInt(json.meters) + ' m (' + parseInt(json.routeLap) + ')</div></div>';
    html += '<div class="row"><div class="col-sm-4">Pace:</div><div class="col">' + Math.round(parseFloat(json.pace) * 3.6 * 10) / 10 + ' km/t</div></div>';
    html += '<div class="row"><div class="col-sm-4">500m:</div><div class="col">' + fmtMSS(parseInt(json.lapPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">2k:</div><div class="col">' + fmtMSS(parseInt(json.towKPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Avg.W:</div><div class="col">' + Math.round(parseFloat(json.watt) * 10) / 10 + 'w</div></div>';
    html += '<div class="row"><div class="col-sm-4">SR:</div><div class="col">' + Math.round(parseFloat(json.stroke) * 10) / 10 + '</div></div>';
    if (parseInt(json.hr) > 0) {
        html += '<div class="row"><div class="col-sm-4">HR:</div><div class="col ' + getHeartRateColor(parseInt(json.hr)) + '">' + parseInt(json.hr) + (parseInt(json.avgHr) > 0 ? '(' + parseInt(json.avgHr) + ')' : '') + '</div></div>';
    }
    if (json.fileName) {
        html += '<div class="row"><div class="col">Actions:</div><div class="col"><a href="/sessions/' + json.fileName;
        html += '"><i class="material-icons">file_download</i><a class="strava" href="/strava/upload/' + json.name;
        html += '"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a>';
        html += '<a class="sessions" data-name="' + json.name + '" href="/sessions"><i aria-hidden="true" title="Session" class="material-icons">fiber_new</i></a></div></div>';
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
            html += '<tr><th scope="row">' + lapNum + '</th><td>' + parseInt(value.meters) + '</td><td>' + fmtMSS(parseInt(value.seconds)) + '</td>';
            html += '<td>' + Math.round(parseFloat(value.watt) * 10) / 10 + 'w</td></tr>';
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
    htmlCards += '<h5 class="card-title mt-2"><a class="sessions" data-name="' + session.name + '" href="/session">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></h5>';
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

var createLapTableRecord = function (htmlTable, index, session, userMap) {
    var user = userMap[session.user];
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a class="sessions" data-name="' + session.name + '" href="/?name='+session.name+'#session">' + session.name.substring(0, session.name.lastIndexOf('.')) + '</a></td>';
    htmlTable += '<td>Length: ' + parseInt(session.endStats.meters) + 'm</td>';
    if (user) {
        htmlTable += '<td>' + user.firstName + ' ' + user.lastName + '</td>'; 
    } else {
        htmlTable += '<td></td>'; 
    }
    htmlTable += '<td> <a href="/sessions/' + session.name + '.gpx"><i class="material-icons md-36">file_download</i><a class="strava" href="/strava/upload/' + session.name + '"><i aria-hidden="true" title="Upload to Strava" class="material-icons md-36">cloud_upload</i></a> <a class="del-session" href="#" data-name="' + session.name + '"><i aria-hidden="true" title="Delete session local" class="material-icons md-36">delete</i></a></td>';
    htmlTable += '</tr>';
    return htmlTable;
};

var createRouteRecord = function (htmlTable, index, route) {
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a data-toggle="modal" data-route-name="' + route.name + '" data-target="#show-route-modal" href="/routes/' + route.name + '">' + route.name + '</a></td>';
    htmlTable += '<td>' + parseInt(route.meters) + 'm</td>';
    htmlTable += '<td>' + route.country + '</td>';
    htmlTable += '<td>'
    if (route.permanent !== true) {
        htmlTable += '<a class="edit-route" href="#" data-id="' + route.name + '"><i class="material-icons">create</i></a><a class="del-route" href="#" data-id="' + route.name + '"><i aria-hidden="true" title="Delete route" class="material-icons">delete</i></a>' + '</td>';
    }
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

function addGraph(time, hr, start, strokes) {
    var speed = [];
    var watt = [];
    var stroke = [];
    var strokeConter = 1;
    for (var i = 1; i < time.length; i++) {
        var timeVal = parseInt(time[i]);
        var strokeTime = parseInt(strokes[strokeConter]);
        var sec = ((timeVal - start) / 1000);
        var lenght = (RATION / 100);
        speed.push(((lenght / sec)) * 3.6);
        var wattValue = calcWatt(sec / lenght);
        watt.push(wattValue);
        stroke.push(1000*60 / (strokeTime - parseInt(strokes[strokeConter-1])));
        start = parseInt(time[i]);
        if (timeVal > strokeTime) {
            strokeConter++;
        }
    }

    //Remove ever second element
    var speedMerged = [];
    var hrMerged = [];
    var wattMerged = [];
    var strokeMerged = [];
    var labelsMerged = [];
    var mergeSize = 10;
    if (time.length > 1000) {
        mergeSize = 20;
    }

    while (time.length) {
        var a = time.splice(0, mergeSize);
        var timeV = parseInt(a.reduce(function (a, b) { return a + b; }) / a.length);
        labelsMerged.push(new Date(timeV).toISOString().substr(new Date(timeV).toISOString().lastIndexOf('T') + 1, 8));
        if (hr) {
            var h = hr.splice(0, mergeSize);
            if (h.length > 0) {
                hrMerged.push(parseInt(h.reduce(function (a, b) { return a + b; }) / h.length));
            }
        }
        if (stroke) {
            var h = stroke.splice(0, mergeSize);
            if (h.length > 0) {
                strokeMerged.push(Math.round(parseFloat(h.reduce(function (a, b) { return a + b; }) / h.length) * 10) / 10);
            }
        }
        if (speed) {
            var s = speed.splice(0, mergeSize);
            var w = watt.splice(0, mergeSize);
            if (s.length > 0) {
                speedMerged.push(Math.round(parseFloat(s.reduce(function (a, b) { return a + b; }) / s.length) * 10) / 10);
            }
            if (w.length > 0) {
                wattMerged.push(Math.round(parseFloat(w.reduce(function (a, b) { return a + b; }) / w.length) * 10) / 10);
            }
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
           // cubicInterpolationMode: 'monotone',
            yAxisID: 'y-axis-1',
        }, {
            label: 'Speed (km/t)',
            borderColor: '#007bff',
            backgroundColor: '#007bff',
            fill: false,
            data: speedMerged,
            //cubicInterpolationMode: 'monotone',
            yAxisID: 'y-axis-2'
        },
        {
            label: 'Watt',
            borderColor: '#4bc0c0',
            backgroundColor: '#4bc0c0',
            fill: false,
            data: wattMerged,
            lineTension: 0,
            //cubicInterpolationMode: 'monotone',
            yAxisID: 'y-axis-3'
        },
        {
            label: 'Stroke rate (spm)',
            borderColor: '#9966FF',
            backgroundColor: '#9966FF',
            fill: false,
            data: strokeMerged,
            yAxisID: 'y-axis-4'
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
                },
                {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-3',
                    ticks: {
                        stepSize: 25
                    },
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false // only want the grid lines for one axis to show up
                    }
                },
                {
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'right',
                    id: 'y-axis-4',
                    ticks: {
                        stepSize: 2,
                        suggestedMin: 10,
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

function calcWatt(pace) {
    return WATT_RATION / Math.pow(pace, 3);
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
