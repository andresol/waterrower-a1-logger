import utils from './utils/utils';
import graphUtils from './utils/graphUtils';
import { UPDATE_FREQ, PAGE_SIZE, RATION, run } from './utils/globals';
import front from './front/index';
import route from './route/index';
import user from './user/index';
import mapUtils from './utils/mapUtils'
import map from './map/index'
import history from './history/index'
import session from './session/index'


var timeOut;

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


$(function () {

    /** Init shared */
    front.get_rowInfo(false, "");

    $(document).on("click", '.main', function (e) {
        front.loadMain();
    });

    $(document).on("click", '#user', function (e) {
        user.loadUser();
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
        history.loadHistoryList($('#history-table'), mainIndex);
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
        route.createRouteNavPage(pag[0], mainIndex);
        route.loadRouteTable(mainIndex);
    });

    $(document).on("click", '.nav-link', function (e) {
        $('#main-nav').find(".nav-item").each(function () {
            $(this).removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    $(document).on("click", '.sessions', session.clickSession);

    $(document).on("click", 'a#history', function (e) {
        history.loadHistoryIndex(0, 0);
    });

    $(document).on("click", 'a#route', function (e) {
        route.loadRoute(0);
    });


    $(document).on("load-map", '.gpx-track', mapUtils.loadGpxMap);

    $(document).on("click", 'button#startRow', function (e) {
        e.preventDefault();
        var routes = $('#routes').val();
        var that = this;
        $.get("/row/start", { routes: routes }, function () {
            front.start(that);
        });
    });

    $(document).on("click", 'button#stopRow', function (e) {
        e.preventDefault();
        var that = $(this);
        clearTimeout(timeOut);
        run = false;
        var routes = $('#routes').val();
        var user = $('#session-user').val();
        $.get("/row/stop", { routes: routes, user: user }, function (data) {
            $('#table-content').html(front.getHtml("Stopped", data, false));
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
                    history.loadHistoryIndex(0, 0);
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
                    user.loadUser();
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
                    route.loadRoute(0);
                }
            });
        }
    });


    $('#load').each(function () {
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
                session.loadSession(QueryString["name"]);
                break;
            default:
                front.loadMain();
        }
    });

    $('#routes').each(route.loadRoutes);

    $('#session-user').each(user.loadUsers);

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
        mapUtils.addRouteTrackToMap(name, $("#live-route-map"));
    });

    $(document).on("change", '#routes', function (e) {
        var selected = $('#routes').find(":selected");
        mapUtils.cleanMap();
        var p = new google.maps.LatLng($(selected).data("lat"), $(selected).data("lon"));
        map.liveMap.panTo(p);
    });
});






