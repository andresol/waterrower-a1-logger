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
        console.log(laps);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9mcm9udC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvcm91dGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9zZXNzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL3V0aWxzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9ncmFwaFV0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9zdHJhdmEuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRWUsZ0VBQUM7QUFDaEIsaUJBQWlCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcHVibGljL2pzL3NyYy9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IHJvdXRlIGZyb20gJy4uL3JvdXRlL2luZGV4JztcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi4vdXNlci9pbmRleCc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscydcclxuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgZ2xvYmFscyBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuaW1wb3J0IHNlc3Npb24gZnJvbSAnLi4vc2Vzc2lvbi9pbmRleCc7XHJcbmltcG9ydCBtYXAgZnJvbSAnLi4vbWFwL2luZGV4J1xyXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuLi9oaXN0b3J5L2luZGV4J1xyXG5cclxudmFyIHRpbWVPdXQ7XHJcblxyXG5mdW5jdGlvbiBsb2FkTWFpbigpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL21haW4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGVzJykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKTtcclxuICAgICAgICAkLmdldChcIi9yb3cvc3RhdHVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCByb3dpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnUk9XSU5HJykge1xyXG4gICAgICAgICAgICAgICAgcm93aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydEJ1dHRvbiA9ICQoJyNzdGFydFJvdycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHV0aWxzLmdldFVybFBhcmFtZXRlcihcInRlc3RcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbiA9ICQoJyNzdGFydFNpbXVsYXRvcicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFydChzdGFydEJ1dHRvbiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZS5jaGFuZ2VSb3V0ZVNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vUnVuIHNpbXVsYXRvciBpZiB0ZXN0LlxyXG4gICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICQoJyNzdGFydFJvdycpLmF0dHIoXCJpZFwiLCBcInN0YXJ0U2ltdWxhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGxvYWRUb1N0cmF2YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgJC5nZXQoaHJlZiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBhbGVydChcIlVwbG9hZGVkIHRvIHN0cmF2YSFcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRSb3coZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHJvdXRlcyA9ICQoJyNyb3V0ZXMnKS52YWwoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3Jvdy9zdGFydFwiLCB7IHJvdXRlczogcm91dGVzIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdGFydCh0aGF0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wUm93KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJyNtYWluLW5hdicpLnNob3coKTtcclxuICAgICQod2luZG93KS5zY3JvbGxUb3AoJCgnI21haW4tbmF2Jykub2Zmc2V0KCkudG9wKTtcclxuICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lT3V0KTtcclxuICAgIGdsb2JhbHMucnVuID0gZmFsc2U7XHJcbiAgICB2YXIgcm91dGVzID0gJCgnI3JvdXRlcycpLnZhbCgpO1xyXG4gICAgdmFyIHVzZXIgPSAkKCcjc2Vzc2lvbi11c2VyJykudmFsKCk7XHJcbiAgICAkLmdldChcIi9yb3cvc3RvcFwiLCB7IHJvdXRlczogcm91dGVzLCB1c2VyOiB1c2VyIH0sIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgJCgnI3RhYmxlLWNvbnRlbnQnKS5odG1sKGdldEh0bWwoXCJTdG9wcGVkXCIsIGRhdGEsIGZhbHNlKSk7XHJcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gJChcIiNzdGFydFJvd1wiKTtcclxuICAgICAgICBzdGFydFJvdy5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIHN0YXJ0Um93LnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICBzdGFydFJvdy5odG1sKCdTdGFydCByb3cnKTtcclxuICAgICAgICB0aGF0LmFkZENsYXNzKCdkLW5vbmUnKTtcclxuICAgICAgICAkKCcjcm91dGVzJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAkKCcjc2Vzc2lvbi11c2VyJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgICAgICAkKFwiI3N0YXJ0U2ltdWxhdG9yXCIpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnQoc3RhcnRCdXR0b24sIGxvYWRNYXA9ZmFsc2UpIHtcclxuICAgICQoJyNtYWluLW5hdicpLmhpZGUoKTtcclxuICAgICQod2luZG93KS5zY3JvbGxUb3AoJCgnI21haW4nKS5vZmZzZXQoKS50b3ApOyAvL1Njcm9sbFxyXG4gICAgaWYgKGxvYWRNYXApIHtcclxuICAgICAgICBtYXBVdGlscy5jbGVhbk1hcCgpO1xyXG4gICAgICAgIHZhciByb3dJbmZvID0gZ2V0X3Jvd0luZm8uYmluZChudWxsLCB0cnVlLCBcIlJvd2luZ1wiKTtcclxuICAgICAgICBtYXBVdGlscy5hZGRTZXNzaW9uVHJhY2tUb01hcChyb3dJbmZvKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdldF9yb3dJbmZvKHRydWUsIFwiUm93aW5nXCIpO1xyXG4gICAgICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XHJcbiAgICB9XHJcbiAgICAkKCcjcm91dGVzJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICQoJyNzZXNzaW9uLXVzZXInKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJChcIiNzdGFydFNpbXVsYXRvclwiKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJChzdGFydEJ1dHRvbikuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICQoc3RhcnRCdXR0b24pLmh0bWwoJ1Jvd2luZy4uLicpO1xyXG4gICAgJChzdGFydEJ1dHRvbikuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgJCgnI3N0b3BSb3cnKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9yb3dJbmZvKGNvbnRpbnVlcywgdGl0bGUpIHtcclxuICAgIGdsb2JhbHMucnVuID0gY29udGludWVzO1xyXG4gICAgJC5nZXQoXCIvcm93XCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSBnZXRIdG1sKHRpdGxlLCBkYXRhKTtcclxuICAgICAgICBpZiAoaHRtbCkge1xyXG4gICAgICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgICQoJyNsYXBzLWJvZHknKS5odG1sKHNlc3Npb24uZ2V0TGFwSHRtbCh0aXRsZSwgZGF0YSwgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB2YXIgbGF0ID0gZGF0YS5ncHMubGF0O1xyXG4gICAgICAgICAgICB2YXIgbG9uID0gZGF0YS5ncHMubG9uO1xyXG4gICAgICAgICAgICB2YXIgcCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsb24pO1xyXG4gICAgICAgICAgICBpZiAobWFwLm1hcmtlcnMubGVuZ3RoIDwgZGF0YS50b3RhbExhcHMgKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBVdGlscy5hZGRNYXJrZXIocCwgXCJSdW5kZTogXCIgKyBkYXRhLnRvdGFsTGFwcywgU3RyaW5nKGRhdGEudG90YWxMYXBzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWFwLmxpdmVQb2ludHMucHVzaChwKTtcclxuICAgICAgICAgICAgaWYgKG1hcC5saXZlQm91bmRzKSB7XHJcbiAgICAgICAgICAgICAgICBtYXAubGl2ZUJvdW5kcy5leHRlbmQocCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9seSA9IG1hcFV0aWxzLmNyZWF0ZVBvbHlMaW5lKG1hcC5saXZlUG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIHBvbHkuc2V0TWFwKG1hcC5saXZlTWFwKTtcclxuICAgICAgICAgICAgICAgIG1hcC5saXZlTWFwLmZpdEJvdW5kcyhtYXAubGl2ZUJvdW5kcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSkuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGdsb2JhbHMucnVuKSB7XHJcbiAgICAgICAgICAgIHRpbWVPdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgZ2V0X3Jvd0luZm8odHJ1ZSwgdGl0bGUpOyB9LCBnbG9iYWxzLlVQREFURV9GUkVRKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZCgpIHtcclxuICAgIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XHJcbiAgICBzd2l0Y2ggKGhhc2gpIHtcclxuICAgICAgICBjYXNlICcjcm91dGUnOlxyXG4gICAgICAgICAgICByb3V0ZS5sb2FkUm91dGUoMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyN1c2VyJzpcclxuICAgICAgICAgICAgdXNlci5sb2FkVXNlcigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcjaGlzdG9yeSc6XHJcbiAgICAgICAgICAgIGhpc3RvcnkubG9hZEhpc3RvcnkoMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyNzZXNzaW9uJzpcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSB1dGlscy5RdWVyeVN0cmluZyh3aW5kb3cubG9jYXRpb24uaHJlZilbXCJuYW1lXCJdLnJlcGxhY2UoJyNzZXNzaW9uJyxcIlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XHJcbiAgICAgICAgICAgIHNlc3Npb24ubG9hZFNlc3Npb24obmFtZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyNyb3V0ZWRldGFpbCc6XHJcbiAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZURldGFpbCh1dGlscy5RdWVyeVN0cmluZyh3aW5kb3cubG9jYXRpb24uaHJlZilbXCJyb3V0ZVwiXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGxvYWRNYWluKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRIdG1sKGxhYmVsLCBqc29uLCBkYXkpIHtcclxuICAgIGlmIChwYXJzZUludChqc29uLm1ldGVycykgPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaWYgKGRheSkge1xyXG4gICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5EYXk8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIGpzb24uc3RhcnQuc3Vic3RyKDIsIGpzb24uc3RhcnQubGFzdEluZGV4T2YoJ1QnKSAtIDIpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+U3RhcnQ6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBqc29uLnN0YXJ0LnN1YnN0cihqc29uLnN0YXJ0Lmxhc3RJbmRleE9mKCdUJykgKyAxLCA4KSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlRpbWU6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5zZWNvbmRzKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5MZW5ndGg6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBwYXJzZUludChqc29uLm1ldGVycykgKyAnIG0gKCcgKyBqc29uLnBlcmNlbnQgKyAnKTwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+UGFjZTo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdChqc29uLnBhY2UpICogMy42ICogMTApIC8gMTAgKyAnIGttL3Q8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjUwMG06PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5sYXBQYWNlKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj4yazo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChqc29uLnRvd0tQYWNlKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5BdmcuVzo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdChqc29uLndhdHQpICogMTApIC8gMTAgKyAndzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+U1I6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi5zdHJva2UpICogMTApIC8gMTAgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGlmIChwYXJzZUludChqc29uLmhyKSA+IDApIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+SFI6PC9kaXY+PGRpdiBjbGFzcz1cImNvbCAnICsgdXRpbHMuZ2V0SGVhcnRSYXRlQ29sb3IocGFyc2VJbnQoanNvbi5ocikpICsgJ1wiPicgKyBwYXJzZUludChqc29uLmhyKSArIChwYXJzZUludChqc29uLmF2Z0hyKSA+IDAgPyAnKCcgKyBwYXJzZUludChqc29uLmF2Z0hyKSArICcpJyA6ICcnKSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgaWYgKGpzb24uZmlsZU5hbWUpIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+QWN0aW9uczo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+PGEgaHJlZj1cIi9zZXNzaW9ucy8nICsganNvbi5maWxlTmFtZTtcclxuICAgICAgICBodG1sICs9ICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsganNvbi5uYW1lO1xyXG4gICAgICAgIGh0bWwgKz0gJ1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiVXBsb2FkIHRvIHN0cmF2YVwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG91ZF91cGxvYWQ8L2k+PC9hPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGEgY2xhc3M9XCJzZXNzaW9uc1wiIGRhdGEtbmFtZT1cIicgKyBqc29uLm5hbWUgKyAnXCIgaHJlZj1cIi9zZXNzaW9uc1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiU2Vzc2lvblwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWJlcl9uZXc8L2k+PC9hPjwvZGl2PjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbCArIFwiXCI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRNYWluLCBzdGFydCwgZ2V0X3Jvd0luZm8sIGdldEh0bWwsIHN0YXJ0Um93LCBzdG9wUm93LCBsb2FkLCB1cGxvYWRUb1N0cmF2YSB9OyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5SW5kZXgoaW5kZXgpIHtcclxuICAgIGxvYWRIaXN0b3J5KGluZGV4KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEhpc3RvcnkobWFpbkluZGV4KSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9oaXN0b3J5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3RvcnknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9hZExhc3QzU2Vzc2lvbnMoKTtcclxuICAgICAgICAgICAgbG9hZEhpc3RvcnlMaXN0KCQodGhpcyksIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZExhc3QzU2Vzc2lvbnMoKSB7XHJcbiAgICAkLmdldCgnL3Nlc3Npb24vJyArIDAgKyAnLycgKyAyLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBodG1sQ2FyZHMgPSAnJztcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHNlc3Npb24pIHtcclxuICAgICAgICAgICAgaHRtbENhcmRzID0gY3JlYXRlQ2FyZChodG1sQ2FyZHMsIHNlc3Npb24pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjY2FyZHMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiY29sXCI+PGRpdiBjbGFzcz1cImNhcmQtZGVja1wiPicgKyBodG1sQ2FyZHMgKyAnPC9kaXY+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnLmdweC10cmFjaycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJsb2FkLW1hcFwiLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUxpc3QodGhhdCwgbWFpbkluZGV4KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBtYWluSW5kZXggKiBQQUdFX1NJWkUsIHN0b3AgPSAoKChtYWluSW5kZXggKyAxKSAqIFBBR0VfU0laRSkpIC0gMTtcclxuICAgICQuZ2V0KCcvc2Vzc2lvbi8nICsgc3RhcnQgKyAnLycgKyBzdG9wLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQuZ2V0KCcvdXNlcnMnLCBmdW5jdGlvbiAodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGh0bWxUYWJsZSA9ICcnLCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB1c2VyTWFwID0gdXNlcnMucmVkdWNlKGZ1bmN0aW9uKG1hcCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBbb2JqLmlkXSA9IG9iajtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXA7XHJcbiAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sVGFibGUgPSBjcmVhdGVMYXBUYWJsZVJlY29yZChodG1sVGFibGUsIGluZGV4ICsgKG1haW5JbmRleCAqIFBBR0VfU0laRSksIHNlc3Npb24sIHVzZXJNYXApO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjaGlzdG9yLXRhYmxlLWJvZHknKS5odG1sKGh0bWxUYWJsZSk7XHJcbiAgICAgICAgICAgIHZhciBwYWcgPSB0aGF0LmZpbmQoJy5wYWdlJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUhpc3RvcnlOYXZQYWdlKHBhZywgbWFpbkluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuSGlzdG9yeShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmV4dCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnbmV4dCcpKSwgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ2luZGV4JykpLFxyXG4gICAgICAgIG1haW5JbmRleCA9IHBhcnNlSW50KCQoJyNoaXN0b3J5LXBhZ2UnKS5kYXRhKCdpbmRleCcpKTtcclxuICAgIGlmICghaXNOYU4obmV4dCkpIHtcclxuICAgICAgICBtYWluSW5kZXggKz0gbmV4dDtcclxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGluZGV4KSkge1xyXG4gICAgICAgIG1haW5JbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgbG9hZEhpc3RvcnlMaXN0KCQoJyNoaXN0b3J5LXRhYmxlJyksIG1haW5JbmRleCk7XHJcbn1cclxuXHJcblxyXG52YXIgY3JlYXRlQ2FyZCA9IGZ1bmN0aW9uIChodG1sQ2FyZHMsIHNlc3Npb24pIHtcclxuICAgIGh0bWxDYXJkcyArPSAnPGRpdiBjbGFzcz1cImNhcmQgZ3B4LXRyYWNrXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIlwiPic7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8ZGl2IGNsYXNzPVwiY2FyZC1tYXAtdG9wIFwiPjwvZGl2Pic7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxoNSBjbGFzcz1cImNhcmQtdGl0bGUgbXQtMlwiPjxhIGNsYXNzPVwic2Vzc2lvbnNcIiBkYXRhLW5hbWU9XCInICsgc2Vzc2lvbi5uYW1lICsgJ1wiIGhyZWY9XCIvc2Vzc2lvblwiPicgKyB1dGlscy5zZXNzaW9uTmFtZVRvUmVhZGFibGUoc2Vzc2lvbi5uYW1lKSArICc8L2E+PC9oNT4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8cCBjbGFzcz1cImNhcmQtdGV4dFwiPkxlbmd0aDogJyArIHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMubWV0ZXJzKSArICdtLCBUaW1lOiAnICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMuc2Vjb25kcykpICsgJzwvcD4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8YSBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIHNlc3Npb24ubmFtZSArICdcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBzdHJhdmEgYnRuLWJsb2NrXCI+VXBsb2FkIHRvIFN0cmF2YTwvYT4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8L2Rpdj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8L2Rpdj4nO1xyXG4gICAgcmV0dXJuIGh0bWxDYXJkcztcclxufTtcclxuXHJcbnZhciBjcmVhdGVMYXBUYWJsZVJlY29yZCA9IGZ1bmN0aW9uIChodG1sVGFibGUsIGluZGV4LCBzZXNzaW9uLCB1c2VyTWFwKSB7XHJcbiAgICB2YXIgdXNlciA9IHVzZXJNYXBbc2Vzc2lvbi51c2VyXTtcclxuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0aCBzY29wZT1cInJvd1wiPicgKyAoaW5kZXggKyAxKSArICc8L3RoPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD48YSBjbGFzcz1cInNlc3Npb25zXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIiBocmVmPVwiLz9uYW1lPScrc2Vzc2lvbi5uYW1lKycjc2Vzc2lvblwiPicgKyB1dGlscy5zZXNzaW9uTmFtZVRvUmVhZGFibGUoc2Vzc2lvbi5uYW1lKSArICc8L2E+PC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+TGVuZ3RoOiAnICsgcGFyc2VJbnQoc2Vzc2lvbi5lbmRTdGF0cy5tZXRlcnMpICsgJ208L3RkPic7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUgKyAnPC90ZD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzx0ZD48L3RkPic7XHJcbiAgICB9XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4gPGEgaHJlZj1cIi9zZXNzaW9ucy8nICsgc2Vzc2lvbi5uYW1lICsgJy5ncHhcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2XCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsgc2Vzc2lvbi5uYW1lICsgJ1wiPicgK1xyXG4gICAgICAgICc8aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlVwbG9hZCB0byBTdHJhdmFcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2IHN0cmF2YS1pY29uXCI+Y2xvdWRfdXBsb2FkPC9pPjwvYT4gPGEgY2xhc3M9XCJkZWwtc2Vzc2lvblwiIGhyZWY9XCIjXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIj4nICtcclxuICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgc2Vzc2lvbiBsb2NhbFwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWQtMzZcIj5kZWxldGU8L2k+PC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPC90cj4nO1xyXG4gICAgcmV0dXJuIGh0bWxUYWJsZTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnlOYXZQYWdlKHBhZ2UsIGluZGV4KSB7XHJcbiAgICB2YXIgaHRtbEVsZW1lbnQgPSAkKCc8dWwgaWQ9XCJoaXN0b3J5LXBhZ2VcIiBkYXRhLWluZGV4PVwiJyArIGluZGV4ICsgJ1wiPjwvdWw+JykuYWRkQ2xhc3MoXCJwYWdpbmF0aW9uIHBhZ2luYXRpb24tbGdcIik7XHJcbiAgICAkLmdldChcInNlc3Npb24vc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQocGFyc2VJbnQoZGF0YSkgLyBQQUdFX1NJWkUpICsgMTtcclxuICAgICAgICB2YXIgcHJldkRpc2FibGVkID0gKGluZGV4ID09PSAwID8gJ2Rpc2FibGVkJyA6ICcnKTtcclxuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIHByZXYgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIHByZXZEaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiIGRhdGEtbmV4dD1cIi0xXCIgdGFiaW5kZXg9XCItMVwiPlByZXZpb3VzPC9hPicpO1xyXG4gICAgICAgIHZhciBuZXh0ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBuZXh0RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1uZXh0PVwiMVwiIGhyZWY9XCIjXCI+TmV4dDwvYT4nKTtcclxuXHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKHByZXYpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBhY3RpdmUgKyAnXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCIgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nKTtcclxuICAgICAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQobmV4dCk7XHJcbiAgICAgICAgJChwYWdlKS5odG1sKGh0bWxFbGVtZW50KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkSGlzdG9yeUluZGV4LCBsb2FkSGlzdG9yeSwgbG9hZEhpc3RvcnlMaXN0LCBvcGVuSGlzdG9yeSB9IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgZnJvbnQgZnJvbSAnLi9mcm9udC9pbmRleCc7XHJcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlL2luZGV4JztcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi91c2VyL2luZGV4JztcclxuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4vdXRpbHMvbWFwVXRpbHMnXHJcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAvaW5kZXgnXHJcbmltcG9ydCBoaXN0b3J5IGZyb20gJy4vaGlzdG9yeS9pbmRleCdcclxuaW1wb3J0IHNlc3Npb24gZnJvbSAnLi9zZXNzaW9uL2luZGV4J1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIGEgbmV3IG9iamVjdCBpbiB0aGUgd2luZG93IG5hbWVseSBRdWVyeVN0cmluZyB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGdldCBwYXJhbWV0ZXIgZnJvbSB0aGUgY3VycmVudCBVUkwgYXMgYSBwcm9wZXJ0eVxyXG4gKi9cclxud2luZG93LlF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhbm9ueW1vdXMsIGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5IGFuZCBcclxuICAgIC8vIHRoZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gUXVlcnlTdHJpbmchXHJcbiAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XHJcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XHJcblxyXG4gICAgICAgIC8vIElmIGZpcnN0IGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gICAgICAgICAgICAvLyBJZiBzZWNvbmQgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtxdWVyeV9zdHJpbmdbcGFpclswXV0sIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKV07XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGFycjtcclxuICAgICAgICAgICAgLy8gSWYgdGhpcmQgb3IgbGF0ZXIgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0ucHVzaChkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVlcnlfc3RyaW5nO1xyXG59KCk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKiogSW5pdCBzaGFyZWQgKi9cclxuICAgIGZyb250LmdldF9yb3dJbmZvKGZhbHNlLCBcIlwiKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcubWFpbicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZnJvbnQubG9hZE1haW4oKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyN1c2VyJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcjaGlzdG9yeS1wYWdlIGEnLCBoaXN0b3J5Lm9wZW5IaXN0b3J5KTtcclxuXHJcbiAgICAvL1RPRE86IHJlZmFjdG9yeVxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnI3JvdXRlLXBhZ2UgYScsIHJvdXRlLm9wZW5Sb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLm5hdi1saW5rJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKCcjbWFpbi1uYXYnKS5maW5kKFwiLm5hdi1pdGVtXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuc2Vzc2lvbnMnLCBzZXNzaW9uLmNsaWNrU2Vzc2lvbik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNoaXN0b3J5JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5SW5kZXgoMCwgMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICdhI3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICByb3V0ZS5sb2FkUm91dGUoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImxvYWQtbWFwXCIsICcuZ3B4LXRyYWNrJywgbWFwVXRpbHMubG9hZEdweE1hcCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYnV0dG9uI3N0YXJ0Um93JywgZnJvbnQuc3RhcnRSb3cpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdG9wUm93JywgZnJvbnQuc3RvcFJvdyk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmVkaXQtdXNlcicsIHVzZXIuZWRpdFVzZXIpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5lZGl0LXJvdXRlJywgcm91dGUuZWRpdFJvdXRlKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuc3RyYXZhJywgZnJvbnQudXBsb2FkVG9TdHJhdmEpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5kZWwtc2Vzc2lvbicsIHNlc3Npb24uZGVsZXRlU2Vzc2lvbik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzYXZlLXJvdXRlXCIsIHJvdXRlLnNhdmVSb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzYXZlLXVzZXJcIiwgdXNlci5zYXZlVXNlcik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC11c2VyJywgdXNlci5kZWxldGVVc2VyKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsLXJvdXRlJywgcm91dGUuZGVsZXRlUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5yb3V0ZS1kZXRhaWwnLCByb3V0ZS5jbGlja1JvdXRlRGV0YWlsKTtcclxuXHJcbiAgICAkKCcjbG9hZCcpLmVhY2goZnJvbnQubG9hZCk7XHJcblxyXG4gICAgJCgnI3JvdXRlcycpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcblxyXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmVhY2godXNlci5sb2FkVXNlcnMpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93LmJzLm1vZGFsJywgJyNzaG93LXJvdXRlLW1vZGFsJywgcm91dGUuc2hvd1JvdXRlTW9kYWwpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsICcjc2hvdy1yb3V0ZS1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSAkKGUucmVsYXRlZFRhcmdldCkuZGF0YSgncm91dGUtbmFtZScpO1xyXG4gICAgICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtcm91dGUtbWFwXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsICcjcm91dGVzJywgcm91dGUuY2hhbmdlUm91dGVTZWxlY3QpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIGxpdmVQb2ludHMgPSBbXTtcclxudmFyIGxpdmVNYXA7XHJcbnZhciBsaXZlQm91bmRzO1xyXG52YXIgbWFya2VycyA9IFtdO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbGl2ZVBvaW50cywgbGl2ZU1hcCwgbGl2ZUJvdW5kcywgbWFya2VycyB9IiwiaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHN0cmF2YSBmcm9tICcuLi91dGlscy9zdHJhdmEnO1xyXG5pbXBvcnQgZ3JhcGhVdGlscyBmcm9tICcuLi91dGlscy9ncmFwaFV0aWxzJztcclxuaW1wb3J0IHsgVVBEQVRFX0ZSRVEsIFBBR0VfU0laRSwgUkFUSU9OLCBydW4gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuXHJcbi8qKiBBbGwgbG9hZCBmdW5jdGlvbnMgKi9cclxudmFyIGxvYWRSb3V0ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3Jvdy9yb3V0ZXNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgdmFyIGdyb3VwID0gJyc7XHJcbiAgICAgICAgZGF0YS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiAoYS5jb3VudHJ5ID4gYi5jb3VudHJ5KSA/IDEgOiAoKGIuY291bnRyeSA+IGEuY291bnRyeSkgPyAtMSA6IDApOyB9KTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gJ3NlbGVjdGVkPVwic2VsZWN0ZWRcIic7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuY291bnRyeSAhPT0gZ3JvdXApIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRncm91cCBsYWJlbD1cIicgKyB2YWx1ZS5jb3VudHJ5ICsgJ1wiPic7XHJcbiAgICAgICAgICAgICAgICBncm91cCA9IHZhbHVlLmNvdW50cnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiAnICsgc2VsZWN0ZWQgKyAnIHZhbHVlPVwiJyArIHZhbHVlLmluZGV4ICsgJ1wiIGRhdGEtbmFtZT1cIicgKyB2YWx1ZS5uYW1lICsgJ1wiIGRhdGEtbGF0PVwiJyArXHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5ncHNbMF0ubGF0ICsgJ1wiIGRhdGEtbG9uPVwiJyArIHZhbHVlLmdwc1swXS5sb24gKyAnXCI+JyArIHZhbHVlLm5hbWUgKyAnICgnICsgdmFsdWUubWV0ZXJzICsgJ20pPC9vcHRpb24+JztcclxuICAgICAgICAgICAgc2VsZWN0ZWQgPSAnJztcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoYXQpLmh0bWwoaHRtbCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbnZhciBjcmVhdGVSb3V0ZVJlY29yZCA9IGZ1bmN0aW9uIChodG1sVGFibGUsIGluZGV4LCByb3V0ZSkge1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dHI+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRoIHNjb3BlPVwicm93XCI+JyArIChpbmRleCArIDEpICsgJzwvdGg+JztcclxuICAgIC8vaHRtbFRhYmxlICs9ICc8dGQ+PGEgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtcm91dGUtbmFtZT1cIicgKyByb3V0ZS5uYW1lICsgJ1wiIGRhdGEtdGFyZ2V0PVwiI3Nob3ctcm91dGUtbW9kYWxcIiBocmVmPVwiL3JvdXRlcy8nICsgcm91dGUubmFtZSArICdcIj4nICsgcm91dGUubmFtZSArICc8L2E+PC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+PGEgY2xhc3M9XCJyb3V0ZS1kZXRhaWxcIiBkYXRhLXJvdXRlLW5hbWU9XCInICsgcm91dGUubmFtZSArICdcIiBocmVmPVwiP3JvdXRlPScrIHJvdXRlLm5hbWUgKycjcm91dGVkZXRhaWxcIj4nICsgcm91dGUubmFtZSArICc8L2E+PC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+JyArIHBhcnNlSW50KHJvdXRlLm1ldGVycykgKyAnbTwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyByb3V0ZS5jb3VudHJ5ICsgJzwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPidcclxuICAgIGlmIChyb3V0ZS5wZXJtYW5lbnQgIT09IHRydWUpIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzxhIGNsYXNzPVwiZWRpdC1yb3V0ZVwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyByb3V0ZS5uYW1lICsgJ1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jcmVhdGU8L2k+PC9hPicgK1xyXG4gICAgICAgICAgICAnPGEgY2xhc3M9XCJkZWwtcm91dGVcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgcm91dGUubmFtZSArICdcIj4nICtcclxuICAgICAgICAgICAgJzxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiRGVsZXRlIHJvdXRlXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmRlbGV0ZTwvaT48L2E+JyArICc8L3RkPic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGh0bWxUYWJsZSArPSAnPGk+RGVmYXVsdDwvaT4nO1xyXG4gICAgfVxyXG4gICAgaHRtbFRhYmxlICs9ICc8L3RyPic7XHJcbiAgICByZXR1cm4gaHRtbFRhYmxlO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9hZFJvdXRlKG1haW5JbmRleCkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvcm91dGUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjcm91dGVzLXQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9hZFJvdXRlVGFibGUoMCk7XHJcbiAgICAgICAgICAgIHZhciBwYWcgPSAkKCcjcm91dGVzLXRhYmxlJykuZmluZCgnLnBhZ2UnKTtcclxuICAgICAgICAgICAgY3JlYXRlUm91dGVOYXZQYWdlKHBhZ1swXSwgbWFpbkluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZU5hdlBhZ2UocGFnZSwgaW5kZXgpIHtcclxuICAgIHZhciBodG1sRWxlbWVudCA9ICQoJzx1bCBpZD1cInJvdXRlLXBhZ2VcIiBkYXRhLWluZGV4PVwiJyArIGluZGV4ICsgJ1wiPjwvdWw+JykuYWRkQ2xhc3MoXCJwYWdpbmF0aW9uIHBhZ2luYXRpb24tbGdcIik7XHJcbiAgICAkLmdldChcInJvdXRlcy9zaXplXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludChwYXJzZUludChkYXRhKSAvIFBBR0VfU0laRSkgKyAxO1xyXG4gICAgICAgIHZhciBwcmV2RGlzYWJsZWQgPSAoaW5kZXggPT09IDAgPyAnZGlzYWJsZWQnIDogJycpO1xyXG4gICAgICAgIHZhciBuZXh0RGlzYWJsZWQgPSAoaW5kZXggPT09IHNpemUgLSAxID8gJ2Rpc2FibGVkJyA6ICcnKTtcclxuICAgICAgICB2YXIgcHJldiA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgcHJldkRpc2FibGVkICsgJ1wiPjwvbGk+JykuYXBwZW5kKCc8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9XCIjXCIgZGF0YS1uZXh0PVwiLTFcIiB0YWJpbmRleD1cIi0xXCI+UHJldmlvdXM8L2E+Jyk7XHJcbiAgICAgICAgdmFyIG5leHQgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIG5leHREaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLW5leHQ9XCIxXCIgaHJlZj1cIiNcIj5OZXh0PC9hPicpO1xyXG5cclxuICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQocHJldik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGFjdGl2ZSA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IGkpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZSA9IFwiYWN0aXZlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIGFjdGl2ZSArICdcIj48YSBjbGFzcz1cInBhZ2UtbGlua1wiIGRhdGEtaW5kZXg9XCInICsgaSArICdcIiBocmVmPVwiI1wiPicgKyAoaSArIDEpICsgJzwvYT48L2xpPicpO1xyXG4gICAgICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChuZXh0KTtcclxuICAgICAgICAkKHBhZ2UpLmh0bWwoaHRtbEVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRSb3V0ZVRhYmxlKG1haW5JbmRleCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gbWFpbkluZGV4ICogUEFHRV9TSVpFLCBzdG9wID0gKCgobWFpbkluZGV4ICsgMSkgKiBQQUdFX1NJWkUpKSAtIDE7XHJcbiAgICAkLmdldCgnL3JvdXRlcy8nICsgc3RhcnQgKyAnLycgKyBzdG9wLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBodG1sVGFibGUgPSAnJztcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcclxuICAgICAgICAgICAgaHRtbFRhYmxlID0gY3JlYXRlUm91dGVSZWNvcmQoaHRtbFRhYmxlLCBpbmRleCArIChtYWluSW5kZXggKiBQQUdFX1NJWkUpLCByb3V0ZSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNyb3V0ZXMtdGFibGUtYm9keScpLmh0bWwoaHRtbFRhYmxlKTtcclxuICAgICAgICAkKCcjYWRkLXJvdXRlLW1vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxvYWRSb3V0ZSgwKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGVkaXRSb3V0ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9yb3V0ZXMvJyArIGlkLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiI2FkZFJvdXRlXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNuYW1lJykudmFsKHJlc3VsdC5uYW1lKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjbWV0ZXJzJykudmFsKHJlc3VsdC5tZXRlcnMpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNzZWdtZW50SWQnKS52YWwocmVzdWx0LnNlZ21lbnRJZCk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2NvdW50cmllcycpLnZhbChyZXN1bHQuY291bnRyeSk7XHJcbiAgICAgICAgICAgIC8vZ3BzLnJlcGxhY2UoLyguKiksKC4qKSwoLiopL2dtLCAneyBcImxhdFwiOiAkMSwgXCJsb25cIjogJDIsIFwiZWxcIjogJDMgfSwnKTtcclxuICAgICAgICAgICAgdmFyIGdwc0N2cyA9IEpTT04uc3RyaW5naWZ5KHJlc3VsdC5ncHMpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNncHMnKS5hcHBlbmQoZ3BzQ3ZzKTtcclxuICAgICAgICAgICAgJCgnI2FkZC1yb3V0ZS1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dSb3V0ZU1vZGFsKGUpIHtcclxuICAgIHZhciBuYW1lID0gJChlLnJlbGF0ZWRUYXJnZXQpLmRhdGEoJ3JvdXRlLW5hbWUnKTtcclxuICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcclxuICAgICQuZ2V0KFwiL3JvdXRlcy9cIiArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gZGF0YS5uYW1lO1xyXG4gICAgICAgIGlmIChkYXRhLnNlZ2VtZW50SWQpIHtcclxuICAgICAgICAgICAgdGl0bGUgPSAnPGEgY2xhc3M9XCJzdHJhdmEtc2VnbWVudFwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5zdHJhdmEuY29tL3NlZ21lbnRzLycgKyBkYXRhLnNlZ2VtZW50SWQgKyAnIHRpdGxlPVwiU3RyYXZhIFNlZ21lbnQgVXJsXCIgXCI+JyArIHRpdGxlICsgJyA8L2E+JztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5maW5kKCcjc2hvdy1yb3V0ZS1tb2RhbC10aXRsZScpLmh0bWwodGl0bGUpO1xyXG4gICAgICAgIHZhciBodG1sID0gJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxoNSBjbGFzcz1cImNhcmQtdGl0bGVcIj5EaXNwbGF5IExlbmdodDo8L2g1PicgKyBkYXRhLm1ldGVycyArICcgbTwvbGk+JztcclxuICAgICAgICBodG1sICs9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+R3BzIExlbmdodDo8L2g1PicgKyBkYXRhLmdwc0xlbmdodCArICcgbTwvbGk+JztcclxuICAgICAgICBodG1sICs9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+Q291bnRyeTo8L2g1PicgKyBkYXRhLmNvdW50cnkgKyAnPC9saT4nO1xyXG4gICAgICAgIHRoYXQuZmluZCgnLmNhcmQgLmxpc3QtZ3JvdXAnKS5odG1sKGh0bWwpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZVJvdXRlU2VsZWN0KCkge1xyXG4gICAgdmFyIHNlbGVjdGVkID0gJCgnI3JvdXRlcycpLmZpbmQoXCI6c2VsZWN0ZWRcIik7XHJcbiAgICBtYXBVdGlscy5jbGVhbk1hcCgpO1xyXG4gICAgdmFyIG5hbWUgPSBzZWxlY3RlZC5kYXRhKCduYW1lJyk7XHJcbiAgICBtYXBVdGlscy5hZGRSb3V0ZVRyYWNrVG9NYXAobmFtZSwgJChcIiNsaXZlLW1hcFwiKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVJvdXRlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSByb3V0ZT9cIik7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3JvdXRlcy8nICsgaWQsXHJcbiAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZS5sb2FkUm91dGUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVJvdXRlKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGZvcm0gPSAkKFwiI2FkZFJvdXRlXCIpO1xyXG4gICAgdmFyIHJvdXRlID0ge307XHJcbiAgICByb3V0ZS5uYW1lID0gZm9ybS5maW5kKCcjbmFtZScpLnZhbCgpO1xyXG4gICAgcm91dGUubWV0ZXJzID0gZm9ybS5maW5kKCcjbWV0ZXJzJykudmFsKCk7XHJcbiAgICByb3V0ZS5zdHJhdmFJZCA9IGZvcm0uZmluZCgnI3NlZ21lbnRJZCcpLnZhbCgpO1xyXG4gICAgcm91dGUuY291bnRyeSA9IGZvcm0uZmluZCgnI2NvdW50cmllcycpLnZhbCgpO1xyXG4gICAgcm91dGUuZ3BzID0gZm9ybS5maW5kKCd0ZXh0YXJlYScpLnZhbCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUFVUJyxcclxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdXJsOiBcIi9yb3V0ZXMvYWRkXCIsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocm91dGUpLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI2FkZC1yb3V0ZS1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRSb3V0ZURldGFpbChuYW1lKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9yb3V0ZS9kZXRhaWxzJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XHJcbiAgICAgICAgdmFyIHRhYmxlRnVuY3QgPSBhZGRUb1RhYmxlLmJpbmQoJCh0aGlzKS5maW5kKCcjc3RyYXZhLXJlc3VsdCcpKTtcclxuICAgICAgICBzdHJhdmEubGVhZGVyYm9hcmQobmFtZSwgdGFibGVGdW5jdCk7XHJcbiAgICAgICAgbWFwVXRpbHMuYWRkUm91dGVUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlLXN0YXRzJykuZWFjaChsb2FkUm91dGVTdGF0cy5iaW5kKCh0aGlzKSwgbmFtZSkpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3N0cmF2YS1yZXN1bHQnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xyXG5cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGVTdGF0cyhuYW1lKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy9yb3V0ZXMvJyArIG5hbWUsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiY2FyZCBjYXJkLWRlZmF1bHRcIj48ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+PGRpdiBjbGFzcz1cInJvd1wiPidcclxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImNvbC1tZC01XCI+PGRpdiBjbGFzcz1cInN0YXRpc3RpY1wiPjxkaXYgY2xhc3M9XCJ2YWx1ZVwiPicgKyByZXN1bHQubmFtZSArJzwvZGl2PjxkaXYgY2xhc3M9XCJsYWJlbFwiPk5hbWU8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwiY29sLW1kLTJcIj48ZGl2IGNsYXNzPVwic3RhdGlzdGljXCI+PGRpdiBjbGFzcz1cInZhbHVlXCI+JyArIHJlc3VsdC5tZXRlcnMgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5MZW5naHQgKG0pPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImNvbC1tZC01XCI+PGRpdiBjbGFzcz1cInN0YXRpc3RpY1wiPjxkaXYgY2xhc3M9XCJ2YWx1ZVwiPicgKyByZXN1bHQuY291bnRyeSArJzwvZGl2PjxkaXYgY2xhc3M9XCJsYWJlbFwiPkNvdW50cnk8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICBodG1sICs9ICc8L2Rpdj48L2Rpdj48L2Rpdj4nXHJcbiAgICAgICAgICAgICQodGhhdCkuZmluZCgnI3JvdXRlLXN0YXRzJykuaHRtbChodG1sKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkVG9UYWJsZShkYXRhKSB7XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaWYgKGRhdGEuZW50cmllcykge1xyXG4gICAgICAgIGRhdGEuZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+IDx0aCBzY29wZT1cInJvd1wiPiAnICsgZW50cnkuYXRobGV0ZV9uYW1lICsgJyA8L3RoPjx0ZD4gJyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChlbnRyeS5tb3ZpbmdfdGltZSkpICsgJzwvdGQ+IDx0ZD4nICsgZW50cnkuc3RhcnRfZGF0ZSArJzwvdGQ+PC90cj4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5odG1sKGh0bWwpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuUm91dGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5leHQgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ25leHQnKSksIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdpbmRleCcpKSxcclxuICAgICAgICBtYWluSW5kZXggPSBwYXJzZUludCgkKCcjcm91dGUtcGFnZScpLmRhdGEoJ2luZGV4JykpO1xyXG4gICAgaWYgKCFpc05hTihuZXh0KSkge1xyXG4gICAgICAgIG1haW5JbmRleCArPSBuZXh0O1xyXG4gICAgfSBlbHNlIGlmICghaXNOYU4oaW5kZXgpKSB7XHJcbiAgICAgICAgbWFpbkluZGV4ID0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICB2YXIgcGFnID0gJCgnI3JvdXRlcy10YWJsZScpLmZpbmQoJy5wYWdlJyk7XHJcbiAgICBjcmVhdGVSb3V0ZU5hdlBhZ2UocGFnWzBdLCBtYWluSW5kZXgpO1xyXG4gICAgbG9hZFJvdXRlVGFibGUobWFpbkluZGV4KTtcclxufVxyXG5cclxudmFyIGNsaWNrUm91dGVEZXRhaWwgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ3JvdXRlLW5hbWUnKTtcclxuICAgIGxvYWRSb3V0ZURldGFpbChuYW1lKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbG9hZFJvdXRlcywgY3JlYXRlUm91dGVSZWNvcmQsIGxvYWRSb3V0ZSwgbG9hZFJvdXRlVGFibGUsXHJcbiAgICAgY3JlYXRlUm91dGVOYXZQYWdlLCBlZGl0Um91dGUsIHNob3dSb3V0ZU1vZGFsLCBjaGFuZ2VSb3V0ZVNlbGVjdCwgZGVsZXRlUm91dGUsXHJcbnNhdmVSb3V0ZSwgb3BlblJvdXRlLCBsb2FkUm91dGVEZXRhaWwsIGNsaWNrUm91dGVEZXRhaWx9IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IGdyYXBoVXRpbHMgZnJvbSAnLi4vdXRpbHMvZ3JhcGhVdGlscyc7XHJcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcbmltcG9ydCBmcm9udCBmcm9tICcuLi9mcm9udC9pbmRleCc7XHJcbmltcG9ydCByb3V0ZSBmcm9tICcuLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4uL3VzZXIvaW5kZXgnO1xyXG5pbXBvcnQgbWFwVXRpbHMgZnJvbSAnLi4vdXRpbHMvbWFwVXRpbHMnXHJcbmltcG9ydCBtYXAgZnJvbSAnLi4vbWFwL2luZGV4J1xyXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuLi9oaXN0b3J5L2luZGV4J1xyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWRTZXNzaW9uKG5hbWUpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL3Nlc3Npb25zJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlcycpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc2Vzc2lvbi11c2VyJykuZWFjaCh1c2VyLmxvYWRVc2Vycyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjaGlzdG9yeS1zZXNzaW9uJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aXRsZSA9IFwiSGlzdG9yeVwiO1xyXG4gICAgICAgICAgICAkLmdldChcIi9zZXNzaW9uL1wiICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBodG1sID0gZnJvbnQuZ2V0SHRtbCh0aXRsZSwgZGF0YS5lbmRTdGF0cywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcjcm91dGVzJykudmFsKGRhdGEucm91dGUpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3Nlc3Npb24tdXNlcicpLnZhbChkYXRhLnVzZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGh0bWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoZ2V0TGFwSHRtbCh0aXRsZSwgZGF0YS5lbmRTdGF0cykpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcFV0aWxzLmFkZEdweFRyYWNrVG9NYXAobmFtZSwgJChcIiNsaXZlLW1hcFwiKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBncmFwaFV0aWxzLmFkZEdyYXBoKGRhdGEucmF3LCBkYXRhLnJhd0hyLCBwYXJzZUludChkYXRhLnN0YXJ0KSwgZGF0YS5zdHJva2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRMYXBIdG1sKGxhYmVsLCBqc29uLCByZXZlcnNlKSB7XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaWYgKHBhcnNlSW50KGpzb24udG90YWxMYXBzKSA+IDApIHtcclxuICAgICAgICB2YXIgbGFwTnVtID0gMTtcclxuICAgICAgICB2YXIgbGFwcyA9IGpzb24ubGFwcztcclxuICAgICAgICBpZiAocmV2ZXJzZSkge1xyXG4gICAgICAgICAgICBsYXBzLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgbGFwTnVtID0gbGFwcy5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxhcHMuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0cj48dGggc2NvcGU9XCJyb3dcIj4nICsgbGFwTnVtICsgJzwvdGg+PHRkPicgKyBwYXJzZUludCh2YWx1ZS5tZXRlcnMpICsgJzwvdGQ+PHRkPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQodmFsdWUuc2Vjb25kcykpICsgJzwvdGQ+JztcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD4nICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KHZhbHVlLndhdHQpICogMTApIC8gMTAgKyAndzwvdGQ+PC90cj4nO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldmVyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXBOdW0tLTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFwTnVtKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbn1cclxuXHJcblxyXG52YXIgY2xpY2tTZXNzaW9uID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICBsb2FkU2Vzc2lvbihuYW1lKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVNlc3Npb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSBzZXNzaW9uP1wiKTtcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbi9kZWwvJyArIG5hbWUsXHJcbiAgICAgICAgICAgIHR5cGU6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlNlc3Npb24gZGVsZXRlZFwiKTtcclxuICAgICAgICAgICAgICAgIGhpc3RvcnkubG9hZEhpc3RvcnlJbmRleCgwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRTZXNzaW9uLCBjbGlja1Nlc3Npb24sIGdldExhcEh0bWwsIGRlbGV0ZVNlc3Npb24gfSIsIlxyXG52YXIgbG9hZFVzZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5nZXQoXCIvdXNlcnNcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPG9wdGlvbiB2YWx1ZT1cIicgKyB2YWx1ZS5pZCArICdcIj4nICsgdmFsdWUuZmlyc3ROYW1lICsgJyAnICsgdmFsdWUubGFzdE5hbWUgKyAnPC9vcHRpb24+J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhhdCkuaHRtbChodG1sKVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBlZGl0VXNlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogJy91c2Vycy8nICsgaWQsXHJcbiAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB2YXIgZm9ybSA9ICQoXCIjYWRkVXNlckZvcm1cIik7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2ZpcnN0TmFtZScpLnZhbChyZXN1bHQuZmlyc3ROYW1lKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjbGFzdE5hbWUnKS52YWwocmVzdWx0Lmxhc3ROYW1lKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjdXNlcklkJykudmFsKHJlc3VsdC5pZCk7XHJcbiAgICAgICAgICAgICQuZ2V0KCcvc3RyYXZhL3VybCcsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gZGF0YS51cmwucmVwbGFjZShcIiUyNFwiLCByZXN1bHQuaWQpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnN0cmF2YS11cmwnKS5hdHRyKCdocmVmJywgdXJsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBjb25uZWN0ID0gJChcIi5zdHJhdmEtY29ubmVjdFwiKTtcclxuICAgICAgICAgICAgY29ubmVjdC5yZW1vdmVDbGFzcyhcInNyLW9ubHlcIik7XHJcbiAgICAgICAgICAgICQoJyNhZGRVc2VyTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkVXNlcigpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL3VzZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjdXNlcnMtYm9keScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICQuZ2V0KFwiL3VzZXJzL1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VyID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRkPjxhIGhyZWY9XCIjXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI3VzZXJTdGF0c01vZGFsXCIgZGF0YS1pZD1cIicgKyB1c2VyLmlkICsgJ1wiPicgKyAoaSArIDEpICsgJzwvYT48L3RkPjx0ZD4nICsgdXNlci5maXJzdE5hbWUgKyAnPC90ZD48dGQ+JyArIHVzZXIubGFzdE5hbWUgKyAnPC90ZD4nO1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzx0ZD48YSBjbGFzcz1cImVkaXQtdXNlclwiIGhyZWY9XCIjXCIgZGF0YS1pZD1cIicgKyB1c2VyLmlkICsgJ1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jcmVhdGU8L2k+PC9hPjxhIGNsYXNzPVwiZGVsLXVzZXJcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIkRlbGV0ZSB1c2VyXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmRlbGV0ZTwvaT48L2E+PC90ZD4nICsgJzwvdHI+J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGF0KS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgJCgnI2FkZFVzZXJNb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlVXNlcihldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBmb3JtID0gJChcIiNhZGRVc2VyRm9ybVwiKTtcclxuICAgIHZhciBmaXJzdE5hbWUgPSBmb3JtLmZpbmQoJyNmaXJzdE5hbWUnKS52YWwoKTtcclxuICAgIHZhciBsYXN0TmFtZSA9IGZvcm0uZmluZCgnI2xhc3ROYW1lJykudmFsKCk7XHJcbiAgICB2YXIgaWQgPSBmb3JtLmZpbmQoJyN1c2VySWQnKS52YWwoKTtcclxuICAgIHZhciB1c2VyID0ge307XHJcbiAgICB1c2VyLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcclxuICAgIHVzZXIubGFzdE5hbWUgPSBsYXN0TmFtZTtcclxuICAgIHVzZXIuaWQgPSBpZDtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BVVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHVybDogXCIvdXNlcnMvYWRkXCIsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkodXNlciksXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykubW9kYWwoJ2hpZGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRlbGV0ZVVzZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgdmFyIHJlc3VsdCA9IGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlP1wiKTtcclxuICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkLFxyXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdXNlci5sb2FkVXNlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRVc2VycywgbG9hZFVzZXIsIGVkaXRVc2VyLCBzYXZlVXNlciwgZGVsZXRlVXNlciB9IiwiZXhwb3J0IGNvbnN0IFJBVElPTiA9ICgxMDAgLyA0LjgwNSkgKiA2O1xyXG5leHBvcnQgY29uc3QgUEFHRV9TSVpFID0gMTA7XHJcbmV4cG9ydCBjb25zdCBVUERBVEVfRlJFUSA9IDEwMDA7XHJcbmV4cG9ydCB2YXIgcnVuID0gZmFsc2U7XHJcblxyXG5nb29nbGUubWFwcy5MYXRMbmcucHJvdG90eXBlLmttVG8gPSBmdW5jdGlvbihhKXtcclxuICAgIHZhciBlID0gTWF0aCwgcmEgPSBlLlBJLzE4MDtcclxuICAgIHZhciBiID0gdGhpcy5sYXQoKSAqIHJhLCBjID0gYS5sYXQoKSAqIHJhLCBkID0gYiAtIGM7XHJcbiAgICB2YXIgZyA9IHRoaXMubG5nKCkgKiByYSAtIGEubG5nKCkgKiByYTtcclxuICAgIHZhciBmID0gMiAqIGUuYXNpbihlLnNxcnQoZS5wb3coZS5zaW4oZC8yKSwgMikgKyBlLmNvcyhiKSAqIGUuY29zXHJcbiAgICAoYykgKiBlLnBvdyhlLnNpbihnLzIpLCAyKSkpO1xyXG4gICAgcmV0dXJuIGYgKiA2Mzc4LjEzNztcclxufVxyXG5cclxuZ29vZ2xlLm1hcHMuUG9seWxpbmUucHJvdG90eXBlLmluS20gPSBmdW5jdGlvbihuKXtcclxuICAgIHZhciBhID0gdGhpcy5nZXRQYXRoKG4pLCBsZW4gPSBhLmdldExlbmd0aCgpLCBkaXN0ID0gMDtcclxuICAgIGZvcih2YXIgaT0wOyBpPGxlbi0xOyBpKyspe1xyXG4gICAgICAgIGRpc3QgKz0gYS5nZXRBdChpKS5rbVRvKGEuZ2V0QXQoaSsxKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGlzdDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IFJBVElPTiwgUEFHRV9TSVpFLCBVUERBVEVfRlJFUSwgcnVuIH0iLCJpbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04sIHJ1biB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5cclxuZnVuY3Rpb24gYWRkR3JhcGgodGltZSwgaHIsIHN0YXJ0LCBzdHJva2VzKSB7XHJcbiAgICB2YXIgc3BlZWQgPSBbXTtcclxuICAgIHZhciB3YXR0ID0gW107XHJcbiAgICB2YXIgc3Ryb2tlID0gW107XHJcbiAgICB2YXIgc3Ryb2tlQ29udGVyID0gMTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgdGltZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0aW1lVmFsID0gcGFyc2VJbnQodGltZVtpXSk7XHJcbiAgICAgICAgdmFyIHN0cm9rZVRpbWUgPSBwYXJzZUludChzdHJva2VzW3N0cm9rZUNvbnRlcl0pO1xyXG4gICAgICAgIHZhciBzZWMgPSAoKHRpbWVWYWwgLSBzdGFydCkgLyAxMDAwKTtcclxuICAgICAgICB2YXIgbGVuZ2h0ID0gKFJBVElPTiAvIDEwMCk7XHJcbiAgICAgICAgc3BlZWQucHVzaCgoKGxlbmdodCAvIHNlYykpICogMy42KTtcclxuICAgICAgICB2YXIgd2F0dFZhbHVlID0gdXRpbHMuY2FsY1dhdHQoc2VjIC8gbGVuZ2h0KTtcclxuICAgICAgICB3YXR0LnB1c2god2F0dFZhbHVlKTtcclxuICAgICAgICBzdHJva2UucHVzaCgxMDAwKjYwIC8gKHN0cm9rZVRpbWUgLSBwYXJzZUludChzdHJva2VzW3N0cm9rZUNvbnRlci0xXSkpKTtcclxuICAgICAgICBzdGFydCA9IHBhcnNlSW50KHRpbWVbaV0pO1xyXG4gICAgICAgIGlmICh0aW1lVmFsID4gc3Ryb2tlVGltZSkge1xyXG4gICAgICAgICAgICBzdHJva2VDb250ZXIrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZW1vdmUgZXZlciBzZWNvbmQgZWxlbWVudFxyXG4gICAgdmFyIHNwZWVkTWVyZ2VkID0gW107XHJcbiAgICB2YXIgaHJNZXJnZWQgPSBbXTtcclxuICAgIHZhciB3YXR0TWVyZ2VkID0gW107XHJcbiAgICB2YXIgc3Ryb2tlTWVyZ2VkID0gW107XHJcbiAgICB2YXIgbGFiZWxzTWVyZ2VkID0gW107XHJcbiAgICB2YXIgbWVyZ2VTaXplID0gMTA7XHJcbiAgICBpZiAodGltZS5sZW5ndGggPiAxMDAwKSB7XHJcbiAgICAgICAgbWVyZ2VTaXplID0gMjA7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKHRpbWUubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyIGEgPSB0aW1lLnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgIHZhciB0aW1lViA9IHBhcnNlSW50KGEucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBhLmxlbmd0aCk7XHJcbiAgICAgICAgbGFiZWxzTWVyZ2VkLnB1c2gobmV3IERhdGUodGltZVYpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKG5ldyBEYXRlKHRpbWVWKS50b0lTT1N0cmluZygpLmxhc3RJbmRleE9mKCdUJykgKyAxLCA4KSk7XHJcbiAgICAgICAgaWYgKGhyKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gaHIuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGhyTWVyZ2VkLnB1c2gocGFyc2VJbnQoaC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIGgubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0cm9rZSkge1xyXG4gICAgICAgICAgICB2YXIgaCA9IHN0cm9rZS5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgaWYgKGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3Ryb2tlTWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KGgucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBoLmxlbmd0aCkgKiAxMCkgLyAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNwZWVkKSB7XHJcbiAgICAgICAgICAgIHZhciBzID0gc3BlZWQuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIHZhciB3ID0gd2F0dC5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgaWYgKHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3BlZWRNZXJnZWQucHVzaChNYXRoLnJvdW5kKHBhcnNlRmxvYXQocy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIHMubGVuZ3RoKSAqIDEwKSAvIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAody5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB3YXR0TWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KHcucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyB3Lmxlbmd0aCkgKiAxMCkgLyAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGN0eCA9ICQoJyNoci1ncmFwaCcpO1xyXG4gICAgdmFyIGxpbmVDaGFydERhdGEgPSB7XHJcbiAgICAgICAgbGFiZWxzOiBsYWJlbHNNZXJnZWQsXHJcbiAgICAgICAgZGF0YXNldHM6IFt7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnSGVhcnQgcmF0ZSAoYnBtKScsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2RjMzU0NScsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNkYzM1NDUnLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogaHJNZXJnZWQsXHJcbiAgICAgICAgICAgIC8vIGN1YmljSW50ZXJwb2xhdGlvbk1vZGU6ICdtb25vdG9uZScsXHJcbiAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtMScsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NwZWVkIChrbS90KScsXHJcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzAwN2JmZicsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogc3BlZWRNZXJnZWQsXHJcbiAgICAgICAgICAgIC8vY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcclxuICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy0yJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnV2F0dCcsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM0YmMwYzAnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzRiYzBjMCcsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHdhdHRNZXJnZWQsXHJcbiAgICAgICAgICAgICAgICBsaW5lVGVuc2lvbjogMCxcclxuICAgICAgICAgICAgICAgIC8vY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcclxuICAgICAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtMydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdTdHJva2UgcmF0ZSAoc3BtKScsXHJcbiAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyM5OTY2RkYnLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzk5NjZGRicsXHJcbiAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHN0cm9rZU1lcmdlZCxcclxuICAgICAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtNCdcclxuICAgICAgICAgICAgfV1cclxuICAgIH07XHJcbiAgICB2YXIgbXlMaW5lQ2hhcnQgPSBDaGFydC5MaW5lKGN0eCwge1xyXG4gICAgICAgIGRhdGE6IGxpbmVDaGFydERhdGEsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBob3Zlck1vZGU6ICdpbmRleCcsXHJcbiAgICAgICAgICAgIHN0YWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY2FsZXM6IHtcclxuICAgICAgICAgICAgICAgIHlBeGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTEnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RlZE1pbjogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTInLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBncmlkIGxpbmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSAvLyBvbmx5IHdhbnQgdGhlIGdyaWQgbGluZXMgZm9yIG9uZSBheGlzIHRvIHNob3cgdXBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDI1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWQgbGluZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogZmFsc2UgLy8gb25seSB3YW50IHRoZSBncmlkIGxpbmVzIGZvciBvbmUgYXhpcyB0byBzaG93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAneS1heGlzLTQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRNaW46IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncmlkIGxpbmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGFkZEdyYXBoIH1cclxuIiwiaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXHJcblxyXG5cclxuY29uc3Qgc3R5bGVzID0gW3tcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sIHsgXCJsaWdodG5lc3NcIjogNjUgfSxcclxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcIm9uXCIgfV1cclxufSwge1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLCBcInN0eWxlcnNcIjogW3sgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfSwgeyBcImxpZ2h0bmVzc1wiOiA1MSB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sXHJcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfV1cclxufSwge1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sXHJcbiAgICAgICAgeyBcImxpZ2h0bmVzc1wiOiAzMCB9LCB7IFwidmlzaWJpbGl0eVwiOiBcIm9uXCIgfV1cclxufSwge1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sXHJcbiAgICAgICAgeyBcImxpZ2h0bmVzc1wiOiA0MCB9LCB7IFwidmlzaWJpbGl0eVwiOiBcIm9uXCIgfV1cclxufSwge1xyXG4gICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sXHJcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCIgfV1cclxufSwgeyBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmUucHJvdmluY2VcIiwgXCJzdHlsZXJzXCI6IFt7IFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiIH1dIH0sXHJcbiAgICB7IFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLCBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsIFwic3R5bGVyc1wiOiBbeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH0sIHsgXCJsaWdodG5lc3NcIjogLTI1IH0sIHsgXCJzYXR1cmF0aW9uXCI6IC0xMDAgfV0gfSxcclxuICAgIHsgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLCBcInN0eWxlcnNcIjogW3sgXCJodWVcIjogXCIjZmZmZjAwXCIgfSwgeyBcImxpZ2h0bmVzc1wiOiAtMjUgfSwgeyBcInNhdHVyYXRpb25cIjogLTk3IH1dIH1dO1xyXG5cclxuZnVuY3Rpb24gY2xlYW5NYXAoaW5pdCA9IHRydWUpIHtcclxuICAgIGlmIChpbml0KSB7XHJcbiAgICAgICAgaW5pdE1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcC5saXZlUG9pbnRzID0gW107XHJcbiAgICBtYXAubWFya2VycyA9IFtdO1xyXG4gICAgbGV0IHBvbHkgPSBjcmVhdGVQb2x5TGluZShtYXAubGl2ZVBvaW50cyk7XHJcbiAgICBwb2x5LnNldE1hcChtYXAubGl2ZU1hcCk7XHJcblxyXG4gICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgaWYgKHR5cGVvZiBtYXAubGl2ZU1hcCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1hcC5saXZlTWFwLmZpdEJvdW5kcyA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICBtYXAubGl2ZU1hcC5maXRCb3VuZHMobWFwLmxpdmVCb3VuZHMpO1xyXG4gICAgfVxyXG4gICBcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuICAgIGxldCBtYXBEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGl2ZS1tYXAnKTtcclxuICAgIGlmIChtYXBEaXYpIHtcclxuICAgICAgICBtYXAubGl2ZU1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRGl2LCB7XHJcbiAgICAgICAgICAgIHpvb206IDgsXHJcbiAgICAgICAgICAgIG1heFpvb206IDE2XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbWFwLmxpdmVCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICAgICAgbWFwLmxpdmVNYXAuc2V0KCdzdHlsZXMnLCBzdHlsZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL1RPRE86IENoYW5nZSBjb2xvciBieSBzcGVlZCBvciBoci5cclxuZnVuY3Rpb24gY3JlYXRlUG9seUxpbmUocG9pbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLlBvbHlsaW5lKHtcclxuICAgICAgICBwYXRoOiBwb2ludHMsXHJcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDBBQVwiLFxyXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IC43LFxyXG4gICAgICAgIHN0cm9rZVdlaWdodDogNFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbnZhciBhZGRSb3V0ZVRyYWNrVG9NYXAgPSBmdW5jdGlvbiAobmFtZSwgZWxlbWVudCkge1xyXG4gICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBuYW1lLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGdwcyA9IGRhdGEuZ3BzO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hcEVsZW1lbnQgPSBlbGVtZW50WzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb206IDgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTZcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcC5zZXQoJ3N0eWxlcycsIHN0eWxlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBncHMuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGF0ID0gcG9pbnQubGF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb24gPSBwb2ludC5sb247XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG9uKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChwKTtcclxuICAgICAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgcG9seS5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBmaXQgYm91bmRzIHRvIHRyYWNrXHJcbiAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBhZGRHcHhUcmFja1RvTWFwID0gZnVuY3Rpb24gKG5hbWUsIGVsZW1lbnQpIHtcclxuICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnRbMF0sIHtcclxuICAgICAgICB6b29tOiAxNlxyXG4gICAgfSk7XHJcbiAgICB2YXIgc3VjY2VzWG1sID0gYWRkWG1sLmJpbmQobnVsbCwgbWFwKTtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiAnL3Nlc3Npb25zLycgKyBuYW1lICsgJy5ncHgnLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBzdWNjZXNYbWxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBhZGRTZXNzaW9uVHJhY2tUb01hcCA9IGZ1bmN0aW9uIChjb21wbGV0ZSkge1xyXG4gICAgdmFyIHN1Y2Nlc1htbCA9IGFkZFhtbC5iaW5kKG51bGwsIG1hcC5saXZlTWFwKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICB1cmw6ICdyb3cvZ3B4JyxcclxuICAgICAgICBzdWNjZXNzOiBzdWNjZXNYbWwsXHJcbiAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlXHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5mdW5jdGlvbiBhZGRYbWwobWFwLCB4bWwpIHtcclxuICAgIGxldCBwb2ludHMgPSBbXTtcclxuXHJcbiAgICBtYXAuc2V0KCdzdHlsZXMnLCBzdHlsZXMpO1xyXG5cclxuICAgIGxldCBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcbiAgICBsZXQgbGFwcyA9IDE7XHJcbiAgICBsZXQgbWFya2VyID0gMTtcclxuICAgICQoeG1sKS5maW5kKFwidHJrcHRcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGxhdCA9ICQodGhpcykuYXR0cihcImxhdFwiKTtcclxuICAgICAgICBsZXQgbG9uID0gJCh0aGlzKS5hdHRyKFwibG9uXCIpO1xyXG4gICAgICAgIGxldCBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcblxyXG4gICAgICAgIHBvaW50cy5wdXNoKHApO1xyXG4gICAgICAgIGxldCBrbSA9IGNyZWF0ZVBvbHlMaW5lKHBvaW50cykuaW5LbSgpO1xyXG4gICAgICAgIGxhcHMgPSBwYXJzZUludChrbSAvIDAuNSkgKyAxOyAvLyAwLjUgaXMgNTAwIGxhcFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGxhcHMpO1xyXG4gICAgICAgIGlmIChtYXJrZXIgPCBsYXBzICkge1xyXG4gICAgICAgICAgICBhZGRNYXJrZXIocCwgXCJSdW5kZTogXCIgKyAobGFwcy0xKSwgU3RyaW5nKGxhcHMgLSAxKSwgbWFwKTtcclxuICAgICAgICAgICAgbWFya2VyKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvdW5kcy5leHRlbmQocCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgcG9seSA9IGNyZWF0ZVBvbHlMaW5lKHBvaW50cyk7XHJcblxyXG4gICAgcG9seS5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAvLyBmaXQgYm91bmRzIHRvIHRyYWNrXHJcbiAgICBtYXAuZml0Qm91bmRzKGJvdW5kcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRHcHhNYXAoKSB7XHJcbiAgICBsZXQgbmFtZSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSAkKHRoaXMpLmZpbmQoJy5jYXJkLW1hcC10b3AnKTtcclxuICAgIGFkZEdweFRyYWNrVG9NYXAobmFtZSwgZWxlbWVudCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZE1hcmtlcihwLCB0aXRsZSwgcm91bmQsIGxpdmVNYXA9bWFwLmxpdmVNYXApIHtcclxuICAgIG1hcC5tYXJrZXJzLnB1c2gobmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgcG9zaXRpb246cCxcclxuICAgICAgICBtYXA6IGxpdmVNYXAsXHJcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgIGxhYmVsOiByb3VuZFxyXG4gICAgfSkpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNsZWFuTWFwLCBpbml0TWFwLCBzdHlsZXMsIGFkZFJvdXRlVHJhY2tUb01hcCwgYWRkR3B4VHJhY2tUb01hcCwgbG9hZEdweE1hcCxcclxuICAgIGNyZWF0ZVBvbHlMaW5lLCBhZGRNYXJrZXIsIGFkZFNlc3Npb25UcmFja1RvTWFwIH0iLCJcclxuZnVuY3Rpb24gbGVhZGVyYm9hcmQobmFtZSwgY2FsbGJhY2spIHtcclxuICAgICQuZ2V0KCcvc3RyYXZhL3JvdXRlL2xlYWRlcmJvYXJkLycgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZWdtZW50KG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAkLmdldCgnL3N0cmF2YS9yb3V0ZS8nICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjYWxsYmFjay5hcHBseShkYXRhKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbGVhZGVyYm9hcmQsIHNlZ21lbnQgfSIsImNvbnN0IFdBVFRfUkFUSU9OID0gMi44MDtcclxuXHJcbmZ1bmN0aW9uIGNhbGNXYXR0KHBhY2UpIHtcclxuICAgIHJldHVybiBXQVRUX1JBVElPTiAvIE1hdGgucG93KHBhY2UsIDMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXNzaW9uTmFtZVRvUmVhZGFibGUobmFtZSkge1xyXG4gICAgcmV0dXJuIG1vbWVudChuYW1lLnNsaWNlKDAsIDEzKSArICc6JyArIG5hbWUuc2xpY2UoMTMsMTUpICsgJzonICsgbmFtZS5zbGljZSgxNSkpLmZvcm1hdChcIllZWVktTU0tREQgaGg6bW06c3NcIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEhlYXJ0UmF0ZUNvbG9yKGhyKSB7XHJcbiAgICBpZiAoaHIgPCAxMjUpIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtc3VjY2VzcydcclxuICAgIH0gZWxzZSBpZiAoaHIgPCAxNTApIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtcHJpbWFyeSdcclxuICAgIH0gZWxzZSBpZiAoaHIgPCAxNzUpIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtd2FybmluZyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAndGV4dC1kYW5nZXInO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZ2V0VXJsUGFyYW1ldGVyID0gZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHNQYXJhbSkge1xyXG4gICAgdmFyIHNQYWdlVVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpKSxcclxuICAgICAgICBzVVJMVmFyaWFibGVzID0gc1BhZ2VVUkwuc3BsaXQoJyYnKSxcclxuICAgICAgICBzUGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBzVVJMVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgc1BhcmFtZXRlck5hbWUgPSBzVVJMVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIGlmIChzUGFyYW1ldGVyTmFtZVswXSA9PT0gc1BhcmFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzUGFyYW1ldGVyTmFtZVsxXSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IHNQYXJhbWV0ZXJOYW1lWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGZtdE1TUyhzKSB7XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKG51bGwpO1xyXG4gICAgZGF0ZS5zZXRTZWNvbmRzKHMpOyAvLyBzcGVjaWZ5IHZhbHVlIGZvciBTRUNPTkRTIGhlcmVcclxuICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLCA4KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgZXZlcnkgZ2V0IHBhcmFtZXRlciBmcm9tIGEgVVJMIChmaXJzdCBhcmd1bWVudCkgYXMgYSBwcm9wZXJ0eVxyXG4gKiBcclxuICogQHBhcmFtIFVSTCB7U3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gUXVlcnlTdHJpbmcoVVJMKSB7XHJcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGFub255bW91cywgaXMgZXhlY3V0ZWQgaW1tZWRpYXRlbHkgYW5kIFxyXG4gICAgLy8gdGhlIHJldHVybiB2YWx1ZSBpcyBhc3NpZ25lZCB0byBRdWVyeVN0cmluZyFcclxuICAgIHZhciBxdWVyeV9zdHJpbmcgPSB7fTtcclxuICAgIHZhciB1c2VmdWxQYXJhbSA9IFVSTC5zcGxpdChcIj9cIilbMV0gfHwgXCJcIjtcclxuICAgIHZhciBxdWVyeSA9IHVzZWZ1bFBhcmFtIHx8IFwiXCI7XHJcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIElmIGZpcnN0IGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gICAgICAgICAgICAvLyBJZiBzZWNvbmQgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtxdWVyeV9zdHJpbmdbcGFpclswXV0sIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKV07XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGFycjtcclxuICAgICAgICAgICAgLy8gSWYgdGhpcmQgb3IgbGF0ZXIgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0ucHVzaChkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVlcnlfc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGNhbGNXYXR0LCBzZXNzaW9uTmFtZVRvUmVhZGFibGUsIGdldEhlYXJ0UmF0ZUNvbG9yLCBnZXRVcmxQYXJhbWV0ZXIsIGZtdE1TUywgXHJcbiAgICBRdWVyeVN0cmluZyB9XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9