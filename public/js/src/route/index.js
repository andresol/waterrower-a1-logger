import mapUtils from '../utils/mapUtils'
import map from '../map/index'

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
        mapUtils.cleanMap();
        var p = new google.maps.LatLng($(selected).data("lat"), $(selected).data("lon"));
        map.liveMap.panTo(p);
    });

};

export default { loadRoutes }