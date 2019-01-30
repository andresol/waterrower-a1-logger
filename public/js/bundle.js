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

let setUserAndRoute = function (data) {
    let user = data.user;
    let routeId = data.route;

    if (user) {
        $("#session-user").val(user);
    }

    if (routeId) {
        $("#routes").val(routeId);
    }
};

function loadMain() {
    $('#load').load('/main', function () {
        var that = $(this);

        $.when(
            that.find('#routes').each(_route_index__WEBPACK_IMPORTED_MODULE_0__["default"].loadRoutes),
        that.find('#session-user').each(_user_index__WEBPACK_IMPORTED_MODULE_1__["default"].loadUsers)).done(

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
            setUserAndRoute(data);
        }));

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
        alert("Uploaded to strava!");
    });
}

function startRow(e) {
    e.preventDefault();
    var routes = $('#routes').val();
    var userId = $('#session-user').val();
    var that = this;
    $.get("/row/start", { routes: routes, user: userId }, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9mcm9udC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL2hpc3RvcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvbWFwL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvcm91dGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy9zZXNzaW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXNlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvc3JjL3V0aWxzL2dsb2JhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9ncmFwaFV0aWxzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9zcmMvdXRpbHMvbWFwVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy9zdHJhdmEuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVlLGdFQUFDO0FBQ2hCLGlCQUFpQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3B1YmxpYy9qcy9zcmMvbWFpbi5qc1wiKTtcbiIsImltcG9ydCByb3V0ZSBmcm9tICcuLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4uL3VzZXIvaW5kZXgnO1xyXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnXHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IGdsb2JhbHMgZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJy4uL3Nlc3Npb24vaW5kZXgnO1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vaGlzdG9yeS9pbmRleCdcclxuXHJcbnZhciB0aW1lT3V0O1xyXG5cclxubGV0IHNldFVzZXJBbmRSb3V0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICBsZXQgdXNlciA9IGRhdGEudXNlcjtcclxuICAgIGxldCByb3V0ZUlkID0gZGF0YS5yb3V0ZTtcclxuXHJcbiAgICBpZiAodXNlcikge1xyXG4gICAgICAgICQoXCIjc2Vzc2lvbi11c2VyXCIpLnZhbCh1c2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocm91dGVJZCkge1xyXG4gICAgICAgICQoXCIjcm91dGVzXCIpLnZhbChyb3V0ZUlkKTtcclxuICAgIH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRNYWluKCkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvbWFpbicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICQud2hlbihcclxuICAgICAgICAgICAgdGhhdC5maW5kKCcjcm91dGVzJykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKSxcclxuICAgICAgICB0aGF0LmZpbmQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKSkuZG9uZShcclxuXHJcbiAgICAgICAgJC5nZXQoXCIvcm93L3N0YXR1c1wiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcm93aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ1JPV0lORycpIHtcclxuICAgICAgICAgICAgICAgIHJvd2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRSb3cnKTtcclxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5nZXRVcmxQYXJhbWV0ZXIoXCJ0ZXN0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRCdXR0b24gPSAkKCcjc3RhcnRTaW11bGF0b3InKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHN0YXJ0KHN0YXJ0QnV0dG9uLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlLmNoYW5nZVJvdXRlU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VXNlckFuZFJvdXRlKGRhdGEpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLy9SdW4gc2ltdWxhdG9yIGlmIHRlc3QuXHJcbiAgICAgICAgaWYgKHV0aWxzLmdldFVybFBhcmFtZXRlcihcInRlc3RcIikpIHtcclxuICAgICAgICAgICAgJCgnI3N0YXJ0Um93JykuYXR0cihcImlkXCIsIFwic3RhcnRTaW11bGF0b3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwbG9hZFRvU3RyYXZhKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBocmVmID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XHJcbiAgICAkLmdldChocmVmLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGFsZXJ0KFwiVXBsb2FkZWQgdG8gc3RyYXZhIVwiKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydFJvdyhlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgcm91dGVzID0gJCgnI3JvdXRlcycpLnZhbCgpO1xyXG4gICAgdmFyIHVzZXJJZCA9ICQoJyNzZXNzaW9uLXVzZXInKS52YWwoKTtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3Jvdy9zdGFydFwiLCB7IHJvdXRlczogcm91dGVzLCB1c2VyOiB1c2VySWQgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHN0YXJ0KHRoYXQpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3BSb3coZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCgnI21haW4tbmF2Jykuc2hvdygpO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgkKCcjbWFpbi1uYXYnKS5vZmZzZXQoKS50b3ApO1xyXG4gICAgdmFyIHRoYXQgPSAkKHRoaXMpO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVPdXQpO1xyXG4gICAgZ2xvYmFscy5ydW4gPSBmYWxzZTtcclxuICAgIHZhciByb3V0ZXMgPSAkKCcjcm91dGVzJykudmFsKCk7XHJcbiAgICB2YXIgdXNlciA9ICQoJyNzZXNzaW9uLXVzZXInKS52YWwoKTtcclxuICAgICQuZ2V0KFwiL3Jvdy9zdG9wXCIsIHsgcm91dGVzOiByb3V0ZXMsIHVzZXI6IHVzZXIgfSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkKCcjdGFibGUtY29udGVudCcpLmh0bWwoZ2V0SHRtbChcIlN0b3BwZWRcIiwgZGF0YSwgZmFsc2UpKTtcclxuICAgICAgICB2YXIgc3RhcnRSb3cgPSAkKFwiI3N0YXJ0Um93XCIpO1xyXG4gICAgICAgIHN0YXJ0Um93LnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgc3RhcnRSb3cucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgIHN0YXJ0Um93Lmh0bWwoJ1N0YXJ0IHJvdycpO1xyXG4gICAgICAgIHRoYXQuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICQoJyNyb3V0ZXMnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoJyNzZXNzaW9uLXVzZXInKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgICQoXCIjc3RhcnRTaW11bGF0b3JcIikucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydChzdGFydEJ1dHRvbiwgbG9hZE1hcD1mYWxzZSkge1xyXG4gICAgJCgnI21haW4tbmF2JykuaGlkZSgpO1xyXG4gICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgkKCcjbWFpbicpLm9mZnNldCgpLnRvcCk7IC8vU2Nyb2xsXHJcbiAgICBpZiAobG9hZE1hcCkge1xyXG4gICAgICAgIG1hcFV0aWxzLmNsZWFuTWFwKCk7XHJcbiAgICAgICAgdmFyIHJvd0luZm8gPSBnZXRfcm93SW5mby5iaW5kKG51bGwsIHRydWUsIFwiUm93aW5nXCIpO1xyXG4gICAgICAgIG1hcFV0aWxzLmFkZFNlc3Npb25UcmFja1RvTWFwKHJvd0luZm8pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2V0X3Jvd0luZm8odHJ1ZSwgXCJSb3dpbmdcIik7XHJcbiAgICAgICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgIH1cclxuICAgICQoJyNyb3V0ZXMnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJCgnI3Nlc3Npb24tdXNlcicpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKFwiI3N0YXJ0U2ltdWxhdG9yXCIpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgJChzdGFydEJ1dHRvbikuaHRtbCgnUm93aW5nLi4uJyk7XHJcbiAgICAkKHN0YXJ0QnV0dG9uKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAkKCcjc3RvcFJvdycpLnJlbW92ZUNsYXNzKCdkLW5vbmUnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3Jvd0luZm8oY29udGludWVzLCB0aXRsZSkge1xyXG4gICAgZ2xvYmFscy5ydW4gPSBjb250aW51ZXM7XHJcbiAgICAkLmdldChcIi9yb3dcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbCA9IGdldEh0bWwodGl0bGUsIGRhdGEpO1xyXG4gICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICQoJyN0YWJsZS1jb250ZW50JykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgJCgnI2xhcHMtYm9keScpLmh0bWwoc2Vzc2lvbi5nZXRMYXBIdG1sKHRpdGxlLCBkYXRhLCB0cnVlKSk7XHJcbiAgICAgICAgICAgIHZhciBsYXQgPSBkYXRhLmdwcy5sYXQ7XHJcbiAgICAgICAgICAgIHZhciBsb24gPSBkYXRhLmdwcy5sb247XHJcbiAgICAgICAgICAgIHZhciBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgIGlmIChtYXAubWFya2Vycy5sZW5ndGggPCBkYXRhLnRvdGFsTGFwcyApIHtcclxuICAgICAgICAgICAgICAgIG1hcFV0aWxzLmFkZE1hcmtlcihwLCBcIlJ1bmRlOiBcIiArIGRhdGEudG90YWxMYXBzLCBTdHJpbmcoZGF0YS50b3RhbExhcHMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXAubGl2ZVBvaW50cy5wdXNoKHApO1xyXG4gICAgICAgICAgICBpZiAobWFwLmxpdmVCb3VuZHMpIHtcclxuICAgICAgICAgICAgICAgIG1hcC5saXZlQm91bmRzLmV4dGVuZChwKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb2x5ID0gbWFwVXRpbHMuY3JlYXRlUG9seUxpbmUobWFwLmxpdmVQb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgcG9seS5zZXRNYXAobWFwLmxpdmVNYXApO1xyXG4gICAgICAgICAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZ2xvYmFscy5ydW4pIHtcclxuICAgICAgICAgICAgdGltZU91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBnZXRfcm93SW5mbyh0cnVlLCB0aXRsZSk7IH0sIGdsb2JhbHMuVVBEQVRFX0ZSRVEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkKCkge1xyXG4gICAgdmFyIGhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgIHN3aXRjaCAoaGFzaCkge1xyXG4gICAgICAgIGNhc2UgJyNyb3V0ZSc6XHJcbiAgICAgICAgICAgIHJvdXRlLmxvYWRSb3V0ZSgwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnI3VzZXInOlxyXG4gICAgICAgICAgICB1c2VyLmxvYWRVc2VyKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJyNoaXN0b3J5JzpcclxuICAgICAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeSgwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnI3Nlc3Npb24nOlxyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHV0aWxzLlF1ZXJ5U3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5ocmVmKVtcIm5hbWVcIl0ucmVwbGFjZSgnI3Nlc3Npb24nLFwiXCIpO1xyXG4gICAgICAgICAgICBzZXNzaW9uLmxvYWRTZXNzaW9uKG5hbWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICcjcm91dGVkZXRhaWwnOlxyXG4gICAgICAgICAgICByb3V0ZS5sb2FkUm91dGVEZXRhaWwodXRpbHMuUXVlcnlTdHJpbmcod2luZG93LmxvY2F0aW9uLmhyZWYpW1wicm91dGVcIl0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBsb2FkTWFpbigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0SHRtbChsYWJlbCwganNvbiwgZGF5KSB7XHJcbiAgICBpZiAocGFyc2VJbnQoanNvbi5tZXRlcnMpID09PSAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChkYXkpIHtcclxuICAgICAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+RGF5PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBqc29uLnN0YXJ0LnN1YnN0cigyLCBqc29uLnN0YXJ0Lmxhc3RJbmRleE9mKCdUJykgLSAyKSArICc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlN0YXJ0OjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsganNvbi5zdGFydC5zdWJzdHIoanNvbi5zdGFydC5sYXN0SW5kZXhPZignVCcpICsgMSwgOCkgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj5UaW1lOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KGpzb24uc2Vjb25kcykpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+TGVuZ3RoOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgcGFyc2VJbnQoanNvbi5tZXRlcnMpICsgJyBtICgnICsganNvbi5wZXJjZW50ICsgJyk8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlBhY2U6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi5wYWNlKSAqIDMuNiAqIDEwKSAvIDEwICsgJyBrbS90PC9kaXY+PC9kaXY+JztcclxuICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwiY29sLXNtLTRcIj41MDBtOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KGpzb24ubGFwUGFjZSkpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+Mms6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoanNvbi50b3dLUGFjZSkpICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBodG1sICs9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImNvbC1zbS00XCI+QXZnLlc6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPicgKyBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoanNvbi53YXR0KSAqIDEwKSAvIDEwICsgJ3c8L2Rpdj48L2Rpdj4nO1xyXG4gICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPlNSOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2xcIj4nICsgTWF0aC5yb3VuZChwYXJzZUZsb2F0KGpzb24uc3Ryb2tlKSAqIDEwKSAvIDEwICsgJzwvZGl2PjwvZGl2Pic7XHJcbiAgICBpZiAocGFyc2VJbnQoanNvbi5ocikgPiAwKSB7XHJcbiAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPkhSOjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wgJyArIHV0aWxzLmdldEhlYXJ0UmF0ZUNvbG9yKHBhcnNlSW50KGpzb24uaHIpKSArICdcIj4nICsgcGFyc2VJbnQoanNvbi5ocikgKyAocGFyc2VJbnQoanNvbi5hdmdIcikgPiAwID8gJygnICsgcGFyc2VJbnQoanNvbi5hdmdIcikgKyAnKScgOiAnJykgKyAnPC9kaXY+PC9kaXY+JztcclxuICAgIH1cclxuICAgIGlmIChqc29uLmZpbGVOYW1lKSB7XHJcbiAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJjb2wtc20tNFwiPkFjdGlvbnM6PC9kaXY+PGRpdiBjbGFzcz1cImNvbFwiPjxhIGhyZWY9XCIvc2Vzc2lvbnMvJyArIGpzb24uZmlsZU5hbWU7XHJcbiAgICAgICAgaHRtbCArPSAnXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPmZpbGVfZG93bmxvYWQ8L2k+PGEgY2xhc3M9XCJzdHJhdmFcIiBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIGpzb24ubmFtZTtcclxuICAgICAgICBodG1sICs9ICdcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlVwbG9hZCB0byBzdHJhdmFcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y2xvdWRfdXBsb2FkPC9pPjwvYT4nO1xyXG4gICAgICAgIGh0bWwgKz0gJzxhIGNsYXNzPVwic2Vzc2lvbnNcIiBkYXRhLW5hbWU9XCInICsganNvbi5uYW1lICsgJ1wiIGhyZWY9XCIvc2Vzc2lvbnNcIj48aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIlNlc3Npb25cIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmliZXJfbmV3PC9pPjwvYT48L2Rpdj48L2Rpdj4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGh0bWwgKyBcIlwiO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkTWFpbiwgc3RhcnQsIGdldF9yb3dJbmZvLCBnZXRIdG1sLCBzdGFydFJvdywgc3RvcFJvdywgbG9hZCwgdXBsb2FkVG9TdHJhdmEgfTsiLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkSGlzdG9yeUluZGV4KGluZGV4KSB7XHJcbiAgICBsb2FkSGlzdG9yeShpbmRleCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRIaXN0b3J5KG1haW5JbmRleCkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvaGlzdG9yeScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNoaXN0b3J5JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxvYWRMYXN0M1Nlc3Npb25zKCk7XHJcbiAgICAgICAgICAgIGxvYWRIaXN0b3J5TGlzdCgkKHRoaXMpLCBtYWluSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWRMYXN0M1Nlc3Npb25zKCkge1xyXG4gICAgJC5nZXQoJy9zZXNzaW9uLycgKyAwICsgJy8nICsgMiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbENhcmRzID0gJyc7XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChzZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIGh0bWxDYXJkcyA9IGNyZWF0ZUNhcmQoaHRtbENhcmRzLCBzZXNzaW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnI2NhcmRzJykuaHRtbCgnPGRpdiBjbGFzcz1cImNvbFwiPjxkaXYgY2xhc3M9XCJjYXJkLWRlY2tcIj4nICsgaHRtbENhcmRzICsgJzwvZGl2PjwvZGl2PicpO1xyXG4gICAgICAgICQoJy5ncHgtdHJhY2snKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKFwibG9hZC1tYXBcIiwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZEhpc3RvcnlMaXN0KHRoYXQsIG1haW5JbmRleCkge1xyXG4gICAgdmFyIHN0YXJ0ID0gbWFpbkluZGV4ICogUEFHRV9TSVpFLCBzdG9wID0gKCgobWFpbkluZGV4ICsgMSkgKiBQQUdFX1NJWkUpKSAtIDE7XHJcbiAgICAkLmdldCgnL3Nlc3Npb24vJyArIHN0YXJ0ICsgJy8nICsgc3RvcCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAkLmdldCgnL3VzZXJzJywgZnVuY3Rpb24gKHVzZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBodG1sVGFibGUgPSAnJywgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB2YXIgdXNlck1hcCA9IHVzZXJzLnJlZHVjZShmdW5jdGlvbihtYXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgbWFwW29iai5pZF0gPSBvYmo7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoc2Vzc2lvbikge1xyXG4gICAgICAgICAgICAgICAgaHRtbFRhYmxlID0gY3JlYXRlTGFwVGFibGVSZWNvcmQoaHRtbFRhYmxlLCBpbmRleCArIChtYWluSW5kZXggKiBQQUdFX1NJWkUpLCBzZXNzaW9uLCB1c2VyTWFwKTtcclxuICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJCgnI2hpc3Rvci10YWJsZS1ib2R5JykuaHRtbChodG1sVGFibGUpO1xyXG4gICAgICAgICAgICB2YXIgcGFnID0gdGhhdC5maW5kKCcucGFnZScpO1xyXG4gICAgICAgICAgICBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWcsIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3Blbkhpc3RvcnkoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIG5leHQgPSBwYXJzZUludCgkKHRoaXMpLmRhdGEoJ25leHQnKSksIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCdpbmRleCcpKSxcclxuICAgICAgICBtYWluSW5kZXggPSBwYXJzZUludCgkKCcjaGlzdG9yeS1wYWdlJykuZGF0YSgnaW5kZXgnKSk7XHJcbiAgICBpZiAoIWlzTmFOKG5leHQpKSB7XHJcbiAgICAgICAgbWFpbkluZGV4ICs9IG5leHQ7XHJcbiAgICB9IGVsc2UgaWYgKCFpc05hTihpbmRleCkpIHtcclxuICAgICAgICBtYWluSW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgIGxvYWRIaXN0b3J5TGlzdCgkKCcjaGlzdG9yeS10YWJsZScpLCBtYWluSW5kZXgpO1xyXG59XHJcblxyXG5cclxudmFyIGNyZWF0ZUNhcmQgPSBmdW5jdGlvbiAoaHRtbENhcmRzLCBzZXNzaW9uKSB7XHJcbiAgICBodG1sQ2FyZHMgKz0gJzxkaXYgY2xhc3M9XCJjYXJkIGdweC10cmFja1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCJcIj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCI+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPGRpdiBjbGFzcz1cImNhcmQtbWFwLXRvcCBcIj48L2Rpdj4nO1xyXG4gICAgaHRtbENhcmRzICs9ICc8aDUgY2xhc3M9XCJjYXJkLXRpdGxlIG10LTJcIj48YSBjbGFzcz1cInNlc3Npb25zXCIgZGF0YS1uYW1lPVwiJyArIHNlc3Npb24ubmFtZSArICdcIiBocmVmPVwiL3Nlc3Npb25cIj4nICsgdXRpbHMuc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKHNlc3Npb24ubmFtZSkgKyAnPC9hPjwvaDU+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPHAgY2xhc3M9XCJjYXJkLXRleHRcIj5MZW5ndGg6ICcgKyBwYXJzZUludChzZXNzaW9uLmVuZFN0YXRzLm1ldGVycykgKyAnbSwgVGltZTogJyArIHV0aWxzLmZtdE1TUyhwYXJzZUludChzZXNzaW9uLmVuZFN0YXRzLnNlY29uZHMpKSArICc8L3A+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPGEgaHJlZj1cIi9zdHJhdmEvdXBsb2FkLycgKyBzZXNzaW9uLm5hbWUgKyAnXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgc3RyYXZhIGJ0bi1ibG9ja1wiPlVwbG9hZCB0byBTdHJhdmE8L2E+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPC9kaXY+JztcclxuICAgIGh0bWxDYXJkcyArPSAnPC9kaXY+JztcclxuICAgIHJldHVybiBodG1sQ2FyZHM7XHJcbn07XHJcblxyXG52YXIgY3JlYXRlTGFwVGFibGVSZWNvcmQgPSBmdW5jdGlvbiAoaHRtbFRhYmxlLCBpbmRleCwgc2Vzc2lvbiwgdXNlck1hcCkge1xyXG4gICAgdmFyIHVzZXIgPSB1c2VyTWFwW3Nlc3Npb24udXNlcl07XHJcbiAgICBodG1sVGFibGUgKz0gJzx0cj4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGggc2NvcGU9XCJyb3dcIj4nICsgKGluZGV4ICsgMSkgKyAnPC90aD4nO1xyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+PGEgY2xhc3M9XCJzZXNzaW9uc1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCIgaHJlZj1cIi8/bmFtZT0nK3Nlc3Npb24ubmFtZSsnI3Nlc3Npb25cIj4nICsgdXRpbHMuc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKHNlc3Npb24ubmFtZSkgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPkxlbmd0aDogJyArIHBhcnNlSW50KHNlc3Npb24uZW5kU3RhdHMubWV0ZXJzKSArICdtPC90ZD4nO1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgdXNlci5maXJzdE5hbWUgKyAnICcgKyB1c2VyLmxhc3ROYW1lICsgJzwvdGQ+JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8dGQ+PC90ZD4nO1xyXG4gICAgfVxyXG4gICAgaHRtbFRhYmxlICs9ICc8dGQ+IDxhIGhyZWY9XCIvc2Vzc2lvbnMvJyArIHNlc3Npb24ubmFtZSArICcuZ3B4XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNlwiPmZpbGVfZG93bmxvYWQ8L2k+PGEgY2xhc3M9XCJzdHJhdmFcIiBocmVmPVwiL3N0cmF2YS91cGxvYWQvJyArIHNlc3Npb24ubmFtZSArICdcIj4nICtcclxuICAgICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJVcGxvYWQgdG8gU3RyYXZhXCIgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBtZC0zNiBzdHJhdmEtaWNvblwiPmNsb3VkX3VwbG9hZDwvaT48L2E+IDxhIGNsYXNzPVwiZGVsLXNlc3Npb25cIiBocmVmPVwiI1wiIGRhdGEtbmFtZT1cIicgKyBzZXNzaW9uLm5hbWUgKyAnXCI+JyArXHJcbiAgICAgICAgJzxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRpdGxlPVwiRGVsZXRlIHNlc3Npb24gbG9jYWxcIiBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG1kLTM2XCI+ZGVsZXRlPC9pPjwvYT48L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzwvdHI+JztcclxuICAgIHJldHVybiBodG1sVGFibGU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVIaXN0b3J5TmF2UGFnZShwYWdlLCBpbmRleCkge1xyXG4gICAgdmFyIGh0bWxFbGVtZW50ID0gJCgnPHVsIGlkPVwiaGlzdG9yeS1wYWdlXCIgZGF0YS1pbmRleD1cIicgKyBpbmRleCArICdcIj48L3VsPicpLmFkZENsYXNzKFwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWxnXCIpO1xyXG4gICAgJC5nZXQoXCJzZXNzaW9uL3NpemVcIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KHBhcnNlSW50KGRhdGEpIC8gUEFHRV9TSVpFKSArIDE7XHJcbiAgICAgICAgdmFyIHByZXZEaXNhYmxlZCA9IChpbmRleCA9PT0gMCA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIG5leHREaXNhYmxlZCA9IChpbmRleCA9PT0gc2l6ZSAtIDEgPyAnZGlzYWJsZWQnIDogJycpO1xyXG4gICAgICAgIHZhciBwcmV2ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBwcmV2RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj1cIiNcIiBkYXRhLW5leHQ9XCItMVwiIHRhYmluZGV4PVwiLTFcIj5QcmV2aW91czwvYT4nKTtcclxuICAgICAgICB2YXIgbmV4dCA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgbmV4dERpc2FibGVkICsgJ1wiPjwvbGk+JykuYXBwZW5kKCc8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGRhdGEtbmV4dD1cIjFcIiBocmVmPVwiI1wiPk5leHQ8L2E+Jyk7XHJcblxyXG4gICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChwcmV2KTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYWN0aXZlID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gaSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlID0gXCJhY3RpdmVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9ICQoJzxsaSBjbGFzcz1cInBhZ2UtaXRlbSAnICsgYWN0aXZlICsgJ1wiPjxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1pbmRleD1cIicgKyBpICsgJ1wiIGhyZWY9XCIjXCI+JyArIChpICsgMSkgKyAnPC9hPjwvbGk+Jyk7XHJcbiAgICAgICAgICAgIGh0bWxFbGVtZW50LmFwcGVuZChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKG5leHQpO1xyXG4gICAgICAgICQocGFnZSkuaHRtbChodG1sRWxlbWVudCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHsgbG9hZEhpc3RvcnlJbmRleCwgbG9hZEhpc3RvcnksIGxvYWRIaXN0b3J5TGlzdCwgb3Blbkhpc3RvcnkgfSIsImltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IGZyb250IGZyb20gJy4vZnJvbnQvaW5kZXgnO1xyXG5pbXBvcnQgcm91dGUgZnJvbSAnLi9yb3V0ZS9pbmRleCc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlci9pbmRleCc7XHJcbmltcG9ydCBtYXBVdGlscyBmcm9tICcuL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4vbWFwL2luZGV4J1xyXG5pbXBvcnQgaGlzdG9yeSBmcm9tICcuL2hpc3RvcnkvaW5kZXgnXHJcbmltcG9ydCBzZXNzaW9uIGZyb20gJy4vc2Vzc2lvbi9pbmRleCdcclxuXHJcbi8qKlxyXG4gKiBEZWNsYXJlcyBhIG5ldyBvYmplY3QgaW4gdGhlIHdpbmRvdyBuYW1lbHkgUXVlcnlTdHJpbmcgdGhhdCBjb250YWlucyBldmVyeSBnZXQgcGFyYW1ldGVyIGZyb20gdGhlIGN1cnJlbnQgVVJMIGFzIGEgcHJvcGVydHlcclxuICovXHJcbndpbmRvdy5RdWVyeVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgYW5vbnltb3VzLCBpcyBleGVjdXRlZCBpbW1lZGlhdGVseSBhbmQgXHJcbiAgICAvLyB0aGUgcmV0dXJuIHZhbHVlIGlzIGFzc2lnbmVkIHRvIFF1ZXJ5U3RyaW5nIVxyXG4gICAgdmFyIHF1ZXJ5X3N0cmluZyA9IHt9O1xyXG4gICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcbiAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KFwiJlwiKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoXCI9XCIpO1xyXG5cclxuICAgICAgICAvLyBJZiBmaXJzdCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICAgICAgICAgICAgLy8gSWYgc2Vjb25kIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbcXVlcnlfc3RyaW5nW3BhaXJbMF1dLCBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSldO1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBhcnI7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dLnB1c2goZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5X3N0cmluZztcclxufSgpO1xyXG5cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgLyoqIEluaXQgc2hhcmVkICovXHJcbiAgICBmcm9udC5nZXRfcm93SW5mbyhmYWxzZSwgXCJcIik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLm1haW4nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGZyb250LmxvYWRNYWluKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcjdXNlcicsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdXNlci5sb2FkVXNlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnI2hpc3RvcnktcGFnZSBhJywgaGlzdG9yeS5vcGVuSGlzdG9yeSk7XHJcblxyXG4gICAgLy9UT0RPOiByZWZhY3RvcnlcclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJyNyb3V0ZS1wYWdlIGEnLCByb3V0ZS5vcGVuUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5uYXYtbGluaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgJCgnI21haW4tbmF2JykuZmluZChcIi5uYXYtaXRlbVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLnNlc3Npb25zJywgc2Vzc2lvbi5jbGlja1Nlc3Npb24pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2EjaGlzdG9yeScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaGlzdG9yeS5sb2FkSGlzdG9yeUluZGV4KDAsIDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnYSNyb3V0ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJsb2FkLW1hcFwiLCAnLmdweC10cmFjaycsIG1hcFV0aWxzLmxvYWRHcHhNYXApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJ2J1dHRvbiNzdGFydFJvdycsIGZyb250LnN0YXJ0Um93KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICdidXR0b24jc3RvcFJvdycsIGZyb250LnN0b3BSb3cpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5lZGl0LXVzZXInLCB1c2VyLmVkaXRVc2VyKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZWRpdC1yb3V0ZScsIHJvdXRlLmVkaXRSb3V0ZSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLnN0cmF2YScsIGZyb250LnVwbG9hZFRvU3RyYXZhKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcuZGVsLXNlc3Npb24nLCBzZXNzaW9uLmRlbGV0ZVNlc3Npb24pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjc2F2ZS1yb3V0ZVwiLCByb3V0ZS5zYXZlUm91dGUpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjc2F2ZS11c2VyXCIsIHVzZXIuc2F2ZVVzZXIpO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgJy5kZWwtdXNlcicsIHVzZXIuZGVsZXRlVXNlcik7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCAnLmRlbC1yb3V0ZScsIHJvdXRlLmRlbGV0ZVJvdXRlKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsICcucm91dGUtZGV0YWlsJywgcm91dGUuY2xpY2tSb3V0ZURldGFpbCk7XHJcblxyXG4gICAgJCgnI2xvYWQnKS5lYWNoKGZyb250LmxvYWQpO1xyXG5cclxuICAgICQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xyXG5cclxuICAgICQoJyNzZXNzaW9uLXVzZXInKS5lYWNoKHVzZXIubG9hZFVzZXJzKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2hvdy5icy5tb2RhbCcsICcjc2hvdy1yb3V0ZS1tb2RhbCcsIHJvdXRlLnNob3dSb3V0ZU1vZGFsKTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2hvd24uYnMubW9kYWwnLCAnI3Nob3ctcm91dGUtbW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gJChlLnJlbGF0ZWRUYXJnZXQpLmRhdGEoJ3JvdXRlLW5hbWUnKTtcclxuICAgICAgICBtYXBVdGlscy5hZGRSb3V0ZVRyYWNrVG9NYXAobmFtZSwgJChcIiNsaXZlLXJvdXRlLW1hcFwiKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcImNoYW5nZVwiLCAnI3JvdXRlcycsIHJvdXRlLmNoYW5nZVJvdXRlU2VsZWN0KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsInZhciBsaXZlUG9pbnRzID0gW107XHJcbnZhciBsaXZlTWFwO1xyXG52YXIgbGl2ZUJvdW5kcztcclxudmFyIG1hcmtlcnMgPSBbXTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxpdmVQb2ludHMsIGxpdmVNYXAsIGxpdmVCb3VuZHMsIG1hcmtlcnMgfSIsImltcG9ydCBtYXBVdGlscyBmcm9tICcuLi91dGlscy9tYXBVdGlscydcclxuaW1wb3J0IG1hcCBmcm9tICcuLi9tYXAvaW5kZXgnXHJcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCBzdHJhdmEgZnJvbSAnLi4vdXRpbHMvc3RyYXZhJztcclxuaW1wb3J0IGdyYXBoVXRpbHMgZnJvbSAnLi4vdXRpbHMvZ3JhcGhVdGlscyc7XHJcbmltcG9ydCB7IFVQREFURV9GUkVRLCBQQUdFX1NJWkUsIFJBVElPTiwgcnVuIH0gZnJvbSAnLi4vdXRpbHMvZ2xvYmFscyc7XHJcblxyXG4vKiogQWxsIGxvYWQgZnVuY3Rpb25zICovXHJcbnZhciBsb2FkUm91dGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAkLmdldChcIi9yb3cvcm91dGVzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIHZhciBncm91cCA9ICcnO1xyXG4gICAgICAgIGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gKGEuY291bnRyeSA+IGIuY291bnRyeSkgPyAxIDogKChiLmNvdW50cnkgPiBhLmNvdW50cnkpID8gLTEgOiAwKTsgfSk7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RlZCA9ICdzZWxlY3RlZD1cInNlbGVjdGVkXCInO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLmNvdW50cnkgIT09IGdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8b3B0Z3JvdXAgbGFiZWw9XCInICsgdmFsdWUuY291bnRyeSArICdcIj4nO1xyXG4gICAgICAgICAgICAgICAgZ3JvdXAgPSB2YWx1ZS5jb3VudHJ5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gJyArIHNlbGVjdGVkICsgJyB2YWx1ZT1cIicgKyB2YWx1ZS5pbmRleCArICdcIiBkYXRhLW5hbWU9XCInICsgdmFsdWUubmFtZSArICdcIiBkYXRhLWxhdD1cIicgK1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuZ3BzWzBdLmxhdCArICdcIiBkYXRhLWxvbj1cIicgKyB2YWx1ZS5ncHNbMF0ubG9uICsgJ1wiPicgKyB2YWx1ZS5uYW1lICsgJyAoJyArIHZhbHVlLm1ldGVycyArICdtKTwvb3B0aW9uPic7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkID0gJyc7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJCh0aGF0KS5odG1sKGh0bWwpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG52YXIgY3JlYXRlUm91dGVSZWNvcmQgPSBmdW5jdGlvbiAoaHRtbFRhYmxlLCBpbmRleCwgcm91dGUpIHtcclxuICAgIGh0bWxUYWJsZSArPSAnPHRyPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0aCBzY29wZT1cInJvd1wiPicgKyAoaW5kZXggKyAxKSArICc8L3RoPic7XHJcbiAgICAvL2h0bWxUYWJsZSArPSAnPHRkPjxhIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXJvdXRlLW5hbWU9XCInICsgcm91dGUubmFtZSArICdcIiBkYXRhLXRhcmdldD1cIiNzaG93LXJvdXRlLW1vZGFsXCIgaHJlZj1cIi9yb3V0ZXMvJyArIHJvdXRlLm5hbWUgKyAnXCI+JyArIHJvdXRlLm5hbWUgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPjxhIGNsYXNzPVwicm91dGUtZGV0YWlsXCIgZGF0YS1yb3V0ZS1uYW1lPVwiJyArIHJvdXRlLm5hbWUgKyAnXCIgaHJlZj1cIj9yb3V0ZT0nKyByb3V0ZS5uYW1lICsnI3JvdXRlZGV0YWlsXCI+JyArIHJvdXRlLm5hbWUgKyAnPC9hPjwvdGQ+JztcclxuICAgIGh0bWxUYWJsZSArPSAnPHRkPicgKyBwYXJzZUludChyb3V0ZS5tZXRlcnMpICsgJ208L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nICsgcm91dGUuY291bnRyeSArICc8L3RkPic7XHJcbiAgICBodG1sVGFibGUgKz0gJzx0ZD4nXHJcbiAgICBpZiAocm91dGUucGVybWFuZW50ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgaHRtbFRhYmxlICs9ICc8YSBjbGFzcz1cImVkaXQtcm91dGVcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgcm91dGUubmFtZSArICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y3JlYXRlPC9pPjwvYT4nICtcclxuICAgICAgICAgICAgJzxhIGNsYXNzPVwiZGVsLXJvdXRlXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHJvdXRlLm5hbWUgKyAnXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBhcmlhLWhpZGRlbj1cInRydWVcIiB0aXRsZT1cIkRlbGV0ZSByb3V0ZVwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPicgKyAnPC90ZD4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBodG1sVGFibGUgKz0gJzxpPkRlZmF1bHQ8L2k+JztcclxuICAgIH1cclxuICAgIGh0bWxUYWJsZSArPSAnPC90cj4nO1xyXG4gICAgcmV0dXJuIGh0bWxUYWJsZTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGxvYWRSb3V0ZShtYWluSW5kZXgpIHtcclxuICAgICQoJyNsb2FkJykubG9hZCgnL3JvdXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3JvdXRlcy10JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxvYWRSb3V0ZVRhYmxlKDApO1xyXG4gICAgICAgICAgICB2YXIgcGFnID0gJCgnI3JvdXRlcy10YWJsZScpLmZpbmQoJy5wYWdlJyk7XHJcbiAgICAgICAgICAgIGNyZWF0ZVJvdXRlTmF2UGFnZShwYWdbMF0sIG1haW5JbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlUm91dGVOYXZQYWdlKHBhZ2UsIGluZGV4KSB7XHJcbiAgICB2YXIgaHRtbEVsZW1lbnQgPSAkKCc8dWwgaWQ9XCJyb3V0ZS1wYWdlXCIgZGF0YS1pbmRleD1cIicgKyBpbmRleCArICdcIj48L3VsPicpLmFkZENsYXNzKFwicGFnaW5hdGlvbiBwYWdpbmF0aW9uLWxnXCIpO1xyXG4gICAgJC5nZXQoXCJyb3V0ZXMvc2l6ZVwiLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQocGFyc2VJbnQoZGF0YSkgLyBQQUdFX1NJWkUpICsgMTtcclxuICAgICAgICB2YXIgcHJldkRpc2FibGVkID0gKGluZGV4ID09PSAwID8gJ2Rpc2FibGVkJyA6ICcnKTtcclxuICAgICAgICB2YXIgbmV4dERpc2FibGVkID0gKGluZGV4ID09PSBzaXplIC0gMSA/ICdkaXNhYmxlZCcgOiAnJyk7XHJcbiAgICAgICAgdmFyIHByZXYgPSAkKCc8bGkgY2xhc3M9XCJwYWdlLWl0ZW0gJyArIHByZXZEaXNhYmxlZCArICdcIj48L2xpPicpLmFwcGVuZCgnPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPVwiI1wiIGRhdGEtbmV4dD1cIi0xXCIgdGFiaW5kZXg9XCItMVwiPlByZXZpb3VzPC9hPicpO1xyXG4gICAgICAgIHZhciBuZXh0ID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBuZXh0RGlzYWJsZWQgKyAnXCI+PC9saT4nKS5hcHBlbmQoJzxhIGNsYXNzPVwicGFnZS1saW5rXCIgZGF0YS1uZXh0PVwiMVwiIGhyZWY9XCIjXCI+TmV4dDwvYT4nKTtcclxuXHJcbiAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKHByZXYpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhY3RpdmUgPSAnJztcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmUgPSBcImFjdGl2ZVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gJCgnPGxpIGNsYXNzPVwicGFnZS1pdGVtICcgKyBhY3RpdmUgKyAnXCI+PGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCIgaHJlZj1cIiNcIj4nICsgKGkgKyAxKSArICc8L2E+PC9saT4nKTtcclxuICAgICAgICAgICAgaHRtbEVsZW1lbnQuYXBwZW5kKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sRWxlbWVudC5hcHBlbmQobmV4dCk7XHJcbiAgICAgICAgJChwYWdlKS5odG1sKGh0bWxFbGVtZW50KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGVUYWJsZShtYWluSW5kZXgpIHtcclxuICAgIHZhciBzdGFydCA9IG1haW5JbmRleCAqIFBBR0VfU0laRSwgc3RvcCA9ICgoKG1haW5JbmRleCArIDEpICogUEFHRV9TSVpFKSkgLSAxO1xyXG4gICAgJC5nZXQoJy9yb3V0ZXMvJyArIHN0YXJ0ICsgJy8nICsgc3RvcCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB2YXIgaHRtbFRhYmxlID0gJyc7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHJvdXRlKSB7XHJcbiAgICAgICAgICAgIGh0bWxUYWJsZSA9IGNyZWF0ZVJvdXRlUmVjb3JkKGh0bWxUYWJsZSwgaW5kZXggKyAobWFpbkluZGV4ICogUEFHRV9TSVpFKSwgcm91dGUpO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcjcm91dGVzLXRhYmxlLWJvZHknKS5odG1sKGh0bWxUYWJsZSk7XHJcbiAgICAgICAgJCgnI2FkZC1yb3V0ZS1tb2RhbCcpLm9uKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsb2FkUm91dGUoMCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBlZGl0Um91dGUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBpZCxcclxuICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gJChcIiNhZGRSb3V0ZVwiKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjbmFtZScpLnZhbChyZXN1bHQubmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI21ldGVycycpLnZhbChyZXN1bHQubWV0ZXJzKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjc2VnbWVudElkJykudmFsKHJlc3VsdC5zZWdtZW50SWQpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNjb3VudHJpZXMnKS52YWwocmVzdWx0LmNvdW50cnkpO1xyXG4gICAgICAgICAgICAvL2dwcy5yZXBsYWNlKC8oLiopLCguKiksKC4qKS9nbSwgJ3sgXCJsYXRcIjogJDEsIFwibG9uXCI6ICQyLCBcImVsXCI6ICQzIH0sJyk7XHJcbiAgICAgICAgICAgIHZhciBncHNDdnMgPSBKU09OLnN0cmluZ2lmeShyZXN1bHQuZ3BzKTtcclxuICAgICAgICAgICAgZm9ybS5maW5kKCcjZ3BzJykuYXBwZW5kKGdwc0N2cyk7XHJcbiAgICAgICAgICAgICQoJyNhZGQtcm91dGUtbW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93Um91dGVNb2RhbChlKSB7XHJcbiAgICB2YXIgbmFtZSA9ICQoZS5yZWxhdGVkVGFyZ2V0KS5kYXRhKCdyb3V0ZS1uYW1lJyk7XHJcbiAgICB2YXIgdGhhdCA9ICQodGhpcyk7XHJcbiAgICAkLmdldChcIi9yb3V0ZXMvXCIgKyBuYW1lLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHZhciB0aXRsZSA9IGRhdGEubmFtZTtcclxuICAgICAgICBpZiAoZGF0YS5zZWdlbWVudElkKSB7XHJcbiAgICAgICAgICAgIHRpdGxlID0gJzxhIGNsYXNzPVwic3RyYXZhLXNlZ21lbnRcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuc3RyYXZhLmNvbS9zZWdtZW50cy8nICsgZGF0YS5zZWdlbWVudElkICsgJyB0aXRsZT1cIlN0cmF2YSBTZWdtZW50IFVybFwiIFwiPicgKyB0aXRsZSArICcgPC9hPic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQuZmluZCgnI3Nob3ctcm91dGUtbW9kYWwtdGl0bGUnKS5odG1sKHRpdGxlKTtcclxuICAgICAgICB2YXIgaHRtbCA9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+RGlzcGxheSBMZW5naHQ6PC9oNT4nICsgZGF0YS5tZXRlcnMgKyAnIG08L2xpPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkdwcyBMZW5naHQ6PC9oNT4nICsgZGF0YS5ncHNMZW5naHQgKyAnIG08L2xpPic7XHJcbiAgICAgICAgaHRtbCArPSAnPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+PGg1IGNsYXNzPVwiY2FyZC10aXRsZVwiPkNvdW50cnk6PC9oNT4nICsgZGF0YS5jb3VudHJ5ICsgJzwvbGk+JztcclxuICAgICAgICB0aGF0LmZpbmQoJy5jYXJkIC5saXN0LWdyb3VwJykuaHRtbChodG1sKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VSb3V0ZVNlbGVjdCgpIHtcclxuICAgIHZhciBzZWxlY3RlZCA9ICQoJyNyb3V0ZXMnKS5maW5kKFwiOnNlbGVjdGVkXCIpO1xyXG4gICAgbWFwVXRpbHMuY2xlYW5NYXAoKTtcclxuICAgIHZhciBuYW1lID0gc2VsZWN0ZWQuZGF0YSgnbmFtZScpO1xyXG4gICAgbWFwVXRpbHMuYWRkUm91dGVUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVSb3V0ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgcm91dGU/XCIpO1xyXG4gICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogJy9yb3V0ZXMvJyArIGlkLFxyXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcm91dGUubG9hZFJvdXRlKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNhdmVSb3V0ZShldmVudCkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBmb3JtID0gJChcIiNhZGRSb3V0ZVwiKTtcclxuICAgIHZhciByb3V0ZSA9IHt9O1xyXG4gICAgcm91dGUubmFtZSA9IGZvcm0uZmluZCgnI25hbWUnKS52YWwoKTtcclxuICAgIHJvdXRlLm1ldGVycyA9IGZvcm0uZmluZCgnI21ldGVycycpLnZhbCgpO1xyXG4gICAgcm91dGUuc3RyYXZhSWQgPSBmb3JtLmZpbmQoJyNzZWdtZW50SWQnKS52YWwoKTtcclxuICAgIHJvdXRlLmNvdW50cnkgPSBmb3JtLmZpbmQoJyNjb3VudHJpZXMnKS52YWwoKTtcclxuICAgIHJvdXRlLmdwcyA9IGZvcm0uZmluZCgndGV4dGFyZWEnKS52YWwoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BVVCcsXHJcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHVybDogXCIvcm91dGVzL2FkZFwiLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHJvdXRlKSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNhZGQtcm91dGUtbW9kYWwnKS5tb2RhbCgnaGlkZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkUm91dGVEZXRhaWwobmFtZSkge1xyXG4gICAgJCgnI2xvYWQnKS5sb2FkKCcvcm91dGUvZGV0YWlscycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBtYXBVdGlscy5jbGVhbk1hcCgpO1xyXG4gICAgICAgIHZhciB0YWJsZUZ1bmN0ID0gYWRkVG9UYWJsZS5iaW5kKCQodGhpcykuZmluZCgnI3N0cmF2YS1yZXN1bHQnKSk7XHJcbiAgICAgICAgc3RyYXZhLmxlYWRlcmJvYXJkKG5hbWUsIHRhYmxlRnVuY3QpO1xyXG4gICAgICAgIG1hcFV0aWxzLmFkZFJvdXRlVHJhY2tUb01hcChuYW1lLCAkKFwiI2xpdmUtbWFwXCIpKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZS1zdGF0cycpLmVhY2gobG9hZFJvdXRlU3RhdHMuYmluZCgodGhpcyksIG5hbWUpKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNzdHJhdmEtcmVzdWx0JykuZWFjaChyb3V0ZS5sb2FkUm91dGVzKTtcclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFJvdXRlU3RhdHMobmFtZSkge1xyXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvcm91dGVzLycgKyBuYW1lLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgbGV0IGh0bWwgPSAnPGRpdiBjbGFzcz1cImNhcmQgY2FyZC1kZWZhdWx0XCI+PGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPjxkaXYgY2xhc3M9XCJyb3dcIj4nXHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0Lm5hbWUgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5OYW1lPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cImNvbC1tZC0yXCI+PGRpdiBjbGFzcz1cInN0YXRpc3RpY1wiPjxkaXYgY2xhc3M9XCJ2YWx1ZVwiPicgKyByZXN1bHQubWV0ZXJzICsnPC9kaXY+PGRpdiBjbGFzcz1cImxhYmVsXCI+TGVuZ2h0IChtKTwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJjb2wtbWQtNVwiPjxkaXYgY2xhc3M9XCJzdGF0aXN0aWNcIj48ZGl2IGNsYXNzPVwidmFsdWVcIj4nICsgcmVzdWx0LmNvdW50cnkgKyc8L2Rpdj48ZGl2IGNsYXNzPVwibGFiZWxcIj5Db3VudHJ5PC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgaHRtbCArPSAnPC9kaXY+PC9kaXY+PC9kaXY+J1xyXG4gICAgICAgICAgICAkKHRoYXQpLmZpbmQoJyNyb3V0ZS1zdGF0cycpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFRvVGFibGUoZGF0YSkge1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChkYXRhLmVudHJpZXMpIHtcclxuICAgICAgICBkYXRhLmVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPiA8dGggc2NvcGU9XCJyb3dcIj4gJyArIGVudHJ5LmF0aGxldGVfbmFtZSArICcgPC90aD48dGQ+ICcgKyB1dGlscy5mbXRNU1MocGFyc2VJbnQoZW50cnkubW92aW5nX3RpbWUpKSArICc8L3RkPiA8dGQ+JyArIGVudHJ5LnN0YXJ0X2RhdGUgKyc8L3RkPjwvdHI+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuaHRtbChodG1sKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb3BlblJvdXRlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuZXh0ID0gcGFyc2VJbnQoJCh0aGlzKS5kYXRhKCduZXh0JykpLCBpbmRleCA9IHBhcnNlSW50KCQodGhpcykuZGF0YSgnaW5kZXgnKSksXHJcbiAgICAgICAgbWFpbkluZGV4ID0gcGFyc2VJbnQoJCgnI3JvdXRlLXBhZ2UnKS5kYXRhKCdpbmRleCcpKTtcclxuICAgIGlmICghaXNOYU4obmV4dCkpIHtcclxuICAgICAgICBtYWluSW5kZXggKz0gbmV4dDtcclxuICAgIH0gZWxzZSBpZiAoIWlzTmFOKGluZGV4KSkge1xyXG4gICAgICAgIG1haW5JbmRleCA9IGluZGV4O1xyXG4gICAgfVxyXG4gICAgdmFyIHBhZyA9ICQoJyNyb3V0ZXMtdGFibGUnKS5maW5kKCcucGFnZScpO1xyXG4gICAgY3JlYXRlUm91dGVOYXZQYWdlKHBhZ1swXSwgbWFpbkluZGV4KTtcclxuICAgIGxvYWRSb3V0ZVRhYmxlKG1haW5JbmRleCk7XHJcbn1cclxuXHJcbnZhciBjbGlja1JvdXRlRGV0YWlsID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCdyb3V0ZS1uYW1lJyk7XHJcbiAgICBsb2FkUm91dGVEZXRhaWwobmFtZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxvYWRSb3V0ZXMsIGNyZWF0ZVJvdXRlUmVjb3JkLCBsb2FkUm91dGUsIGxvYWRSb3V0ZVRhYmxlLFxyXG4gICAgIGNyZWF0ZVJvdXRlTmF2UGFnZSwgZWRpdFJvdXRlLCBzaG93Um91dGVNb2RhbCwgY2hhbmdlUm91dGVTZWxlY3QsIGRlbGV0ZVJvdXRlLFxyXG5zYXZlUm91dGUsIG9wZW5Sb3V0ZSwgbG9hZFJvdXRlRGV0YWlsLCBjbGlja1JvdXRlRGV0YWlsfSIsImltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy91dGlscyc7XHJcbmltcG9ydCBncmFwaFV0aWxzIGZyb20gJy4uL3V0aWxzL2dyYXBoVXRpbHMnO1xyXG5pbXBvcnQgeyBVUERBVEVfRlJFUSwgUEFHRV9TSVpFLCBSQVRJT04sIHJ1biB9IGZyb20gJy4uL3V0aWxzL2dsb2JhbHMnO1xyXG5pbXBvcnQgZnJvbnQgZnJvbSAnLi4vZnJvbnQvaW5kZXgnO1xyXG5pbXBvcnQgcm91dGUgZnJvbSAnLi4vcm91dGUvaW5kZXgnO1xyXG5pbXBvcnQgdXNlciBmcm9tICcuLi91c2VyL2luZGV4JztcclxuaW1wb3J0IG1hcFV0aWxzIGZyb20gJy4uL3V0aWxzL21hcFV0aWxzJ1xyXG5pbXBvcnQgbWFwIGZyb20gJy4uL21hcC9pbmRleCdcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSAnLi4vaGlzdG9yeS9pbmRleCdcclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkU2Vzc2lvbihuYW1lKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy9zZXNzaW9ucycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJyNyb3V0ZXMnKS5lYWNoKHJvdXRlLmxvYWRSb3V0ZXMpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3Nlc3Npb24tdXNlcicpLmVhY2godXNlci5sb2FkVXNlcnMpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI2hpc3Rvcnktc2Vzc2lvbicpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdGl0bGUgPSBcIkhpc3RvcnlcIjtcclxuICAgICAgICAgICAgJC5nZXQoXCIvc2Vzc2lvbi9cIiArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaHRtbCA9IGZyb250LmdldEh0bWwodGl0bGUsIGRhdGEuZW5kU3RhdHMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgJCgnI3JvdXRlcycpLnZhbChkYXRhLnJvdXRlKTtcclxuICAgICAgICAgICAgICAgICQoJyNzZXNzaW9uLXVzZXInKS52YWwoZGF0YS51c2VyKTtcclxuICAgICAgICAgICAgICAgIGlmIChodG1sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI3RhYmxlLWNvbnRlbnQnKS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNsYXBzLWJvZHknKS5odG1sKGdldExhcEh0bWwodGl0bGUsIGRhdGEuZW5kU3RhdHMpKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXBVdGlscy5hZGRHcHhUcmFja1RvTWFwKG5hbWUsICQoXCIjbGl2ZS1tYXBcIikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ3JhcGhVdGlscy5hZGRHcmFwaChkYXRhLnJhdywgZGF0YS5yYXdIciwgcGFyc2VJbnQoZGF0YS5zdGFydCksIGRhdGEuc3Ryb2tlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TGFwSHRtbChsYWJlbCwganNvbiwgcmV2ZXJzZSkge1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmIChwYXJzZUludChqc29uLnRvdGFsTGFwcykgPiAwKSB7XHJcbiAgICAgICAgdmFyIGxhcE51bSA9IDE7XHJcbiAgICAgICAgdmFyIGxhcHMgPSBqc29uLmxhcHM7XHJcbiAgICAgICAgaWYgKHJldmVyc2UpIHtcclxuICAgICAgICAgICAgbGFwcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIGxhcE51bSA9IGxhcHMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXBzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dHI+PHRoIHNjb3BlPVwicm93XCI+JyArIGxhcE51bSArICc8L3RoPjx0ZD4nICsgcGFyc2VJbnQodmFsdWUubWV0ZXJzKSArICc8L3RkPjx0ZD4nICsgdXRpbHMuZm10TVNTKHBhcnNlSW50KHZhbHVlLnNlY29uZHMpKSArICc8L3RkPic7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+JyArIE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWx1ZS53YXR0KSAqIDEwKSAvIDEwICsgJ3c8L3RkPjwvdHI+JztcclxuICAgICAgICAgICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFwTnVtLS07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhcE51bSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJldHVybiBodG1sO1xyXG59XHJcblxyXG5cclxudmFyIGNsaWNrU2Vzc2lvbiA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgbmFtZSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgbG9hZFNlc3Npb24obmFtZSk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBkZWxldGVTZXNzaW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBuYW1lID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICB2YXIgcmVzdWx0ID0gY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgc2Vzc2lvbj9cIik7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3Nlc3Npb24vZGVsLycgKyBuYW1lLFxyXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTZXNzaW9uIGRlbGV0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICBoaXN0b3J5LmxvYWRIaXN0b3J5SW5kZXgoMCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkU2Vzc2lvbiwgY2xpY2tTZXNzaW9uLCBnZXRMYXBIdG1sLCBkZWxldGVTZXNzaW9uIH0iLCJcclxudmFyIGxvYWRVc2VycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICQuZ2V0KFwiL3VzZXJzXCIsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgdmFyIGh0bWwgPSAnJztcclxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gJzxvcHRpb24gdmFsdWU9XCInICsgdmFsdWUuaWQgKyAnXCI+JyArIHZhbHVlLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLmxhc3ROYW1lICsgJzwvb3B0aW9uPidcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKHRoYXQpLmh0bWwoaHRtbClcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gZWRpdFVzZXIoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdmFyIGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6ICcvdXNlcnMvJyArIGlkLFxyXG4gICAgICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgdmFyIGZvcm0gPSAkKFwiI2FkZFVzZXJGb3JtXCIpO1xyXG4gICAgICAgICAgICBmb3JtLmZpbmQoJyNmaXJzdE5hbWUnKS52YWwocmVzdWx0LmZpcnN0TmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI2xhc3ROYW1lJykudmFsKHJlc3VsdC5sYXN0TmFtZSk7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZCgnI3VzZXJJZCcpLnZhbChyZXN1bHQuaWQpO1xyXG4gICAgICAgICAgICAkLmdldCgnL3N0cmF2YS91cmwnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVybCA9IGRhdGEudXJsLnJlcGxhY2UoXCIlMjRcIiwgcmVzdWx0LmlkKTtcclxuICAgICAgICAgICAgICAgICQoJy5zdHJhdmEtdXJsJykuYXR0cignaHJlZicsIHVybCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgY29ubmVjdCA9ICQoXCIuc3RyYXZhLWNvbm5lY3RcIik7XHJcbiAgICAgICAgICAgIGNvbm5lY3QucmVtb3ZlQ2xhc3MoXCJzci1vbmx5XCIpO1xyXG4gICAgICAgICAgICAkKCcjYWRkVXNlck1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gbG9hZFVzZXIoKSB7XHJcbiAgICAkKCcjbG9hZCcpLmxvYWQoJy91c2VyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuZmluZCgnI3VzZXJzLWJvZHknKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAkLmdldChcIi91c2Vycy9cIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBodG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdXNlciA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHRyPjx0ZD48YSBocmVmPVwiI1wiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiN1c2VyU3RhdHNNb2RhbFwiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj4nICsgKGkgKyAxKSArICc8L2E+PC90ZD48dGQ+JyArIHVzZXIuZmlyc3ROYW1lICsgJzwvdGQ+PHRkPicgKyB1c2VyLmxhc3ROYW1lICsgJzwvdGQ+JztcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8dGQ+PGEgY2xhc3M9XCJlZGl0LXVzZXJcIiBocmVmPVwiI1wiIGRhdGEtaWQ9XCInICsgdXNlci5pZCArICdcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+Y3JlYXRlPC9pPjwvYT48YSBjbGFzcz1cImRlbC11c2VyXCIgaHJlZj1cIiNcIiBkYXRhLWlkPVwiJyArIHVzZXIuaWQgKyAnXCI+PGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdGl0bGU9XCJEZWxldGUgdXNlclwiIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5kZWxldGU8L2k+PC9hPjwvdGQ+JyArICc8L3RyPidcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQodGhhdCkuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgICAgICQoJyNhZGRVc2VyTW9kYWwnKS5vbignaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkVXNlcigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2F2ZVVzZXIoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB2YXIgZm9ybSA9ICQoXCIjYWRkVXNlckZvcm1cIik7XHJcbiAgICB2YXIgZmlyc3ROYW1lID0gZm9ybS5maW5kKCcjZmlyc3ROYW1lJykudmFsKCk7XHJcbiAgICB2YXIgbGFzdE5hbWUgPSBmb3JtLmZpbmQoJyNsYXN0TmFtZScpLnZhbCgpO1xyXG4gICAgdmFyIGlkID0gZm9ybS5maW5kKCcjdXNlcklkJykudmFsKCk7XHJcbiAgICB2YXIgdXNlciA9IHt9O1xyXG4gICAgdXNlci5maXJzdE5hbWUgPSBmaXJzdE5hbWU7XHJcbiAgICB1c2VyLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICB1c2VyLmlkID0gaWQ7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdQVVQnLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB1cmw6IFwiL3VzZXJzL2FkZFwiLFxyXG4gICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHVzZXIpLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI2FkZFVzZXJNb2RhbCcpLm1vZGFsKCdoaWRlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVVc2VyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHZhciBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgIHZhciByZXN1bHQgPSBjb25maXJtKFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZT9cIik7XHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL3VzZXJzLycgKyBpZCxcclxuICAgICAgICAgICAgdHlwZTogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHVzZXIubG9hZFVzZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBsb2FkVXNlcnMsIGxvYWRVc2VyLCBlZGl0VXNlciwgc2F2ZVVzZXIsIGRlbGV0ZVVzZXIgfSIsImV4cG9ydCBjb25zdCBSQVRJT04gPSAoMTAwIC8gNC44MDUpICogNjtcclxuZXhwb3J0IGNvbnN0IFBBR0VfU0laRSA9IDEwO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZSRVEgPSAxMDAwO1xyXG5leHBvcnQgdmFyIHJ1biA9IGZhbHNlO1xyXG5cclxuZ29vZ2xlLm1hcHMuTGF0TG5nLnByb3RvdHlwZS5rbVRvID0gZnVuY3Rpb24oYSl7XHJcbiAgICB2YXIgZSA9IE1hdGgsIHJhID0gZS5QSS8xODA7XHJcbiAgICB2YXIgYiA9IHRoaXMubGF0KCkgKiByYSwgYyA9IGEubGF0KCkgKiByYSwgZCA9IGIgLSBjO1xyXG4gICAgdmFyIGcgPSB0aGlzLmxuZygpICogcmEgLSBhLmxuZygpICogcmE7XHJcbiAgICB2YXIgZiA9IDIgKiBlLmFzaW4oZS5zcXJ0KGUucG93KGUuc2luKGQvMiksIDIpICsgZS5jb3MoYikgKiBlLmNvc1xyXG4gICAgKGMpICogZS5wb3coZS5zaW4oZy8yKSwgMikpKTtcclxuICAgIHJldHVybiBmICogNjM3OC4xMzc7XHJcbn1cclxuXHJcbmdvb2dsZS5tYXBzLlBvbHlsaW5lLnByb3RvdHlwZS5pbkttID0gZnVuY3Rpb24obil7XHJcbiAgICB2YXIgYSA9IHRoaXMuZ2V0UGF0aChuKSwgbGVuID0gYS5nZXRMZW5ndGgoKSwgZGlzdCA9IDA7XHJcbiAgICBmb3IodmFyIGk9MDsgaTxsZW4tMTsgaSsrKXtcclxuICAgICAgICBkaXN0ICs9IGEuZ2V0QXQoaSkua21UbyhhLmdldEF0KGkrMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRpc3Q7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBSQVRJT04sIFBBR0VfU0laRSwgVVBEQVRFX0ZSRVEsIHJ1biB9IiwiaW1wb3J0IHsgVVBEQVRFX0ZSRVEsIFBBR0VfU0laRSwgUkFUSU9OLCBydW4gfSBmcm9tICcuLi91dGlscy9nbG9iYWxzJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzL3V0aWxzJztcclxuXHJcbmZ1bmN0aW9uIGFkZEdyYXBoKHRpbWUsIGhyLCBzdGFydCwgc3Ryb2tlcykge1xyXG4gICAgdmFyIHNwZWVkID0gW107XHJcbiAgICB2YXIgd2F0dCA9IFtdO1xyXG4gICAgdmFyIHN0cm9rZSA9IFtdO1xyXG4gICAgdmFyIHN0cm9rZUNvbnRlciA9IDE7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRpbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGltZVZhbCA9IHBhcnNlSW50KHRpbWVbaV0pO1xyXG4gICAgICAgIHZhciBzdHJva2VUaW1lID0gcGFyc2VJbnQoc3Ryb2tlc1tzdHJva2VDb250ZXJdKTtcclxuICAgICAgICB2YXIgc2VjID0gKCh0aW1lVmFsIC0gc3RhcnQpIC8gMTAwMCk7XHJcbiAgICAgICAgdmFyIGxlbmdodCA9IChSQVRJT04gLyAxMDApO1xyXG4gICAgICAgIHNwZWVkLnB1c2goKChsZW5naHQgLyBzZWMpKSAqIDMuNik7XHJcbiAgICAgICAgdmFyIHdhdHRWYWx1ZSA9IHV0aWxzLmNhbGNXYXR0KHNlYyAvIGxlbmdodCk7XHJcbiAgICAgICAgd2F0dC5wdXNoKHdhdHRWYWx1ZSk7XHJcbiAgICAgICAgc3Ryb2tlLnB1c2goMTAwMCo2MCAvIChzdHJva2VUaW1lIC0gcGFyc2VJbnQoc3Ryb2tlc1tzdHJva2VDb250ZXItMV0pKSk7XHJcbiAgICAgICAgc3RhcnQgPSBwYXJzZUludCh0aW1lW2ldKTtcclxuICAgICAgICBpZiAodGltZVZhbCA+IHN0cm9rZVRpbWUpIHtcclxuICAgICAgICAgICAgc3Ryb2tlQ29udGVyKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vUmVtb3ZlIGV2ZXIgc2Vjb25kIGVsZW1lbnRcclxuICAgIHZhciBzcGVlZE1lcmdlZCA9IFtdO1xyXG4gICAgdmFyIGhyTWVyZ2VkID0gW107XHJcbiAgICB2YXIgd2F0dE1lcmdlZCA9IFtdO1xyXG4gICAgdmFyIHN0cm9rZU1lcmdlZCA9IFtdO1xyXG4gICAgdmFyIGxhYmVsc01lcmdlZCA9IFtdO1xyXG4gICAgdmFyIG1lcmdlU2l6ZSA9IDEwO1xyXG4gICAgaWYgKHRpbWUubGVuZ3RoID4gMTAwMCkge1xyXG4gICAgICAgIG1lcmdlU2l6ZSA9IDIwO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICh0aW1lLmxlbmd0aCkge1xyXG4gICAgICAgIHZhciBhID0gdGltZS5zcGxpY2UoMCwgbWVyZ2VTaXplKTtcclxuICAgICAgICB2YXIgdGltZVYgPSBwYXJzZUludChhLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gYS5sZW5ndGgpO1xyXG4gICAgICAgIGxhYmVsc01lcmdlZC5wdXNoKG5ldyBEYXRlKHRpbWVWKS50b0lTT1N0cmluZygpLnN1YnN0cihuZXcgRGF0ZSh0aW1lVikudG9JU09TdHJpbmcoKS5sYXN0SW5kZXhPZignVCcpICsgMSwgOCkpO1xyXG4gICAgICAgIGlmIChocikge1xyXG4gICAgICAgICAgICB2YXIgaCA9IGhyLnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgICAgICBpZiAoaC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBock1lcmdlZC5wdXNoKHBhcnNlSW50KGgucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBoLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdHJva2UpIHtcclxuICAgICAgICAgICAgdmFyIGggPSBzdHJva2Uuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN0cm9rZU1lcmdlZC5wdXNoKE1hdGgucm91bmQocGFyc2VGbG9hdChoLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gaC5sZW5ndGgpICogMTApIC8gMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzcGVlZCkge1xyXG4gICAgICAgICAgICB2YXIgcyA9IHNwZWVkLnNwbGljZSgwLCBtZXJnZVNpemUpO1xyXG4gICAgICAgICAgICB2YXIgdyA9IHdhdHQuc3BsaWNlKDAsIG1lcmdlU2l6ZSk7XHJcbiAgICAgICAgICAgIGlmIChzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNwZWVkTWVyZ2VkLnB1c2goTWF0aC5yb3VuZChwYXJzZUZsb2F0KHMucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSkgLyBzLmxlbmd0aCkgKiAxMCkgLyAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgd2F0dE1lcmdlZC5wdXNoKE1hdGgucm91bmQocGFyc2VGbG9hdCh3LnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGI7IH0pIC8gdy5sZW5ndGgpICogMTApIC8gMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBjdHggPSAkKCcjaHItZ3JhcGgnKTtcclxuICAgIHZhciBsaW5lQ2hhcnREYXRhID0ge1xyXG4gICAgICAgIGxhYmVsczogbGFiZWxzTWVyZ2VkLFxyXG4gICAgICAgIGRhdGFzZXRzOiBbe1xyXG4gICAgICAgICAgICBsYWJlbDogJ0hlYXJ0IHJhdGUgKGJwbSknLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyNkYzM1NDUnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZGMzNTQ1JyxcclxuICAgICAgICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRhdGE6IGhyTWVyZ2VkLFxyXG4gICAgICAgICAgICAvLyBjdWJpY0ludGVycG9sYXRpb25Nb2RlOiAnbW9ub3RvbmUnLFxyXG4gICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTEnLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdTcGVlZCAoa20vdCknLFxyXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJyMwMDdiZmYnLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDA3YmZmJyxcclxuICAgICAgICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRhdGE6IHNwZWVkTWVyZ2VkLFxyXG4gICAgICAgICAgICAvL2N1YmljSW50ZXJwb2xhdGlvbk1vZGU6ICdtb25vdG9uZScsXHJcbiAgICAgICAgICAgIHlBeGlzSUQ6ICd5LWF4aXMtMidcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogJ1dhdHQnLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjNGJjMGMwJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM0YmMwYzAnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB3YXR0TWVyZ2VkLFxyXG4gICAgICAgICAgICAgICAgbGluZVRlbnNpb246IDAsXHJcbiAgICAgICAgICAgICAgICAvL2N1YmljSW50ZXJwb2xhdGlvbk1vZGU6ICdtb25vdG9uZScsXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTMnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiAnU3Ryb2tlIHJhdGUgKHNwbSknLFxyXG4gICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICcjOTk2NkZGJyxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyM5OTY2RkYnLFxyXG4gICAgICAgICAgICAgICAgZmlsbDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBzdHJva2VNZXJnZWQsXHJcbiAgICAgICAgICAgICAgICB5QXhpc0lEOiAneS1heGlzLTQnXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICB9O1xyXG4gICAgdmFyIG15TGluZUNoYXJ0ID0gQ2hhcnQuTGluZShjdHgsIHtcclxuICAgICAgICBkYXRhOiBsaW5lQ2hhcnREYXRhLFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaG92ZXJNb2RlOiAnaW5kZXgnLFxyXG4gICAgICAgICAgICBzdGFja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgc2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICB5QXhlczogW3tcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJywgLy8gb25seSBsaW5lYXIgYnV0IGFsbG93IHNjYWxlIHR5cGUgcmVnaXN0cmF0aW9uLiBUaGlzIGFsbG93cyBleHRlbnNpb25zIHRvIGV4aXN0IHNvbGVseSBmb3IgbG9nIHNjYWxlIGZvciBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3ktYXhpcy0xJyxcclxuICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRNaW46IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiA1XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICBpZDogJ3ktYXhpcy0yJyxcclxuICAgICAgICAgICAgICAgICAgICB0aWNrczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwU2l6ZTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogZmFsc2UgLy8gb25seSB3YW50IHRoZSBncmlkIGxpbmVzIGZvciBvbmUgYXhpcyB0byBzaG93IHVwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3ktYXhpcy0zJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiAyNVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBncmlkIGxpbmUgc2V0dGluZ3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZExpbmVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25DaGFydEFyZWE6IGZhbHNlIC8vIG9ubHkgd2FudCB0aGUgZ3JpZCBsaW5lcyBmb3Igb25lIGF4aXMgdG8gc2hvdyB1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLCAvLyBvbmx5IGxpbmVhciBidXQgYWxsb3cgc2NhbGUgdHlwZSByZWdpc3RyYXRpb24uIFRoaXMgYWxsb3dzIGV4dGVuc2lvbnMgdG8gZXhpc3Qgc29sZWx5IGZvciBsb2cgc2NhbGUgZm9yIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3ktYXhpcy00JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlja3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBTaXplOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGVkTWluOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZCBsaW5lIHNldHRpbmdzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRMaW5lczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJhd09uQ2hhcnRBcmVhOiBmYWxzZSAvLyBvbmx5IHdhbnQgdGhlIGdyaWQgbGluZXMgZm9yIG9uZSBheGlzIHRvIHNob3cgdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBhZGRHcmFwaCB9XHJcbiIsImltcG9ydCBtYXAgZnJvbSAnLi4vbWFwL2luZGV4J1xyXG5cclxuXHJcbmNvbnN0IHN0eWxlcyA9IFt7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LCB7IFwibGlnaHRuZXNzXCI6IDY1IH0sXHJcbiAgICAgICAgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIiwgXCJzdHlsZXJzXCI6IFt7IFwic2F0dXJhdGlvblwiOiAtMTAwIH0sIHsgXCJsaWdodG5lc3NcIjogNTEgfSxcclxuICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcInNpbXBsaWZpZWRcIiB9XVxyXG59LCB7XHJcbiAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJsaWdodG5lc3NcIjogMzAgfSwgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmxvY2FsXCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJsaWdodG5lc3NcIjogNDAgfSwgeyBcInZpc2liaWxpdHlcIjogXCJvblwiIH1dXHJcbn0sIHtcclxuICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0XCIsIFwic3R5bGVyc1wiOiBbeyBcInNhdHVyYXRpb25cIjogLTEwMCB9LFxyXG4gICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiIH1dXHJcbn0sIHsgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlLnByb3ZpbmNlXCIsIFwic3R5bGVyc1wiOiBbeyBcInZpc2liaWxpdHlcIjogXCJvZmZcIiB9XSB9LFxyXG4gICAgeyBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLCBcInN0eWxlcnNcIjogW3sgXCJ2aXNpYmlsaXR5XCI6IFwib25cIiB9LCB7IFwibGlnaHRuZXNzXCI6IC0yNSB9LCB7IFwic2F0dXJhdGlvblwiOiAtMTAwIH1dIH0sXHJcbiAgICB7IFwiZmVhdHVyZVR5cGVcIjogXCJ3YXRlclwiLCBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIiwgXCJzdHlsZXJzXCI6IFt7IFwiaHVlXCI6IFwiI2ZmZmYwMFwiIH0sIHsgXCJsaWdodG5lc3NcIjogLTI1IH0sIHsgXCJzYXR1cmF0aW9uXCI6IC05NyB9XSB9XTtcclxuXHJcbmZ1bmN0aW9uIGNsZWFuTWFwKGluaXQgPSB0cnVlKSB7XHJcbiAgICBpZiAoaW5pdCkge1xyXG4gICAgICAgIGluaXRNYXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBtYXAubGl2ZVBvaW50cyA9IFtdO1xyXG4gICAgbWFwLm1hcmtlcnMgPSBbXTtcclxuICAgIGxldCBwb2x5ID0gY3JlYXRlUG9seUxpbmUobWFwLmxpdmVQb2ludHMpO1xyXG4gICAgcG9seS5zZXRNYXAobWFwLmxpdmVNYXApO1xyXG5cclxuICAgIC8vIGZpdCBib3VuZHMgdG8gdHJhY2tcclxuICAgIGlmICh0eXBlb2YgbWFwLmxpdmVNYXAgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXAubGl2ZU1hcC5maXRCb3VuZHMgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgbWFwLmxpdmVNYXAuZml0Qm91bmRzKG1hcC5saXZlQm91bmRzKTtcclxuICAgIH1cclxuICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRNYXAoKSB7XHJcbiAgICBsZXQgbWFwRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpdmUtbWFwJyk7XHJcbiAgICBpZiAobWFwRGl2KSB7XHJcbiAgICAgICAgbWFwLmxpdmVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcERpdiwge1xyXG4gICAgICAgICAgICB6b29tOiA4LFxyXG4gICAgICAgICAgICBtYXhab29tOiAxNlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcC5saXZlQm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xyXG4gICAgICAgIG1hcC5saXZlTWFwLnNldCgnc3R5bGVzJywgc3R5bGVzKTtcclxuICAgIH1cclxufVxyXG5cclxuLy9UT0RPOiBDaGFuZ2UgY29sb3IgYnkgc3BlZWQgb3IgaHIuXHJcbmZ1bmN0aW9uIGNyZWF0ZVBvbHlMaW5lKHBvaW50cykge1xyXG4gICAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZSh7XHJcbiAgICAgICAgcGF0aDogcG9pbnRzLFxyXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwQUFcIixcclxuICAgICAgICBzdHJva2VPcGFjaXR5OiAuNyxcclxuICAgICAgICBzdHJva2VXZWlnaHQ6IDRcclxuICAgIH0pO1xyXG59XHJcblxyXG52YXIgYWRkUm91dGVUcmFja1RvTWFwID0gZnVuY3Rpb24gKG5hbWUsIGVsZW1lbnQpIHtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiAnL3JvdXRlcy8nICsgbmFtZSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncHMgPSBkYXRhLmdwcztcclxuICAgICAgICAgICAgICAgIGxldCBtYXBFbGVtZW50ID0gZWxlbWVudFswXTtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFpvb206IDE2XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXAuc2V0KCdzdHlsZXMnLCBzdHlsZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ3BzLmZvckVhY2goZnVuY3Rpb24gKHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhdCA9IHBvaW50LmxhdDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9uID0gcG9pbnQubG9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm91bmRzLmV4dGVuZChwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwb2x5ID0gY3JlYXRlUG9seUxpbmUocG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIHBvbHkuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgYWRkR3B4VHJhY2tUb01hcCA9IGZ1bmN0aW9uIChuYW1lLCBlbGVtZW50KSB7XHJcbiAgICBsZXQgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbGVtZW50WzBdLCB7XHJcbiAgICAgICAgem9vbTogMTZcclxuICAgIH0pO1xyXG4gICAgdmFyIHN1Y2Nlc1htbCA9IGFkZFhtbC5iaW5kKG51bGwsIG1hcCk7XHJcbiAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9zZXNzaW9ucy8nICsgbmFtZSArICcuZ3B4JyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzWG1sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgYWRkU2Vzc2lvblRyYWNrVG9NYXAgPSBmdW5jdGlvbiAoY29tcGxldGUpIHtcclxuICAgIHZhciBzdWNjZXNYbWwgPSBhZGRYbWwuYmluZChudWxsLCBtYXAubGl2ZU1hcCk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiR0VUXCIsXHJcbiAgICAgICAgdXJsOiAncm93L2dweCcsXHJcbiAgICAgICAgc3VjY2Vzczogc3VjY2VzWG1sLFxyXG4gICAgICAgIGNvbXBsZXRlOiBjb21wbGV0ZVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5cclxuZnVuY3Rpb24gYWRkWG1sKG1hcCwgeG1sKSB7XHJcbiAgICBsZXQgcG9pbnRzID0gW107XHJcblxyXG4gICAgbWFwLnNldCgnc3R5bGVzJywgc3R5bGVzKTtcclxuXHJcbiAgICBsZXQgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcygpO1xyXG4gICAgbGV0IGxhcHMgPSAxO1xyXG4gICAgbGV0IG1hcmtlciA9IDE7XHJcbiAgICAkKHhtbCkuZmluZChcInRya3B0XCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBsYXQgPSAkKHRoaXMpLmF0dHIoXCJsYXRcIik7XHJcbiAgICAgICAgbGV0IGxvbiA9ICQodGhpcykuYXR0cihcImxvblwiKTtcclxuICAgICAgICBsZXQgcCA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsb24pO1xyXG5cclxuICAgICAgICBwb2ludHMucHVzaChwKTtcclxuICAgICAgICBsZXQga20gPSBjcmVhdGVQb2x5TGluZShwb2ludHMpLmluS20oKTtcclxuICAgICAgICBsYXBzID0gcGFyc2VJbnQoa20gLyAwLjUpICsgMTsgLy8gMC41IGlzIDUwMCBsYXBcclxuICAgICAgICBpZiAobWFya2VyIDwgbGFwcyApIHtcclxuICAgICAgICAgICAgYWRkTWFya2VyKHAsIFwiUnVuZGU6IFwiICsgKGxhcHMtMSksIFN0cmluZyhsYXBzIC0gMSksIG1hcCk7XHJcbiAgICAgICAgICAgIG1hcmtlcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib3VuZHMuZXh0ZW5kKHApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHBvbHkgPSBjcmVhdGVQb2x5TGluZShwb2ludHMpO1xyXG5cclxuICAgIHBvbHkuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgLy8gZml0IGJvdW5kcyB0byB0cmFja1xyXG4gICAgbWFwLmZpdEJvdW5kcyhib3VuZHMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkR3B4TWFwKCkge1xyXG4gICAgbGV0IG5hbWUgPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgIGxldCBlbGVtZW50ID0gJCh0aGlzKS5maW5kKCcuY2FyZC1tYXAtdG9wJyk7XHJcbiAgICBhZGRHcHhUcmFja1RvTWFwKG5hbWUsIGVsZW1lbnQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRNYXJrZXIocCwgdGl0bGUsIHJvdW5kLCBsaXZlTWFwPW1hcC5saXZlTWFwKSB7XHJcbiAgICBtYXAubWFya2Vycy5wdXNoKG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgIHBvc2l0aW9uOnAsXHJcbiAgICAgICAgbWFwOiBsaXZlTWFwLFxyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICBsYWJlbDogcm91bmRcclxuICAgIH0pKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBjbGVhbk1hcCwgaW5pdE1hcCwgc3R5bGVzLCBhZGRSb3V0ZVRyYWNrVG9NYXAsIGFkZEdweFRyYWNrVG9NYXAsIGxvYWRHcHhNYXAsXHJcbiAgICBjcmVhdGVQb2x5TGluZSwgYWRkTWFya2VyLCBhZGRTZXNzaW9uVHJhY2tUb01hcCB9IiwiXHJcbmZ1bmN0aW9uIGxlYWRlcmJvYXJkKG5hbWUsIGNhbGxiYWNrKSB7XHJcbiAgICAkLmdldCgnL3N0cmF2YS9yb3V0ZS9sZWFkZXJib2FyZC8nICsgbmFtZSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjYWxsYmFjayhkYXRhKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gc2VnbWVudChuYW1lLCBjYWxsYmFjaykge1xyXG4gICAgJC5nZXQoJy9zdHJhdmEvcm91dGUvJyArIG5hbWUsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoZGF0YSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7IGxlYWRlcmJvYXJkLCBzZWdtZW50IH0iLCJjb25zdCBXQVRUX1JBVElPTiA9IDIuODA7XHJcblxyXG5mdW5jdGlvbiBjYWxjV2F0dChwYWNlKSB7XHJcbiAgICByZXR1cm4gV0FUVF9SQVRJT04gLyBNYXRoLnBvdyhwYWNlLCAzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2Vzc2lvbk5hbWVUb1JlYWRhYmxlKG5hbWUpIHtcclxuICAgIHJldHVybiBtb21lbnQobmFtZS5zbGljZSgwLCAxMykgKyAnOicgKyBuYW1lLnNsaWNlKDEzLDE1KSArICc6JyArIG5hbWUuc2xpY2UoMTUpKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRIZWFydFJhdGVDb2xvcihocikge1xyXG4gICAgaWYgKGhyIDwgMTI1KSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXN1Y2Nlc3MnXHJcbiAgICB9IGVsc2UgaWYgKGhyIDwgMTUwKSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXByaW1hcnknXHJcbiAgICB9IGVsc2UgaWYgKGhyIDwgMTc1KSB7XHJcbiAgICAgICAgcmV0dXJuICd0ZXh0LXdhcm5pbmcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gJ3RleHQtZGFuZ2VyJztcclxuICAgIH1cclxufVxyXG5cclxudmFyIGdldFVybFBhcmFtZXRlciA9IGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihzUGFyYW0pIHtcclxuICAgIHZhciBzUGFnZVVSTCA9IGRlY29kZVVSSUNvbXBvbmVudCh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKSksXHJcbiAgICAgICAgc1VSTFZhcmlhYmxlcyA9IHNQYWdlVVJMLnNwbGl0KCcmJyksXHJcbiAgICAgICAgc1BhcmFtZXRlck5hbWUsXHJcbiAgICAgICAgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgc1VSTFZhcmlhYmxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHNQYXJhbWV0ZXJOYW1lID0gc1VSTFZhcmlhYmxlc1tpXS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICBpZiAoc1BhcmFtZXRlck5hbWVbMF0gPT09IHNQYXJhbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc1BhcmFtZXRlck5hbWVbMV0gPT09IHVuZGVmaW5lZCA/IHRydWUgOiBzUGFyYW1ldGVyTmFtZVsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmbXRNU1Mocykge1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShudWxsKTtcclxuICAgIGRhdGUuc2V0U2Vjb25kcyhzKTsgLy8gc3BlY2lmeSB2YWx1ZSBmb3IgU0VDT05EUyBoZXJlXHJcbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGdldCBwYXJhbWV0ZXIgZnJvbSBhIFVSTCAoZmlyc3QgYXJndW1lbnQpIGFzIGEgcHJvcGVydHlcclxuICogXHJcbiAqIEBwYXJhbSBVUkwge1N0cmluZ31cclxuICovXHJcbmZ1bmN0aW9uIFF1ZXJ5U3RyaW5nKFVSTCkge1xyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBhbm9ueW1vdXMsIGlzIGV4ZWN1dGVkIGltbWVkaWF0ZWx5IGFuZCBcclxuICAgIC8vIHRoZSByZXR1cm4gdmFsdWUgaXMgYXNzaWduZWQgdG8gUXVlcnlTdHJpbmchXHJcbiAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XHJcbiAgICB2YXIgdXNlZnVsUGFyYW0gPSBVUkwuc3BsaXQoXCI/XCIpWzFdIHx8IFwiXCI7XHJcbiAgICB2YXIgcXVlcnkgPSB1c2VmdWxQYXJhbSB8fCBcIlwiO1xyXG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdChcIiZcIik7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBJZiBmaXJzdCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxyXG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICAgICAgICAgICAgLy8gSWYgc2Vjb25kIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBbcXVlcnlfc3RyaW5nW3BhaXJbMF1dLCBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSldO1xyXG4gICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBhcnI7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXJkIG9yIGxhdGVyIGVudHJ5IHdpdGggdGhpcyBuYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcXVlcnlfc3RyaW5nW3BhaXJbMF1dLnB1c2goZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5X3N0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeyBjYWxjV2F0dCwgc2Vzc2lvbk5hbWVUb1JlYWRhYmxlLCBnZXRIZWFydFJhdGVDb2xvciwgZ2V0VXJsUGFyYW1ldGVyLCBmbXRNU1MsIFxyXG4gICAgUXVlcnlTdHJpbmcgfVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==