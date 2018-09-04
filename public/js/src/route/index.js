import mapUtils from '../utils/mapUtils'
import map from '../map/index'
import utils from '../utils/utils';
import graphUtils from '../utils/graphUtils';
import { UPDATE_FREQ, PAGE_SIZE, RATION, run } from '../utils/globals';

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
            html += '<option ' + selected + ' value="' + value.index + '" data-name="' + value.name + '" data-lat="' +
                value.gps[0].lat + '" data-lon="' + value.gps[0].lon + '">' + value.name + ' (' + value.meters + 'm)</option>';
            selected = '';
            index++;
        });
        $(that).html(html);

        changeRouteSelect();
    });

};

var createRouteRecord = function (htmlTable, index, route) {
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a data-toggle="modal" data-route-name="' + route.name + '" data-target="#show-route-modal" href="/routes/' + route.name + '">' + route.name + '</a></td>';
    htmlTable += '<td>' + parseInt(route.meters) + 'm</td>';
    htmlTable += '<td>' + route.country + '</td>';
    htmlTable += '<td>'
    if (route.permanent !== true) {
        htmlTable += '<a class="edit-route" href="#" data-id="' + route.name + '"><i class="material-icons">create</i></a>' +
            '<a class="del-route" href="#" data-id="' + route.name + '">' +
            '<i aria-hidden="true" title="Delete route" class="material-icons">delete</i></a>' + '</td>';
    }
    htmlTable += '</tr>';
    return htmlTable;
};

function loadRoute(mainIndex) {
    $('#load').load('/route', function () {
        $(this).find('#routes-t').each(function () {
            loadRouteTable(0);
            var pag = $('#routes-table').find('.page');
            createRouteNavPage(pag[0], mainIndex);
        });
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

function editRoute(e) {
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
}

function showRouteModal(e) {
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
}

function changeRouteSelect() {
    var selected = $('#routes').find(":selected");
    mapUtils.cleanMap();
    var name = selected.data('name');
    mapUtils.addRouteTrackToMap(name, $("#live-map"));
}

function deleteRoute(e) {
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
}

function saveRoute(event) {
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
}

function openRoute(e) {
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
}

export default { loadRoutes, createRouteRecord, loadRoute, loadRouteTable,
     createRouteNavPage, editRoute, showRouteModal, changeRouteSelect, deleteRoute,
saveRoute, openRoute}