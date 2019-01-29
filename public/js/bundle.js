/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/src/front/index.js":
/*!**************************************!*\
  !*** ./public/js/src/front/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _route_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../route/index */ "./public/js/src/route/index.js");
/* harmony import */ var _user_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user/index */ "./public/js/src/user/index.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ "./public/js/src/utils/utils.js");
/* harmony import */ var _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/mapUtils */ "./public/js/src/utils/mapUtils.js");
/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/globals */ "./public/js/src/utils/globals.js");
/* harmony import */ var _session_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../session/index */ "./public/js/src/session/index.js");
/* harmony import */ var _map_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../map/index */ "./public/js/src/map/index.js");
/* harmony import */ var _history_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../history/index */ "./public/js/src/history/index.js");









var timeOut;

function loadMain() {
    $('#load').load('/main', function () {
        $(this).find('#routes').each(_route_index__WEBPACK_IMPORTED_MODULE_0__["default"].loadRoutes);
        $(this).find('#session-user').each(_user_index__WEBPACK_IMPORTED_MODULE_1__["default"].loadUsers);
        $.get("/row/status", function (data) {
            let rowing = false;
            if (data.status === 'ROWING') {
                rowing = true;
                var startButton = $('#startRow');
                if (_utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].getUrlParameter("test")) {
                    startButton = $('#startSimulator')
                }
                start(startButton, true);
            } else {
                _route_index__WEBPACK_IMPORTED_MODULE_0__["default"].changeRouteSelect();
            }
        });

        //Run simulator if test.
        if (_utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].getUrlParameter("test")) {
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
    _utils_globals__WEBPACK_IMPORTED_MODULE_4__["default"].run = false;
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
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].cleanMap();
        var rowInfo = get_rowInfo.bind(null, true, "Rowing");
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].addSessionTrackToMap(rowInfo);

    } else {
        get_rowInfo(true, "Rowing");
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].cleanMap();
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
    _utils_globals__WEBPACK_IMPORTED_MODULE_4__["default"].run = continues;
    $.get("/row", function (data) {
        var html = getHtml(title, data);
        if (html) {
            $('#table-content').html(html);
            $('#laps-body').html(_session_index__WEBPACK_IMPORTED_MODULE_5__["default"].getLapHtml(title, data, true));
            var lat = data.gps.lat;
            var lon = data.gps.lon;
            var p = new google.maps.LatLng(lat, lon);
            if (_map_index__WEBPACK_IMPORTED_MODULE_6__["default"].markers.length < data.totalLaps ) {
                _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].addMarker(p, "Runde: " + data.totalLaps, String(data.totalLaps));
            }
            _map_index__WEBPACK_IMPORTED_MODULE_6__["default"].livePoints.push(p);
            if (_map_index__WEBPACK_IMPORTED_MODULE_6__["default"].liveBounds) {
                _map_index__WEBPACK_IMPORTED_MODULE_6__["default"].liveBounds.extend(p);
                var poly = _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].createPolyLine(_map_index__WEBPACK_IMPORTED_MODULE_6__["default"].livePoints);
                poly.setMap(_map_index__WEBPACK_IMPORTED_MODULE_6__["default"].liveMap);
                _map_index__WEBPACK_IMPORTED_MODULE_6__["default"].liveMap.fitBounds(_map_index__WEBPACK_IMPORTED_MODULE_6__["default"].liveBounds);
            }

        }
    }).done(function () {
        if (_utils_globals__WEBPACK_IMPORTED_MODULE_4__["default"].run) {
            timeOut = setTimeout(function () { get_rowInfo(true, title); }, _utils_globals__WEBPACK_IMPORTED_MODULE_4__["default"].UPDATE_FREQ);
        }
    });
}

function load() {
    var hash = window.location.hash;
    switch (hash) {
        case '#route':
            _route_index__WEBPACK_IMPORTED_MODULE_0__["default"].loadRoute(0);
            break;
        case '#user':
            _user_index__WEBPACK_IMPORTED_MODULE_1__["default"].loadUser();
            break;
        case '#history':
            _history_index__WEBPACK_IMPORTED_MODULE_7__["default"].loadHistory(0);
            break;
        case '#session':
            var name = _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].QueryString(window.location.href)["name"].replace('#session',"");
            console.log(name);
            _session_index__WEBPACK_IMPORTED_MODULE_5__["default"].loadSession(name);
            break;
        case '#routedetail':
            _route_index__WEBPACK_IMPORTED_MODULE_0__["default"].loadRouteDetail(_utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].QueryString(window.location.href)["route"]);
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
    html += '<div class="row"><div class="col-sm-4">Time:</div><div class="col">' + _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].fmtMSS(parseInt(json.seconds)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Length:</div><div class="col">' + parseInt(json.meters) + ' m (' + json.percent + ')</div></div>';
    html += '<div class="row"><div class="col-sm-4">Pace:</div><div class="col">' + Math.round(parseFloat(json.pace) * 3.6 * 10) / 10 + ' km/t</div></div>';
    html += '<div class="row"><div class="col-sm-4">500m:</div><div class="col">' + _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].fmtMSS(parseInt(json.lapPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">2k:</div><div class="col">' + _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].fmtMSS(parseInt(json.towKPace)) + '</div></div>';
    html += '<div class="row"><div class="col-sm-4">Avg.W:</div><div class="col">' + Math.round(parseFloat(json.watt) * 10) / 10 + 'w</div></div>';
    html += '<div class="row"><div class="col-sm-4">SR:</div><div class="col">' + Math.round(parseFloat(json.stroke) * 10) / 10 + '</div></div>';
    if (parseInt(json.hr) > 0) {
        html += '<div class="row"><div class="col-sm-4">HR:</div><div class="col ' + _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].getHeartRateColor(parseInt(json.hr)) + '">' + parseInt(json.hr) + (parseInt(json.avgHr) > 0 ? '(' + parseInt(json.avgHr) + ')' : '') + '</div></div>';
    }
    if (json.fileName) {
        html += '<div class="row"><div class="col-sm-4">Actions:</div><div class="col"><a href="/sessions/' + json.fileName;
        html += '"><i class="material-icons">file_download</i><a class="strava" href="/strava/upload/' + json.name;
        html += '"><i aria-hidden="true" title="Upload to strava" class="material-icons">cloud_upload</i></a>';
        html += '<a class="sessions" data-name="' + json.name + '" href="/sessions"><i aria-hidden="true" title="Session" class="material-icons">fiber_new</i></a></div></div>';
    }
    return html + "";
}


/* harmony default export */ __webpack_exports__["default"] = ({ loadMain, start, get_rowInfo, getHtml, startRow, stopRow, load, uploadToStrava });

/***/ }),

/***/ "./public/js/src/history/index.js":
/*!****************************************!*\
  !*** ./public/js/src/history/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./public/js/src/utils/utils.js");
/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/globals */ "./public/js/src/utils/globals.js");




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
    var start = mainIndex * _utils_globals__WEBPACK_IMPORTED_MODULE_1__["PAGE_SIZE"], stop = (((mainIndex + 1) * _utils_globals__WEBPACK_IMPORTED_MODULE_1__["PAGE_SIZE"])) - 1;
    $.get('/session/' + start + '/' + stop, function (data) {
        $.get('/users', function (users) {
            var htmlTable = '', index = 0;
            var userMap = users.reduce(function(map, obj) {
                map[obj.id] = obj;
                return map;
            }, {});
            data.forEach(function (session) {
                htmlTable = createLapTableRecord(htmlTable, index + (mainIndex * _utils_globals__WEBPACK_IMPORTED_MODULE_1__["PAGE_SIZE"]), session, userMap);
                index++;
            });

            $('#histor-table-body').html(htmlTable);
            var pag = that.find('.page');
            createHistoryNavPage(pag, mainIndex);
        });
    });
}

function openHistory(e) {
    e.preventDefault();
    var next = parseInt($(this).data('next')), index = parseInt($(this).data('index')),
        mainIndex = parseInt($('#history-page').data('index'));
    if (!isNaN(next)) {
        mainIndex += next;
    } else if (!isNaN(index)) {
        mainIndex = index;
    }
    loadHistoryList($('#history-table'), mainIndex);
}


var createCard = function (htmlCards, session) {
    htmlCards += '<div class="card gpx-track" data-name="' + session.name + '"">';
    htmlCards += '<div class="card-body">';
    htmlCards += '<div class="card-map-top "></div>';
    htmlCards += '<h5 class="card-title mt-2"><a class="sessions" data-name="' + session.name + '" href="/session">' + _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].sessionNameToReadable(session.name) + '</a></h5>';
    htmlCards += '<p class="card-text">Length: ' + parseInt(session.endStats.meters) + 'm, Time: ' + _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].fmtMSS(parseInt(session.endStats.seconds)) + '</p>';
    htmlCards += '<a href="/strava/upload/' + session.name + '" class="btn btn-primary strava btn-block">Upload to Strava</a>';
    htmlCards += '</div>';
    htmlCards += '</div>';
    return htmlCards;
};

var createLapTableRecord = function (htmlTable, index, session, userMap) {
    var user = userMap[session.user];
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    htmlTable += '<td><a class="sessions" data-name="' + session.name + '" href="/?name='+session.name+'#session">' + _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].sessionNameToReadable(session.name) + '</a></td>';
    htmlTable += '<td>Length: ' + parseInt(session.endStats.meters) + 'm</td>';
    if (user) {
        htmlTable += '<td>' + user.firstName + ' ' + user.lastName + '</td>';
    } else {
        htmlTable += '<td></td>';
    }
    htmlTable += '<td> <a href="/sessions/' + session.name + '.gpx"><i class="material-icons md-36">file_download</i><a class="strava" href="/strava/upload/' + session.name + '">' +
        '<i aria-hidden="true" title="Upload to Strava" class="material-icons md-36 strava-icon">cloud_upload</i></a> <a class="del-session" href="#" data-name="' + session.name + '">' +
        '<i aria-hidden="true" title="Delete session local" class="material-icons md-36">delete</i></a></td>';
    htmlTable += '</tr>';
    return htmlTable;
};

function createHistoryNavPage(page, index) {
    var htmlElement = $('<ul id="history-page" data-index="' + index + '"></ul>').addClass("pagination pagination-lg");
    $.get("session/size", function (data) {
        var size = parseInt(parseInt(data) / _utils_globals__WEBPACK_IMPORTED_MODULE_1__["PAGE_SIZE"]) + 1;
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


/* harmony default export */ __webpack_exports__["default"] = ({ loadHistoryIndex, loadHistory, loadHistoryList, openHistory });

/***/ }),

/***/ "./public/js/src/main.js":
/*!*******************************!*\
  !*** ./public/js/src/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./public/js/src/utils/utils.js");
/* harmony import */ var _front_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./front/index */ "./public/js/src/front/index.js");
/* harmony import */ var _route_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./route/index */ "./public/js/src/route/index.js");
/* harmony import */ var _user_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user/index */ "./public/js/src/user/index.js");
/* harmony import */ var _utils_mapUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/mapUtils */ "./public/js/src/utils/mapUtils.js");
/* harmony import */ var _map_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map/index */ "./public/js/src/map/index.js");
/* harmony import */ var _history_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./history/index */ "./public/js/src/history/index.js");
/* harmony import */ var _session_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./session/index */ "./public/js/src/session/index.js");









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
    _front_index__WEBPACK_IMPORTED_MODULE_1__["default"].get_rowInfo(false, "");

    $(document).on("click", '.main', function (e) {
        _front_index__WEBPACK_IMPORTED_MODULE_1__["default"].loadMain();
    });

    $(document).on("click", '#user', function (e) {
        _user_index__WEBPACK_IMPORTED_MODULE_3__["default"].loadUser();
    });

    $(document).on("click", '#history-page a', _history_index__WEBPACK_IMPORTED_MODULE_6__["default"].openHistory);

    //TODO: refactory
    $(document).on("click", '#route-page a', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].openRoute);

    $(document).on("click", '.nav-link', function (e) {
        $('#main-nav').find(".nav-item").each(function () {
            $(this).removeClass("active");
        });
        $(this).parent().addClass("active");
    });

    $(document).on("click", '.sessions', _session_index__WEBPACK_IMPORTED_MODULE_7__["default"].clickSession);

    $(document).on("click", 'a#history', function (e) {
        _history_index__WEBPACK_IMPORTED_MODULE_6__["default"].loadHistoryIndex(0, 0);
    });

    $(document).on("click", 'a#route', function (e) {
        _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].loadRoute(0);
    });

    $(document).on("load-map", '.gpx-track', _utils_mapUtils__WEBPACK_IMPORTED_MODULE_4__["default"].loadGpxMap);

    $(document).on("click", 'button#startRow', _front_index__WEBPACK_IMPORTED_MODULE_1__["default"].startRow);

    $(document).on("click", 'button#stopRow', _front_index__WEBPACK_IMPORTED_MODULE_1__["default"].stopRow);

    $(document).on("click", '.edit-user', _user_index__WEBPACK_IMPORTED_MODULE_3__["default"].editUser);

    $(document).on("click", '.edit-route', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].editRoute);

    $(document).on("click", '.strava', _front_index__WEBPACK_IMPORTED_MODULE_1__["default"].uploadToStrava);

    $(document).on("click", '.del-session', _session_index__WEBPACK_IMPORTED_MODULE_7__["default"].deleteSession);

    $(document).on("click", "#save-route", _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].saveRoute);

    $(document).on("click", "#save-user", _user_index__WEBPACK_IMPORTED_MODULE_3__["default"].saveUser);

    $(document).on("click", '.del-user', _user_index__WEBPACK_IMPORTED_MODULE_3__["default"].deleteUser);

    $(document).on("click", '.del-route', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].deleteRoute);

    $(document).on("click", '.route-detail', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].clickRouteDetail);

    $('#load').each(_front_index__WEBPACK_IMPORTED_MODULE_1__["default"].load);

    $('#routes').each(_route_index__WEBPACK_IMPORTED_MODULE_2__["default"].loadRoutes);

    $('#session-user').each(_user_index__WEBPACK_IMPORTED_MODULE_3__["default"].loadUsers);

    $(document).on('show.bs.modal', '#show-route-modal', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].showRouteModal);

    $(document).on('shown.bs.modal', '#show-route-modal', function (e) {
        var name = $(e.relatedTarget).data('route-name');
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_4__["default"].addRouteTrackToMap(name, $("#live-route-map"));
    });

    $(document).on("change", '#routes', _route_index__WEBPACK_IMPORTED_MODULE_2__["default"].changeRouteSelect);
});








/***/ }),

/***/ "./public/js/src/map/index.js":
/*!************************************!*\
  !*** ./public/js/src/map/index.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var livePoints = [];
var liveMap;
var liveBounds;
var markers = [];


/* harmony default export */ __webpack_exports__["default"] = ({ livePoints, liveMap, liveBounds, markers });

/***/ }),

/***/ "./public/js/src/route/index.js":
/*!**************************************!*\
  !*** ./public/js/src/route/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_mapUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mapUtils */ "./public/js/src/utils/mapUtils.js");
/* harmony import */ var _map_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../map/index */ "./public/js/src/map/index.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ "./public/js/src/utils/utils.js");
/* harmony import */ var _utils_strava__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/strava */ "./public/js/src/utils/strava.js");
/* harmony import */ var _utils_graphUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/graphUtils */ "./public/js/src/utils/graphUtils.js");
/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/globals */ "./public/js/src/utils/globals.js");







/** All load functions */
var loadRoutes = function() {
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
    });
};

var createRouteRecord = function (htmlTable, index, route) {
    htmlTable += '<tr>';
    htmlTable += '<th scope="row">' + (index + 1) + '</th>';
    //htmlTable += '<td><a data-toggle="modal" data-route-name="' + route.name + '" data-target="#show-route-modal" href="/routes/' + route.name + '">' + route.name + '</a></td>';
    htmlTable += '<td><a class="route-detail" data-route-name="' + route.name + '" href="?route='+ route.name +'#routedetail">' + route.name + '</a></td>';
    htmlTable += '<td>' + parseInt(route.meters) + 'm</td>';
    htmlTable += '<td>' + route.country + '</td>';
    htmlTable += '<td>'
    if (route.permanent !== true) {
        htmlTable += '<a class="edit-route" href="#" data-id="' + route.name + '"><i class="material-icons">create</i></a>' +
            '<a class="del-route" href="#" data-id="' + route.name + '">' +
            '<i aria-hidden="true" title="Delete route" class="material-icons">delete</i></a>' + '</td>';
    } else {
        htmlTable += '<i>Default</i>';
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
        var size = parseInt(parseInt(data) / _utils_globals__WEBPACK_IMPORTED_MODULE_5__["PAGE_SIZE"]) + 1;
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
    var start = mainIndex * _utils_globals__WEBPACK_IMPORTED_MODULE_5__["PAGE_SIZE"], stop = (((mainIndex + 1) * _utils_globals__WEBPACK_IMPORTED_MODULE_5__["PAGE_SIZE"])) - 1;
    $.get('/routes/' + start + '/' + stop, function (data) {
        var htmlTable = '';
        var index = 0;
        data.forEach(function (route) {
            htmlTable = createRouteRecord(htmlTable, index + (mainIndex * _utils_globals__WEBPACK_IMPORTED_MODULE_5__["PAGE_SIZE"]), route);
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
            title = '<a class="strava-segment" target="_blank" href="https://www.strava.com/segments/' + data.segementId + ' title="Strava Segment Url" ">' + title + ' </a>';
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
    _utils_mapUtils__WEBPACK_IMPORTED_MODULE_0__["default"].cleanMap();
    var name = selected.data('name');
    _utils_mapUtils__WEBPACK_IMPORTED_MODULE_0__["default"].addRouteTrackToMap(name, $("#live-map"));
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

function loadRouteDetail(name) {
    $('#load').load('/route/details', function () {
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_0__["default"].cleanMap();
        var tableFunct = addToTable.bind($(this).find('#strava-result'));
        _utils_strava__WEBPACK_IMPORTED_MODULE_3__["default"].leaderboard(name, tableFunct);
        _utils_mapUtils__WEBPACK_IMPORTED_MODULE_0__["default"].addRouteTrackToMap(name, $("#live-map"));
        $(this).find('#route-stats').each(loadRouteStats.bind((this), name));
        $(this).find('#strava-result').each(route.loadRoutes);

    });
}

function loadRouteStats(name) {
    var that = this;
    $.ajax({
        url: '/routes/' + name,
        type: 'GET',
        success: function (result) {
            let html = '<div class="card card-default"><div class="card-body"><div class="row">'
            html += '<div class="col-md-5"><div class="statistic"><div class="value">' + result.name +'</div><div class="label">Name</div></div></div>';
            html += '<div class="col-md-2"><div class="statistic"><div class="value">' + result.meters +'</div><div class="label">Lenght (m)</div></div></div>';
            html += '<div class="col-md-5"><div class="statistic"><div class="value">' + result.country +'</div><div class="label">Country</div></div></div>';
            html += '</div></div></div>'
            $(that).find('#route-stats').html(html);
        }
    });
}

function addToTable(data) {
    var html = '';
    if (data.entries) {
        data.entries.forEach(function(entry) {
                html += '<tr> <th scope="row"> ' + entry.athlete_name + ' </th><td> ' + _utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].fmtMSS(parseInt(entry.moving_time)) + '</td> <td>' + entry.start_date +'</td></tr>';
        });
    }
    this.html(html);
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

var clickRouteDetail = function (e) {
    e.preventDefault();
    var name = $(this).data('route-name');
    loadRouteDetail(name);
};

/* harmony default export */ __webpack_exports__["default"] = ({ loadRoutes, createRouteRecord, loadRoute, loadRouteTable,
     createRouteNavPage, editRoute, showRouteModal, changeRouteSelect, deleteRoute,
saveRoute, openRoute, loadRouteDetail, clickRouteDetail});

/***/ }),

/***/ "./public/js/src/session/index.js":
/*!****************************************!*\
  !*** ./public/js/src/session/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./public/js/src/utils/utils.js");
/* harmony import */ var _utils_graphUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/graphUtils */ "./public/js/src/utils/graphUtils.js");
/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/globals */ "./public/js/src/utils/globals.js");
/* harmony import */ var _front_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../front/index */ "./public/js/src/front/index.js");
/* harmony import */ var _route_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../route/index */ "./public/js/src/route/index.js");
/* harmony import */ var _user_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user/index */ "./public/js/src/user/index.js");
/* harmony import */ var _utils_mapUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/mapUtils */ "./public/js/src/utils/mapUtils.js");
/* harmony import */ var _map_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../map/index */ "./public/js/src/map/index.js");
/* harmony import */ var _history_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../history/index */ "./public/js/src/history/index.js");











function loadSession(name) {
    $('#load').load('/sessions', function () {
        $(this).find('#routes').each(_route_index__WEBPACK_IMPORTED_MODULE_4__["default"].loadRoutes);
        $(this).find('#session-user').each(_user_index__WEBPACK_IMPORTED_MODULE_5__["default"].loadUsers);
        $(this).find('#history-session').each(function () {
            var title = "History";
            $.get("/session/" + name, function (data) {
                var html = _front_index__WEBPACK_IMPORTED_MODULE_3__["default"].getHtml(title, data.endStats, true);
                $('#routes').val(data.route);
                $('#session-user').val(data.user);
                if (html) {
                    $('#table-content').html(html);
                    $('#laps-body').html(getLapHtml(title, data.endStats));
                    _utils_mapUtils__WEBPACK_IMPORTED_MODULE_6__["default"].addGpxTrackToMap(name, $("#live-map"));
                }
                _utils_graphUtils__WEBPACK_IMPORTED_MODULE_1__["default"].addGraph(data.raw, data.rawHr, parseInt(data.start), data.stroke);
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
                html += '<tr><th scope="row">' + lapNum + '</th><td>' + parseInt(value.meters) + '</td><td>' + _utils_utils__WEBPACK_IMPORTED_MODULE_0__["default"].fmtMSS(parseInt(value.seconds)) + '</td>';
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
    loadSession(name);
};

function deleteSession(e) {
    e.preventDefault();
    var name = $(this).data('name');
    var result = confirm("Are you sure you want to delete session?");
    if (result) {
        $.ajax({
            url: '/session/del/' + name,
            type: 'DELETE',
            success: function (result) {
                alert("Session deleted");
                _history_index__WEBPACK_IMPORTED_MODULE_8__["default"].loadHistoryIndex(0, 0);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["default"] = ({ loadSession, clickSession, getLapHtml, deleteSession });

/***/ }),

/***/ "./public/js/src/user/index.js":
/*!*************************************!*\
  !*** ./public/js/src/user/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

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

function editUser(e) {
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
}

function loadUser() {
    $('#load').load('/user', function () {
        $(this).find('#users-body').each(function () {
            var that = this;
            $.get("/users/", function (data) {
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var user = data[i];
                    html += '<tr><td><a href="#" data-toggle="modal" data-target="#userStatsModal" data-id="' + user.id + '">' + (i + 1) + '</a></td><td>' + user.firstName + '</td><td>' + user.lastName + '</td>';
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

function saveUser(event) {
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

}

function deleteUser(e) {
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
}


/* harmony default export */ __webpack_exports__["default"] = ({ loadUsers, loadUser, editUser, saveUser, deleteUser });

/***/ }),

/***/ "./public/js/src/utils/globals.js":
/*!****************************************!*\
  !*** ./public/js/src/utils/globals.js ***!
  \****************************************/
/*! exports provided: RATION, PAGE_SIZE, UPDATE_FREQ, run, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RATION", function() { return RATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE_SIZE", function() { return PAGE_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_FREQ", function() { return UPDATE_FREQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
const RATION = (100 / 4.805) * 6;
const PAGE_SIZE = 10;
const UPDATE_FREQ = 1000;
var run = false;

google.maps.LatLng.prototype.kmTo = function(a){
    var e = Math, ra = e.PI/180;
    var b = this.lat() * ra, c = a.lat() * ra, d = b - c;
    var g = this.lng() * ra - a.lng() * ra;
    var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d/2), 2) + e.cos(b) * e.cos
    (c) * e.pow(e.sin(g/2), 2)));
    return f * 6378.137;
}

google.maps.Polyline.prototype.inKm = function(n){
    var a = this.getPath(n), len = a.getLength(), dist = 0;
    for(var i=0; i<len-1; i++){
        dist += a.getAt(i).kmTo(a.getAt(i+1));
    }
    return dist;
}



/* harmony default export */ __webpack_exports__["default"] = ({ RATION, PAGE_SIZE, UPDATE_FREQ, run });

/***/ }),

/***/ "./public/js/src/utils/graphUtils.js":
/*!*******************************************!*\
  !*** ./public/js/src/utils/graphUtils.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/globals */ "./public/js/src/utils/globals.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./public/js/src/utils/utils.js");



function addGraph(time, hr, start, strokes) {
    var speed = [];
    var watt = [];
    var stroke = [];
    var strokeConter = 1;
    for (var i = 1; i < time.length; i++) {
        var timeVal = parseInt(time[i]);
        var strokeTime = parseInt(strokes[strokeConter]);
        var sec = ((timeVal - start) / 1000);
        var lenght = (_utils_globals__WEBPACK_IMPORTED_MODULE_0__["RATION"] / 100);
        speed.push(((lenght / sec)) * 3.6);
        var wattValue = _utils_utils__WEBPACK_IMPORTED_MODULE_1__["default"].calcWatt(sec / lenght);
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

/* harmony default export */ __webpack_exports__["default"] = ({ addGraph });


/***/ }),

/***/ "./public/js/src/utils/mapUtils.js":
/*!*****************************************!*\
  !*** ./public/js/src/utils/mapUtils.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../map/index */ "./public/js/src/map/index.js");



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

function cleanMap(init = true) {
    if (init) {
        initMap();
    }

    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].livePoints = [];
    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].markers = [];
    let poly = createPolyLine(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].livePoints);
    poly.setMap(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap);

    // fit bounds to track
    if (typeof _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap !== 'undefined' && typeof _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap.fitBounds === 'function' ) {
        _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap.fitBounds(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveBounds);
    }
   
}

function initMap() {
    let mapDiv = document.getElementById('live-map');
    if (mapDiv) {
        _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap = new google.maps.Map(mapDiv, {
            zoom: 8,
            maxZoom: 16
        });
        _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveBounds = new google.maps.LatLngBounds();
        _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap.set('styles', styles);
    }
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

var addRouteTrackToMap = function (name, element) {
    if (name) {
        $.ajax({
            type: "GET",
            url: '/routes/' + name,
            success: function (data) {
                let gps = data.gps;
                let mapElement = element[0];
                let points = [];
                let map = new google.maps.Map(mapElement, {
                    zoom: 8,
                    maxZoom: 16
                });

                map.set('styles', styles);

                let bounds = new google.maps.LatLngBounds();

                gps.forEach(function (point) {
                    let lat = point.lat;
                    let lon = point.lon;
                    let p = new google.maps.LatLng(lat, lon);
                    points.push(p);
                    bounds.extend(p);
                });

                let poly = createPolyLine(points);
                poly.setMap(map);

                // fit bounds to track
                map.fitBounds(bounds);
            }
        });
    }
};

var addGpxTrackToMap = function (name, element) {
    let map = new google.maps.Map(element[0], {
        zoom: 16
    });
    var succesXml = addXml.bind(null, map);
    if (name) {
        $.ajax({
            type: "GET",
            url: '/sessions/' + name + '.gpx',
            success: succesXml
        });
    }
};

var addSessionTrackToMap = function (complete) {
    var succesXml = addXml.bind(null, _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap);
    $.ajax({
        type: "GET",
        url: 'row/gpx',
        success: succesXml,
        complete: complete
    });
};


function addXml(map, xml) {
    let points = [];

    map.set('styles', styles);

    let bounds = new google.maps.LatLngBounds();
    let laps = 1;
    let marker = 1;
    $(xml).find("trkpt").each(function () {
        let lat = $(this).attr("lat");
        let lon = $(this).attr("lon");
        let p = new google.maps.LatLng(lat, lon);

        points.push(p);
        let km = createPolyLine(points).inKm();
        laps = parseInt(km / 0.5) + 1; // 0.5 is 500 lap
        if (marker < laps ) {
            addMarker(p, "Runde: " + (laps-1), String(laps - 1), map);
            marker++;
        }
        bounds.extend(p);
    });

    let poly = createPolyLine(points);

    poly.setMap(map);

    // fit bounds to track
    map.fitBounds(bounds);
}

function loadGpxMap() {
    let name = $(this).data('name');
    let element = $(this).find('.card-map-top');
    addGpxTrackToMap(name, element);
}

function addMarker(p, title, round, liveMap=_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap) {
    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].markers.push(new google.maps.Marker({
        position:p,
        map: liveMap,
        title: title,
        label: round
    }));
}

/* harmony default export */ __webpack_exports__["default"] = ({ cleanMap, initMap, styles, addRouteTrackToMap, addGpxTrackToMap, loadGpxMap,
    createPolyLine, addMarker, addSessionTrackToMap });

/***/ }),

/***/ "./public/js/src/utils/strava.js":
/*!***************************************!*\
  !*** ./public/js/src/utils/strava.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

function leaderboard(name, callback) {
    $.get('/strava/route/leaderboard/' + name, function (data) {
        callback(data);
    });
};

function segment(name, callback) {
    $.get('/strava/route/' + name, function (data) {
        callback.apply(data);
    });
};


/* harmony default export */ __webpack_exports__["default"] = ({ leaderboard, segment });

/***/ }),

/***/ "./public/js/src/utils/utils.js":
/*!**************************************!*\
  !*** ./public/js/src/utils/utils.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const WATT_RATION = 2.80;

function calcWatt(pace) {
    return WATT_RATION / Math.pow(pace, 3);
}

function sessionNameToReadable(name) {
    return moment(name.slice(0, 13) + ':' + name.slice(13,15) + ':' + name.slice(15)).format("YYYY-MM-DD hh:mm:ss");
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

function fmtMSS(s) {
    var date = new Date(null);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
}


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

/* harmony default export */ __webpack_exports__["default"] = ({ calcWatt, sessionNameToReadable, getHeartRateColor, getUrlParameter, fmtMSS, 
    QueryString });



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9mcm9udC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvcm91dGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9zZXNzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL3V0aWxzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9ncmFwaFV0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9zdHJhdmEuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLGdFQUFDO0FBQ2hCLGlCQUFpQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCByb3V0ZSBmcm9tICcuLi9yb3V0ZS9pbmRleCc7XG5pbXBvcnQgdXNlciBmcm9tICcuLi91c2VyL2luZGV4JztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscydcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcbmltcG9ydCBnbG9iYWxzIGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xuaW1wb3J0IHNlc3Npb24gZnJvbSAnLi4vc2Vzc2lvbi9pbmRleCc7XG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcbmltcG9ydCBoaXN0b3J5IGZyb20gJy4uL2hpc3RvcnkvaW5kZXgnXG5cbnZhciB0aW1lT3V0O1xuXG5mdW5jdGlvbiBsb2FkTWFpbigpIHtcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9tYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xuICAgICAgICAkKHRoaXMpLmZpbmQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKTtcbiAgICAgICAgJC5nZXQoXCIvcm93L3N0YXR1c1wiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgbGV0IHJvd2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnUk9XSU5HJykge1xuICAgICAgICAgICAgICAgIHJvd2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0QnV0dG9uID0gJCgnI3N0YXJ0Um93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmdldFVybFBhcmFtZXRlcihcInRlc3RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRTaW11bGF0b3InKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydChzdGFydEJ1dHRvbiwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdXRlLmNoYW5nZVJvdXRlU2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vUnVuIHNpbXVsYXRvciBpZiB0ZXN0LlxuICAgICAgICBpZiAodXRpbHMuZ2V0VXJsUGFyYW1ldGVyKFwidGVzdFwiKSkge1xuICAgICAgICAgICAgJCgnI3N0YXJ0Um93JykuYXR0cihcImlkXCIsIFwic3RhcnRTaW11bGF0b3JcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkVG9TdHJhdmEoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICQuZ2V0KGhyZWYsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBhbGVydChcIlVwbG9hZGVkIHRvIHN0cmF2YSFcIik7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0Um93KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHJvdXRlcyA9ICQoJyNyb3V0ZXMnKS52YWwoKTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgJC5nZXQoXCIvcm93L3N0YXJ0XCIsIHsgcm91dGVzOiByb3V0ZXMgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydCh0aGF0KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcFJvdyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQoJyNtYWluLW5hdicpLnNob3coKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKCQoJyNtYWluLW5hdicpLm9mZnNldCgpLnRvcCk7XG4gICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xuICAgIGNsZWFyVGltZW91dCh0aW1lT3V0KTtcbiAgICBnbG9iYWxzLnJ1biA9IGZhbHNlO1xuICAgIHZhciByb3V0ZXMgPSAkKCcjcm91dGVzJykudmFsKCk7XG4gICAgdmFyIHVzZXIgPSAkKCcjc2Vzc2lvbi11c2VyJykudmFsKCk7XG4gICAgJC5nZXQoXCIvcm93L3N0b3BcIiwgeyByb3V0ZXM6IHJvdXRlcywgdXNlcjogdXNlciB9LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoZ2V0SHRtbChcIlN0b3BwZWRcIiwgZGF0YSwgZmFsc2UpKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gJChcIiNzdGFydFJvd1wiKTtcbiAgICAgICAgc3RhcnRSb3cucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgc3RhcnRSb3cucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICBzdGFydFJvdy5odG1sKCdTdGFydCByb3cnKTtcbiAgICAgICAgdGhhdC5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICQoJyNyb3V0ZXMnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAkKCcjc2Vzc2lvbi11c2VyJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgJChcIiNzdGFydFNpbXVsYXRvclwiKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydChzdGFydEJ1dHRvbiwgbG9hZE1hcD1mYWxzZSkge1xuICAgICQoJyNtYWluLW5hdicpLmhpZGUoKTtcbiAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKCQoJyNtYWluJykub2Zmc2V0KCkudG9wKTsgLy9TY3JvbGxcbiAgICBpZiAobG9hZE1hcCkge1xuICAgICAgICBtYXBVdGlscy5jbGVhbk1hcCgpO1xuICAgICAgICB2YXIgcm93SW5mbyA9IGdldF9yb3dJbmZvLmJpbmQobnVsbCwgdHJ1ZSwgXCJSb3dpbmdcIik7XG4gICAgICAgIG1hcFV0aWxzLmFkZFNlc3Npb25UcmFja1RvTWFwKHJvd0luZm8pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2V0X3Jvd0luZm8odHJ1ZSwgXCJSb3dpbmdcIik7XG4gICAgICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XG4gICAgfVxuICAgICQoJyNyb3V0ZXMnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICQoJyNzZXNzaW9uLXVzZXInKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICQoXCIjc3RhcnRTaW11bGF0b3JcIikuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAkKHN0YXJ0QnV0dG9uKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICQoc3RhcnRCdXR0b24pLmh0bWwoJ1Jvd2luZy4uLicpO1xuICAgICQoc3RhcnRCdXR0b24pLmFkZENsYXNzKCdkLW5vbmUnKTtcbiAgICAkKCcjc3RvcFJvdycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcbn1cblxuZnVuY3Rpb24gZ2V0X3Jvd0luZm8oY29udGludWVzLCB0aXRsZSkge1xuICAgIGdsb2JhbHMucnVuID0gY29udGludWVzO1xuICAgICQuZ2V0KFwiL3Jvd1wiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgaHRtbCA9IGdldEh0bWwodGl0bGUsIGRhdGEpO1xuICAgICAgICBpZiAoaHRtbCkge1xuICAgICAgICAgICAgJCgnI3RhYmxlLWNvbnRlbnQnKS5odG1sKGh0bWwpO1xuICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoc2Vzc2lvbi5nZXRMYXBIdG1sKHRpdGxlLCBkYXRhLCB0cnVlKSk7XG4gICAgICAgICAgICB2YXIgbGF0ID0gZGF0YS5ncHMubGF0O1xuICAgICAgICAgICAgdmFyIGxvbiA9IGRhdGEuZ3BzLmxvbjtcbiAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgICAgICBpZiAobWFwLm1hcmtlcnMubGVuZ3RoIDwgZGF0YS50b3RhbExhcHMgKSB7XG4gICAgICAgICAgICAgICAgbWFwVXRpbHMuYWRkTWFya2VyKHAsIFwiUnVuZGU6IFwiICsgZGF0YS50b3RhbExhcHMsIFN0cmluZyhkYXRhLnRvdGFsTGFwcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFwLmxpdmVQb2ludHMucHVzaChwKTtcbiAgICAgICAgICAgIGlmIChtYXAubGl2ZUJvdW5kcykge1xuICAgICAgICAgICAgICAgIG1hcC5saXZlQm91bmRzLmV4dGVuZChwKTtcbiAgICAgICAgICAgICAgICB2YXIgcG9seSA9IG1hcFV0aWxzLmNyZWF0ZVBvbHlMaW5lKG1hcC5saXZlUG9pbnRzKTtcbiAgICAgICAgICAgICAgICBwb2x5LnNldE1hcChtYXAubGl2ZU1hcCk7XG4gICAgICAgICAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSkuZG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChnbG9iYWxzLnJ1bikge1xuICAgICAgICAgICAgdGltZU91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBnZXRfcm93SW5mbyh0cnVlLCB0aXRsZSk7IH0sIGdsb2JhbHMuVVBEQVRFX0ZSRVEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICBzd2l0Y2ggKGhhc2gpIHtcbiAgICAgICAgY2FzZSAnI3JvdXRlJzpcbiAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZSgwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcjdXNlcic6XG4gICAgICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnI2hpc3RvcnknOlxuICAgICAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeSgwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcjc2Vzc2lvbic6XG4gICAgICAgICAgICB2YXIgbmFtZSA9IHV0aWxzLlF1ZXJ5U3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVtcIm5hbWVcIl0ucmVwbGFjZSgnI3Nlc3Npb24nLFwiXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgICAgICBzZXNzaW9uLmxvYWRTZXNzaW9uKG5hbWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJyNyb3V0ZWRldGFpbCc6XG4gICAgICAgICAgICByb3V0ZS5sb2FkUm91dGVEZXRhaWwodXRpbHMuUXVlcnlTdHJpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpW1wicm91dGVcIl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBsb2FkTWFpbigpO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRIdG1sKGxhYmVsLCBqc29uLCBkYXkpIHtcbiAgICBpZiAocGFyc2VJbnQoanNvbi5tZXRlcnMpID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGh0bWwgPSAnJztcbiAgICBpZiAoZGF5KSB7XG4gICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5EYXk8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIGpzb24uc3RhcnQuc3Vic3RyKDIsIGpzb24uc3RhcnQubGFzdEluZGV4T2YoJ1QnKSAtIDIpICsgJzwvZGl2PjwvZGl2Pic7XG4gICAgfVxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5TdGFydDo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIGpzb24uc3RhcnQuc3Vic3RyKGpzb24uc3RhcnQubGFzdEluZGV4T2YoJ1QnKSArIDEsIDgpICsgJzwvZGl2PjwvZGl2Pic7XG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlRpbWU6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5zZWNvbmRzKSkgKyAnPC9kaXY+PC9kaXY+JztcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+TGVuZ3RoOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgcGFyc2VJbnQoanNvbi5tZXRlcnMpICsgJyBtICgnICsganNvbi5wZXJjZW50ICsgJyk8L2Rpdj48L2Rpdj4nO1xuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5QYWNlOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGpzb24ucGFjZSkgKiAzLjYgKiAxMCkgLyAxMCArICcga20vdDwvZGl2PjwvZGl2Pic7XG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjUwMG06PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5sYXBQYWNlKSkgKyAnPC9kaXY+PC9kaXY+JztcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+Mms6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi50b3dLUGFjZSkpICsgJzwvZGl2PjwvZGl2Pic7XG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPkF2Zy5XOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGpzb24ud2F0dCkgKiAxMCkgLyAxMCArICd3PC9kaXY+PC9kaXY+JztcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+U1I6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi5zdHJva2UpICogMTApIC8gMTAgKyAnPC9kaXY+PC9kaXY+JztcbiAgICBpZiAocGFyc2VJbnQoanNvbi5ocikgPiAwKSB7XG4gICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5IUjo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sICcgKyB1dGlscy5nZXRIZWFydFJhdGVDb2xvcihwYXJzZUludChqc29uLmhyKSkgKyAnXCI+JyArIHBhcnNlSW50KGpzb24uaHIpICsgKHBhcnNlSW50KGpzb24uYXZnSHIpID4gMCA/ICcoJyArIHBhcnNlSW50KGpzb24uYXZnSHIpICsgJyknIDogJycpICsgJzwvZGl2PjwvZGl2Pic7XG4gICAgfVxuICAgIGlmIChqc29uLmZpbGVOYW1lKSB7XG4gICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5BY3Rpb25zOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj48YSBocmVmPVwiL3Nlc3Npb25zLycgKyBqc29uLmZpbGVOYW1lO1xuICAgICAgICBodG1sICs9ICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsganNvbi5uYW1lO1xuICAgICAgICBodG1sICs9ICdcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlVwbG9hZCB0byBzdHJhdmFcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvdWRfdXBsb2FkPC9pPjwvYT4nO1xuICAgICAgICBodG1sICs9ICc8YSBjbGFzcz1cInNlc3Npb25zXCIgZGF0YS1uYW1lPVwiJyArIGpzb24ubmFtZSArICdcIiBocmVmPVwiL3Nlc3Npb25zXCI+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJTZXNzaW9uXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZpYmVyX25ldzwvaT48L2E+PC9kaXY+PC9kaXY+JztcbiAgICB9XG4gICAgcmV0dXJuIGh0bWwgKyBcIlwiO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHsgbG9hZE1haW4sIHN0YXJ0LCBnZXRfcm93SW5mbywgZ2V0SHRtbCwgc3RhcnRSb3csIHN0b3BSb3csIGxvYWQsIHVwbG9hZFRvU3RyYXZhIH07IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xuXG5cbmZ1bmN0aW9uIGxvYWRIaXN0b3J5SW5kZXgoaW5kZXgpIHtcbiAgICBsb2FkSGlzdG9yeShpbmRleCk7XG59XG5cbmZ1bmN0aW9uIGxvYWRIaXN0b3J5KG1haW5JbmRleCkge1xuICAgICQoJyNsb2FkJykubG9hZCgnL2hpc3RvcnknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3RvcnknKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxvYWRMYXN0M1Nlc3Npb25zKCk7XG4gICAgICAgICAgICBsb2FkSGlzdG9yeUxpc3QoJCh0aGlzKSwgbWFpbkluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRMYXN0M1Nlc3Npb25zKCkge1xuICAgICQuZ2V0KCcvc2Vzc2lvbi8nICsgMCArICcvJyArIDIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBodG1sQ2FyZHMgPSAnJztcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XG4gICAgICAgICAgICBodG1sQ2FyZHMgPSBjcmVhdGVDYXJkKGh0bWxDYXJkcywgc2Vzc2lvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNjYXJkcycpLmh0bWwoJzxkaXYgY2xhc3M9XCJjb2xcIj48ZGl2IGNsYXNzPVwiY2FyZC1kZWNrXCI+JyArIGh0bWxDYXJkcyArICc8L2Rpdj48L2Rpdj4nKTtcbiAgICAgICAgJCgnLmdweC10cmFjaycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKFwibG9hZC1tYXBcIiwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUxpc3QodGhhdCwgbWFpbkluZGV4KSB7XG4gICAgdmFyIHN0YXJ0ID0gbWFpbkluZGV4ICogUEFHRV9TSVpFLCBzdG9wID0gKCgobWFpbkluZGV4ICsgMSkgKiBQQUdFX1NJWkUpKSAtIDE7XG4gICAgJC5nZXQoJy9zZXNzaW9uLycgKyBzdGFydCArICcvJyArIHN0b3AsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICQuZ2V0KCcvdXNlcnMnLCBmdW5jdGlvbiAodXNlcnMpIHtcbiAgICAgICAgICAgIHZhciBodG1sVGFibGUgPSAnJywgaW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIHVzZXJNYXAgPSB1c2Vycy5yZWR1Y2UoZnVuY3Rpb24obWFwLCBvYmopIHtcbiAgICAgICAgICAgICAgICBtYXBbb2JqLmlkXSA9IG9iajtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xuICAgICAgICAgICAgfSwge30pO1xuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgaHRtbFRhYmxlID0gY3JlYXRlTGFwVGFibGVSZWNvcmQoaHRtbFRhYmxlLCBpbmRleCArIChtYWluSW5kZXggKiBQQUdFX1NJWkUpLCBzZXNzaW9uLCB1c2VyTWFwKTtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJyNoaXN0b3ItdGFibGUtYm9keScpLmh0bWwoaHRtbFRhYmxlKTtcbiAgICAgICAgICAgIHZhciBwYWcgPSB0aGF0LmZpbmQoJy5wYWdlJyk7XG4gICAgICAgICAgICBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWcsIG1haW5JbmRleCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBvcGVuSGlzdG9yeShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBuZXh0ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCduZXh0JykpLCBpbmRleCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnaW5kZXgnKSksXG4gICAgICAgIG1haW5JbmRleCA9IHBhcnNlSW50KCQoJyNoaXN0b3J5LXBhZ2UnKS5kYXRhKCdpbmRleCcpKTtcbiAgICBpZiAoIWlzTmFOKG5leHQpKSB7XG4gICAgICAgIG1haW5JbmRleCArPSBuZXh0O1xuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGluZGV4KSkge1xuICAgICAgICBtYWluSW5kZXggPSBpbmRleDtcbiAgICB9XG4gICAgbG9hZEhpc3RvcnlMaXN0KCQoJyNoaXN0b3J5LXRhYmxlJyksIG1haW5JbmRleCk7XG59XG5cblxudmFyIGNyZWF0ZUNhcmQgPSBmdW5jdGlvbiAoaHRtbENhcmRzLCBzZXNzaW9uKSB7XG4gICAgaHRtbENhcmRzICs9ICc8ZGl2IGNsYXNzPVwiY2FyZCBncHgtdHJhY2tcIiBkYXRhLW5hbWU9XCInICsgc2Vzc2lvbi5uYW1lICsgJ1wiXCI+JztcbiAgICBodG1sQ2FyZHMgKz0gJzxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj4nO1xuICAgIGh0bWxDYXJkcyArPSAnPGRpdiBjbGFzcz1cImNhcmQtbWFwLXRvcCBcIj48L2Rpdj4nO1xuICAgIGh0bWxDYXJkcyArPSAnPGg1IGNsYXNzPVwiY2FyZC10aXRsZSBtdC0yXCI+PGEgY2xhc3M9XCJzZXNzaW9uc1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCIgaHJlZj1cIi9zZXNzaW9uXCI+JyArIHV0aWxzLnNlc3Npb25OYW1lVG9SZWFkYWJsZShzZXNzaW9uLm5hbWUpICsgJzwvYT48L2g1Pic7XG4gICAgaHRtbENhcmRzICs9ICc8cCBjbGFzcz1cImNhcmQtdGV4dFwiPkxlbmd0aDogJyArIHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMubWV0ZXJzKSArICdtLCBUaW1lOiAnICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMuc2Vjb25kcykpICsgJzwvcD4nO1xuICAgIGh0bWxDYXJkcyArPSAnPGEgaHJlZj1cIi9zdHJhdmEvdXBsb2FkLycgKyBzZXNzaW9uLm5hbWUgKyAnXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgc3RyYXZhIGJ0bi1ibG9ja1wiPlVwbG9hZCB0byBTdHJhdmE8L2E+JztcbiAgICBodG1sQ2FyZHMgKz0gJzwvZGl2Pic7XG4gICAgaHRtbENhcmRzICs9ICc8L2Rpdj4nO1xuICAgIHJldHVybiBodG1sQ2FyZHM7XG59O1xuXG52YXIgY3JlYXRlTGFwVGFibGVSZWNvcmQgPSBmdW5jdGlvbiAoaHRtbFRhYmxlLCBpbmRleCwgc2Vzc2lvbiwgdXNlck1hcCkge1xuICAgIHZhciB1c2VyID0gdXNlck1hcFtzZXNzaW9uLnVzZXJdO1xuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XG4gICAgaHRtbFRhYmxlICs9ICc8dGggc2NvcGU9XCJyb3dcIj4nICsgKGluZGV4ICsgMSkgKyAnPC90aD4nO1xuICAgIGh0bWxUYWJsZSArPSAnPHRkPjxhIGNsYXNzPVwic2Vzc2lvbnNcIiBkYXRhLW5hbWU9XCInICsgc2Vzc2lvbi5uYW1lICsgJ1wiIGhyZWY9XCIvP25hbWU9JytzZXNzaW9uLm5hbWUrJyNzZXNzaW9uXCI+JyArIHV0aWxzLnNlc3Npb25OYW1lVG9SZWFkYWJsZShzZXNzaW9uLm5hbWUpICsgJzwvYT48L3RkPic7XG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+TGVuZ3RoOiAnICsgcGFyc2VJbnQoc2Vzc2lvbi5lbmRTdGF0cy5tZXRlcnMpICsgJ208L3RkPic7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8dGQ+JyArIHVzZXIuZmlyc3ROYW1lICsgJyAnICsgdXNlci5sYXN0TmFtZSArICc8L3RkPic7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8dGQ+PC90ZD4nO1xuICAgIH1cbiAgICBodG1sVGFibGUgKz0gJzx0ZD4gPGEgaHJlZj1cIi9zZXNzaW9ucy8nICsgc2Vzc2lvbi5uYW1lICsgJy5ncHhcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2XCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsgc2Vzc2lvbi5uYW1lICsgJ1wiPicgK1xuICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJVcGxvYWQgdG8gU3RyYXZhXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNiBzdHJhdmEtaWNvblwiPmNsb3VkX3VwbG9hZDwvaT48L2E+IDxhIGNsYXNzPVwiZGVsLXNlc3Npb25cIiBocmVmPVwiI1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCI+JyArXG4gICAgICAgICc8aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIkRlbGV0ZSBzZXNzaW9uIGxvY2FsXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNlwiPmRlbGV0ZTwvaT48L2E+PC90ZD4nO1xuICAgIGh0bWxUYWJsZSArPSAnPC90cj4nO1xuICAgIHJldHVybiBodG1sVGFibGU7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWdlLCBpbmRleCkge1xuICAgIHZhciBodG1sRWxlbWVudCA9ICQoJzx1bCBpZD1cImhpc3RvcnktcGFnZVwiIGRhdGEtaW5kZXg9XCInICsgaW5kZXggKyAnXCI+PC91bD4nKS5hZGRDbGFzcyhcInBhZ2luYXRpb24gcGFnaW5hdGlvbi1sZ1wiKTtcbiAgICAkLmdldChcInNlc3Npb24vc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHBhcnNlSW50KGRhdGEpIC8gUEFHRV9TSVpFKSArIDE7XG4gICAgICAgIHZhciBwcmV2RGlzYWJsZWQgPSAoaW5kZXggPT09IDAgPyAnZGlzYWJsZWQnIDogJycpO1xuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XG4gICAgICAgIHZhciBwcmV2ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBwcmV2RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIiBkYXRhLW5leHQ9XCItMVwiIHRhYmluZGV4PVwiLTFcIj5QcmV2aW91czwvYT4nKTtcbiAgICAgICAgdmFyIG5leHQgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIG5leHREaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLW5leHQ9XCIxXCIgaHJlZj1cIiNcIj5OZXh0PC9hPicpO1xuXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChwcmV2KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgYWN0aXZlICsgJ1wiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1pbmRleD1cIicgKyBpICsgJ1wiIGhyZWY9XCIjXCI+JyArIChpICsgMSkgKyAnPC9hPjwvbGk+Jyk7XG4gICAgICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKG5leHQpO1xuICAgICAgICAkKHBhZ2UpLmh0bWwoaHRtbEVsZW1lbnQpO1xuICAgIH0pO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHsgbG9hZEhpc3RvcnlJbmRleCwgbG9hZEhpc3RvcnksIGxvYWRIaXN0b3J5TGlzdCwgb3Blbkhpc3RvcnkgfSIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmltcG9ydCBmcm9udCBmcm9tICcuL2Zyb250L2luZGV4JztcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlL2luZGV4JztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlci9pbmRleCc7XG5pbXBvcnQgbWFwVXRpbHMgZnJvbSAnLi91dGlscy9tYXBVdGlscydcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAvaW5kZXgnXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuL2hpc3RvcnkvaW5kZXgnXG5pbXBvcnQgc2Vzc2lvbiBmcm9tICcuL3Nlc3Npb24vaW5kZXgnXG5cbi8qKlxuICogRGVjbGFyZXMgYSBuZXcgb2JqZWN0IGluIHRoZSB3aW5kb3cgbmFtZWx5IFF1ZXJ5U3RyaW5nIHRoYXQgY29udGFpbnMgZXZlcnkgZ2V0IHBhcmFtZXRlciBmcm9tIHRoZSBjdXJyZW50IFVSTCBhcyBhIHByb3BlcnR5XG4gKi9cbndpbmRvdy5RdWVyeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGFub255bW91cywgaXMgZXhlY3V0ZWQgaW1tZWRpYXRlbHkgYW5kIFxuICAgIC8vIHRoZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gUXVlcnlTdHJpbmchXG4gICAgdmFyIHF1ZXJ5X3N0cmluZyA9IHt9O1xuICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XG5cbiAgICAgICAgLy8gSWYgZmlyc3QgZW50cnkgd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICAgICAgICAgIC8vIElmIHNlY29uZCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbcXVlcnlfc3RyaW5nW3BhaXJbMF1dLCBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSldO1xuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID0gYXJyO1xuICAgICAgICAgICAgLy8gSWYgdGhpcmQgb3IgbGF0ZXIgZW50cnkgd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXS5wdXNoKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlfc3RyaW5nO1xufSgpO1xuXG4kKGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKiBJbml0IHNoYXJlZCAqL1xuICAgIGZyb250LmdldF9yb3dJbmZvKGZhbHNlLCBcIlwiKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5tYWluJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZnJvbnQubG9hZE1haW4oKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyN1c2VyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdXNlci5sb2FkVXNlcigpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnI2hpc3RvcnktcGFnZSBhJywgaGlzdG9yeS5vcGVuSGlzdG9yeSk7XG5cbiAgICAvL1RPRE86IHJlZmFjdG9yeVxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyNyb3V0ZS1wYWdlIGEnLCByb3V0ZS5vcGVuUm91dGUpO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLm5hdi1saW5rJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgJCgnI21haW4tbmF2JykuZmluZChcIi5uYXYtaXRlbVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLnNlc3Npb25zJywgc2Vzc2lvbi5jbGlja1Nlc3Npb24pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNoaXN0b3J5JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeUluZGV4KDAsIDApO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJvdXRlLmxvYWRSb3V0ZSgwKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwibG9hZC1tYXBcIiwgJy5ncHgtdHJhY2snLCBtYXBVdGlscy5sb2FkR3B4TWFwKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdGFydFJvdycsIGZyb250LnN0YXJ0Um93KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdG9wUm93JywgZnJvbnQuc3RvcFJvdyk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZWRpdC11c2VyJywgdXNlci5lZGl0VXNlcik7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZWRpdC1yb3V0ZScsIHJvdXRlLmVkaXRSb3V0ZSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuc3RyYXZhJywgZnJvbnQudXBsb2FkVG9TdHJhdmEpO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC1zZXNzaW9uJywgc2Vzc2lvbi5kZWxldGVTZXNzaW9uKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjc2F2ZS1yb3V0ZVwiLCByb3V0ZS5zYXZlUm91dGUpO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzYXZlLXVzZXJcIiwgdXNlci5zYXZlVXNlcik7XG5cbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsLXVzZXInLCB1c2VyLmRlbGV0ZVVzZXIpO1xuXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC1yb3V0ZScsIHJvdXRlLmRlbGV0ZVJvdXRlKTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5yb3V0ZS1kZXRhaWwnLCByb3V0ZS5jbGlja1JvdXRlRGV0YWlsKTtcblxuICAgICQoJyNsb2FkJykuZWFjaChmcm9udC5sb2FkKTtcblxuICAgICQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xuXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmVhY2godXNlci5sb2FkVXNlcnMpO1xuXG4gICAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCAnI3Nob3ctcm91dGUtbW9kYWwnLCByb3V0ZS5zaG93Um91dGVNb2RhbCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignc2hvd24uYnMubW9kYWwnLCAnI3Nob3ctcm91dGUtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgbmFtZSA9ICQoZS5yZWxhdGVkVGFyZ2V0KS5kYXRhKCdyb3V0ZS1uYW1lJyk7XG4gICAgICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtcm91dGUtbWFwXCIpKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsICcjcm91dGVzJywgcm91dGUuY2hhbmdlUm91dGVTZWxlY3QpO1xufSk7XG5cblxuXG5cblxuXG4iLCJ2YXIgbGl2ZVBvaW50cyA9IFtdO1xudmFyIGxpdmVNYXA7XG52YXIgbGl2ZUJvdW5kcztcbnZhciBtYXJrZXJzID0gW107XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBsaXZlUG9pbnRzLCBsaXZlTWFwLCBsaXZlQm91bmRzLCBtYXJrZXJzIH0iLCJpbXBvcnQgbWFwVXRpbHMgZnJvbSAnLi4vdXRpbHMvbWFwVXRpbHMnXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5pbXBvcnQgc3RyYXZhIGZyb20gJy4uL3V0aWxzL3N0cmF2YSc7XG5pbXBvcnQgZ3JhcGhVdGlscyBmcm9tICcuLi91dGlscy9ncmFwaFV0aWxzJztcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XG5cbi8qKiBBbGwgbG9hZCBmdW5jdGlvbnMgKi9cbnZhciBsb2FkUm91dGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuZ2V0KFwiL3Jvdy9yb3V0ZXNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgdmFyIGdyb3VwID0gJyc7XG4gICAgICAgIGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKGEuY291bnRyeSA+IGIuY291bnRyeSkgPyAxIDogKChiLmNvdW50cnkgPiBhLmNvdW50cnkpID8gLTEgOiAwKTsgfSk7XG5cbiAgICAgICAgdmFyIHNlbGVjdGVkID0gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIic7XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb3VudHJ5ICE9PSBncm91cCkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRncm91cCBsYWJlbD1cIicgKyB2YWx1ZS5jb3VudHJ5ICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgZ3JvdXAgPSB2YWx1ZS5jb3VudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiAnICsgc2VsZWN0ZWQgKyAnIHZhbHVlPVwiJyArIHZhbHVlLmluZGV4ICsgJ1wiIGRhdGEtbmFtZT1cIicgKyB2YWx1ZS5uYW1lICsgJ1wiIGRhdGEtbGF0PVwiJyArXG4gICAgICAgICAgICAgICAgdmFsdWUuZ3BzWzBdLmxhdCArICdcIiBkYXRhLWxvbj1cIicgKyB2YWx1ZS5ncHNbMF0ubG9uICsgJ1wiPicgKyB2YWx1ZS5uYW1lICsgJyAoJyArIHZhbHVlLm1ldGVycyArICdtKTwvb3B0aW9uPic7XG4gICAgICAgICAgICBzZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhhdCkuaHRtbChodG1sKTtcbiAgICB9KTtcbn07XG5cbnZhciBjcmVhdGVSb3V0ZVJlY29yZCA9IGZ1bmN0aW9uIChodG1sVGFibGUsIGluZGV4LCByb3V0ZSkge1xuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XG4gICAgaHRtbFRhYmxlICs9ICc8dGggc2NvcGU9XCJyb3dcIj4nICsgKGluZGV4ICsgMSkgKyAnPC90aD4nO1xuICAgIC8vaHRtbFRhYmxlICs9ICc8dGQ+PGEgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtcm91dGUtbmFtZT1cIicgKyByb3V0ZS5uYW1lICsgJ1wiIGRhdGEtdGFyZ2V0PVwiI3Nob3ctcm91dGUtbW9kYWxcIiBocmVmPVwiL3JvdXRlcy8nICsgcm91dGUubmFtZSArICdcIj4nICsgcm91dGUubmFtZSArICc8L2E+PC90ZD4nO1xuICAgIGh0bWxUYWJsZSArPSAnPHRkPjxhIGNsYXNzPVwicm91dGUtZGV0YWlsXCIgZGF0YS1yb3V0ZS1uYW1lPVwiJyArIHJvdXRlLm5hbWUgKyAnXCIgaHJlZj1cIj9yb3V0ZT0nKyByb3V0ZS5uYW1lICsnI3JvdXRlZGV0YWlsXCI+JyArIHJvdXRlLm5hbWUgKyAnPC9hPjwvdGQ+JztcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgcGFyc2VJbnQocm91dGUubWV0ZXJzKSArICdtPC90ZD4nO1xuICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyByb3V0ZS5jb3VudHJ5ICsgJzwvdGQ+JztcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nXG4gICAgaWYgKHJvdXRlLnBlcm1hbmVudCAhPT0gdHJ1ZSkge1xuICAgICAgICBodG1sVGFibGUgKz0gJzxhIGNsYXNzPVwiZWRpdC1yb3V0ZVwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyByb3V0ZS5uYW1lICsgJ1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jcmVhdGU8L2k+PC9hPicgK1xuICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGVsLXJvdXRlXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHJvdXRlLm5hbWUgKyAnXCI+JyArXG4gICAgICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgcm91dGVcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT4nICsgJzwvdGQ+JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBodG1sVGFibGUgKz0gJzxpPkRlZmF1bHQ8L2k+JztcbiAgICB9XG4gICAgaHRtbFRhYmxlICs9ICc8L3RyPic7XG4gICAgcmV0dXJuIGh0bWxUYWJsZTtcbn07XG5cbmZ1bmN0aW9uIGxvYWRSb3V0ZShtYWluSW5kZXgpIHtcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9yb3V0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGVzLXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxvYWRSb3V0ZVRhYmxlKDApO1xuICAgICAgICAgICAgdmFyIHBhZyA9ICQoJyNyb3V0ZXMtdGFibGUnKS5maW5kKCcucGFnZScpO1xuICAgICAgICAgICAgY3JlYXRlUm91dGVOYXZQYWdlKHBhZ1swXSwgbWFpbkluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlTmF2UGFnZShwYWdlLCBpbmRleCkge1xuICAgIHZhciBodG1sRWxlbWVudCA9ICQoJzx1bCBpZD1cInJvdXRlLXBhZ2VcIiBkYXRhLWluZGV4PVwiJyArIGluZGV4ICsgJ1wiPjwvdWw+JykuYWRkQ2xhc3MoXCJwYWdpbmF0aW9uIHBhZ2luYXRpb24tbGdcIik7XG4gICAgJC5nZXQoXCJyb3V0ZXMvc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHBhcnNlSW50KGRhdGEpIC8gUEFHRV9TSVpFKSArIDE7XG4gICAgICAgIHZhciBwcmV2RGlzYWJsZWQgPSAoaW5kZXggPT09IDAgPyAnZGlzYWJsZWQnIDogJycpO1xuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XG4gICAgICAgIHZhciBwcmV2ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBwcmV2RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIiBkYXRhLW5leHQ9XCItMVwiIHRhYmluZGV4PVwiLTFcIj5QcmV2aW91czwvYT4nKTtcbiAgICAgICAgdmFyIG5leHQgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIG5leHREaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLW5leHQ9XCIxXCIgaHJlZj1cIiNcIj5OZXh0PC9hPicpO1xuXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChwcmV2KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IFwiYWN0aXZlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgYWN0aXZlICsgJ1wiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1pbmRleD1cIicgKyBpICsgJ1wiIGhyZWY9XCIjXCI+JyArIChpICsgMSkgKyAnPC9hPjwvbGk+Jyk7XG4gICAgICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKG5leHQpO1xuICAgICAgICAkKHBhZ2UpLmh0bWwoaHRtbEVsZW1lbnQpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkUm91dGVUYWJsZShtYWluSW5kZXgpIHtcbiAgICB2YXIgc3RhcnQgPSBtYWluSW5kZXggKiBQQUdFX1NJWkUsIHN0b3AgPSAoKChtYWluSW5kZXggKyAxKSAqIFBBR0VfU0laRSkpIC0gMTtcbiAgICAkLmdldCgnL3JvdXRlcy8nICsgc3RhcnQgKyAnLycgKyBzdG9wLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgaHRtbFRhYmxlID0gJyc7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgIGh0bWxUYWJsZSA9IGNyZWF0ZVJvdXRlUmVjb3JkKGh0bWxUYWJsZSwgaW5kZXggKyAobWFpbkluZGV4ICogUEFHRV9TSVpFKSwgcm91dGUpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI3JvdXRlcy10YWJsZS1ib2R5JykuaHRtbChodG1sVGFibGUpO1xuICAgICAgICAkKCcjYWRkLXJvdXRlLW1vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBsb2FkUm91dGUoMCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRSb3V0ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBpZCxcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIiNhZGRSb3V0ZVwiKTtcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI25hbWUnKS52YWwocmVzdWx0Lm5hbWUpO1xuICAgICAgICAgICAgZm9ybS5maW5kKCcjbWV0ZXJzJykudmFsKHJlc3VsdC5tZXRlcnMpO1xuICAgICAgICAgICAgZm9ybS5maW5kKCcjc2VnbWVudElkJykudmFsKHJlc3VsdC5zZWdtZW50SWQpO1xuICAgICAgICAgICAgZm9ybS5maW5kKCcjY291bnRyaWVzJykudmFsKHJlc3VsdC5jb3VudHJ5KTtcbiAgICAgICAgICAgIC8vZ3BzLnJlcGxhY2UoLyguKiksKC4qKSwoLiopL2dtLCAneyBcImxhdFwiOiAkMSwgXCJsb25cIjogJDIsIFwiZWxcIjogJDMgfSwnKTtcbiAgICAgICAgICAgIHZhciBncHNDdnMgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQuZ3BzKTtcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2dwcycpLmFwcGVuZChncHNDdnMpO1xuICAgICAgICAgICAgJCgnI2FkZC1yb3V0ZS1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd1JvdXRlTW9kYWwoZSkge1xuICAgIHZhciBuYW1lID0gJChlLnJlbGF0ZWRUYXJnZXQpLmRhdGEoJ3JvdXRlLW5hbWUnKTtcbiAgICB2YXIgdGhhdCA9ICQodGhpcyk7XG4gICAgJC5nZXQoXCIvcm91dGVzL1wiICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHRpdGxlID0gZGF0YS5uYW1lO1xuICAgICAgICBpZiAoZGF0YS5zZWdlbWVudElkKSB7XG4gICAgICAgICAgICB0aXRsZSA9ICc8YSBjbGFzcz1cInN0cmF2YS1zZWdtZW50XCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vc2VnbWVudHMvJyArIGRhdGEuc2VnZW1lbnRJZCArICcgdGl0bGU9XCJTdHJhdmEgU2VnbWVudCBVcmxcIiBcIj4nICsgdGl0bGUgKyAnIDwvYT4nO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuZmluZCgnI3Nob3ctcm91dGUtbW9kYWwtdGl0bGUnKS5odG1sKHRpdGxlKTtcbiAgICAgICAgdmFyIGh0bWwgPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkRpc3BsYXkgTGVuZ2h0OjwvaDU+JyArIGRhdGEubWV0ZXJzICsgJyBtPC9saT4nO1xuICAgICAgICBodG1sICs9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+R3BzIExlbmdodDo8L2g1PicgKyBkYXRhLmdwc0xlbmdodCArICcgbTwvbGk+JztcbiAgICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNvdW50cnk6PC9oNT4nICsgZGF0YS5jb3VudHJ5ICsgJzwvbGk+JztcbiAgICAgICAgdGhhdC5maW5kKCcuY2FyZCAubGlzdC1ncm91cCcpLmh0bWwoaHRtbCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoYW5nZVJvdXRlU2VsZWN0KCkge1xuICAgIHZhciBzZWxlY3RlZCA9ICQoJyNyb3V0ZXMnKS5maW5kKFwiOnNlbGVjdGVkXCIpO1xuICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XG4gICAgdmFyIG5hbWUgPSBzZWxlY3RlZC5kYXRhKCduYW1lJyk7XG4gICAgbWFwVXRpbHMuYWRkUm91dGVUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVSb3V0ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgcm91dGU/XCIpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9yb3V0ZXMvJyArIGlkLFxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNhdmVSb3V0ZShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIGZvcm0gPSAkKFwiI2FkZFJvdXRlXCIpO1xuICAgIHZhciByb3V0ZSA9IHt9O1xuICAgIHJvdXRlLm5hbWUgPSBmb3JtLmZpbmQoJyNuYW1lJykudmFsKCk7XG4gICAgcm91dGUubWV0ZXJzID0gZm9ybS5maW5kKCcjbWV0ZXJzJykudmFsKCk7XG4gICAgcm91dGUuc3RyYXZhSWQgPSBmb3JtLmZpbmQoJyNzZWdtZW50SWQnKS52YWwoKTtcbiAgICByb3V0ZS5jb3VudHJ5ID0gZm9ybS5maW5kKCcjY291bnRyaWVzJykudmFsKCk7XG4gICAgcm91dGUuZ3BzID0gZm9ybS5maW5kKCd0ZXh0YXJlYScpLnZhbCgpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6ICdQVVQnLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICB1cmw6IFwiL3JvdXRlcy9hZGRcIixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocm91dGUpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjYWRkLXJvdXRlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBsb2FkUm91dGVEZXRhaWwobmFtZSkge1xuICAgICQoJyNsb2FkJykubG9hZCgnL3JvdXRlL2RldGFpbHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XG4gICAgICAgIHZhciB0YWJsZUZ1bmN0ID0gYWRkVG9UYWJsZS5iaW5kKCQodGhpcykuZmluZCgnI3N0cmF2YS1yZXN1bHQnKSk7XG4gICAgICAgIHN0cmF2YS5sZWFkZXJib2FyZChuYW1lLCB0YWJsZUZ1bmN0KTtcbiAgICAgICAgbWFwVXRpbHMuYWRkUm91dGVUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZS1zdGF0cycpLmVhY2gobG9hZFJvdXRlU3RhdHMuYmluZCgodGhpcyksIG5hbWUpKTtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc3RyYXZhLXJlc3VsdCcpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XG5cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFJvdXRlU3RhdHMobmFtZSkge1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBuYW1lLFxuICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgbGV0IGh0bWwgPSAnPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1kZWZhdWx0XCI+PGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPjxkaXYgY2xhc3M9XCJyb3dcIj4nXG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiY29sLW1kLTVcIj48ZGl2IGNsYXNzPVwic3RhdGlzdGljXCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJlc3VsdC5uYW1lICsnPC9kaXY+PGRpdiBjbGFzcz1cImxhYmVsXCI+TmFtZTwvZGl2PjwvZGl2PjwvZGl2Pic7XG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiY29sLW1kLTJcIj48ZGl2IGNsYXNzPVwic3RhdGlzdGljXCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJlc3VsdC5tZXRlcnMgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5MZW5naHQgKG0pPC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0LmNvdW50cnkgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5Db3VudHJ5PC9kaXY+PC9kaXY+PC9kaXY+JztcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvZGl2PjwvZGl2PjwvZGl2PidcbiAgICAgICAgICAgICQodGhhdCkuZmluZCgnI3JvdXRlLXN0YXRzJykuaHRtbChodG1sKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUb1RhYmxlKGRhdGEpIHtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIGlmIChkYXRhLmVudHJpZXMpIHtcbiAgICAgICAgZGF0YS5lbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+IDx0aCBzY29wZT1cInJvd1wiPiAnICsgZW50cnkuYXRobGV0ZV9uYW1lICsgJyA8L3RoPjx0ZD4gJyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChlbnRyeS5tb3ZpbmdfdGltZSkpICsgJzwvdGQ+IDx0ZD4nICsgZW50cnkuc3RhcnRfZGF0ZSArJzwvdGQ+PC90cj4nO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5odG1sKGh0bWwpO1xufVxuXG5mdW5jdGlvbiBvcGVuUm91dGUoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgbmV4dCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnbmV4dCcpKSwgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ2luZGV4JykpLFxuICAgICAgICBtYWluSW5kZXggPSBwYXJzZUludCgkKCcjcm91dGUtcGFnZScpLmRhdGEoJ2luZGV4JykpO1xuICAgIGlmICghaXNOYU4obmV4dCkpIHtcbiAgICAgICAgbWFpbkluZGV4ICs9IG5leHQ7XG4gICAgfSBlbHNlIGlmICghaXNOYU4oaW5kZXgpKSB7XG4gICAgICAgIG1haW5JbmRleCA9IGluZGV4O1xuICAgIH1cbiAgICB2YXIgcGFnID0gJCgnI3JvdXRlcy10YWJsZScpLmZpbmQoJy5wYWdlJyk7XG4gICAgY3JlYXRlUm91dGVOYXZQYWdlKHBhZ1swXSwgbWFpbkluZGV4KTtcbiAgICBsb2FkUm91dGVUYWJsZShtYWluSW5kZXgpO1xufVxuXG52YXIgY2xpY2tSb3V0ZURldGFpbCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdyb3V0ZS1uYW1lJyk7XG4gICAgbG9hZFJvdXRlRGV0YWlsKG5hbWUpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkUm91dGVzLCBjcmVhdGVSb3V0ZVJlY29yZCwgbG9hZFJvdXRlLCBsb2FkUm91dGVUYWJsZSxcbiAgICAgY3JlYXRlUm91dGVOYXZQYWdlLCBlZGl0Um91dGUsIHNob3dSb3V0ZU1vZGFsLCBjaGFuZ2VSb3V0ZVNlbGVjdCwgZGVsZXRlUm91dGUsXG5zYXZlUm91dGUsIG9wZW5Sb3V0ZSwgbG9hZFJvdXRlRGV0YWlsLCBjbGlja1JvdXRlRGV0YWlsfSIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5pbXBvcnQgZ3JhcGhVdGlscyBmcm9tICcuLi91dGlscy9ncmFwaFV0aWxzJztcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XG5pbXBvcnQgZnJvbnQgZnJvbSAnLi4vZnJvbnQvaW5kZXgnO1xuaW1wb3J0IHJvdXRlIGZyb20gJy4uL3JvdXRlL2luZGV4JztcbmltcG9ydCB1c2VyIGZyb20gJy4uL3VzZXIvaW5kZXgnO1xuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xuaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuLi9oaXN0b3J5L2luZGV4J1xuXG5cbmZ1bmN0aW9uIGxvYWRTZXNzaW9uKG5hbWUpIHtcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9zZXNzaW9ucycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGVzJykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKTtcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc2Vzc2lvbi11c2VyJykuZWFjaCh1c2VyLmxvYWRVc2Vycyk7XG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3Rvcnktc2Vzc2lvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJIaXN0b3J5XCI7XG4gICAgICAgICAgICAkLmdldChcIi9zZXNzaW9uL1wiICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IGZyb250LmdldEh0bWwodGl0bGUsIGRhdGEuZW5kU3RhdHMsIHRydWUpO1xuICAgICAgICAgICAgICAgICQoJyNyb3V0ZXMnKS52YWwoZGF0YS5yb3V0ZSk7XG4gICAgICAgICAgICAgICAgJCgnI3Nlc3Npb24tdXNlcicpLnZhbChkYXRhLnVzZXIpO1xuICAgICAgICAgICAgICAgIGlmIChodG1sKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyN0YWJsZS1jb250ZW50JykuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoZ2V0TGFwSHRtbCh0aXRsZSwgZGF0YS5lbmRTdGF0cykpO1xuICAgICAgICAgICAgICAgICAgICBtYXBVdGlscy5hZGRHcHhUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBncmFwaFV0aWxzLmFkZEdyYXBoKGRhdGEucmF3LCBkYXRhLnJhd0hyLCBwYXJzZUludChkYXRhLnN0YXJ0KSwgZGF0YS5zdHJva2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRMYXBIdG1sKGxhYmVsLCBqc29uLCByZXZlcnNlKSB7XG4gICAgdmFyIGh0bWwgPSAnJztcbiAgICBpZiAocGFyc2VJbnQoanNvbi50b3RhbExhcHMpID4gMCkge1xuICAgICAgICB2YXIgbGFwTnVtID0gMTtcbiAgICAgICAgdmFyIGxhcHMgPSBqc29uLmxhcHM7XG4gICAgICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgICAgICBsYXBzLnJldmVyc2UoKTtcbiAgICAgICAgICAgIGxhcE51bSA9IGxhcHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGxhcHMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRoIHNjb3BlPVwicm93XCI+JyArIGxhcE51bSArICc8L3RoPjx0ZD4nICsgcGFyc2VJbnQodmFsdWUubWV0ZXJzKSArICc8L3RkPjx0ZD4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHZhbHVlLnNlY29uZHMpKSArICc8L3RkPic7XG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsdWUud2F0dCkgKiAxMCkgLyAxMCArICd3PC90ZD48L3RyPic7XG4gICAgICAgICAgICAgICAgaWYgKHJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFwTnVtLS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGFwTnVtKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbDtcbn1cblxuXG52YXIgY2xpY2tTZXNzaW9uID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcbiAgICBsb2FkU2Vzc2lvbihuYW1lKTtcbn07XG5cbmZ1bmN0aW9uIGRlbGV0ZVNlc3Npb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xuICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBzZXNzaW9uP1wiKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbi9kZWwvJyArIG5hbWUsXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlNlc3Npb24gZGVsZXRlZFwiKTtcbiAgICAgICAgICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5SW5kZXgoMCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkU2Vzc2lvbiwgY2xpY2tTZXNzaW9uLCBnZXRMYXBIdG1sLCBkZWxldGVTZXNzaW9uIH0iLCJcbnZhciBsb2FkVXNlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICQuZ2V0KFwiL3VzZXJzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBodG1sID0gJyc7XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgdmFsdWUuaWQgKyAnXCI+JyArIHZhbHVlLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLmxhc3ROYW1lICsgJzwvb3B0aW9uPidcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhhdCkuaHRtbChodG1sKVxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gZWRpdFVzZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiAnL3VzZXJzLycgKyBpZCxcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIiNhZGRVc2VyRm9ybVwiKTtcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2ZpcnN0TmFtZScpLnZhbChyZXN1bHQuZmlyc3ROYW1lKTtcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2xhc3ROYW1lJykudmFsKHJlc3VsdC5sYXN0TmFtZSk7XG4gICAgICAgICAgICBmb3JtLmZpbmQoJyN1c2VySWQnKS52YWwocmVzdWx0LmlkKTtcbiAgICAgICAgICAgICQuZ2V0KCcvc3RyYXZhL3VybCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGRhdGEudXJsLnJlcGxhY2UoXCIlMjRcIiwgcmVzdWx0LmlkKTtcbiAgICAgICAgICAgICAgICAkKCcuc3RyYXZhLXVybCcpLmF0dHIoJ2hyZWYnLCB1cmwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY29ubmVjdCA9ICQoXCIuc3RyYXZhLWNvbm5lY3RcIik7XG4gICAgICAgICAgICBjb25uZWN0LnJlbW92ZUNsYXNzKFwic3Itb25seVwiKTtcbiAgICAgICAgICAgICQoJyNhZGRVc2VyTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRVc2VyKCkge1xuICAgICQoJyNsb2FkJykubG9hZCgnL3VzZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuZmluZCgnI3VzZXJzLWJvZHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgICQuZ2V0KFwiL3VzZXJzL1wiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBodG1sID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD48YSBocmVmPVwiI1wiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN1c2VyU3RhdHNNb2RhbFwiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj4nICsgKGkgKyAxKSArICc8L2E+PC90ZD48dGQ+JyArIHVzZXIuZmlyc3ROYW1lICsgJzwvdGQ+PHRkPicgKyB1c2VyLmxhc3ROYW1lICsgJzwvdGQ+JztcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPjxhIGNsYXNzPVwiZWRpdC11c2VyXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHVzZXIuaWQgKyAnXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNyZWF0ZTwvaT48L2E+PGEgY2xhc3M9XCJkZWwtdXNlclwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyB1c2VyLmlkICsgJ1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiRGVsZXRlIHVzZXJcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT48L3RkPicgKyAnPC90cj4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQodGhhdCkuaHRtbChodG1sKTtcbiAgICAgICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRVc2VyKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2F2ZVVzZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHZhciBmb3JtID0gJChcIiNhZGRVc2VyRm9ybVwiKTtcbiAgICB2YXIgZmlyc3ROYW1lID0gZm9ybS5maW5kKCcjZmlyc3ROYW1lJykudmFsKCk7XG4gICAgdmFyIGxhc3ROYW1lID0gZm9ybS5maW5kKCcjbGFzdE5hbWUnKS52YWwoKTtcbiAgICB2YXIgaWQgPSBmb3JtLmZpbmQoJyN1c2VySWQnKS52YWwoKTtcbiAgICB2YXIgdXNlciA9IHt9O1xuICAgIHVzZXIuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xuICAgIHVzZXIubGFzdE5hbWUgPSBsYXN0TmFtZTtcbiAgICB1c2VyLmlkID0gaWQ7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHVybDogXCIvdXNlcnMvYWRkXCIsXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykubW9kYWwoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVVzZXIoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgdmFyIHJlc3VsdCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlP1wiKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkLFxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgdXNlci5sb2FkVXNlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkVXNlcnMsIGxvYWRVc2VyLCBlZGl0VXNlciwgc2F2ZVVzZXIsIGRlbGV0ZVVzZXIgfSIsImV4cG9ydCBjb25zdCBSQVRJT04gPSAoMTAwIC8gNC44MDUpICogNjtcbmV4cG9ydCBjb25zdCBQQUdFX1NJWkUgPSAxMDtcbmV4cG9ydCBjb25zdCBVUERBVEVfRlJFUSA9IDEwMDA7XG5leHBvcnQgdmFyIHJ1biA9IGZhbHNlO1xuXG5nb29nbGUubWFwcy5MYXRMbmcucHJvdG90eXBlLmttVG8gPSBmdW5jdGlvbihhKXtcbiAgICB2YXIgZSA9IE1hdGgsIHJhID0gZS5QSS8xODA7XG4gICAgdmFyIGIgPSB0aGlzLmxhdCgpICogcmEsIGMgPSBhLmxhdCgpICogcmEsIGQgPSBiIC0gYztcbiAgICB2YXIgZyA9IHRoaXMubG5nKCkgKiByYSAtIGEubG5nKCkgKiByYTtcbiAgICB2YXIgZiA9IDIgKiBlLmFzaW4oZS5zcXJ0KGUucG93KGUuc2luKGQvMiksIDIpICsgZS5jb3MoYikgKiBlLmNvc1xuICAgIChjKSAqIGUucG93KGUuc2luKGcvMiksIDIpKSk7XG4gICAgcmV0dXJuIGYgKiA2Mzc4LjEzNztcbn1cblxuZ29vZ2xlLm1hcHMuUG9seWxpbmUucHJvdG90eXBlLmluS20gPSBmdW5jdGlvbihuKXtcbiAgICB2YXIgYSA9IHRoaXMuZ2V0UGF0aChuKSwgbGVuID0gYS5nZXRMZW5ndGgoKSwgZGlzdCA9IDA7XG4gICAgZm9yKHZhciBpPTA7IGk8bGVuLTE7IGkrKyl7XG4gICAgICAgIGRpc3QgKz0gYS5nZXRBdChpKS5rbVRvKGEuZ2V0QXQoaSsxKSk7XG4gICAgfVxuICAgIHJldHVybiBkaXN0O1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgeyBSQVRJT04sIFBBR0VfU0laRSwgVVBEQVRFX0ZSRVEsIHJ1biB9IiwiaW1wb3J0IHsgVVBEQVRFX0ZSRVEsIFBBR0VfU0laRSwgUkFUSU9OLCBydW4gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbmZ1bmN0aW9uIGFkZEdyYXBoKHRpbWUsIGhyLCBzdGFydCwgc3Ryb2tlcykge1xuICAgIHZhciBzcGVlZCA9IFtdO1xuICAgIHZhciB3YXR0ID0gW107XG4gICAgdmFyIHN0cm9rZSA9IFtdO1xuICAgIHZhciBzdHJva2VDb250ZXIgPSAxO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGltZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGltZVZhbCA9IHBhcnNlSW50KHRpbWVbaV0pO1xuICAgICAgICB2YXIgc3Ryb2tlVGltZSA9IHBhcnNlSW50KHN0cm9rZXNbc3Ryb2tlQ29udGVyXSk7XG4gICAgICAgIHZhciBzZWMgPSAoKHRpbWVWYWwgLSBzdGFydCkgLyAxMDAwKTtcbiAgICAgICAgdmFyIGxlbmdodCA9IChSQVRJT04gLyAxMDApO1xuICAgICAgICBzcGVlZC5wdXNoKCgobGVuZ2h0IC8gc2VjKSkgKiAzLjYpO1xuICAgICAgICB2YXIgd2F0dFZhbHVlID0gdXRpbHMuY2FsY1dhdHQoc2VjIC8gbGVuZ2h0KTtcbiAgICAgICAgd2F0dC5wdXNoKHdhdHRWYWx1ZSk7XG4gICAgICAgIHN0cm9rZS5wdXNoKDEwMDAqNjAgLyAoc3Ryb2tlVGltZSAtIHBhcnNlSW50KHN0cm9rZXNbc3Ryb2tlQ29udGVyLTFdKSkpO1xuICAgICAgICBzdGFydCA9IHBhcnNlSW50KHRpbWVbaV0pO1xuICAgICAgICBpZiAodGltZVZhbCA+IHN0cm9rZVRpbWUpIHtcbiAgICAgICAgICAgIHN0cm9rZUNvbnRlcisrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9SZW1vdmUgZXZlciBzZWNvbmQgZWxlbWVudFxuICAgIHZhciBzcGVlZE1lcmdlZCA9IFtdO1xuICAgIHZhciBock1lcmdlZCA9IFtdO1xuICAgIHZhciB3YXR0TWVyZ2VkID0gW107XG4gICAgdmFyIHN0cm9rZU1lcmdlZCA9IFtdO1xuICAgIHZhciBsYWJlbHNNZXJnZWQgPSBbXTtcbiAgICB2YXIgbWVyZ2VTaXplID0gMTA7XG4gICAgaWYgKHRpbWUubGVuZ3RoID4gMTAwMCkge1xuICAgICAgICBtZXJnZVNpemUgPSAyMDtcbiAgICB9XG5cbiAgICB3aGlsZSAodGltZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGEgPSB0aW1lLnNwbGljZSgwLCBtZXJnZVNpemUpO1xuICAgICAgICB2YXIgdGltZVYgPSBwYXJzZUludChhLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gYS5sZW5ndGgpO1xuICAgICAgICBsYWJlbHNNZXJnZWQucHVzaChuZXcgRGF0ZSh0aW1lVikudG9JU09TdHJpbmcoKS5zdWJzdHIobmV3IERhdGUodGltZVYpLnRvSVNPU3RyaW5nKCkubGFzdEluZGV4T2YoJ1QnKSArIDEsIDgpKTtcbiAgICAgICAgaWYgKGhyKSB7XG4gICAgICAgICAgICB2YXIgaCA9IGhyLnNwbGljZSgwLCBtZXJnZVNpemUpO1xuICAgICAgICAgICAgaWYgKGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGhyTWVyZ2VkLnB1c2gocGFyc2VJbnQoaC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIGgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICAgICAgdmFyIGggPSBzdHJva2Uuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XG4gICAgICAgICAgICBpZiAoaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3Ryb2tlTWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KGgucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBoLmxlbmd0aCkgKiAxMCkgLyAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWVkKSB7XG4gICAgICAgICAgICB2YXIgcyA9IHNwZWVkLnNwbGljZSgwLCBtZXJnZVNpemUpO1xuICAgICAgICAgICAgdmFyIHcgPSB3YXR0LnNwbGljZSgwLCBtZXJnZVNpemUpO1xuICAgICAgICAgICAgaWYgKHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNwZWVkTWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KHMucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBzLmxlbmd0aCkgKiAxMCkgLyAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAody5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgd2F0dE1lcmdlZC5wdXNoKE1hdGgucm91bmQocGFyc2VGbG9hdCh3LnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gdy5sZW5ndGgpICogMTApIC8gMTApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGN0eCA9ICQoJyNoci1ncmFwaCcpO1xuICAgIHZhciBsaW5lQ2hhcnREYXRhID0ge1xuICAgICAgICBsYWJlbHM6IGxhYmVsc01lcmdlZCxcbiAgICAgICAgZGF0YXNldHM6IFt7XG4gICAgICAgICAgICBsYWJlbDogJ0hlYXJ0IHJhdGUgKGJwbSknLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZGMzNTQ1JyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNkYzM1NDUnLFxuICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICBkYXRhOiBock1lcmdlZCxcbiAgICAgICAgICAgIC8vIGN1YmljSW50ZXJwb2xhdGlvbk1vZGU6ICdtb25vdG9uZScsXG4gICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTEnLFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBsYWJlbDogJ1NwZWVkIChrbS90KScsXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMDdiZmYnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JmZicsXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6IHNwZWVkTWVyZ2VkLFxuICAgICAgICAgICAgLy9jdWJpY0ludGVycG9sYXRpb25Nb2RlOiAnbW9ub3RvbmUnLFxuICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy0yJ1xuICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnV2F0dCcsXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjNGJjMGMwJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNGJjMGMwJyxcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkYXRhOiB3YXR0TWVyZ2VkLFxuICAgICAgICAgICAgICAgIGxpbmVUZW5zaW9uOiAwLFxuICAgICAgICAgICAgICAgIC8vY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcbiAgICAgICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTMnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3Ryb2tlIHJhdGUgKHNwbSknLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzk5NjZGRicsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzk5NjZGRicsXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGF0YTogc3Ryb2tlTWVyZ2VkLFxuICAgICAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtNCdcbiAgICAgICAgICAgIH1dXG4gICAgfTtcbiAgICB2YXIgbXlMaW5lQ2hhcnQgPSBDaGFydC5MaW5lKGN0eCwge1xuICAgICAgICBkYXRhOiBsaW5lQ2hhcnREYXRhLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgaG92ZXJNb2RlOiAnaW5kZXgnLFxuICAgICAgICAgICAgc3RhY2tlZDogZmFsc2UsXG4gICAgICAgICAgICBzY2FsZXM6IHtcbiAgICAgICAgICAgICAgICB5QXhlczogW3tcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtMScsXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRNaW46IDMwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTInLFxuICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgIGdyaWRMaW5lczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSAvLyBvbmx5IHdhbnQgdGhlIGdyaWQgbGluZXMgZm9yIG9uZSBheGlzIHRvIHNob3cgdXBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3ktYXhpcy0zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDI1XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJywgLy8gb25seSBsaW5lYXIgYnV0IGFsbG93IHNjYWxlIHR5cGUgcmVnaXN0cmF0aW9uLiBUaGlzIGFsbG93cyBleHRlbnNpb25zIHRvIGV4aXN0IHNvbGVseSBmb3IgbG9nIHNjYWxlIGZvciBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RlZE1pbjogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgYWRkR3JhcGggfVxuIiwiaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXG5cblxuY29uc3Qgc3R5bGVzID0gW3tcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LCB7IFwibGlnaHRuZXNzXCI6IDY1IH0sXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sIHsgXCJsaWdodG5lc3NcIjogNTEgfSxcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfV1cbn0sIHtcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxuICAgICAgICB7IFwibGlnaHRuZXNzXCI6IDMwIH0sIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxuICAgICAgICB7IFwibGlnaHRuZXNzXCI6IDQwIH0sIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxufSwge1xuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxufSwgeyBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIiwgXCJzdHlsZXJzXCI6IFt7IFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiIH1dIH0sXG4gICAgeyBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLCBcInN0eWxlcnNcIjogW3sgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9LCB7IFwibGlnaHRuZXNzXCI6IC0yNSB9LCB7IFwic2F0dXJhdGlvblwiOiAtMTAwIH1dIH0sXG4gICAgeyBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsIFwic3R5bGVyc1wiOiBbeyBcImh1ZVwiOiBcIiNmZmZmMDBcIiB9LCB7IFwibGlnaHRuZXNzXCI6IC0yNSB9LCB7IFwic2F0dXJhdGlvblwiOiAtOTcgfV0gfV07XG5cbmZ1bmN0aW9uIGNsZWFuTWFwKGluaXQgPSB0cnVlKSB7XG4gICAgaWYgKGluaXQpIHtcbiAgICAgICAgaW5pdE1hcCgpO1xuICAgIH1cblxuICAgIG1hcC5saXZlUG9pbnRzID0gW107XG4gICAgbWFwLm1hcmtlcnMgPSBbXTtcbiAgICBsZXQgcG9seSA9IGNyZWF0ZVBvbHlMaW5lKG1hcC5saXZlUG9pbnRzKTtcbiAgICBwb2x5LnNldE1hcChtYXAubGl2ZU1hcCk7XG5cbiAgICAvLyBmaXQgYm91bmRzIHRvIHRyYWNrXG4gICAgaWYgKHR5cGVvZiBtYXAubGl2ZU1hcCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1hcC5saXZlTWFwLmZpdEJvdW5kcyA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcbiAgICB9XG4gICBcbn1cblxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcbiAgICBsZXQgbWFwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtbWFwJyk7XG4gICAgaWYgKG1hcERpdikge1xuICAgICAgICBtYXAubGl2ZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRGl2LCB7XG4gICAgICAgICAgICB6b29tOiA4LFxuICAgICAgICAgICAgbWF4Wm9vbTogMTZcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcC5saXZlQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgICAgICBtYXAubGl2ZU1hcC5zZXQoJ3N0eWxlcycsIHN0eWxlcyk7XG4gICAgfVxufVxuXG4vL1RPRE86IENoYW5nZSBjb2xvciBieSBzcGVlZCBvciBoci5cbmZ1bmN0aW9uIGNyZWF0ZVBvbHlMaW5lKHBvaW50cykge1xuICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUoe1xuICAgICAgICBwYXRoOiBwb2ludHMsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwQUFcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogLjcsXG4gICAgICAgIHN0cm9rZVdlaWdodDogNFxuICAgIH0pO1xufVxuXG52YXIgYWRkUm91dGVUcmFja1RvTWFwID0gZnVuY3Rpb24gKG5hbWUsIGVsZW1lbnQpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogJy9yb3V0ZXMvJyArIG5hbWUsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGxldCBncHMgPSBkYXRhLmdwcztcbiAgICAgICAgICAgICAgICBsZXQgbWFwRWxlbWVudCA9IGVsZW1lbnRbMF07XG4gICAgICAgICAgICAgICAgbGV0IHBvaW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgem9vbTogOCxcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTZcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG1hcC5zZXQoJ3N0eWxlcycsIHN0eWxlcyk7XG5cbiAgICAgICAgICAgICAgICBsZXQgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgICAgICAgICAgICAgZ3BzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXQgPSBwb2ludC5sYXQ7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb24gPSBwb2ludC5sb247XG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKHApO1xuICAgICAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xuICAgICAgICAgICAgICAgIHBvbHkuc2V0TWFwKG1hcCk7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXQgYm91bmRzIHRvIHRyYWNrXG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuXG52YXIgYWRkR3B4VHJhY2tUb01hcCA9IGZ1bmN0aW9uIChuYW1lLCBlbGVtZW50KSB7XG4gICAgbGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWxlbWVudFswXSwge1xuICAgICAgICB6b29tOiAxNlxuICAgIH0pO1xuICAgIHZhciBzdWNjZXNYbWwgPSBhZGRYbWwuYmluZChudWxsLCBtYXApO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiAnL3Nlc3Npb25zLycgKyBuYW1lICsgJy5ncHgnLFxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzWG1sXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbnZhciBhZGRTZXNzaW9uVHJhY2tUb01hcCA9IGZ1bmN0aW9uIChjb21wbGV0ZSkge1xuICAgIHZhciBzdWNjZXNYbWwgPSBhZGRYbWwuYmluZChudWxsLCBtYXAubGl2ZU1hcCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdHlwZTogXCJHRVRcIixcbiAgICAgICAgdXJsOiAncm93L2dweCcsXG4gICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc1htbCxcbiAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlXG4gICAgfSk7XG59O1xuXG5cbmZ1bmN0aW9uIGFkZFhtbChtYXAsIHhtbCkge1xuICAgIGxldCBwb2ludHMgPSBbXTtcblxuICAgIG1hcC5zZXQoJ3N0eWxlcycsIHN0eWxlcyk7XG5cbiAgICBsZXQgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xuICAgIGxldCBsYXBzID0gMTtcbiAgICBsZXQgbWFya2VyID0gMTtcbiAgICAkKHhtbCkuZmluZChcInRya3B0XCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgbGF0ID0gJCh0aGlzKS5hdHRyKFwibGF0XCIpO1xuICAgICAgICBsZXQgbG9uID0gJCh0aGlzKS5hdHRyKFwibG9uXCIpO1xuICAgICAgICBsZXQgcCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsb24pO1xuXG4gICAgICAgIHBvaW50cy5wdXNoKHApO1xuICAgICAgICBsZXQga20gPSBjcmVhdGVQb2x5TGluZShwb2ludHMpLmluS20oKTtcbiAgICAgICAgbGFwcyA9IHBhcnNlSW50KGttIC8gMC41KSArIDE7IC8vIDAuNSBpcyA1MDAgbGFwXG4gICAgICAgIGlmIChtYXJrZXIgPCBsYXBzICkge1xuICAgICAgICAgICAgYWRkTWFya2VyKHAsIFwiUnVuZGU6IFwiICsgKGxhcHMtMSksIFN0cmluZyhsYXBzIC0gMSksIG1hcCk7XG4gICAgICAgICAgICBtYXJrZXIrKztcbiAgICAgICAgfVxuICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xuICAgIH0pO1xuXG4gICAgbGV0IHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xuXG4gICAgcG9seS5zZXRNYXAobWFwKTtcblxuICAgIC8vIGZpdCBib3VuZHMgdG8gdHJhY2tcbiAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XG59XG5cbmZ1bmN0aW9uIGxvYWRHcHhNYXAoKSB7XG4gICAgbGV0IG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcbiAgICBsZXQgZWxlbWVudCA9ICQodGhpcykuZmluZCgnLmNhcmQtbWFwLXRvcCcpO1xuICAgIGFkZEdweFRyYWNrVG9NYXAobmFtZSwgZWxlbWVudCk7XG59XG5cbmZ1bmN0aW9uIGFkZE1hcmtlcihwLCB0aXRsZSwgcm91bmQsIGxpdmVNYXA9bWFwLmxpdmVNYXApIHtcbiAgICBtYXAubWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjpwLFxuICAgICAgICBtYXA6IGxpdmVNYXAsXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgbGFiZWw6IHJvdW5kXG4gICAgfSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7IGNsZWFuTWFwLCBpbml0TWFwLCBzdHlsZXMsIGFkZFJvdXRlVHJhY2tUb01hcCwgYWRkR3B4VHJhY2tUb01hcCwgbG9hZEdweE1hcCxcbiAgICBjcmVhdGVQb2x5TGluZSwgYWRkTWFya2VyLCBhZGRTZXNzaW9uVHJhY2tUb01hcCB9IiwiXG5mdW5jdGlvbiBsZWFkZXJib2FyZChuYW1lLCBjYWxsYmFjaykge1xuICAgICQuZ2V0KCcvc3RyYXZhL3JvdXRlL2xlYWRlcmJvYXJkLycgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHNlZ21lbnQobmFtZSwgY2FsbGJhY2spIHtcbiAgICAkLmdldCgnL3N0cmF2YS9yb3V0ZS8nICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoZGF0YSk7XG4gICAgfSk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IHsgbGVhZGVyYm9hcmQsIHNlZ21lbnQgfSIsImNvbnN0IFdBVFRfUkFUSU9OID0gMi44MDtcblxuZnVuY3Rpb24gY2FsY1dhdHQocGFjZSkge1xuICAgIHJldHVybiBXQVRUX1JBVElPTiAvIE1hdGgucG93KHBhY2UsIDMpO1xufVxuXG5mdW5jdGlvbiBzZXNzaW9uTmFtZVRvUmVhZGFibGUobmFtZSkge1xuICAgIHJldHVybiBtb21lbnQobmFtZS5zbGljZSgwLCAxMykgKyAnOicgKyBuYW1lLnNsaWNlKDEzLDE1KSArICc6JyArIG5hbWUuc2xpY2UoMTUpKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpO1xufVxuXG5mdW5jdGlvbiBnZXRIZWFydFJhdGVDb2xvcihocikge1xuICAgIGlmIChociA8IDEyNSkge1xuICAgICAgICByZXR1cm4gJ3RleHQtc3VjY2VzcydcbiAgICB9IGVsc2UgaWYgKGhyIDwgMTUwKSB7XG4gICAgICAgIHJldHVybiAndGV4dC1wcmltYXJ5J1xuICAgIH0gZWxzZSBpZiAoaHIgPCAxNzUpIHtcbiAgICAgICAgcmV0dXJuICd0ZXh0LXdhcm5pbmcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAndGV4dC1kYW5nZXInO1xuICAgIH1cbn1cblxudmFyIGdldFVybFBhcmFtZXRlciA9IGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihzUGFyYW0pIHtcbiAgICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpLFxuICAgICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcbiAgICAgICAgc1BhcmFtZXRlck5hbWUsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSkge1xuICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBmbXRNU1Mocykge1xuICAgIHZhciBkYXRlID0gbmV3IERhdGUobnVsbCk7XG4gICAgZGF0ZS5zZXRTZWNvbmRzKHMpOyAvLyBzcGVjaWZ5IHZhbHVlIGZvciBTRUNPTkRTIGhlcmVcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XG59XG5cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgZXZlcnkgZ2V0IHBhcmFtZXRlciBmcm9tIGEgVVJMIChmaXJzdCBhcmd1bWVudCkgYXMgYSBwcm9wZXJ0eVxuICogXG4gKiBAcGFyYW0gVVJMIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIFF1ZXJ5U3RyaW5nKFVSTCkge1xuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgYW5vbnltb3VzLCBpcyBleGVjdXRlZCBpbW1lZGlhdGVseSBhbmQgXG4gICAgLy8gdGhlIHJldHVybiB2YWx1ZSBpcyBhc3NpZ25lZCB0byBRdWVyeVN0cmluZyFcbiAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XG4gICAgdmFyIHVzZWZ1bFBhcmFtID0gVVJMLnNwbGl0KFwiP1wiKVsxXSB8fCBcIlwiO1xuICAgIHZhciBxdWVyeSA9IHVzZWZ1bFBhcmFtIHx8IFwiXCI7XG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIElmIGZpcnN0IGVudHJ5IHdpdGggdGhpcyBuYW1lXG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgICAgICAgICAvLyBJZiBzZWNvbmQgZW50cnkgd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gW3F1ZXJ5X3N0cmluZ1twYWlyWzBdXSwgZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pXTtcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGFycjtcbiAgICAgICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0ucHVzaChkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5X3N0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBjYWxjV2F0dCwgc2Vzc2lvbk5hbWVUb1JlYWRhYmxlLCBnZXRIZWFydFJhdGVDb2xvciwgZ2V0VXJsUGFyYW1ldGVyLCBmbXRNU1MsIFxuICAgIFF1ZXJ5U3RyaW5nIH1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==