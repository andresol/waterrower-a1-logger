
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
                    html += '<tr><td><a href="#" data-id="' + user.id + '">' + (i + 1) + '</a></td><td>' + user.firstName + '</td><td>' + user.lastName + '</td>';
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


export default { loadUsers, loadUser, editUser, saveUser, deleteUser }