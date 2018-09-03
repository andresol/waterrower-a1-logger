
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

export default { loadUsers }