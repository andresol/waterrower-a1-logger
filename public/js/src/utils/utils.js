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

export default { calcWatt, sessionNameToReadable, getHeartRateColor, getUrlParameter }