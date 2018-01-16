$(document).ready(function(){
    get_rowInfo();
    const UPDATE_FREQ = 5000;
    var intervallId;
    var timeOut;
    $('#startRow').click(function (e) {
        e.preventDefault();
        $.get( "/row/start", function() {
            get_rowInfo();
            intervallId  = setInterval(get_rowInfo, UPDATE_FREQ);
        });
    })

    $('#startSimulator').click(function (e) {
        e.preventDefault();
        $.get("/row/simulate", function() {
            get_rowInfo();
            intervallId  = setInterval(get_rowInfo, UPDATE_FREQ);
        });
    })

    $('#stopRow').click(function (e) {
        e.preventDefault();
        clearInterval(intervallId)
        clearTimeout(timeOut);
        $.get( "/row/stop", function(data) {
            $('#table-result').html(getHtml("STOPPED", data));
        });
    })
});

function get_rowInfo(){
    $.get( "/row", function(data) {
        $('#table-content').html(getHtml("ROWING", data));
    }).done(function(){
        setTimeout(function(){get_rowInfo();}, UPDATE_FREQ);
    });
}

function fmtMSS(s){
    var date = new Date(null);
    date.setSeconds(s); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
}

function getHtml(label, json) {
    if (parseInt(json.meters) === 0) {
        return "<div class='col'><div class='row'><h2>NOT ROWING</h2></div></div>";
    }
    var html = "<div class='col'><div class='row'><h2>" + label +"</h2></div>";
    html += '<div class="row">Start: ' + json.start +'</div>';
    html += '<div class="row">Tid: ' + fmtMSS(parseInt(json.seconds)) +'</div>';
    html += '<div class="row">Lengde: ' + parseInt(json.meters) +' m</div>';
    html += '<div class="row">Pace: ' + Math.round( parseFloat(json.pace) * 3.6 * 10) / 10 +' km/t</div>';
    html += '<div class="row">500m: ' + fmtMSS(parseInt(json.lapPace)) +'</div>';
    html += '<div class="row">2k: ' + fmtMSS(parseInt(json.towKPace)) +'</div>';
    html += '<div class="row">Avg. watt: ' + Math.round( parseFloat(json.watt)* 10) / 10 +'w</div>';
    if (parseInt(json.totalLaps) > 0) {
        html += '<div class="table-responsive"> <table class="table"><thead><tr><th>#</th><th>Meter</th><th>Tid:</th><th>Watt</th>';
        html += '</tr></thead><tbody>';
        var lapNum = 1;
        json.laps.forEach(function (value) {
            html += '<tr><th scope="row">' + lapNum + '</th><td>'+ parseInt(value.meters)+ '</td><td>'+ fmtMSS(parseInt(value.seconds)) +'</td>';
            html += '<td>' + Math.round( parseFloat(value.watt)* 10) / 10 +'w</td></tr>';
            lapNum++;
            }
        );
        html += "</tbody></table></div>"
    }
    return html + "</div>"

}