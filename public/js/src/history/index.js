import utils from '../utils/utils';
import { UPDATE_FREQ, PAGE_SIZE, RATION } from '../utils/globals';


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


var createCard = function (htmlCards, session) {
    htmlCards += '<div class="card gpx-track" data-name="' + session.name + '"">';
    htmlCards += '<div class="card-body">';
    htmlCards += '<div class="card-map-top "></div>';
    htmlCards += '<h5 class="card-title mt-2"><a class="sessions" data-name="' + session.name + '" href="/session">' + utils.sessionNameToReadable(session.name) + '</a></h5>';
    htmlCards += '<p class="card-text">Length: ' + parseInt(session.endStats.meters) + 'm, Time: ' + utils.fmtMSS(parseInt(session.endStats.seconds)) + '</p>';
    htmlCards += '<a href="/strava/upload/' + session.name + '" class="btn btn-primary strava btn-block">Upload to Strava</a>';
    htmlCards += '</div>';
    htmlCards += '</div>';
    return htmlCards;
};

var createLapTableRecord = function (htmlTable, index, session, userMap) {
    var user = userMap[session.user];
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a class="sessions" data-name="' + session.name + '" href="/?name='+session.name+'#session">' + utils.sessionNameToReadable(session.name) + '</a></td>';
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


export default { loadHistoryIndex, loadHistory, loadHistoryList }