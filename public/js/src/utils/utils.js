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

export default { calcWatt, sessionNameToReadable, getHeartRateColor, getUrlParameter, fmtMSS, 
    QueryString }

