import utils from './utils/utils';
import front from './front/index';
import route from './route/index';
import user from './user/index';
import mapUtils from './utils/mapUtils'
import map from './map/index'
import history from './history/index'
import session from './session/index'

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

$(function () {

    /** Init shared */
    front.get_rowInfo(false, "");

    $(document).on("click", '.main', function (e) {
        front.loadMain();
    });

    $(document).on("click", '#user', function (e) {
        user.loadUser();
    });

    $(document).on("click", '#history-page a', history.openHistory);

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

    $(document).on("click", 'button#startRow', front.startRow);

    $(document).on("click", 'button#stopRow', front.stopRow);

    $(document).on("click", '.edit-user', user.editUser);

    $(document).on("click", '.edit-route', route.editRoute);

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
                session.loadSession(utils.QueryString["name"]);
                break;
            default:
                front.loadMain();
        }
    });

    $('#routes').each(route.loadRoutes);

    $('#session-user').each(user.loadUsers);

    $(document).on('show.bs.modal', '#show-route-modal', route.showRouteModal);

    $(document).on('shown.bs.modal', '#show-route-modal', function (e) {
        var name = $(e.relatedTarget).data('route-name');
        mapUtils.addRouteTrackToMap(name, $("#live-route-map"));
    });

    $(document).on("change", '#routes', function (e) {
        var selected = $('#routes').find(":selected");
        mapUtils.cleanMap();
        var name = selected.data('name');
        mapUtils.addRouteTrackToMap(name, $("#live-map"))
    });
});






