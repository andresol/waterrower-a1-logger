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


/* harmony default export */ __webpack_exports__["default"] = ({ livePoints, liveMap, liveBounds });

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


/* harmony default export */ __webpack_exports__["default"] = ({ cleanMap, initMap, styles, addRouteTrackToMap, addGpxTrackToMap, loadGpxMap,
    createPolyLine });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9mcm9udC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvcm91dGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9zZXNzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL3V0aWxzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9ncmFwaFV0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9zdHJhdmEuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNGO0FBQ0M7QUFDTTtBQUNEO0FBQ0E7QUFDVDtBQUNROztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDLG9EQUFLO0FBQzFDLDJDQUEyQyxtREFBSTtBQUMvQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isb0RBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsWUFBWSxvREFBSztBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpQkFBaUI7QUFDMUM7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBTztBQUNYO0FBQ0E7QUFDQSx3QkFBd0IsNkJBQTZCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0EsSUFBSSx1REFBUTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHNEQUFPO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0RBQU87QUFDeEM7QUFDQTtBQUNBO0FBQ0EsWUFBWSxrREFBRztBQUNmLGdCQUFnQixrREFBRztBQUNuQixnQkFBZ0Isa0RBQUc7QUFDbkIsMkJBQTJCLHVEQUFRLGdCQUFnQixrREFBRztBQUN0RCw0QkFBNEIsa0RBQUc7QUFDL0IsZ0JBQWdCLGtEQUFHLG1CQUFtQixrREFBRztBQUN6Qzs7QUFFQTtBQUNBLEtBQUs7QUFDTCxZQUFZLHNEQUFPO0FBQ25CLDhDQUE4QywwQkFBMEIsRUFBRSxFQUFFLHNEQUFPO0FBQ25GO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvREFBSztBQUNqQjtBQUNBO0FBQ0EsWUFBWSxtREFBSTtBQUNoQjtBQUNBO0FBQ0EsWUFBWSxzREFBTztBQUNuQjtBQUNBO0FBQ0EsWUFBWSxzREFBTyxhQUFhLG9EQUFLO0FBQ3JDO0FBQ0E7QUFDQSxZQUFZLG9EQUFLLGlCQUFpQixvREFBSztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRkFBb0Ysb0RBQUs7QUFDekY7QUFDQTtBQUNBLG9GQUFvRixvREFBSztBQUN6RixrRkFBa0Ysb0RBQUs7QUFDdkY7QUFDQTtBQUNBO0FBQ0EscUZBQXFGLG9EQUFLO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2UsZ0VBQUMsaUZBQWlGLEU7Ozs7Ozs7Ozs7OztBQ3JLakc7QUFBQTtBQUFBO0FBQW1DO0FBQytCOzs7QUFHbEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQSw0QkFBNEIsd0RBQVMsNkJBQTZCLHdEQUFTO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQjtBQUNBLGlGQUFpRix3REFBUztBQUMxRjtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUhBQXVILG9EQUFLO0FBQzVILHFHQUFxRyxvREFBSztBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0hBQXNILG9EQUFLO0FBQzNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qyx3REFBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR2UsZ0VBQUMsOEQ7Ozs7Ozs7Ozs7OztBQ3ZIaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWtDO0FBQ0E7QUFDQTtBQUNGO0FBQ087QUFDVjtBQUNRO0FBQ0E7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsaUJBQWlCO0FBQ3BDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0EsSUFBSSxvREFBSzs7QUFFVDtBQUNBLFFBQVEsb0RBQUs7QUFDYixLQUFLOztBQUVMO0FBQ0EsUUFBUSxtREFBSTtBQUNaLEtBQUs7O0FBRUwsK0NBQStDLHNEQUFPOztBQUV0RDtBQUNBLDZDQUE2QyxvREFBSzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSzs7QUFFTCx5Q0FBeUMsc0RBQU87O0FBRWhEO0FBQ0EsUUFBUSxzREFBTztBQUNmLEtBQUs7O0FBRUw7QUFDQSxRQUFRLG9EQUFLO0FBQ2IsS0FBSzs7QUFFTCw2Q0FBNkMsdURBQVE7O0FBRXJELCtDQUErQyxvREFBSzs7QUFFcEQsOENBQThDLG9EQUFLOztBQUVuRCwwQ0FBMEMsbURBQUk7O0FBRTlDLDJDQUEyQyxvREFBSzs7QUFFaEQsdUNBQXVDLG9EQUFLOztBQUU1Qyw0Q0FBNEMsc0RBQU87O0FBRW5ELDJDQUEyQyxvREFBSzs7QUFFaEQsMENBQTBDLG1EQUFJOztBQUU5Qyx5Q0FBeUMsbURBQUk7O0FBRTdDLDBDQUEwQyxvREFBSzs7QUFFL0MsNkNBQTZDLG9EQUFLOztBQUVsRCxvQkFBb0Isb0RBQUs7O0FBRXpCLHNCQUFzQixvREFBSzs7QUFFM0IsNEJBQTRCLG1EQUFJOztBQUVoQyx5REFBeUQsb0RBQUs7O0FBRTlEO0FBQ0E7QUFDQSxRQUFRLHVEQUFRO0FBQ2hCLEtBQUs7O0FBRUwsd0NBQXdDLG9EQUFLO0FBQzdDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvR0Q7QUFBQTtBQUNBO0FBQ0E7OztBQUdlLGdFQUFDLGtDOzs7Ozs7Ozs7Ozs7QUNMaEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBd0M7QUFDVjtBQUNLO0FBQ0U7QUFDUTtBQUMwQjs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUVBQXlFLEVBQUU7O0FBRTlHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLHdEQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLFVBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsNEJBQTRCLHdEQUFTLDZCQUE2Qix3REFBUztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBFQUEwRSx3REFBUztBQUNuRjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsaUNBQWlDO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxJQUFJLHVEQUFRO0FBQ1o7QUFDQSxJQUFJLHVEQUFRO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsUUFBUSx1REFBUTtBQUNoQjtBQUNBLFFBQVEscURBQU07QUFDZCxRQUFRLHVEQUFRO0FBQ2hCO0FBQ0E7O0FBRUEsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0ZBQXdGLG9EQUFLO0FBQzdGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLGdFQUFDO0FBQ2hCO0FBQ0Esd0Q7Ozs7Ozs7Ozs7OztBQ2pQQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFtQztBQUNVO0FBQzBCO0FBQ3BDO0FBQ0E7QUFDRjtBQUNPO0FBQ1Y7QUFDUTs7O0FBR3RDO0FBQ0E7QUFDQSxxQ0FBcUMsb0RBQUs7QUFDMUMsMkNBQTJDLG1EQUFJO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvREFBSztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVEQUFRO0FBQzVCO0FBQ0EsZ0JBQWdCLHlEQUFVO0FBQzFCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0dBQStHLG9EQUFLO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzREFBTztBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVlLGdFQUFDLHVEOzs7Ozs7Ozs7Ozs7OztBQzdFaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLGlCQUFpQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7QUFHZSxnRUFBQyxzRDs7Ozs7Ozs7Ozs7O0FDN0ZoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU87QUFDQTtBQUNBO0FBQ0E7OztBQUdRLGdFQUFDLHNDOzs7Ozs7Ozs7Ozs7QUNOaEI7QUFBQTtBQUFBO0FBQXVFO0FBQ3BDOztBQUVuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscURBQU07QUFDNUI7QUFDQSx3QkFBd0Isb0RBQUs7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjLEVBQUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsY0FBYyxFQUFFO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsY0FBYyxFQUFFO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixjQUFjLEVBQUU7QUFDakc7QUFDQTtBQUNBLGdGQUFnRixjQUFjLEVBQUU7QUFDaEc7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVlLGdFQUFDLFdBQVc7Ozs7Ozs7Ozs7Ozs7QUNuSzNCO0FBQUE7QUFBOEI7O0FBRTlCO0FBQ0EsNkNBQTZDLHFCQUFxQixHQUFHLGtCQUFrQjtBQUN2RixTQUFTLHFCQUFxQjtBQUM5QixDQUFDO0FBQ0QsdUNBQXVDLHFCQUFxQixHQUFHLGtCQUFrQjtBQUNqRixTQUFTLDZCQUE2QjtBQUN0QyxDQUFDO0FBQ0QsZ0RBQWdELHFCQUFxQjtBQUNyRSxTQUFTLDZCQUE2QjtBQUN0QyxDQUFDO0FBQ0QsaURBQWlELHFCQUFxQjtBQUN0RSxTQUFTLGtCQUFrQixHQUFHLHFCQUFxQjtBQUNuRCxDQUFDO0FBQ0QsOENBQThDLHFCQUFxQjtBQUNuRSxTQUFTLGtCQUFrQixHQUFHLHFCQUFxQjtBQUNuRCxDQUFDO0FBQ0QsMkNBQTJDLHFCQUFxQjtBQUNoRSxTQUFTLDZCQUE2QjtBQUN0QyxDQUFDLEdBQUcsd0RBQXdELHNCQUFzQixHQUFHO0FBQ3JGLEtBQUssK0RBQStELHFCQUFxQixHQUFHLG1CQUFtQixHQUFHLHFCQUFxQixHQUFHO0FBQzFJLEtBQUssaUVBQWlFLG1CQUFtQixHQUFHLG1CQUFtQixHQUFHLG9CQUFvQixHQUFHOztBQUV6STtBQUNBO0FBQ0EsSUFBSSxrREFBRztBQUNQLDhCQUE4QixrREFBRztBQUNqQyxnQkFBZ0Isa0RBQUc7O0FBRW5CO0FBQ0EsZUFBZSxrREFBRztBQUNsQixRQUFRLGtEQUFHLG1CQUFtQixrREFBRztBQUNqQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFHO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRLGtEQUFHO0FBQ1gsUUFBUSxrREFBRztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdlLGdFQUFDO0FBQ2hCLG9COzs7Ozs7Ozs7Ozs7OztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHZSxnRUFBQyx1Qjs7Ozs7Ozs7Ozs7O0FDZGhCO0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSwwQkFBMEI7QUFDekM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLGdFQUFDO0FBQ2hCLGlCQUFpQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCByb3V0ZSBmcm9tICcuLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4uL3VzZXIvaW5kZXgnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnXHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJy4uL3Nlc3Npb24vaW5kZXgnO1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vaGlzdG9yeS9pbmRleCdcclxuXHJcbnZhciB0aW1lT3V0O1xyXG5cclxuZnVuY3Rpb24gbG9hZE1haW4oKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9tYWluJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlcycpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcjc2Vzc2lvbi11c2VyJykuZWFjaCh1c2VyLmxvYWRVc2Vycyk7XHJcbiAgICAgICAgJC5nZXQoXCIvcm93L3N0YXR1c1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdST1dJTkcnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRSb3cnKTtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRTaW11bGF0b3InKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhcnQoc3RhcnRCdXR0b24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vUnVuIHNpbXVsYXRvciBpZiB0ZXN0LlxyXG4gICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICQoJyNzdGFydFJvdycpLmF0dHIoXCJpZFwiLCBcInN0YXJ0U2ltdWxhdG9yXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGxvYWRUb1N0cmF2YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaHJlZiA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgJC5nZXQoaHJlZiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBhbGVydChcIlVwbG9hZGVkIHRvIHN0cmF2YSFcIik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RhcnRSb3coZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIHJvdXRlcyA9ICQoJyNyb3V0ZXMnKS52YWwoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3Jvdy9zdGFydFwiLCB7IHJvdXRlczogcm91dGVzIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdGFydCh0aGF0KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9wUm93KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQoJ21haW4tbmF2Jykuc2hvdygpO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgkKCcjbWFpbi1uYXYnKS5vZmZzZXQoKS50b3ApO1xyXG4gICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xyXG4gICAgZ2xvYmFscy5ydW4gPSBmYWxzZTtcclxuICAgIHZhciByb3V0ZXMgPSAkKCcjcm91dGVzJykudmFsKCk7XHJcbiAgICB2YXIgdXNlciA9ICQoJyNzZXNzaW9uLXVzZXInKS52YWwoKTtcclxuICAgICQuZ2V0KFwiL3Jvdy9zdG9wXCIsIHsgcm91dGVzOiByb3V0ZXMsIHVzZXI6IHVzZXIgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoZ2V0SHRtbChcIlN0b3BwZWRcIiwgZGF0YSwgZmFsc2UpKTtcclxuICAgICAgICB2YXIgc3RhcnRSb3cgPSAkKFwiI3N0YXJ0Um93XCIpO1xyXG4gICAgICAgIHN0YXJ0Um93LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgc3RhcnRSb3cucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgIHN0YXJ0Um93Lmh0bWwoJ1N0YXJ0IHJvdycpO1xyXG4gICAgICAgIHRoYXQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICQoJyNyb3V0ZXMnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoJyNzZXNzaW9uLXVzZXInKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoXCIjc3RhcnRTaW11bGF0b3JcIikucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydChzdGFydEJ1dHRvbikge1xyXG4gICAgJCgnbWFpbi1uYXYnKS5oaWRlKCk7XHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKCQoJyNtYWluJykub2Zmc2V0KCkudG9wKTsgLy9TY3JvbGxcclxuICAgIGdldF9yb3dJbmZvKHRydWUsIFwiUm93aW5nXCIpO1xyXG4gICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgICQoJyNyb3V0ZXMnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKFwiI3N0YXJ0U2ltdWxhdG9yXCIpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJChzdGFydEJ1dHRvbikuaHRtbCgnUm93aW5nLi4uJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKCcjc3RvcFJvdycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3Jvd0luZm8oY29udGludWVzLCB0aXRsZSkge1xyXG4gICAgZ2xvYmFscy5ydW4gPSBjb250aW51ZXM7XHJcbiAgICAkLmdldChcIi9yb3dcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbCA9IGdldEh0bWwodGl0bGUsIGRhdGEpO1xyXG4gICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICQoJyN0YWJsZS1jb250ZW50JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoc2Vzc2lvbi5nZXRMYXBIdG1sKHRpdGxlLCBkYXRhLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBkYXRhLmdwcy5sYXQ7XHJcbiAgICAgICAgICAgIHZhciBsb24gPSBkYXRhLmdwcy5sb247XHJcbiAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgIG1hcC5saXZlUG9pbnRzLnB1c2gocCk7XHJcbiAgICAgICAgICAgIGlmIChtYXAubGl2ZUJvdW5kcykge1xyXG4gICAgICAgICAgICAgICAgbWFwLmxpdmVCb3VuZHMuZXh0ZW5kKHApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvbHkgPSBtYXBVdGlscy5jcmVhdGVQb2x5TGluZShtYXAubGl2ZVBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBwb2x5LnNldE1hcChtYXAubGl2ZU1hcCk7XHJcbiAgICAgICAgICAgICAgICBtYXAubGl2ZU1hcC5maXRCb3VuZHMobWFwLmxpdmVCb3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChnbG9iYWxzLnJ1bikge1xyXG4gICAgICAgICAgICB0aW1lT3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGdldF9yb3dJbmZvKHRydWUsIHRpdGxlKTsgfSwgZ2xvYmFscy5VUERBVEVfRlJFUSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWQoKSB7XHJcbiAgICB2YXIgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgc3dpdGNoIChoYXNoKSB7XHJcbiAgICAgICAgY2FzZSAnI3JvdXRlJzpcclxuICAgICAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcjdXNlcic6XHJcbiAgICAgICAgICAgIHVzZXIubG9hZFVzZXIoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnI2hpc3RvcnknOlxyXG4gICAgICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5KDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcjc2Vzc2lvbic6XHJcbiAgICAgICAgICAgIHNlc3Npb24ubG9hZFNlc3Npb24odXRpbHMuUXVlcnlTdHJpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpW1wibmFtZVwiXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyNyb3V0ZWRldGFpbCc6XHJcbiAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZURldGFpbCh1dGlscy5RdWVyeVN0cmluZyh3aW5kb3cubG9jYXRpb24uaHJlZilbXCJyb3V0ZVwiXSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGxvYWRNYWluKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRIdG1sKGxhYmVsLCBqc29uLCBkYXkpIHtcclxuICAgIGlmIChwYXJzZUludChqc29uLm1ldGVycykgPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaWYgKGRheSkge1xyXG4gICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5EYXk8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIGpzb24uc3RhcnQuc3Vic3RyKDIsIGpzb24uc3RhcnQubGFzdEluZGV4T2YoJ1QnKSAtIDIpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+U3RhcnQ6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBqc29uLnN0YXJ0LnN1YnN0cihqc29uLnN0YXJ0Lmxhc3RJbmRleE9mKCdUJykgKyAxLCA4KSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlRpbWU6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5zZWNvbmRzKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5MZW5ndGg6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBwYXJzZUludChqc29uLm1ldGVycykgKyAnIG0gKCcgKyBqc29uLnBlcmNlbnQgKyAnKTwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+UGFjZTo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdChqc29uLnBhY2UpICogMy42ICogMTApIC8gMTAgKyAnIGttL3Q8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPjUwMG06PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi5sYXBQYWNlKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj4yazo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChqc29uLnRvd0tQYWNlKSkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5BdmcuVzo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdChqc29uLndhdHQpICogMTApIC8gMTAgKyAndzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+U1I6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi5zdHJva2UpICogMTApIC8gMTAgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGlmIChwYXJzZUludChqc29uLmhyKSA+IDApIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+SFI6PC9kaXY+PGRpdiBjbGFzcz1cImNvbCAnICsgdXRpbHMuZ2V0SGVhcnRSYXRlQ29sb3IocGFyc2VJbnQoanNvbi5ocikpICsgJ1wiPicgKyBwYXJzZUludChqc29uLmhyKSArIChwYXJzZUludChqc29uLmF2Z0hyKSA+IDAgPyAnKCcgKyBwYXJzZUludChqc29uLmF2Z0hyKSArICcpJyA6ICcnKSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgaWYgKGpzb24uZmlsZU5hbWUpIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+QWN0aW9uczo8L2Rpdj48ZGl2IGNsYXNzPVwiY29sXCI+PGEgaHJlZj1cIi9zZXNzaW9ucy8nICsganNvbi5maWxlTmFtZTtcclxuICAgICAgICBodG1sICs9ICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsganNvbi5uYW1lO1xyXG4gICAgICAgIGh0bWwgKz0gJ1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiVXBsb2FkIHRvIHN0cmF2YVwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5jbG91ZF91cGxvYWQ8L2k+PC9hPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGEgY2xhc3M9XCJzZXNzaW9uc1wiIGRhdGEtbmFtZT1cIicgKyBqc29uLm5hbWUgKyAnXCIgaHJlZj1cIi9zZXNzaW9uc1wiPjxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiU2Vzc2lvblwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWJlcl9uZXc8L2k+PC9hPjwvZGl2PjwvZGl2Pic7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaHRtbCArIFwiXCI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRNYWluLCBzdGFydCwgZ2V0X3Jvd0luZm8sIGdldEh0bWwsIHN0YXJ0Um93LCBzdG9wUm93LCBsb2FkLCB1cGxvYWRUb1N0cmF2YSB9OyIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5SW5kZXgoaW5kZXgpIHtcclxuICAgIGxvYWRIaXN0b3J5KGluZGV4KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEhpc3RvcnkobWFpbkluZGV4KSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9oaXN0b3J5JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3RvcnknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9hZExhc3QzU2Vzc2lvbnMoKTtcclxuICAgICAgICAgICAgbG9hZEhpc3RvcnlMaXN0KCQodGhpcyksIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZExhc3QzU2Vzc2lvbnMoKSB7XHJcbiAgICAkLmdldCgnL3Nlc3Npb24vJyArIDAgKyAnLycgKyAyLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBodG1sQ2FyZHMgPSAnJztcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHNlc3Npb24pIHtcclxuICAgICAgICAgICAgaHRtbENhcmRzID0gY3JlYXRlQ2FyZChodG1sQ2FyZHMsIHNlc3Npb24pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjY2FyZHMnKS5odG1sKCc8ZGl2IGNsYXNzPVwiY29sXCI+PGRpdiBjbGFzcz1cImNhcmQtZGVja1wiPicgKyBodG1sQ2FyZHMgKyAnPC9kaXY+PC9kaXY+Jyk7XHJcbiAgICAgICAgJCgnLmdweC10cmFjaycpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnRyaWdnZXIoXCJsb2FkLW1hcFwiLCB0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUxpc3QodGhhdCwgbWFpbkluZGV4KSB7XHJcbiAgICB2YXIgc3RhcnQgPSBtYWluSW5kZXggKiBQQUdFX1NJWkUsIHN0b3AgPSAoKChtYWluSW5kZXggKyAxKSAqIFBBR0VfU0laRSkpIC0gMTtcclxuICAgICQuZ2V0KCcvc2Vzc2lvbi8nICsgc3RhcnQgKyAnLycgKyBzdG9wLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICQuZ2V0KCcvdXNlcnMnLCBmdW5jdGlvbiAodXNlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGh0bWxUYWJsZSA9ICcnLCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHZhciB1c2VyTWFwID0gdXNlcnMucmVkdWNlKGZ1bmN0aW9uKG1hcCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBtYXBbb2JqLmlkXSA9IG9iajtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXA7XHJcbiAgICAgICAgICAgIH0sIHt9KTtcclxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sVGFibGUgPSBjcmVhdGVMYXBUYWJsZVJlY29yZChodG1sVGFibGUsIGluZGV4ICsgKG1haW5JbmRleCAqIFBBR0VfU0laRSksIHNlc3Npb24sIHVzZXJNYXApO1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkKCcjaGlzdG9yLXRhYmxlLWJvZHknKS5odG1sKGh0bWxUYWJsZSk7XHJcbiAgICAgICAgICAgIHZhciBwYWcgPSB0aGF0LmZpbmQoJy5wYWdlJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUhpc3RvcnlOYXZQYWdlKHBhZywgbWFpbkluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuSGlzdG9yeShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmV4dCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnbmV4dCcpKSwgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ2luZGV4JykpLFxyXG4gICAgICAgIG1haW5JbmRleCA9IHBhcnNlSW50KCQoJyNoaXN0b3J5LXBhZ2UnKS5kYXRhKCdpbmRleCcpKTtcclxuICAgIGlmICghaXNOYU4obmV4dCkpIHtcclxuICAgICAgICBtYWluSW5kZXggKz0gbmV4dDtcclxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGluZGV4KSkge1xyXG4gICAgICAgIG1haW5JbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgbG9hZEhpc3RvcnlMaXN0KCQoJyNoaXN0b3J5LXRhYmxlJyksIG1haW5JbmRleCk7XHJcbn1cclxuXHJcblxyXG52YXIgY3JlYXRlQ2FyZCA9IGZ1bmN0aW9uIChodG1sQ2FyZHMsIHNlc3Npb24pIHtcclxuICAgIGh0bWxDYXJkcyArPSAnPGRpdiBjbGFzcz1cImNhcmQgZ3B4LXRyYWNrXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIlwiPic7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8ZGl2IGNsYXNzPVwiY2FyZC1tYXAtdG9wIFwiPjwvZGl2Pic7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxoNSBjbGFzcz1cImNhcmQtdGl0bGUgbXQtMlwiPjxhIGNsYXNzPVwic2Vzc2lvbnNcIiBkYXRhLW5hbWU9XCInICsgc2Vzc2lvbi5uYW1lICsgJ1wiIGhyZWY9XCIvc2Vzc2lvblwiPicgKyB1dGlscy5zZXNzaW9uTmFtZVRvUmVhZGFibGUoc2Vzc2lvbi5uYW1lKSArICc8L2E+PC9oNT4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8cCBjbGFzcz1cImNhcmQtdGV4dFwiPkxlbmd0aDogJyArIHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMubWV0ZXJzKSArICdtLCBUaW1lOiAnICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMuc2Vjb25kcykpICsgJzwvcD4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8YSBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIHNlc3Npb24ubmFtZSArICdcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBzdHJhdmEgYnRuLWJsb2NrXCI+VXBsb2FkIHRvIFN0cmF2YTwvYT4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8L2Rpdj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8L2Rpdj4nO1xyXG4gICAgcmV0dXJuIGh0bWxDYXJkcztcclxufTtcclxuXHJcbnZhciBjcmVhdGVMYXBUYWJsZVJlY29yZCA9IGZ1bmN0aW9uIChodG1sVGFibGUsIGluZGV4LCBzZXNzaW9uLCB1c2VyTWFwKSB7XHJcbiAgICB2YXIgdXNlciA9IHVzZXJNYXBbc2Vzc2lvbi51c2VyXTtcclxuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0aCBzY29wZT1cInJvd1wiPicgKyAoaW5kZXggKyAxKSArICc8L3RoPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD48YSBjbGFzcz1cInNlc3Npb25zXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIiBocmVmPVwiLz9uYW1lPScrc2Vzc2lvbi5uYW1lKycjc2Vzc2lvblwiPicgKyB1dGlscy5zZXNzaW9uTmFtZVRvUmVhZGFibGUoc2Vzc2lvbi5uYW1lKSArICc8L2E+PC90ZD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+TGVuZ3RoOiAnICsgcGFyc2VJbnQoc2Vzc2lvbi5lbmRTdGF0cy5tZXRlcnMpICsgJ208L3RkPic7XHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyB1c2VyLmZpcnN0TmFtZSArICcgJyArIHVzZXIubGFzdE5hbWUgKyAnPC90ZD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzx0ZD48L3RkPic7XHJcbiAgICB9XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4gPGEgaHJlZj1cIi9zZXNzaW9ucy8nICsgc2Vzc2lvbi5uYW1lICsgJy5ncHhcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2XCI+ZmlsZV9kb3dubG9hZDwvaT48YSBjbGFzcz1cInN0cmF2YVwiIGhyZWY9XCIvc3RyYXZhL3VwbG9hZC8nICsgc2Vzc2lvbi5uYW1lICsgJ1wiPicgK1xyXG4gICAgICAgICc8aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlVwbG9hZCB0byBTdHJhdmFcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2IHN0cmF2YS1pY29uXCI+Y2xvdWRfdXBsb2FkPC9pPjwvYT4gPGEgY2xhc3M9XCJkZWwtc2Vzc2lvblwiIGhyZWY9XCIjXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIj4nICtcclxuICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgc2Vzc2lvbiBsb2NhbFwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWQtMzZcIj5kZWxldGU8L2k+PC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPC90cj4nO1xyXG4gICAgcmV0dXJuIGh0bWxUYWJsZTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUhpc3RvcnlOYXZQYWdlKHBhZ2UsIGluZGV4KSB7XHJcbiAgICB2YXIgaHRtbEVsZW1lbnQgPSAkKCc8dWwgaWQ9XCJoaXN0b3J5LXBhZ2VcIiBkYXRhLWluZGV4PVwiJyArIGluZGV4ICsgJ1wiPjwvdWw+JykuYWRkQ2xhc3MoXCJwYWdpbmF0aW9uIHBhZ2luYXRpb24tbGdcIik7XHJcbiAgICAkLmdldChcInNlc3Npb24vc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQocGFyc2VJbnQoZGF0YSkgLyBQQUdFX1NJWkUpICsgMTtcclxuICAgICAgICB2YXIgcHJldkRpc2FibGVkID0gKGluZGV4ID09PSAwID8gJ2Rpc2FibGVkJyA6ICcnKTtcclxuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIHByZXYgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIHByZXZEaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiIGRhdGEtbmV4dD1cIi0xXCIgdGFiaW5kZXg9XCItMVwiPlByZXZpb3VzPC9hPicpO1xyXG4gICAgICAgIHZhciBuZXh0ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBuZXh0RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1uZXh0PVwiMVwiIGhyZWY9XCIjXCI+TmV4dDwvYT4nKTtcclxuXHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKHByZXYpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBhY3RpdmUgKyAnXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCIgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nKTtcclxuICAgICAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQobmV4dCk7XHJcbiAgICAgICAgJChwYWdlKS5odG1sKGh0bWxFbGVtZW50KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkSGlzdG9yeUluZGV4LCBsb2FkSGlzdG9yeSwgbG9hZEhpc3RvcnlMaXN0LCBvcGVuSGlzdG9yeSB9IiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgZnJvbnQgZnJvbSAnLi9mcm9udC9pbmRleCc7XHJcbmltcG9ydCByb3V0ZSBmcm9tICcuL3JvdXRlL2luZGV4JztcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi91c2VyL2luZGV4JztcclxuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4vdXRpbHMvbWFwVXRpbHMnXHJcbmltcG9ydCBtYXAgZnJvbSAnLi9tYXAvaW5kZXgnXHJcbmltcG9ydCBoaXN0b3J5IGZyb20gJy4vaGlzdG9yeS9pbmRleCdcclxuaW1wb3J0IHNlc3Npb24gZnJvbSAnLi9zZXNzaW9uL2luZGV4J1xyXG5cclxuLyoqXHJcbiAqIERlY2xhcmVzIGEgbmV3IG9iamVjdCBpbiB0aGUgd2luZG93IG5hbWVseSBRdWVyeVN0cmluZyB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGdldCBwYXJhbWV0ZXIgZnJvbSB0aGUgY3VycmVudCBVUkwgYXMgYSBwcm9wZXJ0eVxyXG4gKi9cclxud2luZG93LlF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhbm9ueW1vdXMsIGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5IGFuZCBcclxuICAgIC8vIHRoZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gUXVlcnlTdHJpbmchXHJcbiAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XHJcbiAgICB2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XHJcblxyXG4gICAgICAgIC8vIElmIGZpcnN0IGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG4gICAgICAgICAgICAvLyBJZiBzZWNvbmQgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBxdWVyeV9zdHJpbmdbcGFpclswXV0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IFtxdWVyeV9zdHJpbmdbcGFpclswXV0sIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKV07XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGFycjtcclxuICAgICAgICAgICAgLy8gSWYgdGhpcmQgb3IgbGF0ZXIgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0ucHVzaChkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcXVlcnlfc3RyaW5nO1xyXG59KCk7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvKiogSW5pdCBzaGFyZWQgKi9cclxuICAgIGZyb250LmdldF9yb3dJbmZvKGZhbHNlLCBcIlwiKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcubWFpbicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZnJvbnQubG9hZE1haW4oKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyN1c2VyJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcjaGlzdG9yeS1wYWdlIGEnLCBoaXN0b3J5Lm9wZW5IaXN0b3J5KTtcclxuXHJcbiAgICAvL1RPRE86IHJlZmFjdG9yeVxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnI3JvdXRlLXBhZ2UgYScsIHJvdXRlLm9wZW5Sb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLm5hdi1saW5rJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAkKCcjbWFpbi1uYXYnKS5maW5kKFwiLm5hdi1pdGVtXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuc2Vzc2lvbnMnLCBzZXNzaW9uLmNsaWNrU2Vzc2lvbik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNoaXN0b3J5JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5SW5kZXgoMCwgMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICdhI3JvdXRlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICByb3V0ZS5sb2FkUm91dGUoMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImxvYWQtbWFwXCIsICcuZ3B4LXRyYWNrJywgbWFwVXRpbHMubG9hZEdweE1hcCk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYnV0dG9uI3N0YXJ0Um93JywgZnJvbnQuc3RhcnRSb3cpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdG9wUm93JywgZnJvbnQuc3RvcFJvdyk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmVkaXQtdXNlcicsIHVzZXIuZWRpdFVzZXIpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5lZGl0LXJvdXRlJywgcm91dGUuZWRpdFJvdXRlKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuc3RyYXZhJywgZnJvbnQudXBsb2FkVG9TdHJhdmEpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5kZWwtc2Vzc2lvbicsIHNlc3Npb24uZGVsZXRlU2Vzc2lvbik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzYXZlLXJvdXRlXCIsIHJvdXRlLnNhdmVSb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNzYXZlLXVzZXJcIiwgdXNlci5zYXZlVXNlcik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC11c2VyJywgdXNlci5kZWxldGVVc2VyKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsLXJvdXRlJywgcm91dGUuZGVsZXRlUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5yb3V0ZS1kZXRhaWwnLCByb3V0ZS5jbGlja1JvdXRlRGV0YWlsKTtcclxuXHJcbiAgICAkKCcjbG9hZCcpLmVhY2goZnJvbnQubG9hZCk7XHJcblxyXG4gICAgJCgnI3JvdXRlcycpLmVhY2gocm91dGUubG9hZFJvdXRlcyk7XHJcblxyXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmVhY2godXNlci5sb2FkVXNlcnMpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93LmJzLm1vZGFsJywgJyNzaG93LXJvdXRlLW1vZGFsJywgcm91dGUuc2hvd1JvdXRlTW9kYWwpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzaG93bi5icy5tb2RhbCcsICcjc2hvdy1yb3V0ZS1tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSAkKGUucmVsYXRlZFRhcmdldCkuZGF0YSgncm91dGUtbmFtZScpO1xyXG4gICAgICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtcm91dGUtbWFwXCIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlXCIsICcjcm91dGVzJywgcm91dGUuY2hhbmdlUm91dGVTZWxlY3QpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwidmFyIGxpdmVQb2ludHMgPSBbXTtcclxudmFyIGxpdmVNYXA7XHJcbnZhciBsaXZlQm91bmRzO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbGl2ZVBvaW50cywgbGl2ZU1hcCwgbGl2ZUJvdW5kcyB9IiwiaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHN0cmF2YSBmcm9tICcuLi91dGlscy9zdHJhdmEnO1xyXG5pbXBvcnQgZ3JhcGhVdGlscyBmcm9tICcuLi91dGlscy9ncmFwaFV0aWxzJztcclxuaW1wb3J0IHsgVVBEQVRFX0ZSRVEsIFBBR0VfU0laRSwgUkFUSU9OLCBydW4gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuXHJcbi8qKiBBbGwgbG9hZCBmdW5jdGlvbnMgKi9cclxudmFyIGxvYWRSb3V0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmdldChcIi9yb3cvcm91dGVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBncm91cCA9ICcnO1xyXG4gICAgICAgIGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKGEuY291bnRyeSA+IGIuY291bnRyeSkgPyAxIDogKChiLmNvdW50cnkgPiBhLmNvdW50cnkpID8gLTEgOiAwKTsgfSk7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RlZCA9ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmNvdW50cnkgIT09IGdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0Z3JvdXAgbGFiZWw9XCInICsgdmFsdWUuY291bnRyeSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAgPSB2YWx1ZS5jb3VudHJ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gJyArIHNlbGVjdGVkICsgJyB2YWx1ZT1cIicgKyB2YWx1ZS5pbmRleCArICdcIiBkYXRhLW5hbWU9XCInICsgdmFsdWUubmFtZSArICdcIiBkYXRhLWxhdD1cIicgK1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuZ3BzWzBdLmxhdCArICdcIiBkYXRhLWxvbj1cIicgKyB2YWx1ZS5ncHNbMF0ubG9uICsgJ1wiPicgKyB2YWx1ZS5uYW1lICsgJyAoJyArIHZhbHVlLm1ldGVycyArICdtKTwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGF0KS5odG1sKGh0bWwpO1xyXG5cclxuICAgICAgICBjaGFuZ2VSb3V0ZVNlbGVjdCgpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY3JlYXRlUm91dGVSZWNvcmQgPSBmdW5jdGlvbiAoaHRtbFRhYmxlLCBpbmRleCwgcm91dGUpIHtcclxuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0aCBzY29wZT1cInJvd1wiPicgKyAoaW5kZXggKyAxKSArICc8L3RoPic7XHJcbiAgICAvL2h0bWxUYWJsZSArPSAnPHRkPjxhIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXJvdXRlLW5hbWU9XCInICsgcm91dGUubmFtZSArICdcIiBkYXRhLXRhcmdldD1cIiNzaG93LXJvdXRlLW1vZGFsXCIgaHJlZj1cIi9yb3V0ZXMvJyArIHJvdXRlLm5hbWUgKyAnXCI+JyArIHJvdXRlLm5hbWUgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPjxhIGNsYXNzPVwicm91dGUtZGV0YWlsXCIgZGF0YS1yb3V0ZS1uYW1lPVwiJyArIHJvdXRlLm5hbWUgKyAnXCIgaHJlZj1cIj9yb3V0ZT0nKyByb3V0ZS5uYW1lICsnI3JvdXRlZGV0YWlsXCI+JyArIHJvdXRlLm5hbWUgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyBwYXJzZUludChyb3V0ZS5tZXRlcnMpICsgJ208L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgcm91dGUuY291bnRyeSArICc8L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nXHJcbiAgICBpZiAocm91dGUucGVybWFuZW50ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8YSBjbGFzcz1cImVkaXQtcm91dGVcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgcm91dGUubmFtZSArICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y3JlYXRlPC9pPjwvYT4nICtcclxuICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGVsLXJvdXRlXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHJvdXRlLm5hbWUgKyAnXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIkRlbGV0ZSByb3V0ZVwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPicgKyAnPC90ZD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzxpPkRlZmF1bHQ8L2k+JztcclxuICAgIH1cclxuICAgIGh0bWxUYWJsZSArPSAnPC90cj4nO1xyXG4gICAgcmV0dXJuIGh0bWxUYWJsZTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRSb3V0ZShtYWluSW5kZXgpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL3JvdXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlcy10JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxvYWRSb3V0ZVRhYmxlKDApO1xyXG4gICAgICAgICAgICB2YXIgcGFnID0gJCgnI3JvdXRlcy10YWJsZScpLmZpbmQoJy5wYWdlJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZVJvdXRlTmF2UGFnZShwYWdbMF0sIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUm91dGVOYXZQYWdlKHBhZ2UsIGluZGV4KSB7XHJcbiAgICB2YXIgaHRtbEVsZW1lbnQgPSAkKCc8dWwgaWQ9XCJyb3V0ZS1wYWdlXCIgZGF0YS1pbmRleD1cIicgKyBpbmRleCArICdcIj48L3VsPicpLmFkZENsYXNzKFwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWxnXCIpO1xyXG4gICAgJC5nZXQoXCJyb3V0ZXMvc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQocGFyc2VJbnQoZGF0YSkgLyBQQUdFX1NJWkUpICsgMTtcclxuICAgICAgICB2YXIgcHJldkRpc2FibGVkID0gKGluZGV4ID09PSAwID8gJ2Rpc2FibGVkJyA6ICcnKTtcclxuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIHByZXYgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIHByZXZEaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiIGRhdGEtbmV4dD1cIi0xXCIgdGFiaW5kZXg9XCItMVwiPlByZXZpb3VzPC9hPicpO1xyXG4gICAgICAgIHZhciBuZXh0ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBuZXh0RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1uZXh0PVwiMVwiIGhyZWY9XCIjXCI+TmV4dDwvYT4nKTtcclxuXHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKHByZXYpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBhY3RpdmUgKyAnXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCIgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nKTtcclxuICAgICAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQobmV4dCk7XHJcbiAgICAgICAgJChwYWdlKS5odG1sKGh0bWxFbGVtZW50KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGVUYWJsZShtYWluSW5kZXgpIHtcclxuICAgIHZhciBzdGFydCA9IG1haW5JbmRleCAqIFBBR0VfU0laRSwgc3RvcCA9ICgoKG1haW5JbmRleCArIDEpICogUEFHRV9TSVpFKSkgLSAxO1xyXG4gICAgJC5nZXQoJy9yb3V0ZXMvJyArIHN0YXJ0ICsgJy8nICsgc3RvcCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbFRhYmxlID0gJyc7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIGh0bWxUYWJsZSA9IGNyZWF0ZVJvdXRlUmVjb3JkKGh0bWxUYWJsZSwgaW5kZXggKyAobWFpbkluZGV4ICogUEFHRV9TSVpFKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjcm91dGVzLXRhYmxlLWJvZHknKS5odG1sKGh0bWxUYWJsZSk7XHJcbiAgICAgICAgJCgnI2FkZC1yb3V0ZS1tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsb2FkUm91dGUoMCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0Um91dGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBpZCxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIiNhZGRSb3V0ZVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjbmFtZScpLnZhbChyZXN1bHQubmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI21ldGVycycpLnZhbChyZXN1bHQubWV0ZXJzKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjc2VnbWVudElkJykudmFsKHJlc3VsdC5zZWdtZW50SWQpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNjb3VudHJpZXMnKS52YWwocmVzdWx0LmNvdW50cnkpO1xyXG4gICAgICAgICAgICAvL2dwcy5yZXBsYWNlKC8oLiopLCguKiksKC4qKS9nbSwgJ3sgXCJsYXRcIjogJDEsIFwibG9uXCI6ICQyLCBcImVsXCI6ICQzIH0sJyk7XHJcbiAgICAgICAgICAgIHZhciBncHNDdnMgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQuZ3BzKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjZ3BzJykuYXBwZW5kKGdwc0N2cyk7XHJcbiAgICAgICAgICAgICQoJyNhZGQtcm91dGUtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Um91dGVNb2RhbChlKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQoZS5yZWxhdGVkVGFyZ2V0KS5kYXRhKCdyb3V0ZS1uYW1lJyk7XHJcbiAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAkLmdldChcIi9yb3V0ZXMvXCIgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciB0aXRsZSA9IGRhdGEubmFtZTtcclxuICAgICAgICBpZiAoZGF0YS5zZWdlbWVudElkKSB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gJzxhIGNsYXNzPVwic3RyYXZhLXNlZ21lbnRcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9zZWdtZW50cy8nICsgZGF0YS5zZWdlbWVudElkICsgJyB0aXRsZT1cIlN0cmF2YSBTZWdtZW50IFVybFwiIFwiPicgKyB0aXRsZSArICcgPC9hPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuZmluZCgnI3Nob3ctcm91dGUtbW9kYWwtdGl0bGUnKS5odG1sKHRpdGxlKTtcclxuICAgICAgICB2YXIgaHRtbCA9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+RGlzcGxheSBMZW5naHQ6PC9oNT4nICsgZGF0YS5tZXRlcnMgKyAnIG08L2xpPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkdwcyBMZW5naHQ6PC9oNT4nICsgZGF0YS5ncHNMZW5naHQgKyAnIG08L2xpPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNvdW50cnk6PC9oNT4nICsgZGF0YS5jb3VudHJ5ICsgJzwvbGk+JztcclxuICAgICAgICB0aGF0LmZpbmQoJy5jYXJkIC5saXN0LWdyb3VwJykuaHRtbChodG1sKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VSb3V0ZVNlbGVjdCgpIHtcclxuICAgIHZhciBzZWxlY3RlZCA9ICQoJyNyb3V0ZXMnKS5maW5kKFwiOnNlbGVjdGVkXCIpO1xyXG4gICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgIHZhciBuYW1lID0gc2VsZWN0ZWQuZGF0YSgnbmFtZScpO1xyXG4gICAgbWFwVXRpbHMuYWRkUm91dGVUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVSb3V0ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgcm91dGU/XCIpO1xyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9yb3V0ZXMvJyArIGlkLFxyXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVSb3V0ZShldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBmb3JtID0gJChcIiNhZGRSb3V0ZVwiKTtcclxuICAgIHZhciByb3V0ZSA9IHt9O1xyXG4gICAgcm91dGUubmFtZSA9IGZvcm0uZmluZCgnI25hbWUnKS52YWwoKTtcclxuICAgIHJvdXRlLm1ldGVycyA9IGZvcm0uZmluZCgnI21ldGVycycpLnZhbCgpO1xyXG4gICAgcm91dGUuc3RyYXZhSWQgPSBmb3JtLmZpbmQoJyNzZWdtZW50SWQnKS52YWwoKTtcclxuICAgIHJvdXRlLmNvdW50cnkgPSBmb3JtLmZpbmQoJyNjb3VudHJpZXMnKS52YWwoKTtcclxuICAgIHJvdXRlLmdwcyA9IGZvcm0uZmluZCgndGV4dGFyZWEnKS52YWwoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BVVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHVybDogXCIvcm91dGVzL2FkZFwiLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHJvdXRlKSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNhZGQtcm91dGUtbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGVEZXRhaWwobmFtZSkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvcm91dGUvZGV0YWlscycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtYXBVdGlscy5jbGVhbk1hcCgpO1xyXG4gICAgICAgIHZhciB0YWJsZUZ1bmN0ID0gYWRkVG9UYWJsZS5iaW5kKCQodGhpcykuZmluZCgnI3N0cmF2YS1yZXN1bHQnKSk7XHJcbiAgICAgICAgc3RyYXZhLmxlYWRlcmJvYXJkKG5hbWUsIHRhYmxlRnVuY3QpO1xyXG4gICAgICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtbWFwXCIpKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZS1zdGF0cycpLmVhY2gobG9hZFJvdXRlU3RhdHMuYmluZCgodGhpcyksIG5hbWUpKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNzdHJhdmEtcmVzdWx0JykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKTtcclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFJvdXRlU3RhdHMobmFtZSkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBuYW1lLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAnPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1kZWZhdWx0XCI+PGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPjxkaXYgY2xhc3M9XCJyb3dcIj4nXHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0Lm5hbWUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5OYW1lPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImNvbC1tZC0yXCI+PGRpdiBjbGFzcz1cInN0YXRpc3RpY1wiPjxkaXYgY2xhc3M9XCJ2YWx1ZVwiPicgKyByZXN1bHQubWV0ZXJzICsnPC9kaXY+PGRpdiBjbGFzcz1cImxhYmVsXCI+TGVuZ2h0IChtKTwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0LmNvdW50cnkgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5Db3VudHJ5PC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAkKHRoYXQpLmZpbmQoJyNyb3V0ZS1zdGF0cycpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRvVGFibGUoZGF0YSkge1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChkYXRhLmVudHJpZXMpIHtcclxuICAgICAgICBkYXRhLmVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPiA8dGggc2NvcGU9XCJyb3dcIj4gJyArIGVudHJ5LmF0aGxldGVfbmFtZSArICcgPC90aD48dGQ+ICcgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoZW50cnkubW92aW5nX3RpbWUpKSArICc8L3RkPiA8dGQ+JyArIGVudHJ5LnN0YXJ0X2RhdGUgKyc8L3RkPjwvdHI+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuaHRtbChodG1sKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJvdXRlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuZXh0ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCduZXh0JykpLCBpbmRleCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnaW5kZXgnKSksXHJcbiAgICAgICAgbWFpbkluZGV4ID0gcGFyc2VJbnQoJCgnI3JvdXRlLXBhZ2UnKS5kYXRhKCdpbmRleCcpKTtcclxuICAgIGlmICghaXNOYU4obmV4dCkpIHtcclxuICAgICAgICBtYWluSW5kZXggKz0gbmV4dDtcclxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGluZGV4KSkge1xyXG4gICAgICAgIG1haW5JbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgdmFyIHBhZyA9ICQoJyNyb3V0ZXMtdGFibGUnKS5maW5kKCcucGFnZScpO1xyXG4gICAgY3JlYXRlUm91dGVOYXZQYWdlKHBhZ1swXSwgbWFpbkluZGV4KTtcclxuICAgIGxvYWRSb3V0ZVRhYmxlKG1haW5JbmRleCk7XHJcbn1cclxuXHJcbnZhciBjbGlja1JvdXRlRGV0YWlsID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdyb3V0ZS1uYW1lJyk7XHJcbiAgICBsb2FkUm91dGVEZXRhaWwobmFtZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRSb3V0ZXMsIGNyZWF0ZVJvdXRlUmVjb3JkLCBsb2FkUm91dGUsIGxvYWRSb3V0ZVRhYmxlLFxyXG4gICAgIGNyZWF0ZVJvdXRlTmF2UGFnZSwgZWRpdFJvdXRlLCBzaG93Um91dGVNb2RhbCwgY2hhbmdlUm91dGVTZWxlY3QsIGRlbGV0ZVJvdXRlLFxyXG5zYXZlUm91dGUsIG9wZW5Sb3V0ZSwgbG9hZFJvdXRlRGV0YWlsLCBjbGlja1JvdXRlRGV0YWlsfSIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCBncmFwaFV0aWxzIGZyb20gJy4uL3V0aWxzL2dyYXBoVXRpbHMnO1xyXG5pbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04sIHJ1biB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5pbXBvcnQgZnJvbnQgZnJvbSAnLi4vZnJvbnQvaW5kZXgnO1xyXG5pbXBvcnQgcm91dGUgZnJvbSAnLi4vcm91dGUvaW5kZXgnO1xyXG5pbXBvcnQgdXNlciBmcm9tICcuLi91c2VyL2luZGV4JztcclxuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vaGlzdG9yeS9pbmRleCdcclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkU2Vzc2lvbihuYW1lKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9zZXNzaW9ucycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3Nlc3Npb24tdXNlcicpLmVhY2godXNlci5sb2FkVXNlcnMpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3Rvcnktc2Vzc2lvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIkhpc3RvcnlcIjtcclxuICAgICAgICAgICAgJC5nZXQoXCIvc2Vzc2lvbi9cIiArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IGZyb250LmdldEh0bWwodGl0bGUsIGRhdGEuZW5kU3RhdHMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3JvdXRlcycpLnZhbChkYXRhLnJvdXRlKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXNzaW9uLXVzZXInKS52YWwoZGF0YS51c2VyKTtcclxuICAgICAgICAgICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3RhYmxlLWNvbnRlbnQnKS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNsYXBzLWJvZHknKS5odG1sKGdldExhcEh0bWwodGl0bGUsIGRhdGEuZW5kU3RhdHMpKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBVdGlscy5hZGRHcHhUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ3JhcGhVdGlscy5hZGRHcmFwaChkYXRhLnJhdywgZGF0YS5yYXdIciwgcGFyc2VJbnQoZGF0YS5zdGFydCksIGRhdGEuc3Ryb2tlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TGFwSHRtbChsYWJlbCwganNvbiwgcmV2ZXJzZSkge1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChwYXJzZUludChqc29uLnRvdGFsTGFwcykgPiAwKSB7XHJcbiAgICAgICAgdmFyIGxhcE51bSA9IDE7XHJcbiAgICAgICAgdmFyIGxhcHMgPSBqc29uLmxhcHM7XHJcbiAgICAgICAgaWYgKHJldmVyc2UpIHtcclxuICAgICAgICAgICAgbGFwcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIGxhcE51bSA9IGxhcHMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXBzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRoIHNjb3BlPVwicm93XCI+JyArIGxhcE51bSArICc8L3RoPjx0ZD4nICsgcGFyc2VJbnQodmFsdWUubWV0ZXJzKSArICc8L3RkPjx0ZD4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHZhbHVlLnNlY29uZHMpKSArICc8L3RkPic7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWx1ZS53YXR0KSAqIDEwKSAvIDEwICsgJ3c8L3RkPjwvdHI+JztcclxuICAgICAgICAgICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFwTnVtLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhcE51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBodG1sO1xyXG59XHJcblxyXG5cclxudmFyIGNsaWNrU2Vzc2lvbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgbG9hZFNlc3Npb24obmFtZSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkZWxldGVTZXNzaW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgc2Vzc2lvbj9cIik7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3Nlc3Npb24vZGVsLycgKyBuYW1lLFxyXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTZXNzaW9uIGRlbGV0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5SW5kZXgoMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkU2Vzc2lvbiwgY2xpY2tTZXNzaW9uLCBnZXRMYXBIdG1sLCBkZWxldGVTZXNzaW9uIH0iLCJcclxudmFyIGxvYWRVc2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3VzZXJzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgdmFsdWUuaWQgKyAnXCI+JyArIHZhbHVlLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLmxhc3ROYW1lICsgJzwvb3B0aW9uPidcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoYXQpLmh0bWwoaHRtbClcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZWRpdFVzZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiI2FkZFVzZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNmaXJzdE5hbWUnKS52YWwocmVzdWx0LmZpcnN0TmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2xhc3ROYW1lJykudmFsKHJlc3VsdC5sYXN0TmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI3VzZXJJZCcpLnZhbChyZXN1bHQuaWQpO1xyXG4gICAgICAgICAgICAkLmdldCgnL3N0cmF2YS91cmwnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGRhdGEudXJsLnJlcGxhY2UoXCIlMjRcIiwgcmVzdWx0LmlkKTtcclxuICAgICAgICAgICAgICAgICQoJy5zdHJhdmEtdXJsJykuYXR0cignaHJlZicsIHVybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY29ubmVjdCA9ICQoXCIuc3RyYXZhLWNvbm5lY3RcIik7XHJcbiAgICAgICAgICAgIGNvbm5lY3QucmVtb3ZlQ2xhc3MoXCJzci1vbmx5XCIpO1xyXG4gICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFVzZXIoKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy91c2VyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3VzZXJzLWJvZHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAkLmdldChcIi91c2Vycy9cIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBodG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD48YSBocmVmPVwiI1wiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN1c2VyU3RhdHNNb2RhbFwiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj4nICsgKGkgKyAxKSArICc8L2E+PC90ZD48dGQ+JyArIHVzZXIuZmlyc3ROYW1lICsgJzwvdGQ+PHRkPicgKyB1c2VyLmxhc3ROYW1lICsgJzwvdGQ+JztcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+PGEgY2xhc3M9XCJlZGl0LXVzZXJcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y3JlYXRlPC9pPjwvYT48YSBjbGFzcz1cImRlbC11c2VyXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHVzZXIuaWQgKyAnXCI+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgdXNlclwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPjwvdGQ+JyArICc8L3RyPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQodGhhdCkuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgICAgICQoJyNhZGRVc2VyTW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlcigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVVzZXIoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgZm9ybSA9ICQoXCIjYWRkVXNlckZvcm1cIik7XHJcbiAgICB2YXIgZmlyc3ROYW1lID0gZm9ybS5maW5kKCcjZmlyc3ROYW1lJykudmFsKCk7XHJcbiAgICB2YXIgbGFzdE5hbWUgPSBmb3JtLmZpbmQoJyNsYXN0TmFtZScpLnZhbCgpO1xyXG4gICAgdmFyIGlkID0gZm9ybS5maW5kKCcjdXNlcklkJykudmFsKCk7XHJcbiAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgdXNlci5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICB1c2VyLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICB1c2VyLmlkID0gaWQ7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdQVVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB1cmw6IFwiL3VzZXJzL2FkZFwiLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI2FkZFVzZXJNb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVVc2VyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZT9cIik7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJzLycgKyBpZCxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIubG9hZFVzZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkVXNlcnMsIGxvYWRVc2VyLCBlZGl0VXNlciwgc2F2ZVVzZXIsIGRlbGV0ZVVzZXIgfSIsImV4cG9ydCBjb25zdCBSQVRJT04gPSAoMTAwIC8gNC44MDUpICogNjtcclxuZXhwb3J0IGNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZSRVEgPSAxMDAwO1xyXG5leHBvcnQgdmFyIHJ1biA9IGZhbHNlO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgUkFUSU9OLCBQQUdFX1NJWkUsIFVQREFURV9GUkVRLCBydW4gfSIsImltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcblxyXG5mdW5jdGlvbiBhZGRHcmFwaCh0aW1lLCBociwgc3RhcnQsIHN0cm9rZXMpIHtcclxuICAgIHZhciBzcGVlZCA9IFtdO1xyXG4gICAgdmFyIHdhdHQgPSBbXTtcclxuICAgIHZhciBzdHJva2UgPSBbXTtcclxuICAgIHZhciBzdHJva2VDb250ZXIgPSAxO1xyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCB0aW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRpbWVWYWwgPSBwYXJzZUludCh0aW1lW2ldKTtcclxuICAgICAgICB2YXIgc3Ryb2tlVGltZSA9IHBhcnNlSW50KHN0cm9rZXNbc3Ryb2tlQ29udGVyXSk7XHJcbiAgICAgICAgdmFyIHNlYyA9ICgodGltZVZhbCAtIHN0YXJ0KSAvIDEwMDApO1xyXG4gICAgICAgIHZhciBsZW5naHQgPSAoUkFUSU9OIC8gMTAwKTtcclxuICAgICAgICBzcGVlZC5wdXNoKCgobGVuZ2h0IC8gc2VjKSkgKiAzLjYpO1xyXG4gICAgICAgIHZhciB3YXR0VmFsdWUgPSB1dGlscy5jYWxjV2F0dChzZWMgLyBsZW5naHQpO1xyXG4gICAgICAgIHdhdHQucHVzaCh3YXR0VmFsdWUpO1xyXG4gICAgICAgIHN0cm9rZS5wdXNoKDEwMDAqNjAgLyAoc3Ryb2tlVGltZSAtIHBhcnNlSW50KHN0cm9rZXNbc3Ryb2tlQ29udGVyLTFdKSkpO1xyXG4gICAgICAgIHN0YXJ0ID0gcGFyc2VJbnQodGltZVtpXSk7XHJcbiAgICAgICAgaWYgKHRpbWVWYWwgPiBzdHJva2VUaW1lKSB7XHJcbiAgICAgICAgICAgIHN0cm9rZUNvbnRlcisrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1JlbW92ZSBldmVyIHNlY29uZCBlbGVtZW50XHJcbiAgICB2YXIgc3BlZWRNZXJnZWQgPSBbXTtcclxuICAgIHZhciBock1lcmdlZCA9IFtdO1xyXG4gICAgdmFyIHdhdHRNZXJnZWQgPSBbXTtcclxuICAgIHZhciBzdHJva2VNZXJnZWQgPSBbXTtcclxuICAgIHZhciBsYWJlbHNNZXJnZWQgPSBbXTtcclxuICAgIHZhciBtZXJnZVNpemUgPSAxMDtcclxuICAgIGlmICh0aW1lLmxlbmd0aCA+IDEwMDApIHtcclxuICAgICAgICBtZXJnZVNpemUgPSAyMDtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAodGltZS5sZW5ndGgpIHtcclxuICAgICAgICB2YXIgYSA9IHRpbWUuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgdmFyIHRpbWVWID0gcGFyc2VJbnQoYS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIGEubGVuZ3RoKTtcclxuICAgICAgICBsYWJlbHNNZXJnZWQucHVzaChuZXcgRGF0ZSh0aW1lVikudG9JU09TdHJpbmcoKS5zdWJzdHIobmV3IERhdGUodGltZVYpLnRvSVNPU3RyaW5nKCkubGFzdEluZGV4T2YoJ1QnKSArIDEsIDgpKTtcclxuICAgICAgICBpZiAoaHIpIHtcclxuICAgICAgICAgICAgdmFyIGggPSBoci5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgaWYgKGgubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaHJNZXJnZWQucHVzaChwYXJzZUludChoLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gaC5sZW5ndGgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3Ryb2tlKSB7XHJcbiAgICAgICAgICAgIHZhciBoID0gc3Ryb2tlLnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgICAgICBpZiAoaC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJva2VNZXJnZWQucHVzaChNYXRoLnJvdW5kKHBhcnNlRmxvYXQoaC5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIGgubGVuZ3RoKSAqIDEwKSAvIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3BlZWQpIHtcclxuICAgICAgICAgICAgdmFyIHMgPSBzcGVlZC5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICAgICAgdmFyIHcgPSB3YXR0LnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgICAgICBpZiAocy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZE1lcmdlZC5wdXNoKE1hdGgucm91bmQocGFyc2VGbG9hdChzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gcy5sZW5ndGgpICogMTApIC8gMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHdhdHRNZXJnZWQucHVzaChNYXRoLnJvdW5kKHBhcnNlRmxvYXQody5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KSAvIHcubGVuZ3RoKSAqIDEwKSAvIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgY3R4ID0gJCgnI2hyLWdyYXBoJyk7XHJcbiAgICB2YXIgbGluZUNoYXJ0RGF0YSA9IHtcclxuICAgICAgICBsYWJlbHM6IGxhYmVsc01lcmdlZCxcclxuICAgICAgICBkYXRhc2V0czogW3tcclxuICAgICAgICAgICAgbGFiZWw6ICdIZWFydCByYXRlIChicG0pJyxcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjZGMzNTQ1JyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnI2RjMzU0NScsXHJcbiAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhOiBock1lcmdlZCxcclxuICAgICAgICAgICAgLy8gY3ViaWNJbnRlcnBvbGF0aW9uTW9kZTogJ21vbm90b25lJyxcclxuICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy0xJyxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGxhYmVsOiAnU3BlZWQgKGttL3QpJyxcclxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjMDA3YmZmJyxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzAwN2JmZicsXHJcbiAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhOiBzcGVlZE1lcmdlZCxcclxuICAgICAgICAgICAgLy9jdWJpY0ludGVycG9sYXRpb25Nb2RlOiAnbW9ub3RvbmUnLFxyXG4gICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTInXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdXYXR0JyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzRiYzBjMCcsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjNGJjMGMwJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogd2F0dE1lcmdlZCxcclxuICAgICAgICAgICAgICAgIGxpbmVUZW5zaW9uOiAwLFxyXG4gICAgICAgICAgICAgICAgLy9jdWJpY0ludGVycG9sYXRpb25Nb2RlOiAnbW9ub3RvbmUnLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy0zJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1N0cm9rZSByYXRlIChzcG0pJyxcclxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzk5NjZGRicsXHJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjOTk2NkZGJyxcclxuICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogc3Ryb2tlTWVyZ2VkLFxyXG4gICAgICAgICAgICAgICAgeUF4aXNJRDogJ3ktYXhpcy00J1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgfTtcclxuICAgIHZhciBteUxpbmVDaGFydCA9IENoYXJ0LkxpbmUoY3R4LCB7XHJcbiAgICAgICAgZGF0YTogbGluZUNoYXJ0RGF0YSxcclxuICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIGhvdmVyTW9kZTogJ2luZGV4JyxcclxuICAgICAgICAgICAgc3RhY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjYWxlczoge1xyXG4gICAgICAgICAgICAgICAgeUF4ZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsIC8vIG9ubHkgbGluZWFyIGJ1dCBhbGxvdyBzY2FsZSB0eXBlIHJlZ2lzdHJhdGlvbi4gVGhpcyBhbGxvd3MgZXh0ZW5zaW9ucyB0byBleGlzdCBzb2xlbHkgZm9yIGxvZyBzY2FsZSBmb3IgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbGVmdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtMScsXHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGVkTWluOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwU2l6ZTogNVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJywgLy8gb25seSBsaW5lYXIgYnV0IGFsbG93IHNjYWxlIHR5cGUgcmVnaXN0cmF0aW9uLiBUaGlzIGFsbG93cyBleHRlbnNpb25zIHRvIGV4aXN0IHNvbGVseSBmb3IgbG9nIHNjYWxlIGZvciBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtMicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcFNpemU6IDJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdyaWQgbGluZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRMaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJywgLy8gb25seSBsaW5lYXIgYnV0IGFsbG93IHNjYWxlIHR5cGUgcmVnaXN0cmF0aW9uLiBUaGlzIGFsbG93cyBleHRlbnNpb25zIHRvIGV4aXN0IHNvbGVseSBmb3IgbG9nIHNjYWxlIGZvciBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtMycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwU2l6ZTogMjVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRMaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSAvLyBvbmx5IHdhbnQgdGhlIGdyaWQgbGluZXMgZm9yIG9uZSBheGlzIHRvIHNob3cgdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJywgLy8gb25seSBsaW5lYXIgYnV0IGFsbG93IHNjYWxlIHR5cGUgcmVnaXN0cmF0aW9uLiBUaGlzIGFsbG93cyBleHRlbnNpb25zIHRvIGV4aXN0IHNvbGVseSBmb3IgbG9nIHNjYWxlIGZvciBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd5LWF4aXMtNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwU2l6ZTogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Z2dlc3RlZE1pbjogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWQgbGluZSBzZXR0aW5nc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkTGluZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogZmFsc2UgLy8gb25seSB3YW50IHRoZSBncmlkIGxpbmVzIGZvciBvbmUgYXhpcyB0byBzaG93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgYWRkR3JhcGggfVxyXG4iLCJpbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuXHJcbmNvbnN0IHN0eWxlcyA9IFt7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LCB7IFwibGlnaHRuZXNzXCI6IDY1IH0sXHJcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sIHsgXCJsaWdodG5lc3NcIjogNTEgfSxcclxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJsaWdodG5lc3NcIjogMzAgfSwgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJsaWdodG5lc3NcIjogNDAgfSwgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiIH1dXHJcbn0sIHsgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsIFwic3R5bGVyc1wiOiBbeyBcInZpc2liaWxpdHlcIjogXCJvZmZcIiB9XSB9LFxyXG4gICAgeyBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLCBcInN0eWxlcnNcIjogW3sgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9LCB7IFwibGlnaHRuZXNzXCI6IC0yNSB9LCB7IFwic2F0dXJhdGlvblwiOiAtMTAwIH1dIH0sXHJcbiAgICB7IFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIiwgXCJzdHlsZXJzXCI6IFt7IFwiaHVlXCI6IFwiI2ZmZmYwMFwiIH0sIHsgXCJsaWdodG5lc3NcIjogLTI1IH0sIHsgXCJzYXR1cmF0aW9uXCI6IC05NyB9XSB9XTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWFwKCkge1xyXG4gICAgaW5pdE1hcCgpO1xyXG4gICAgbWFwLmxpdmVQb2ludHMgPSBbXTtcclxuICAgIHZhciBwb2x5ID0gY3JlYXRlUG9seUxpbmUobWFwLmxpdmVQb2ludHMpO1xyXG4gICAgcG9seS5zZXRNYXAobWFwLmxpdmVNYXApO1xyXG5cclxuICAgIC8vIGZpdCBib3VuZHMgdG8gdHJhY2tcclxuICAgIGlmICh0eXBlb2YgbWFwLmxpdmVNYXAuZml0Qm91bmRzID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIG1hcC5saXZlTWFwLmZpdEJvdW5kcyhtYXAubGl2ZUJvdW5kcyk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgdmFyIG1hcERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXZlLW1hcCcpO1xyXG4gICAgaWYgKG1hcERpdikge1xyXG4gICAgICAgIG1hcC5saXZlTWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBEaXYsIHtcclxuICAgICAgICAgICAgem9vbTogOCxcclxuICAgICAgICAgICAgbWF4Wm9vbTogMTZcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXAubGl2ZUJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcclxuICAgICAgICBtYXAubGl2ZU1hcC5zZXQoJ3N0eWxlcycsIHN0eWxlcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vVE9ETzogQ2hhbmdlIGNvbG9yIGJ5IHNwZWVkIG9yIGhyLlxyXG5mdW5jdGlvbiBjcmVhdGVQb2x5TGluZShwb2ludHMpIHtcclxuICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuUG9seWxpbmUoe1xyXG4gICAgICAgIHBhdGg6IHBvaW50cyxcclxuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkYwMEFBXCIsXHJcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogLjcsXHJcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiA0XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIGFkZFJvdXRlVHJhY2tUb01hcCA9IGZ1bmN0aW9uIChuYW1lLCBlbGVtZW50KSB7XHJcbiAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9yb3V0ZXMvJyArIG5hbWUsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbGVtZW50WzBdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgem9vbTogOCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhab29tOiAxNlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFwLnNldCgnc3R5bGVzJywgc3R5bGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRhdGEuZ3BzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdCA9IHBvaW50LmxhdDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uID0gcG9pbnQubG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb2x5ID0gY3JlYXRlUG9seUxpbmUocG9pbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwb2x5LnNldE1hcChtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpdCBib3VuZHMgdG8gdHJhY2tcclxuICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxudmFyIGFkZEdweFRyYWNrVG9NYXAgPSBmdW5jdGlvbiAobmFtZSwgZWxlbWVudCkge1xyXG4gICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6ICcvc2Vzc2lvbnMvJyArIG5hbWUgKyAnLmdweCcsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICh4bWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnRbMF0sIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiAxNlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFwLnNldCgnc3R5bGVzJywgc3R5bGVzKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoeG1sKS5maW5kKFwidHJrcHRcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdCA9ICQodGhpcykuYXR0cihcImxhdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbG9uID0gJCh0aGlzKS5hdHRyKFwibG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwb2x5ID0gY3JlYXRlUG9seUxpbmUocG9pbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwb2x5LnNldE1hcChtYXApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZpdCBib3VuZHMgdG8gdHJhY2tcclxuICAgICAgICAgICAgICAgIG1hcC5maXRCb3VuZHMoYm91bmRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gbG9hZEdweE1hcCgpIHtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICB2YXIgZWxlbWVudCA9ICQodGhpcykuZmluZCgnLmNhcmQtbWFwLXRvcCcpO1xyXG4gICAgYWRkR3B4VHJhY2tUb01hcChuYW1lLCBlbGVtZW50KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY2xlYW5NYXAsIGluaXRNYXAsIHN0eWxlcywgYWRkUm91dGVUcmFja1RvTWFwLCBhZGRHcHhUcmFja1RvTWFwLCBsb2FkR3B4TWFwLFxyXG4gICAgY3JlYXRlUG9seUxpbmUgfSIsIlxyXG5mdW5jdGlvbiBsZWFkZXJib2FyZChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgJC5nZXQoJy9zdHJhdmEvcm91dGUvbGVhZGVyYm9hcmQvJyArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNlZ21lbnQobmFtZSwgY2FsbGJhY2spIHtcclxuICAgICQuZ2V0KCcvc3RyYXZhL3JvdXRlLycgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNhbGxiYWNrLmFwcGx5KGRhdGEpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsZWFkZXJib2FyZCwgc2VnbWVudCB9IiwiY29uc3QgV0FUVF9SQVRJT04gPSAyLjgwO1xyXG5cclxuZnVuY3Rpb24gY2FsY1dhdHQocGFjZSkge1xyXG4gICAgcmV0dXJuIFdBVFRfUkFUSU9OIC8gTWF0aC5wb3cocGFjZSwgMyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlc3Npb25OYW1lVG9SZWFkYWJsZShuYW1lKSB7XHJcbiAgICByZXR1cm4gbW9tZW50KG5hbWUuc2xpY2UoMCwgMTMpICsgJzonICsgbmFtZS5zbGljZSgxMywxNSkgKyAnOicgKyBuYW1lLnNsaWNlKDE1KSkuZm9ybWF0KFwiWVlZWS1NTS1ERCBoaDptbTpzc1wiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SGVhcnRSYXRlQ29sb3IoaHIpIHtcclxuICAgIGlmIChociA8IDEyNSkge1xyXG4gICAgICAgIHJldHVybiAndGV4dC1zdWNjZXNzJ1xyXG4gICAgfSBlbHNlIGlmIChociA8IDE1MCkge1xyXG4gICAgICAgIHJldHVybiAndGV4dC1wcmltYXJ5J1xyXG4gICAgfSBlbHNlIGlmIChociA8IDE3NSkge1xyXG4gICAgICAgIHJldHVybiAndGV4dC13YXJuaW5nJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LWRhbmdlcic7XHJcbiAgICB9XHJcbn1cclxuXHJcbnZhciBnZXRVcmxQYXJhbWV0ZXIgPSBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIoc1BhcmFtKSB7XHJcbiAgICB2YXIgc1BhZ2VVUkwgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkpLFxyXG4gICAgICAgIHNVUkxWYXJpYWJsZXMgPSBzUGFnZVVSTC5zcGxpdCgnJicpLFxyXG4gICAgICAgIHNQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIGk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHNVUkxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzUGFyYW1ldGVyTmFtZSA9IHNVUkxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgICAgaWYgKHNQYXJhbWV0ZXJOYW1lWzBdID09PSBzUGFyYW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNQYXJhbWV0ZXJOYW1lWzFdID09PSB1bmRlZmluZWQgPyB0cnVlIDogc1BhcmFtZXRlck5hbWVbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZm10TVNTKHMpIHtcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUobnVsbCk7XHJcbiAgICBkYXRlLnNldFNlY29uZHMocyk7IC8vIHNwZWNpZnkgdmFsdWUgZm9yIFNFQ09ORFMgaGVyZVxyXG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsIDgpO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBldmVyeSBnZXQgcGFyYW1ldGVyIGZyb20gYSBVUkwgKGZpcnN0IGFyZ3VtZW50KSBhcyBhIHByb3BlcnR5XHJcbiAqIFxyXG4gKiBAcGFyYW0gVVJMIHtTdHJpbmd9XHJcbiAqL1xyXG5mdW5jdGlvbiBRdWVyeVN0cmluZyhVUkwpIHtcclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgYW5vbnltb3VzLCBpcyBleGVjdXRlZCBpbW1lZGlhdGVseSBhbmQgXHJcbiAgICAvLyB0aGUgcmV0dXJuIHZhbHVlIGlzIGFzc2lnbmVkIHRvIFF1ZXJ5U3RyaW5nIVxyXG4gICAgdmFyIHF1ZXJ5X3N0cmluZyA9IHt9O1xyXG4gICAgdmFyIHVzZWZ1bFBhcmFtID0gVVJMLnNwbGl0KFwiP1wiKVsxXSB8fCBcIlwiO1xyXG4gICAgdmFyIHF1ZXJ5ID0gdXNlZnVsUGFyYW0gfHwgXCJcIjtcclxuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSWYgZmlyc3QgZW50cnkgd2l0aCB0aGlzIG5hbWVcclxuICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgICAgICAgICAgIC8vIElmIHNlY29uZCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgYXJyID0gW3F1ZXJ5X3N0cmluZ1twYWlyWzBdXSwgZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pXTtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID0gYXJyO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGlyZCBvciBsYXRlciBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXS5wdXNoKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBxdWVyeV9zdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgY2FsY1dhdHQsIHNlc3Npb25OYW1lVG9SZWFkYWJsZSwgZ2V0SGVhcnRSYXRlQ29sb3IsIGdldFVybFBhcmFtZXRlciwgZm10TVNTLCBcclxuICAgIFF1ZXJ5U3RyaW5nIH1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=