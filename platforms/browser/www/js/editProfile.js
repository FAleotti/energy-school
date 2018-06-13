function changeToLeaderboard () {
    window.location = "leaderboard.html";
}

function changeToDashboard () {
    window.location = "dashboard.html";
}

function logout () {
    window.location = "index.html";
}

function changeToAddMeasure () {
    window.location = "addMeasure.html";
}

function cleanCache() {
    if (confirm("Are you sure you want to delete saved credentials?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("password");
        window.location = "dashboard.html";
    }
};

$( document ).ready(function() {
    $('#dashBtn').on('click', function () {
        changeToDashboard();
    });
    $('#measureBtn').on('click', function() {
        changeToAddMeasure();
    });
    $('#leaderBtn').on('click', function () {
        changeToLeaderboard();
    });
    $('#logoutBtn').on('click', function() {
        logout();
    });
    $('#clean').on('click', function() {
        cleanCache();
    });
    var name = localStorage.getItem("user");
    $('#name').append(name);
});