import route from '../route/index';
import user from '../user/index';
import utils from '../utils/utils'
import mapUtils from '../utils/mapUtils'
import globals from '../utils/globals';
import session from '../session/index';
import map from '../map/index'
import history from '../history/index'

var timeOut;

function loadMain() {
    $('#load').load('/main', function () {
        $(this).find('#routes').each(route.loadRoutes);
        $(this).find('#session-user').each(user.loadUsers);
        $.get("/row/status", function (data) {
            let rowing = false;
            if (data.status === 'ROWING') {
                rowing = true;
                var startButton = $('#startRow');
                if (utils.getUrlParameter("test")) {
                    startButton = $('#startSimulator')
                }
                start(startButton, true);
            } else {
                route.changeRouteSelect();
            }
        });

        //Run simulator if test.
        if (utils.getUrlParameter("test")) {
            $('#startRow').attr("id", "startSimulator");
        }
    });
}

function uploadToStrava(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $.get(href, function (data) {
        console.log(data);
        alert("Uploaded to strava!");
    });
}

function startRow(e) {
    e.preventDefault();
    var routes = $('#routes').val();
    var that = this;
    $.get("/row/start", { routes: routes }, function () {
        start(that);
    });
}

function stopRow(e) {
    e.preventDefault();
    $('#main-nav').show();
    $(window).scrollTop($('#main-nav').offset().top);
    var that = $(this);
    clearTimeout(timeOut);
    globals.run = false;
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
}

function start(startButton, loadMap=false) {
    $('#main-nav').hide();
    $(window).scrollTop($('#main').offset().top); //Scroll
    if (loadMap) {
        mapUtils.cleanMap();
        var rowInfo = get_rowInfo.bind(null, true, "Rowing");
        mapUtils.addSessionTrackToMap(rowInfo);

    } else {
        get_rowInfo(true, "Rowing");
        mapUtils.cleanMap();
    }
    $('#routes').attr('disabled', 'disabled');
    $('#session-user').attr('disabled', 'disabled');
    $("#startSimulator").attr('disabled', 'disabled');
    $(startButton).attr('disabled', 'disabled');
    $(startButton).html('Rowing...');
    $(startButton).addClass('d-none');
    $('#stopRow').removeClass('d-none');
}

function get_rowInfo(continues, title) {
    globals.run = continues;
    $.get("/row", function (data) {
        var html = getHtml(title, data);
        if (html) {
            $('#table-content').html(html);
            $('#laps-body').html(session.getLapHtml(title, data, true));
            var lat = data.gps.lat;
            var lon = data.gps.lon;
            var p = new google.maps.LatLng(lat, lon);
            if (map.markers.length < data.totalLaps ) {
                mapUtils.addMarker(p, "Runde: " + data.totalLaps, String(data.totalLaps));
            }
            map.livePoints.push(p);
            if (map.liveBounds) {
                map.liveBounds.extend(p);
                var poly = mapUtils.createPolyLine(map.livePoints);
                poly.setMap(map.liveMap);
                map.liveMap.fitBounds(map.liveBounds);
            }

        }
    }).done(function () {
        if (globals.run) {
            timeOut = setTimeout(function () { get_rowInfo(true, title); }, globals.UPDATE_FREQ);
        }
    });
}

function load() {
    var hash = window.location.hash;
    switch (hash) {
        case '#route':
            route.loadRoute(0);
            break;
        case '#user':
            user.loadUser();
            break;
        case '#history':
            history.loadHistory(0);
            break;
        case '#session':
            session.loadSession(utils.QueryString(window.location.href)["name"]);
            break;
        case '#routedetail':
            route.loadRouteDetail(utils.QueryString(window.location.href)["route"]);
            break;
        default:
            loadMain();
    }
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
    html += '<div class="row"><div class="col-sm-4">Time:</div><div class="col">' + utils.fmtMSS(parseInt(json.seconds)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Length:</div><div class="col">' + parseInt(json.meters) + ' m (' + json.percent + ')</div></div>';
    html += '<div class="row"><div class="col-sm-4">Pace:</div><div class="col">' + Math.round(parseFloat(json.pace) * 3.6 * 10) / 10 + ' km/t</div></div>';
    html += '<div class="row"><div class="col-sm-4">500m:</div><div class="col">' + utils.fmtMSS(parseInt(json.lapPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">2k:</div><div class="col">' + utils.fmtMSS(parseInt(json.towKPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Avg.W:</div><div class="col">' + Math.round(parseFloat(json.watt) * 10) / 10 + 'w</div></div>';
    html += '<div class="row"><div class="col-sm-4">SR:</div><div class="col">' + Math.round(parseFloat(json.stroke) * 10) / 10 + '</div></div>';
    if (parseInt(json.hr) > 0) {
        html += '<div class="row"><div class="col-sm-4">HR:</div><div class="col ' + utils.getHeartRateColor(parseInt(json.hr)) + '">' + parseInt(json.hr) + (parseInt(json.avgHr) > 0 ? '(' + parseInt(json.avgHr) + ')' : '') + '</div></div>';
    }
    if (json.fileName) {
        html += '<div class="row"><div class="col-sm-4">Actions:</div><div class="col"><a href="/sessions/' + json.fileName;
        html += '"><i class="material-icons">file_download</i><a class="strava" href="/strava/upload/' + json.name;
        html += '"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a>';
        html += '<a class="sessions" data-name="' + json.name + '" href="/sessions"><i aria-hidden="true" title="Session" class="material-icons">fiber_new</i></a></div></div>';
    }
    return html + "";
}


export default { loadMain, start, get_rowInfo, getHtml, startRow, stopRow, load, uploadToStrava };