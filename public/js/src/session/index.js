import utils from '../utils/utils';
import graphUtils from '../utils/graphUtils';
import { UPDATE_FREQ, PAGE_SIZE, RATION, run } from '../utils/globals';
import front from '../front/index';
import route from '../route/index';
import user from '../user/index';
import mapUtils from '../utils/mapUtils'
import map from '../map/index'
import history from '../history/index'


function loadSession(name) {
    $('#load').load('/sessions', function () {
        $(this).find('#routes').each(route.loadRoutes);
        $(this).find('#session-user').each(user.loadUsers);
        $(this).find('#history-session').each(function () {
            var title = "History";
            $.get("/session/" + name, function (data) {
                var html = front.getHtml(title, data.endStats, true);
                $('#routes').val(data.route);
                $('#session-user').val(data.user);
                if (html) {
                    $('#table-content').html(html);
                    $('#laps-body').html(getLapHtml(title, data.endStats));
                    mapUtils.addGpxTrackToMap(name, $("#live-map"));
                }
                graphUtils.addGraph(data.raw, data.rawHr, parseInt(data.start), data.stroke);
            });
        });
    });
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
                html += '<tr><th scope="row">' + lapNum + '</th><td>' + parseInt(value.meters) + '</td><td>' + utils.fmtMSS(parseInt(value.seconds)) + '</td>';
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


var clickSession = function (e) {
    e.preventDefault();
    var name = $(this).data('name');
    session.loadSession(name);
};

export default { loadSession, clickSession }