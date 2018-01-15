$(document).ready(function(){
    get_rowInfo();
    var intervallId;
    var timeOut;
    $('#startRow').click(function (e) {
        e.preventDefault();
        var feedbackJson = $.ajax({
            type: "get",
            url: "/row/start",
            async: false
        }).responseText;
        get_rowInfo()
        intervallId  = setInterval(get_rowInfo, 10000);
    })

    $('#stopRow').click(function (e) {
        e.preventDefault();
        clearInterval(intervallId)
        clearTimeout(timeOut);
        var feedbackJson = $.ajax({
            type: "get",
            url: "/row/stop",
            async: false
        }).responseText;

        $('#table-result').html(getHtml("STOPPED", feedbackJson));
    })


});

function get_rowInfo(){
    var feedbackJson = $.ajax({
        type: "get",
        url: "/row",
        async: false
    }).complete(function(){
        setTimeout(function(){get_rowInfo();}, 10000);
    }).responseText;

    $('#table-content').html(getHtml("ROWING", feedbackJson));
}

function getHtml(label, feedbackJson) {
    var json = JSON.parse(feedbackJson);
    var html = "<div><h2>" + label +"</h2>";
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (Array.isArray(json[key]) ) {
                var lap = "";
                var lapArray = json[key];
                lapArray.forEach(function (value) {
                    for (var key2 in value) {
                        if (value.hasOwnProperty(key2)) {
                            lap += "<span>" + key2 + ": " + value[key2] + "</span> ";
                        }
                    }
                    html += "<div>" + key + ": " + lap + "</div>";
                })

            } else {
                html += "<div>" + key + ": " + json[key] + "</div>";
            }

        }
    }
    return html + "</div>"

}