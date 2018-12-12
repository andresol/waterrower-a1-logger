
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


export default { leaderboard, segment }