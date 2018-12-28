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
            if (data.status === 'ROWING') {
                var startButton = $('#startRow');
                if (_utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].getUrlParameter("test")) {
                    startButton = $('#startSimulator')
                }
                start(startButton);
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
    $('main-nav').show();
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

function start(startButton) {
    $('main-nav').hide();
    $(window).scrollTop($('#main').offset().top); //Scroll
    get_rowInfo(true, "Rowing");
    _utils_mapUtils__WEBPACK_IMPORTED_MODULE_3__["default"].cleanMap();
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
            _session_index__WEBPACK_IMPORTED_MODULE_5__["default"].loadSession(_utils_utils__WEBPACK_IMPORTED_MODULE_2__["default"].QueryString(window.location.href)["name"]);
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

function cleanMap() {
    initMap();
    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].livePoints = [];
    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].markers = [];
    var poly = createPolyLine(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].livePoints);
    poly.setMap(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap);

    // fit bounds to track
    if (typeof _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap.fitBounds === 'function' ) {
        _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap.fitBounds(_map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveBounds);
    }
   
}

function initMap() {
    var mapDiv = document.getElementById('live-map');
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

function loadGpxMap() {
    var name = $(this).data('name');
    var element = $(this).find('.card-map-top');
    addGpxTrackToMap(name, element);
}

function addMarker(p, title, round) {
    _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].markers.push(new google.maps.Marker({
        position:p,
        map: _map_index__WEBPACK_IMPORTED_MODULE_0__["default"].liveMap,
        title: title,
        label: round
    }));
}

/* harmony default export */ __webpack_exports__["default"] = ({ cleanMap, initMap, styles, addRouteTrackToMap, addGpxTrackToMap, loadGpxMap,
    createPolyLine, addMarker });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9mcm9udC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvcm91dGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9zZXNzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL3V0aWxzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9ncmFwaFV0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9zdHJhdmEuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0EsSUFBSSxrREFBRztBQUNQO0FBQ0EsYUFBYSxrREFBRztBQUNoQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVlLGdFQUFDO0FBQ2hCLCtCOzs7Ozs7Ozs7Ozs7OztBQ2hKQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHZSxnRUFBQyx1Qjs7Ozs7Ozs7Ozs7O0FDZGhCO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSwwQkFBMEI7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLGdFQUFDO0FBQ2hCLGlCQUFpQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCByb3V0ZSBmcm9tICcuLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4uL3VzZXIvaW5kZXgnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnXHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJy4uL3Nlc3Npb24vaW5kZXgnO1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vaGlzdG9yeS9pbmRleCdcclxuXHJcbnZhciB0aW1lT3V0O1xyXG5cclxuZnVuY3Rpb24gbG9hZE1haW4oKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9tYWluJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlcycpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc2Vzc2lvbi11c2VyJykuZWFjaCh1c2VyLmxvYWRVc2Vycyk7XHJcbiAgICAgICAgJC5nZXQoXCIvcm93L3N0YXR1c1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdST1dJTkcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRSb3cnKTtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRTaW11bGF0b3InKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhcnQoc3RhcnRCdXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vUnVuIHNpbXVsYXRvciBpZiB0ZXN0LlxyXG4gICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICQoJyNzdGFydFJvdycpLmF0dHIoXCJpZFwiLCBcInN0YXJ0U2ltdWxhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGxvYWRUb1N0cmF2YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgJC5nZXQoaHJlZiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBhbGVydChcIlVwbG9hZGVkIHRvIHN0cmF2YSFcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRSb3coZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHJvdXRlcyA9ICQoJyNyb3V0ZXMnKS52YWwoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3Jvdy9zdGFydFwiLCB7IHJvdXRlczogcm91dGVzIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdGFydCh0aGF0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wUm93KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJ21haW4tbmF2Jykuc2hvdygpO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgkKCcjbWFpbi1uYXYnKS5vZmZzZXQoKS50b3ApO1xyXG4gICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xyXG4gICAgZ2xvYmFscy5ydW4gPSBmYWxzZTtcclxuICAgIHZhciByb3V0ZXMgPSAkKCcjcm91dGVzJykudmFsKCk7XHJcbiAgICB2YXIgdXNlciA9ICQoJyNzZXNzaW9uLXVzZXInKS52YWwoKTtcclxuICAgICQuZ2V0KFwiL3Jvdy9zdG9wXCIsIHsgcm91dGVzOiByb3V0ZXMsIHVzZXI6IHVzZXIgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoZ2V0SHRtbChcIlN0b3BwZWRcIiwgZGF0YSwgZmFsc2UpKTtcclxuICAgICAgICB2YXIgc3RhcnRSb3cgPSAkKFwiI3N0YXJ0Um93XCIpO1xyXG4gICAgICAgIHN0YXJ0Um93LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgc3RhcnRSb3cucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgIHN0YXJ0Um93Lmh0bWwoJ1N0YXJ0IHJvdycpO1xyXG4gICAgICAgIHRoYXQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICQoJyNyb3V0ZXMnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoJyNzZXNzaW9uLXVzZXInKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoXCIjc3RhcnRTaW11bGF0b3JcIikucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydChzdGFydEJ1dHRvbikge1xyXG4gICAgJCgnbWFpbi1uYXYnKS5oaWRlKCk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKCQoJyNtYWluJykub2Zmc2V0KCkudG9wKTsgLy9TY3JvbGxcclxuICAgIGdldF9yb3dJbmZvKHRydWUsIFwiUm93aW5nXCIpO1xyXG4gICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgICQoJyNyb3V0ZXMnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKFwiI3N0YXJ0U2ltdWxhdG9yXCIpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJChzdGFydEJ1dHRvbikuaHRtbCgnUm93aW5nLi4uJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKCcjc3RvcFJvdycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3Jvd0luZm8oY29udGludWVzLCB0aXRsZSkge1xyXG4gICAgZ2xvYmFscy5ydW4gPSBjb250aW51ZXM7XHJcbiAgICAkLmdldChcIi9yb3dcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbCA9IGdldEh0bWwodGl0bGUsIGRhdGEpO1xyXG4gICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICQoJyN0YWJsZS1jb250ZW50JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoc2Vzc2lvbi5nZXRMYXBIdG1sKHRpdGxlLCBkYXRhLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBkYXRhLmdwcy5sYXQ7XHJcbiAgICAgICAgICAgIHZhciBsb24gPSBkYXRhLmdwcy5sb247XHJcbiAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgIGlmIChtYXAubWFya2Vycy5sZW5ndGggPCBkYXRhLnRvdGFsTGFwcyApIHtcclxuICAgICAgICAgICAgICAgIG1hcFV0aWxzLmFkZE1hcmtlcihwLCBcIlJ1bmRlOiBcIiArIGRhdGEudG90YWxMYXBzLCBTdHJpbmcoZGF0YS50b3RhbExhcHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXAubGl2ZVBvaW50cy5wdXNoKHApO1xyXG4gICAgICAgICAgICBpZiAobWFwLmxpdmVCb3VuZHMpIHtcclxuICAgICAgICAgICAgICAgIG1hcC5saXZlQm91bmRzLmV4dGVuZChwKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2x5ID0gbWFwVXRpbHMuY3JlYXRlUG9seUxpbmUobWFwLmxpdmVQb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgcG9seS5zZXRNYXAobWFwLmxpdmVNYXApO1xyXG4gICAgICAgICAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZ2xvYmFscy5ydW4pIHtcclxuICAgICAgICAgICAgdGltZU91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBnZXRfcm93SW5mbyh0cnVlLCB0aXRsZSk7IH0sIGdsb2JhbHMuVVBEQVRFX0ZSRVEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgIHN3aXRjaCAoaGFzaCkge1xyXG4gICAgICAgIGNhc2UgJyNyb3V0ZSc6XHJcbiAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZSgwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnI3VzZXInOlxyXG4gICAgICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyNoaXN0b3J5JzpcclxuICAgICAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeSgwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnI3Nlc3Npb24nOlxyXG4gICAgICAgICAgICBzZXNzaW9uLmxvYWRTZXNzaW9uKHV0aWxzLlF1ZXJ5U3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVtcIm5hbWVcIl0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcjcm91dGVkZXRhaWwnOlxyXG4gICAgICAgICAgICByb3V0ZS5sb2FkUm91dGVEZXRhaWwodXRpbHMuUXVlcnlTdHJpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpW1wicm91dGVcIl0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsb2FkTWFpbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0SHRtbChsYWJlbCwganNvbiwgZGF5KSB7XHJcbiAgICBpZiAocGFyc2VJbnQoanNvbi5tZXRlcnMpID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChkYXkpIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+RGF5PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBqc29uLnN0YXJ0LnN1YnN0cigyLCBqc29uLnN0YXJ0Lmxhc3RJbmRleE9mKCdUJykgLSAyKSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlN0YXJ0OjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsganNvbi5zdGFydC5zdWJzdHIoanNvbi5zdGFydC5sYXN0SW5kZXhPZignVCcpICsgMSwgOCkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5UaW1lOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KGpzb24uc2Vjb25kcykpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+TGVuZ3RoOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgcGFyc2VJbnQoanNvbi5tZXRlcnMpICsgJyBtICgnICsganNvbi5wZXJjZW50ICsgJyk8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlBhY2U6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi5wYWNlKSAqIDMuNiAqIDEwKSAvIDEwICsgJyBrbS90PC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj41MDBtOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KGpzb24ubGFwUGFjZSkpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+Mms6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi50b3dLUGFjZSkpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+QXZnLlc6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi53YXR0KSAqIDEwKSAvIDEwICsgJ3c8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlNSOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGpzb24uc3Ryb2tlKSAqIDEwKSAvIDEwICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBpZiAocGFyc2VJbnQoanNvbi5ocikgPiAwKSB7XHJcbiAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPkhSOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wgJyArIHV0aWxzLmdldEhlYXJ0UmF0ZUNvbG9yKHBhcnNlSW50KGpzb24uaHIpKSArICdcIj4nICsgcGFyc2VJbnQoanNvbi5ocikgKyAocGFyc2VJbnQoanNvbi5hdmdIcikgPiAwID8gJygnICsgcGFyc2VJbnQoanNvbi5hdmdIcikgKyAnKScgOiAnJykgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIH1cclxuICAgIGlmIChqc29uLmZpbGVOYW1lKSB7XHJcbiAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPkFjdGlvbnM6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPjxhIGhyZWY9XCIvc2Vzc2lvbnMvJyArIGpzb24uZmlsZU5hbWU7XHJcbiAgICAgICAgaHRtbCArPSAnXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZpbGVfZG93bmxvYWQ8L2k+PGEgY2xhc3M9XCJzdHJhdmFcIiBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIGpzb24ubmFtZTtcclxuICAgICAgICBodG1sICs9ICdcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlVwbG9hZCB0byBzdHJhdmFcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvdWRfdXBsb2FkPC9pPjwvYT4nO1xyXG4gICAgICAgIGh0bWwgKz0gJzxhIGNsYXNzPVwic2Vzc2lvbnNcIiBkYXRhLW5hbWU9XCInICsganNvbi5uYW1lICsgJ1wiIGhyZWY9XCIvc2Vzc2lvbnNcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlNlc3Npb25cIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmliZXJfbmV3PC9pPjwvYT48L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWwgKyBcIlwiO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkTWFpbiwgc3RhcnQsIGdldF9yb3dJbmZvLCBnZXRIdG1sLCBzdGFydFJvdywgc3RvcFJvdywgbG9hZCwgdXBsb2FkVG9TdHJhdmEgfTsiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUluZGV4KGluZGV4KSB7XHJcbiAgICBsb2FkSGlzdG9yeShpbmRleCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5KG1haW5JbmRleCkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvaGlzdG9yeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNoaXN0b3J5JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxvYWRMYXN0M1Nlc3Npb25zKCk7XHJcbiAgICAgICAgICAgIGxvYWRIaXN0b3J5TGlzdCgkKHRoaXMpLCBtYWluSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRMYXN0M1Nlc3Npb25zKCkge1xyXG4gICAgJC5nZXQoJy9zZXNzaW9uLycgKyAwICsgJy8nICsgMiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbENhcmRzID0gJyc7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGh0bWxDYXJkcyA9IGNyZWF0ZUNhcmQoaHRtbENhcmRzLCBzZXNzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI2NhcmRzJykuaHRtbCgnPGRpdiBjbGFzcz1cImNvbFwiPjxkaXYgY2xhc3M9XCJjYXJkLWRlY2tcIj4nICsgaHRtbENhcmRzICsgJzwvZGl2PjwvZGl2PicpO1xyXG4gICAgICAgICQoJy5ncHgtdHJhY2snKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKFwibG9hZC1tYXBcIiwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEhpc3RvcnlMaXN0KHRoYXQsIG1haW5JbmRleCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gbWFpbkluZGV4ICogUEFHRV9TSVpFLCBzdG9wID0gKCgobWFpbkluZGV4ICsgMSkgKiBQQUdFX1NJWkUpKSAtIDE7XHJcbiAgICAkLmdldCgnL3Nlc3Npb24vJyArIHN0YXJ0ICsgJy8nICsgc3RvcCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkLmdldCgnL3VzZXJzJywgZnVuY3Rpb24gKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBodG1sVGFibGUgPSAnJywgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgdXNlck1hcCA9IHVzZXJzLnJlZHVjZShmdW5jdGlvbihtYXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgbWFwW29iai5pZF0gPSBvYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoc2Vzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaHRtbFRhYmxlID0gY3JlYXRlTGFwVGFibGVSZWNvcmQoaHRtbFRhYmxlLCBpbmRleCArIChtYWluSW5kZXggKiBQQUdFX1NJWkUpLCBzZXNzaW9uLCB1c2VyTWFwKTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI2hpc3Rvci10YWJsZS1ib2R5JykuaHRtbChodG1sVGFibGUpO1xyXG4gICAgICAgICAgICB2YXIgcGFnID0gdGhhdC5maW5kKCcucGFnZScpO1xyXG4gICAgICAgICAgICBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWcsIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbkhpc3RvcnkoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5leHQgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ25leHQnKSksIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdpbmRleCcpKSxcclxuICAgICAgICBtYWluSW5kZXggPSBwYXJzZUludCgkKCcjaGlzdG9yeS1wYWdlJykuZGF0YSgnaW5kZXgnKSk7XHJcbiAgICBpZiAoIWlzTmFOKG5leHQpKSB7XHJcbiAgICAgICAgbWFpbkluZGV4ICs9IG5leHQ7XHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihpbmRleCkpIHtcclxuICAgICAgICBtYWluSW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgIGxvYWRIaXN0b3J5TGlzdCgkKCcjaGlzdG9yeS10YWJsZScpLCBtYWluSW5kZXgpO1xyXG59XHJcblxyXG5cclxudmFyIGNyZWF0ZUNhcmQgPSBmdW5jdGlvbiAoaHRtbENhcmRzLCBzZXNzaW9uKSB7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGdweC10cmFja1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCJcIj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPGRpdiBjbGFzcz1cImNhcmQtbWFwLXRvcCBcIj48L2Rpdj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8aDUgY2xhc3M9XCJjYXJkLXRpdGxlIG10LTJcIj48YSBjbGFzcz1cInNlc3Npb25zXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIiBocmVmPVwiL3Nlc3Npb25cIj4nICsgdXRpbHMuc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKHNlc3Npb24ubmFtZSkgKyAnPC9hPjwvaDU+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPHAgY2xhc3M9XCJjYXJkLXRleHRcIj5MZW5ndGg6ICcgKyBwYXJzZUludChzZXNzaW9uLmVuZFN0YXRzLm1ldGVycykgKyAnbSwgVGltZTogJyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChzZXNzaW9uLmVuZFN0YXRzLnNlY29uZHMpKSArICc8L3A+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPGEgaHJlZj1cIi9zdHJhdmEvdXBsb2FkLycgKyBzZXNzaW9uLm5hbWUgKyAnXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgc3RyYXZhIGJ0bi1ibG9ja1wiPlVwbG9hZCB0byBTdHJhdmE8L2E+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPC9kaXY+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPC9kaXY+JztcclxuICAgIHJldHVybiBodG1sQ2FyZHM7XHJcbn07XHJcblxyXG52YXIgY3JlYXRlTGFwVGFibGVSZWNvcmQgPSBmdW5jdGlvbiAoaHRtbFRhYmxlLCBpbmRleCwgc2Vzc2lvbiwgdXNlck1hcCkge1xyXG4gICAgdmFyIHVzZXIgPSB1c2VyTWFwW3Nlc3Npb24udXNlcl07XHJcbiAgICBodG1sVGFibGUgKz0gJzx0cj4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGggc2NvcGU9XCJyb3dcIj4nICsgKGluZGV4ICsgMSkgKyAnPC90aD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+PGEgY2xhc3M9XCJzZXNzaW9uc1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCIgaHJlZj1cIi8/bmFtZT0nK3Nlc3Npb24ubmFtZSsnI3Nlc3Npb25cIj4nICsgdXRpbHMuc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKHNlc3Npb24ubmFtZSkgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPkxlbmd0aDogJyArIHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMubWV0ZXJzKSArICdtPC90ZD4nO1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lICsgJzwvdGQ+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8dGQ+PC90ZD4nO1xyXG4gICAgfVxyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+IDxhIGhyZWY9XCIvc2Vzc2lvbnMvJyArIHNlc3Npb24ubmFtZSArICcuZ3B4XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNlwiPmZpbGVfZG93bmxvYWQ8L2k+PGEgY2xhc3M9XCJzdHJhdmFcIiBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIHNlc3Npb24ubmFtZSArICdcIj4nICtcclxuICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJVcGxvYWQgdG8gU3RyYXZhXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNiBzdHJhdmEtaWNvblwiPmNsb3VkX3VwbG9hZDwvaT48L2E+IDxhIGNsYXNzPVwiZGVsLXNlc3Npb25cIiBocmVmPVwiI1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCI+JyArXHJcbiAgICAgICAgJzxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiRGVsZXRlIHNlc3Npb24gbG9jYWxcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2XCI+ZGVsZXRlPC9pPjwvYT48L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzwvdHI+JztcclxuICAgIHJldHVybiBodG1sVGFibGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWdlLCBpbmRleCkge1xyXG4gICAgdmFyIGh0bWxFbGVtZW50ID0gJCgnPHVsIGlkPVwiaGlzdG9yeS1wYWdlXCIgZGF0YS1pbmRleD1cIicgKyBpbmRleCArICdcIj48L3VsPicpLmFkZENsYXNzKFwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWxnXCIpO1xyXG4gICAgJC5nZXQoXCJzZXNzaW9uL3NpemVcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHBhcnNlSW50KGRhdGEpIC8gUEFHRV9TSVpFKSArIDE7XHJcbiAgICAgICAgdmFyIHByZXZEaXNhYmxlZCA9IChpbmRleCA9PT0gMCA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIG5leHREaXNhYmxlZCA9IChpbmRleCA9PT0gc2l6ZSAtIDEgPyAnZGlzYWJsZWQnIDogJycpO1xyXG4gICAgICAgIHZhciBwcmV2ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBwcmV2RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIiBkYXRhLW5leHQ9XCItMVwiIHRhYmluZGV4PVwiLTFcIj5QcmV2aW91czwvYT4nKTtcclxuICAgICAgICB2YXIgbmV4dCA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgbmV4dERpc2FibGVkICsgJ1wiPjwvbGk+JykuYXBwZW5kKCc8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGRhdGEtbmV4dD1cIjFcIiBocmVmPVwiI1wiPk5leHQ8L2E+Jyk7XHJcblxyXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChwcmV2KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgYWN0aXZlICsgJ1wiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1pbmRleD1cIicgKyBpICsgJ1wiIGhyZWY9XCIjXCI+JyArIChpICsgMSkgKyAnPC9hPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKG5leHQpO1xyXG4gICAgICAgICQocGFnZSkuaHRtbChodG1sRWxlbWVudCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbG9hZEhpc3RvcnlJbmRleCwgbG9hZEhpc3RvcnksIGxvYWRIaXN0b3J5TGlzdCwgb3Blbkhpc3RvcnkgfSIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IGZyb250IGZyb20gJy4vZnJvbnQvaW5kZXgnO1xyXG5pbXBvcnQgcm91dGUgZnJvbSAnLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlci9pbmRleCc7XHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4vbWFwL2luZGV4J1xyXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuL2hpc3RvcnkvaW5kZXgnXHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJy4vc2Vzc2lvbi9pbmRleCdcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyBhIG5ldyBvYmplY3QgaW4gdGhlIHdpbmRvdyBuYW1lbHkgUXVlcnlTdHJpbmcgdGhhdCBjb250YWlucyBldmVyeSBnZXQgcGFyYW1ldGVyIGZyb20gdGhlIGN1cnJlbnQgVVJMIGFzIGEgcHJvcGVydHlcclxuICovXHJcbndpbmRvdy5RdWVyeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgYW5vbnltb3VzLCBpcyBleGVjdXRlZCBpbW1lZGlhdGVseSBhbmQgXHJcbiAgICAvLyB0aGUgcmV0dXJuIHZhbHVlIGlzIGFzc2lnbmVkIHRvIFF1ZXJ5U3RyaW5nIVxyXG4gICAgdmFyIHF1ZXJ5X3N0cmluZyA9IHt9O1xyXG4gICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xyXG5cclxuICAgICAgICAvLyBJZiBmaXJzdCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICAgICAgICAgICAgLy8gSWYgc2Vjb25kIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbcXVlcnlfc3RyaW5nW3BhaXJbMF1dLCBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSldO1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBhcnI7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dLnB1c2goZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5X3N0cmluZztcclxufSgpO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqIEluaXQgc2hhcmVkICovXHJcbiAgICBmcm9udC5nZXRfcm93SW5mbyhmYWxzZSwgXCJcIik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLm1haW4nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZyb250LmxvYWRNYWluKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcjdXNlcicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdXNlci5sb2FkVXNlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnI2hpc3RvcnktcGFnZSBhJywgaGlzdG9yeS5vcGVuSGlzdG9yeSk7XHJcblxyXG4gICAgLy9UT0RPOiByZWZhY3RvcnlcclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyNyb3V0ZS1wYWdlIGEnLCByb3V0ZS5vcGVuUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5uYXYtbGluaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCgnI21haW4tbmF2JykuZmluZChcIi5uYXYtaXRlbVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLnNlc3Npb25zJywgc2Vzc2lvbi5jbGlja1Nlc3Npb24pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2EjaGlzdG9yeScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeUluZGV4KDAsIDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJsb2FkLW1hcFwiLCAnLmdweC10cmFjaycsIG1hcFV0aWxzLmxvYWRHcHhNYXApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdGFydFJvdycsIGZyb250LnN0YXJ0Um93KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICdidXR0b24jc3RvcFJvdycsIGZyb250LnN0b3BSb3cpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5lZGl0LXVzZXInLCB1c2VyLmVkaXRVc2VyKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZWRpdC1yb3V0ZScsIHJvdXRlLmVkaXRSb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLnN0cmF2YScsIGZyb250LnVwbG9hZFRvU3RyYXZhKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsLXNlc3Npb24nLCBzZXNzaW9uLmRlbGV0ZVNlc3Npb24pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjc2F2ZS1yb3V0ZVwiLCByb3V0ZS5zYXZlUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjc2F2ZS11c2VyXCIsIHVzZXIuc2F2ZVVzZXIpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5kZWwtdXNlcicsIHVzZXIuZGVsZXRlVXNlcik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC1yb3V0ZScsIHJvdXRlLmRlbGV0ZVJvdXRlKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcucm91dGUtZGV0YWlsJywgcm91dGUuY2xpY2tSb3V0ZURldGFpbCk7XHJcblxyXG4gICAgJCgnI2xvYWQnKS5lYWNoKGZyb250LmxvYWQpO1xyXG5cclxuICAgICQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xyXG5cclxuICAgICQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcjc2hvdy1yb3V0ZS1tb2RhbCcsIHJvdXRlLnNob3dSb3V0ZU1vZGFsKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2hvd24uYnMubW9kYWwnLCAnI3Nob3ctcm91dGUtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gJChlLnJlbGF0ZWRUYXJnZXQpLmRhdGEoJ3JvdXRlLW5hbWUnKTtcclxuICAgICAgICBtYXBVdGlscy5hZGRSb3V0ZVRyYWNrVG9NYXAobmFtZSwgJChcIiNsaXZlLXJvdXRlLW1hcFwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLCAnI3JvdXRlcycsIHJvdXRlLmNoYW5nZVJvdXRlU2VsZWN0KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsInZhciBsaXZlUG9pbnRzID0gW107XHJcbnZhciBsaXZlTWFwO1xyXG52YXIgbGl2ZUJvdW5kcztcclxudmFyIG1hcmtlcnMgPSBbXTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxpdmVQb2ludHMsIGxpdmVNYXAsIGxpdmVCb3VuZHMsIG1hcmtlcnMgfSIsImltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCBzdHJhdmEgZnJvbSAnLi4vdXRpbHMvc3RyYXZhJztcclxuaW1wb3J0IGdyYXBoVXRpbHMgZnJvbSAnLi4vdXRpbHMvZ3JhcGhVdGlscyc7XHJcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcblxyXG4vKiogQWxsIGxvYWQgZnVuY3Rpb25zICovXHJcbnZhciBsb2FkUm91dGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5nZXQoXCIvcm93L3JvdXRlc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBodG1sID0gJyc7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICB2YXIgZ3JvdXAgPSAnJztcclxuICAgICAgICBkYXRhLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChhLmNvdW50cnkgPiBiLmNvdW50cnkpID8gMSA6ICgoYi5jb3VudHJ5ID4gYS5jb3VudHJ5KSA/IC0xIDogMCk7IH0pO1xyXG5cclxuICAgICAgICB2YXIgc2VsZWN0ZWQgPSAnc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiJztcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb3VudHJ5ICE9PSBncm91cCkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPG9wdGdyb3VwIGxhYmVsPVwiJyArIHZhbHVlLmNvdW50cnkgKyAnXCI+JztcclxuICAgICAgICAgICAgICAgIGdyb3VwID0gdmFsdWUuY291bnRyeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uICcgKyBzZWxlY3RlZCArICcgdmFsdWU9XCInICsgdmFsdWUuaW5kZXggKyAnXCIgZGF0YS1uYW1lPVwiJyArIHZhbHVlLm5hbWUgKyAnXCIgZGF0YS1sYXQ9XCInICtcclxuICAgICAgICAgICAgICAgIHZhbHVlLmdwc1swXS5sYXQgKyAnXCIgZGF0YS1sb249XCInICsgdmFsdWUuZ3BzWzBdLmxvbiArICdcIj4nICsgdmFsdWUubmFtZSArICcgKCcgKyB2YWx1ZS5tZXRlcnMgKyAnbSk8L29wdGlvbj4nO1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA9ICcnO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhhdCkuaHRtbChodG1sKTtcclxuXHJcbiAgICAgICAgY2hhbmdlUm91dGVTZWxlY3QoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxudmFyIGNyZWF0ZVJvdXRlUmVjb3JkID0gZnVuY3Rpb24gKGh0bWxUYWJsZSwgaW5kZXgsIHJvdXRlKSB7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0cj4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGggc2NvcGU9XCJyb3dcIj4nICsgKGluZGV4ICsgMSkgKyAnPC90aD4nO1xyXG4gICAgLy9odG1sVGFibGUgKz0gJzx0ZD48YSBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS1yb3V0ZS1uYW1lPVwiJyArIHJvdXRlLm5hbWUgKyAnXCIgZGF0YS10YXJnZXQ9XCIjc2hvdy1yb3V0ZS1tb2RhbFwiIGhyZWY9XCIvcm91dGVzLycgKyByb3V0ZS5uYW1lICsgJ1wiPicgKyByb3V0ZS5uYW1lICsgJzwvYT48L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD48YSBjbGFzcz1cInJvdXRlLWRldGFpbFwiIGRhdGEtcm91dGUtbmFtZT1cIicgKyByb3V0ZS5uYW1lICsgJ1wiIGhyZWY9XCI/cm91dGU9Jysgcm91dGUubmFtZSArJyNyb3V0ZWRldGFpbFwiPicgKyByb3V0ZS5uYW1lICsgJzwvYT48L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgcGFyc2VJbnQocm91dGUubWV0ZXJzKSArICdtPC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+JyArIHJvdXRlLmNvdW50cnkgKyAnPC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+J1xyXG4gICAgaWYgKHJvdXRlLnBlcm1hbmVudCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgIGh0bWxUYWJsZSArPSAnPGEgY2xhc3M9XCJlZGl0LXJvdXRlXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHJvdXRlLm5hbWUgKyAnXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNyZWF0ZTwvaT48L2E+JyArXHJcbiAgICAgICAgICAgICc8YSBjbGFzcz1cImRlbC1yb3V0ZVwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyByb3V0ZS5uYW1lICsgJ1wiPicgK1xyXG4gICAgICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgcm91dGVcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT4nICsgJzwvdGQ+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8aT5EZWZhdWx0PC9pPic7XHJcbiAgICB9XHJcbiAgICBodG1sVGFibGUgKz0gJzwvdHI+JztcclxuICAgIHJldHVybiBodG1sVGFibGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGUobWFpbkluZGV4KSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9yb3V0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZXMtdCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsb2FkUm91dGVUYWJsZSgwKTtcclxuICAgICAgICAgICAgdmFyIHBhZyA9ICQoJyNyb3V0ZXMtdGFibGUnKS5maW5kKCcucGFnZScpO1xyXG4gICAgICAgICAgICBjcmVhdGVSb3V0ZU5hdlBhZ2UocGFnWzBdLCBtYWluSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlTmF2UGFnZShwYWdlLCBpbmRleCkge1xyXG4gICAgdmFyIGh0bWxFbGVtZW50ID0gJCgnPHVsIGlkPVwicm91dGUtcGFnZVwiIGRhdGEtaW5kZXg9XCInICsgaW5kZXggKyAnXCI+PC91bD4nKS5hZGRDbGFzcyhcInBhZ2luYXRpb24gcGFnaW5hdGlvbi1sZ1wiKTtcclxuICAgICQuZ2V0KFwicm91dGVzL3NpemVcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHBhcnNlSW50KGRhdGEpIC8gUEFHRV9TSVpFKSArIDE7XHJcbiAgICAgICAgdmFyIHByZXZEaXNhYmxlZCA9IChpbmRleCA9PT0gMCA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIG5leHREaXNhYmxlZCA9IChpbmRleCA9PT0gc2l6ZSAtIDEgPyAnZGlzYWJsZWQnIDogJycpO1xyXG4gICAgICAgIHZhciBwcmV2ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBwcmV2RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIiBkYXRhLW5leHQ9XCItMVwiIHRhYmluZGV4PVwiLTFcIj5QcmV2aW91czwvYT4nKTtcclxuICAgICAgICB2YXIgbmV4dCA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgbmV4dERpc2FibGVkICsgJ1wiPjwvbGk+JykuYXBwZW5kKCc8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGRhdGEtbmV4dD1cIjFcIiBocmVmPVwiI1wiPk5leHQ8L2E+Jyk7XHJcblxyXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChwcmV2KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgYWN0aXZlICsgJ1wiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1pbmRleD1cIicgKyBpICsgJ1wiIGhyZWY9XCIjXCI+JyArIChpICsgMSkgKyAnPC9hPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKG5leHQpO1xyXG4gICAgICAgICQocGFnZSkuaHRtbChodG1sRWxlbWVudCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFJvdXRlVGFibGUobWFpbkluZGV4KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBtYWluSW5kZXggKiBQQUdFX1NJWkUsIHN0b3AgPSAoKChtYWluSW5kZXggKyAxKSAqIFBBR0VfU0laRSkpIC0gMTtcclxuICAgICQuZ2V0KCcvcm91dGVzLycgKyBzdGFydCArICcvJyArIHN0b3AsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWxUYWJsZSA9ICcnO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb3V0ZSkge1xyXG4gICAgICAgICAgICBodG1sVGFibGUgPSBjcmVhdGVSb3V0ZVJlY29yZChodG1sVGFibGUsIGluZGV4ICsgKG1haW5JbmRleCAqIFBBR0VfU0laRSksIHJvdXRlKTtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI3JvdXRlcy10YWJsZS1ib2R5JykuaHRtbChodG1sVGFibGUpO1xyXG4gICAgICAgICQoJyNhZGQtcm91dGUtbW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbG9hZFJvdXRlKDApO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZWRpdFJvdXRlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3JvdXRlcy8nICsgaWQsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCIjYWRkUm91dGVcIik7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI25hbWUnKS52YWwocmVzdWx0Lm5hbWUpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNtZXRlcnMnKS52YWwocmVzdWx0Lm1ldGVycyk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI3NlZ21lbnRJZCcpLnZhbChyZXN1bHQuc2VnbWVudElkKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjY291bnRyaWVzJykudmFsKHJlc3VsdC5jb3VudHJ5KTtcclxuICAgICAgICAgICAgLy9ncHMucmVwbGFjZSgvKC4qKSwoLiopLCguKikvZ20sICd7IFwibGF0XCI6ICQxLCBcImxvblwiOiAkMiwgXCJlbFwiOiAkMyB9LCcpO1xyXG4gICAgICAgICAgICB2YXIgZ3BzQ3ZzID0gSlNPTi5zdHJpbmdpZnkocmVzdWx0Lmdwcyk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2dwcycpLmFwcGVuZChncHNDdnMpO1xyXG4gICAgICAgICAgICAkKCcjYWRkLXJvdXRlLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd1JvdXRlTW9kYWwoZSkge1xyXG4gICAgdmFyIG5hbWUgPSAkKGUucmVsYXRlZFRhcmdldCkuZGF0YSgncm91dGUtbmFtZScpO1xyXG4gICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgJC5nZXQoXCIvcm91dGVzL1wiICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgdGl0bGUgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgaWYgKGRhdGEuc2VnZW1lbnRJZCkge1xyXG4gICAgICAgICAgICB0aXRsZSA9ICc8YSBjbGFzcz1cInN0cmF2YS1zZWdtZW50XCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3LnN0cmF2YS5jb20vc2VnbWVudHMvJyArIGRhdGEuc2VnZW1lbnRJZCArICcgdGl0bGU9XCJTdHJhdmEgU2VnbWVudCBVcmxcIiBcIj4nICsgdGl0bGUgKyAnIDwvYT4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0LmZpbmQoJyNzaG93LXJvdXRlLW1vZGFsLXRpdGxlJykuaHRtbCh0aXRsZSk7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkRpc3BsYXkgTGVuZ2h0OjwvaDU+JyArIGRhdGEubWV0ZXJzICsgJyBtPC9saT4nO1xyXG4gICAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj5HcHMgTGVuZ2h0OjwvaDU+JyArIGRhdGEuZ3BzTGVuZ2h0ICsgJyBtPC9saT4nO1xyXG4gICAgICAgIGh0bWwgKz0gJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj5Db3VudHJ5OjwvaDU+JyArIGRhdGEuY291bnRyeSArICc8L2xpPic7XHJcbiAgICAgICAgdGhhdC5maW5kKCcuY2FyZCAubGlzdC1ncm91cCcpLmh0bWwoaHRtbCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlUm91dGVTZWxlY3QoKSB7XHJcbiAgICB2YXIgc2VsZWN0ZWQgPSAkKCcjcm91dGVzJykuZmluZChcIjpzZWxlY3RlZFwiKTtcclxuICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XHJcbiAgICB2YXIgbmFtZSA9IHNlbGVjdGVkLmRhdGEoJ25hbWUnKTtcclxuICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtbWFwXCIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlUm91dGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgdmFyIHJlc3VsdCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHJvdXRlP1wiKTtcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBpZCxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlUm91dGUoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgZm9ybSA9ICQoXCIjYWRkUm91dGVcIik7XHJcbiAgICB2YXIgcm91dGUgPSB7fTtcclxuICAgIHJvdXRlLm5hbWUgPSBmb3JtLmZpbmQoJyNuYW1lJykudmFsKCk7XHJcbiAgICByb3V0ZS5tZXRlcnMgPSBmb3JtLmZpbmQoJyNtZXRlcnMnKS52YWwoKTtcclxuICAgIHJvdXRlLnN0cmF2YUlkID0gZm9ybS5maW5kKCcjc2VnbWVudElkJykudmFsKCk7XHJcbiAgICByb3V0ZS5jb3VudHJ5ID0gZm9ybS5maW5kKCcjY291bnRyaWVzJykudmFsKCk7XHJcbiAgICByb3V0ZS5ncHMgPSBmb3JtLmZpbmQoJ3RleHRhcmVhJykudmFsKCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdQVVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB1cmw6IFwiL3JvdXRlcy9hZGRcIixcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShyb3V0ZSksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcjYWRkLXJvdXRlLW1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFJvdXRlRGV0YWlsKG5hbWUpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL3JvdXRlL2RldGFpbHMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgICAgICB2YXIgdGFibGVGdW5jdCA9IGFkZFRvVGFibGUuYmluZCgkKHRoaXMpLmZpbmQoJyNzdHJhdmEtcmVzdWx0JykpO1xyXG4gICAgICAgIHN0cmF2YS5sZWFkZXJib2FyZChuYW1lLCB0YWJsZUZ1bmN0KTtcclxuICAgICAgICBtYXBVdGlscy5hZGRSb3V0ZVRyYWNrVG9NYXAobmFtZSwgJChcIiNsaXZlLW1hcFwiKSk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGUtc3RhdHMnKS5lYWNoKGxvYWRSb3V0ZVN0YXRzLmJpbmQoKHRoaXMpLCBuYW1lKSk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc3RyYXZhLXJlc3VsdCcpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRSb3V0ZVN0YXRzKG5hbWUpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3JvdXRlcy8nICsgbmFtZSxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJzxkaXYgY2xhc3M9XCJjYXJkIGNhcmQtZGVmYXVsdFwiPjxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj48ZGl2IGNsYXNzPVwicm93XCI+J1xyXG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiY29sLW1kLTVcIj48ZGl2IGNsYXNzPVwic3RhdGlzdGljXCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJlc3VsdC5uYW1lICsnPC9kaXY+PGRpdiBjbGFzcz1cImxhYmVsXCI+TmFtZTwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtMlwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0Lm1ldGVycyArJzwvZGl2PjxkaXYgY2xhc3M9XCJsYWJlbFwiPkxlbmdodCAobSk8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiY29sLW1kLTVcIj48ZGl2IGNsYXNzPVwic3RhdGlzdGljXCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJlc3VsdC5jb3VudHJ5ICsnPC9kaXY+PGRpdiBjbGFzcz1cImxhYmVsXCI+Q291bnRyeTwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzwvZGl2PjwvZGl2PjwvZGl2PidcclxuICAgICAgICAgICAgJCh0aGF0KS5maW5kKCcjcm91dGUtc3RhdHMnKS5odG1sKGh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRUb1RhYmxlKGRhdGEpIHtcclxuICAgIHZhciBodG1sID0gJyc7XHJcbiAgICBpZiAoZGF0YS5lbnRyaWVzKSB7XHJcbiAgICAgICAgZGF0YS5lbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj4gPHRoIHNjb3BlPVwicm93XCI+ICcgKyBlbnRyeS5hdGhsZXRlX25hbWUgKyAnIDwvdGg+PHRkPiAnICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KGVudHJ5Lm1vdmluZ190aW1lKSkgKyAnPC90ZD4gPHRkPicgKyBlbnRyeS5zdGFydF9kYXRlICsnPC90ZD48L3RyPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmh0bWwoaHRtbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5Sb3V0ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmV4dCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnbmV4dCcpKSwgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ2luZGV4JykpLFxyXG4gICAgICAgIG1haW5JbmRleCA9IHBhcnNlSW50KCQoJyNyb3V0ZS1wYWdlJykuZGF0YSgnaW5kZXgnKSk7XHJcbiAgICBpZiAoIWlzTmFOKG5leHQpKSB7XHJcbiAgICAgICAgbWFpbkluZGV4ICs9IG5leHQ7XHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihpbmRleCkpIHtcclxuICAgICAgICBtYWluSW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgIHZhciBwYWcgPSAkKCcjcm91dGVzLXRhYmxlJykuZmluZCgnLnBhZ2UnKTtcclxuICAgIGNyZWF0ZVJvdXRlTmF2UGFnZShwYWdbMF0sIG1haW5JbmRleCk7XHJcbiAgICBsb2FkUm91dGVUYWJsZShtYWluSW5kZXgpO1xyXG59XHJcblxyXG52YXIgY2xpY2tSb3V0ZURldGFpbCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgncm91dGUtbmFtZScpO1xyXG4gICAgbG9hZFJvdXRlRGV0YWlsKG5hbWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkUm91dGVzLCBjcmVhdGVSb3V0ZVJlY29yZCwgbG9hZFJvdXRlLCBsb2FkUm91dGVUYWJsZSxcclxuICAgICBjcmVhdGVSb3V0ZU5hdlBhZ2UsIGVkaXRSb3V0ZSwgc2hvd1JvdXRlTW9kYWwsIGNoYW5nZVJvdXRlU2VsZWN0LCBkZWxldGVSb3V0ZSxcclxuc2F2ZVJvdXRlLCBvcGVuUm91dGUsIGxvYWRSb3V0ZURldGFpbCwgY2xpY2tSb3V0ZURldGFpbH0iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgZ3JhcGhVdGlscyBmcm9tICcuLi91dGlscy9ncmFwaFV0aWxzJztcclxuaW1wb3J0IHsgVVBEQVRFX0ZSRVEsIFBBR0VfU0laRSwgUkFUSU9OLCBydW4gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuaW1wb3J0IGZyb250IGZyb20gJy4uL2Zyb250L2luZGV4JztcclxuaW1wb3J0IHJvdXRlIGZyb20gJy4uL3JvdXRlL2luZGV4JztcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi4vdXNlci9pbmRleCc7XHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXHJcbmltcG9ydCBoaXN0b3J5IGZyb20gJy4uL2hpc3RvcnkvaW5kZXgnXHJcblxyXG5cclxuZnVuY3Rpb24gbG9hZFNlc3Npb24obmFtZSkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvc2Vzc2lvbnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGVzJykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNoaXN0b3J5LXNlc3Npb24nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRpdGxlID0gXCJIaXN0b3J5XCI7XHJcbiAgICAgICAgICAgICQuZ2V0KFwiL3Nlc3Npb24vXCIgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSBmcm9udC5nZXRIdG1sKHRpdGxlLCBkYXRhLmVuZFN0YXRzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICQoJyNyb3V0ZXMnKS52YWwoZGF0YS5yb3V0ZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjc2Vzc2lvbi11c2VyJykudmFsKGRhdGEudXNlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaHRtbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyN0YWJsZS1jb250ZW50JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjbGFwcy1ib2R5JykuaHRtbChnZXRMYXBIdG1sKHRpdGxlLCBkYXRhLmVuZFN0YXRzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwVXRpbHMuYWRkR3B4VHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtbWFwXCIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdyYXBoVXRpbHMuYWRkR3JhcGgoZGF0YS5yYXcsIGRhdGEucmF3SHIsIHBhcnNlSW50KGRhdGEuc3RhcnQpLCBkYXRhLnN0cm9rZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldExhcEh0bWwobGFiZWwsIGpzb24sIHJldmVyc2UpIHtcclxuICAgIHZhciBodG1sID0gJyc7XHJcbiAgICBpZiAocGFyc2VJbnQoanNvbi50b3RhbExhcHMpID4gMCkge1xyXG4gICAgICAgIHZhciBsYXBOdW0gPSAxO1xyXG4gICAgICAgIHZhciBsYXBzID0ganNvbi5sYXBzO1xyXG4gICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIGxhcHMucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICBsYXBOdW0gPSBsYXBzLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFwcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0aCBzY29wZT1cInJvd1wiPicgKyBsYXBOdW0gKyAnPC90aD48dGQ+JyArIHBhcnNlSW50KHZhbHVlLm1ldGVycykgKyAnPC90ZD48dGQ+JyArIHV0aWxzLmZtdE1TUyhwYXJzZUludCh2YWx1ZS5zZWNvbmRzKSkgKyAnPC90ZD4nO1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsdWUud2F0dCkgKiAxMCkgLyAxMCArICd3PC90ZD48L3RyPic7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhcE51bS0tO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXBOdW0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbDtcclxufVxyXG5cclxuXHJcbnZhciBjbGlja1Nlc3Npb24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgIGxvYWRTZXNzaW9uKG5hbWUpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZGVsZXRlU2Vzc2lvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgdmFyIHJlc3VsdCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHNlc3Npb24/XCIpO1xyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9zZXNzaW9uL2RlbC8nICsgbmFtZSxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU2Vzc2lvbiBkZWxldGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeUluZGV4KDAsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbG9hZFNlc3Npb24sIGNsaWNrU2Vzc2lvbiwgZ2V0TGFwSHRtbCwgZGVsZXRlU2Vzc2lvbiB9IiwiXHJcbnZhciBsb2FkVXNlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmdldChcIi91c2Vyc1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBodG1sID0gJyc7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8b3B0aW9uIHZhbHVlPVwiJyArIHZhbHVlLmlkICsgJ1wiPicgKyB2YWx1ZS5maXJzdE5hbWUgKyAnICcgKyB2YWx1ZS5sYXN0TmFtZSArICc8L29wdGlvbj4nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGF0KS5odG1sKGh0bWwpXHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGVkaXRVc2VyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiAnL3VzZXJzLycgKyBpZCxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIiNhZGRVc2VyRm9ybVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjZmlyc3ROYW1lJykudmFsKHJlc3VsdC5maXJzdE5hbWUpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNsYXN0TmFtZScpLnZhbChyZXN1bHQubGFzdE5hbWUpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyN1c2VySWQnKS52YWwocmVzdWx0LmlkKTtcclxuICAgICAgICAgICAgJC5nZXQoJy9zdHJhdmEvdXJsJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBkYXRhLnVybC5yZXBsYWNlKFwiJTI0XCIsIHJlc3VsdC5pZCk7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3RyYXZhLXVybCcpLmF0dHIoJ2hyZWYnLCB1cmwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNvbm5lY3QgPSAkKFwiLnN0cmF2YS1jb25uZWN0XCIpO1xyXG4gICAgICAgICAgICBjb25uZWN0LnJlbW92ZUNsYXNzKFwic3Itb25seVwiKTtcclxuICAgICAgICAgICAgJCgnI2FkZFVzZXJNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRVc2VyKCkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvdXNlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyN1c2Vycy1ib2R5JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgJC5nZXQoXCIvdXNlcnMvXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBkYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGQ+PGEgaHJlZj1cIiNcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjdXNlclN0YXRzTW9kYWxcIiBkYXRhLWlkPVwiJyArIHVzZXIuaWQgKyAnXCI+JyArIChpICsgMSkgKyAnPC9hPjwvdGQ+PHRkPicgKyB1c2VyLmZpcnN0TmFtZSArICc8L3RkPjx0ZD4nICsgdXNlci5sYXN0TmFtZSArICc8L3RkPic7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRkPjxhIGNsYXNzPVwiZWRpdC11c2VyXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHVzZXIuaWQgKyAnXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmNyZWF0ZTwvaT48L2E+PGEgY2xhc3M9XCJkZWwtdXNlclwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyB1c2VyLmlkICsgJ1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiRGVsZXRlIHVzZXJcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZGVsZXRlPC9pPjwvYT48L3RkPicgKyAnPC90cj4nXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKHRoYXQpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFVzZXIoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVVc2VyKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGZvcm0gPSAkKFwiI2FkZFVzZXJGb3JtXCIpO1xyXG4gICAgdmFyIGZpcnN0TmFtZSA9IGZvcm0uZmluZCgnI2ZpcnN0TmFtZScpLnZhbCgpO1xyXG4gICAgdmFyIGxhc3ROYW1lID0gZm9ybS5maW5kKCcjbGFzdE5hbWUnKS52YWwoKTtcclxuICAgIHZhciBpZCA9IGZvcm0uZmluZCgnI3VzZXJJZCcpLnZhbCgpO1xyXG4gICAgdmFyIHVzZXIgPSB7fTtcclxuICAgIHVzZXIuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgdXNlci5sYXN0TmFtZSA9IGxhc3ROYW1lO1xyXG4gICAgdXNlci5pZCA9IGlkO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdXJsOiBcIi91c2Vycy9hZGRcIixcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh1c2VyKSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNhZGRVc2VyTW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZGVsZXRlVXNlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGU/XCIpO1xyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy91c2Vycy8nICsgaWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbG9hZFVzZXJzLCBsb2FkVXNlciwgZWRpdFVzZXIsIHNhdmVVc2VyLCBkZWxldGVVc2VyIH0iLCJleHBvcnQgY29uc3QgUkFUSU9OID0gKDEwMCAvIDQuODA1KSAqIDY7XHJcbmV4cG9ydCBjb25zdCBQQUdFX1NJWkUgPSAxMDtcclxuZXhwb3J0IGNvbnN0IFVQREFURV9GUkVRID0gMTAwMDtcclxuZXhwb3J0IHZhciBydW4gPSBmYWxzZTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IFJBVElPTiwgUEFHRV9TSVpFLCBVUERBVEVfRlJFUSwgcnVuIH0iLCJpbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04sIHJ1biB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gYWRkR3JhcGgodGltZSwgaHIsIHN0YXJ0LCBzdHJva2VzKSB7XHJcbiAgICB2YXIgc3BlZWQgPSBbXTtcclxuICAgIHZhciB3YXR0ID0gW107XHJcbiAgICB2YXIgc3Ryb2tlID0gW107XHJcbiAgICB2YXIgc3Ryb2tlQ29udGVyID0gMTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGltZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0aW1lVmFsID0gcGFyc2VJbnQodGltZVtpXSk7XHJcbiAgICAgICAgdmFyIHN0cm9rZVRpbWUgPSBwYXJzZUludChzdHJva2VzW3N0cm9rZUNvbnRlcl0pO1xyXG4gICAgICAgIHZhciBzZWMgPSAoKHRpbWVWYWwgLSBzdGFydCkgLyAxMDAwKTtcclxuICAgICAgICB2YXIgbGVuZ2h0ID0gKFJBVElPTiAvIDEwMCk7XHJcbiAgICAgICAgc3BlZWQucHVzaCgoKGxlbmdodCAvIHNlYykpICogMy42KTtcclxuICAgICAgICB2YXIgd2F0dFZhbHVlID0gdXRpbHMuY2FsY1dhdHQoc2VjIC8gbGVuZ2h0KTtcclxuICAgICAgICB3YXR0LnB1c2god2F0dFZhbHVlKTtcclxuICAgICAgICBzdHJva2UucHVzaCgxMDAwKjYwIC8gKHN0cm9rZVRpbWUgLSBwYXJzZUludChzdHJva2VzW3N0cm9rZUNvbnRlci0xXSkpKTtcclxuICAgICAgICBzdGFydCA9IHBhcnNlSW50KHRpbWVbaV0pO1xyXG4gICAgICAgIGlmICh0aW1lVmFsID4gc3Ryb2tlVGltZSkge1xyXG4gICAgICAgICAgICBzdHJva2VDb250ZXIrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZW1vdmUgZXZlciBzZWNvbmQgZWxlbWVudFxyXG4gICAgdmFyIHNwZWVkTWVyZ2VkID0gW107XHJcbiAgICB2YXIgaHJNZXJnZWQgPSBbXTtcclxuICAgIHZhciB3YXR0TWVyZ2VkID0gW107XHJcbiAgICB2YXIgc3Ryb2tlTWVyZ2VkID0gW107XHJcbiAgICB2YXIgbGFiZWxzTWVyZ2VkID0gW107XHJcbiAgICB2YXIgbWVyZ2VTaXplID0gMTA7XHJcbiAgICBpZiAodGltZS5sZW5ndGggPiAxMDAwKSB7XHJcbiAgICAgICAgbWVyZ2VTaXplID0gMjA7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKHRpbWUubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aW1lLnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgIHZhciB0aW1lViA9IHBhcnNlSW50KGEucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBhLmxlbmd0aCk7XHJcbiAgICAgICAgbGFiZWxzTWVyZ2VkLnB1c2gobmV3IERhdGUodGltZVYpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKG5ldyBEYXRlKHRpbWVWKS50b0lTT1N0cmluZygpLmxhc3RJbmRleE9mKCdUJykgKyAxLCA4KSk7XHJcbiAgICAgICAgaWYgKGhyKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gaHIuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGhyTWVyZ2VkLnB1c2gocGFyc2VJbnQoaC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIGgubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0cm9rZSkge1xyXG4gICAgICAgICAgICB2YXIgaCA9IHN0cm9rZS5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgaWYgKGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlTWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KGgucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBoLmxlbmd0aCkgKiAxMCkgLyAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNwZWVkKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gc3BlZWQuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIHZhciB3ID0gd2F0dC5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgaWYgKHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRNZXJnZWQucHVzaChNYXRoLnJvdW5kKHBhcnNlRmxvYXQocy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIHMubGVuZ3RoKSAqIDEwKSAvIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAody5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3YXR0TWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KHcucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyB3Lmxlbmd0aCkgKiAxMCkgLyAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN0eCA9ICQoJyNoci1ncmFwaCcpO1xyXG4gICAgdmFyIGxpbmVDaGFydERhdGEgPSB7XHJcbiAgICAgICAgbGFiZWxzOiBsYWJlbHNNZXJnZWQsXHJcbiAgICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnSGVhcnQgcmF0ZSAoYnBtKScsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2RjMzU0NScsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNkYzM1NDUnLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogaHJNZXJnZWQsXHJcbiAgICAgICAgICAgIC8vIGN1YmljSW50ZXJwb2xhdGlvbk1vZGU6ICdtb25vdG9uZScsXHJcbiAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtMScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NwZWVkIChrbS90KScsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzAwN2JmZicsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogc3BlZWRNZXJnZWQsXHJcbiAgICAgICAgICAgIC8vY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcclxuICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy0yJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnV2F0dCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM0YmMwYzAnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzRiYzBjMCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHdhdHRNZXJnZWQsXHJcbiAgICAgICAgICAgICAgICBsaW5lVGVuc2lvbjogMCxcclxuICAgICAgICAgICAgICAgIC8vY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcclxuICAgICAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtMydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdHJva2UgcmF0ZSAoc3BtKScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM5OTY2RkYnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzk5NjZGRicsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHN0cm9rZU1lcmdlZCxcclxuICAgICAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtNCdcclxuICAgICAgICAgICAgfV1cclxuICAgIH07XHJcbiAgICB2YXIgbXlMaW5lQ2hhcnQgPSBDaGFydC5MaW5lKGN0eCwge1xyXG4gICAgICAgIGRhdGE6IGxpbmVDaGFydERhdGEsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBob3Zlck1vZGU6ICdpbmRleCcsXHJcbiAgICAgICAgICAgIHN0YWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RlZE1pbjogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBncmlkIGxpbmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSAvLyBvbmx5IHdhbnQgdGhlIGdyaWQgbGluZXMgZm9yIG9uZSBheGlzIHRvIHNob3cgdXBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDI1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWQgbGluZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogZmFsc2UgLy8gb25seSB3YW50IHRoZSBncmlkIGxpbmVzIGZvciBvbmUgYXhpcyB0byBzaG93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRNaW46IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncmlkIGxpbmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGFkZEdyYXBoIH1cclxuIiwiaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXHJcblxyXG5jb25zdCBzdHlsZXMgPSBbe1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSwgeyBcImxpZ2h0bmVzc1wiOiA2NSB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LCB7IFwibGlnaHRuZXNzXCI6IDUxIH0sXHJcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfV1cclxufSwge1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSxcclxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5hcnRlcmlhbFwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSxcclxuICAgICAgICB7IFwibGlnaHRuZXNzXCI6IDMwIH0sIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5sb2NhbFwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSxcclxuICAgICAgICB7IFwibGlnaHRuZXNzXCI6IDQwIH0sIHsgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSxcclxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxyXG59LCB7IFwiZmVhdHVyZVR5cGVcIjogXCJhZG1pbmlzdHJhdGl2ZS5wcm92aW5jZVwiLCBcInN0eWxlcnNcIjogW3sgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCIgfV0gfSxcclxuICAgIHsgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIiwgXCJzdHlsZXJzXCI6IFt7IFwidmlzaWJpbGl0eVwiOiBcIm9uXCIgfSwgeyBcImxpZ2h0bmVzc1wiOiAtMjUgfSwgeyBcInNhdHVyYXRpb25cIjogLTEwMCB9XSB9LFxyXG4gICAgeyBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsIFwic3R5bGVyc1wiOiBbeyBcImh1ZVwiOiBcIiNmZmZmMDBcIiB9LCB7IFwibGlnaHRuZXNzXCI6IC0yNSB9LCB7IFwic2F0dXJhdGlvblwiOiAtOTcgfV0gfV07XHJcblxyXG5mdW5jdGlvbiBjbGVhbk1hcCgpIHtcclxuICAgIGluaXRNYXAoKTtcclxuICAgIG1hcC5saXZlUG9pbnRzID0gW107XHJcbiAgICBtYXAubWFya2VycyA9IFtdO1xyXG4gICAgdmFyIHBvbHkgPSBjcmVhdGVQb2x5TGluZShtYXAubGl2ZVBvaW50cyk7XHJcbiAgICBwb2x5LnNldE1hcChtYXAubGl2ZU1hcCk7XHJcblxyXG4gICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgaWYgKHR5cGVvZiBtYXAubGl2ZU1hcC5maXRCb3VuZHMgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcclxuICAgIH1cclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICB2YXIgbWFwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtbWFwJyk7XHJcbiAgICBpZiAobWFwRGl2KSB7XHJcbiAgICAgICAgbWFwLmxpdmVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcERpdiwge1xyXG4gICAgICAgICAgICB6b29tOiA4LFxyXG4gICAgICAgICAgICBtYXhab29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcC5saXZlQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xyXG4gICAgICAgIG1hcC5saXZlTWFwLnNldCgnc3R5bGVzJywgc3R5bGVzKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9UT0RPOiBDaGFuZ2UgY29sb3IgYnkgc3BlZWQgb3IgaHIuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBvbHlMaW5lKHBvaW50cykge1xyXG4gICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZSh7XHJcbiAgICAgICAgcGF0aDogcG9pbnRzLFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwQUFcIixcclxuICAgICAgICBzdHJva2VPcGFjaXR5OiAuNyxcclxuICAgICAgICBzdHJva2VXZWlnaHQ6IDRcclxuICAgIH0pO1xyXG59XHJcblxyXG52YXIgYWRkUm91dGVUcmFja1RvTWFwID0gZnVuY3Rpb24gKG5hbWUsIGVsZW1lbnQpIHtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiAnL3JvdXRlcy8nICsgbmFtZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnRbMF0sIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0KCdzdHlsZXMnLCBzdHlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGF0YS5ncHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ID0gcG9pbnQubGF0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb24gPSBwb2ludC5sb247XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHBvbHkuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgYWRkR3B4VHJhY2tUb01hcCA9IGZ1bmN0aW9uIChuYW1lLCBlbGVtZW50KSB7XHJcbiAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9zZXNzaW9ucy8nICsgbmFtZSArICcuZ3B4JyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHhtbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZWxlbWVudFswXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb206IDE2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0KCdzdHlsZXMnLCBzdHlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJCh4bWwpLmZpbmQoXCJ0cmtwdFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0ID0gJCh0aGlzKS5hdHRyKFwibGF0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb24gPSAkKHRoaXMpLmF0dHIoXCJsb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIHBvbHkuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBsb2FkR3B4TWFwKCkge1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgIHZhciBlbGVtZW50ID0gJCh0aGlzKS5maW5kKCcuY2FyZC1tYXAtdG9wJyk7XHJcbiAgICBhZGRHcHhUcmFja1RvTWFwKG5hbWUsIGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNYXJrZXIocCwgdGl0bGUsIHJvdW5kKSB7XHJcbiAgICBtYXAubWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOnAsXHJcbiAgICAgICAgbWFwOiBtYXAubGl2ZU1hcCxcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgbGFiZWw6IHJvdW5kXHJcbiAgICB9KSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY2xlYW5NYXAsIGluaXRNYXAsIHN0eWxlcywgYWRkUm91dGVUcmFja1RvTWFwLCBhZGRHcHhUcmFja1RvTWFwLCBsb2FkR3B4TWFwLFxyXG4gICAgY3JlYXRlUG9seUxpbmUsIGFkZE1hcmtlciB9IiwiXHJcbmZ1bmN0aW9uIGxlYWRlcmJvYXJkKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAkLmdldCgnL3N0cmF2YS9yb3V0ZS9sZWFkZXJib2FyZC8nICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2VnbWVudChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgJC5nZXQoJy9zdHJhdmEvcm91dGUvJyArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoZGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxlYWRlcmJvYXJkLCBzZWdtZW50IH0iLCJjb25zdCBXQVRUX1JBVElPTiA9IDIuODA7XHJcblxyXG5mdW5jdGlvbiBjYWxjV2F0dChwYWNlKSB7XHJcbiAgICByZXR1cm4gV0FUVF9SQVRJT04gLyBNYXRoLnBvdyhwYWNlLCAzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKG5hbWUpIHtcclxuICAgIHJldHVybiBtb21lbnQobmFtZS5zbGljZSgwLCAxMykgKyAnOicgKyBuYW1lLnNsaWNlKDEzLDE1KSArICc6JyArIG5hbWUuc2xpY2UoMTUpKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRIZWFydFJhdGVDb2xvcihocikge1xyXG4gICAgaWYgKGhyIDwgMTI1KSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXN1Y2Nlc3MnXHJcbiAgICB9IGVsc2UgaWYgKGhyIDwgMTUwKSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXByaW1hcnknXHJcbiAgICB9IGVsc2UgaWYgKGhyIDwgMTc1KSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXdhcm5pbmcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtZGFuZ2VyJztcclxuICAgIH1cclxufVxyXG5cclxudmFyIGdldFVybFBhcmFtZXRlciA9IGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihzUGFyYW0pIHtcclxuICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXHJcbiAgICAgICAgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCcmJyksXHJcbiAgICAgICAgc1BhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNQYXJhbWV0ZXJOYW1lID0gc1VSTFZhcmlhYmxlc1tpXS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc1BhcmFtZXRlck5hbWVbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzUGFyYW1ldGVyTmFtZVsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmbXRNU1Mocykge1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShudWxsKTtcclxuICAgIGRhdGUuc2V0U2Vjb25kcyhzKTsgLy8gc3BlY2lmeSB2YWx1ZSBmb3IgU0VDT05EUyBoZXJlXHJcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGdldCBwYXJhbWV0ZXIgZnJvbSBhIFVSTCAoZmlyc3QgYXJndW1lbnQpIGFzIGEgcHJvcGVydHlcclxuICogXHJcbiAqIEBwYXJhbSBVUkwge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIFF1ZXJ5U3RyaW5nKFVSTCkge1xyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhbm9ueW1vdXMsIGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5IGFuZCBcclxuICAgIC8vIHRoZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gUXVlcnlTdHJpbmchXHJcbiAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XHJcbiAgICB2YXIgdXNlZnVsUGFyYW0gPSBVUkwuc3BsaXQoXCI/XCIpWzFdIHx8IFwiXCI7XHJcbiAgICB2YXIgcXVlcnkgPSB1c2VmdWxQYXJhbSB8fCBcIlwiO1xyXG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJZiBmaXJzdCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICAgICAgICAgICAgLy8gSWYgc2Vjb25kIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbcXVlcnlfc3RyaW5nW3BhaXJbMF1dLCBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSldO1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBhcnI7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dLnB1c2goZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5X3N0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBjYWxjV2F0dCwgc2Vzc2lvbk5hbWVUb1JlYWRhYmxlLCBnZXRIZWFydFJhdGVDb2xvciwgZ2V0VXJsUGFyYW1ldGVyLCBmbXRNU1MsIFxyXG4gICAgUXVlcnlTdHJpbmcgfVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==