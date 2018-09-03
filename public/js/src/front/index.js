import route from '../route/index';
import user from '../user/index';
import utils from '../utils/utils'

function loadMain() {
    $('#load').load('/main', function () {
        $(this).find('#routes').each(route.loadRoutes);
        $(this).find('#session-user').each(user.loadUsers);
        $.get("/row/status", function (data) {
            if (data.status === 'ROWING') {
                var startButton = $('#startRow');
                if (utils.getUrlParameter("test")) {
                    startButton = $('#startSimulator')
                }
                start(startButton);
            }
        });

        //Run simulator if test.
        if (utils.getUrlParameter("test")) {
            $('#startRow').attr("id", "startSimulator");
        }
    });

}


export default { loadMain };