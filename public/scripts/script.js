var USER_KEY = "loggedUser";

$(document).on('click','.sign-up',function() {
    signUp();
});

$(document).on('click','.log-in',function() {
    logIn();
});

$(document).on('click','.update-password',function() {
    updatePassword();
});

function updatePassword() {
    var newPassword = $("#newPassword").val();
    var verifyNewPassword = $("#verifyNewPassword").val();

    if(newPassword !== verifyNewPassword) {
        alert("Passwords not the same!");
        return false;
    }
    var data = {
        email: JSON.parse(localStorage.getItem(USER_KEY)).email,
        password: $("#currentPassword").val(),
        newPassword: $("#newPassword").val()
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: "/update-password",
        headers: {
            "token": JSON.parse(localStorage.getItem(USER_KEY)).token
        },
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            window.location.reload();
        },
        error: function (res) {
            $("#close-modal-login").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}


function logIn() {
    var data = {
        email: $("#emailLogIn").val(),
        password: $("#passwordLogIn").val()
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: "/login",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            window.localStorage.setItem(USER_KEY, JSON.stringify(res.data));
            window.location.reload();
        },
        error: function (res) {
            $("#close-modal-login").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}

function signUp() {
    var data = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val()
    };
    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: "/signup",
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            window.localStorage.setItem(USER_KEY, JSON.stringify(res.data));
            window.location.reload();
        },
        error: function (res) {
            $("#close-modal").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}

function toggleViews() {
    if (isUserLoggedIn()) {
        $(".logged-out").hide();
        $(".logged-in").show();
    } else {
        $(".logged-out").show();
        $(".logged-in").hide();
    }
}

function isUserLoggedIn() {
    if (localStorage.getItem(USER_KEY)) {
        return true;
    }
    return false;
}

$(document).ready(function() {
    toggleViews();
});

