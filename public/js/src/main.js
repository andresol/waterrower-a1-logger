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
    $(document).on("click", '#route-page a', route.openRoute);

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

    $(document).on("click", '.strava', front.uploadToStrava);

    $(document).on("click", '.del-session', session.deleteSession);

    $(document).on("click", "#save-route", route.saveRoute);

    $(document).on("click", "#save-user", user.saveUser);

    $(document).on("click", '.del-user', user.deleteUser);

    $(document).on("click", '.del-route', route.deleteRoute);

    $('#load').each(front.load);

    $('#routes').each(route.loadRoutes);

    $('#session-user').each(user.loadUsers);

    $(document).on('show.bs.modal', '#show-route-modal', route.showRouteModal);

    $(document).on('shown.bs.modal', '#show-route-modal', function (e) {
        var name = $(e.relatedTarget).data('route-name');
        mapUtils.addRouteTrackToMap(name, $("#live-route-map"));
    });

    $(document).on("change", '#routes', route.changeRouteSelect);
});






