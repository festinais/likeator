
$(document).ready(function() {
    getProfile();
    getUsers();
    toggleLike();

    $('body').click('.toggleLike', function(){
        debugger;
    })
});

function toggleLike() {
    debugger;
    $(".toggleLike").click(function(ev) {
        var userId = ev.currentTarget.dataset.id;

        debugger;
    });
}

function getProfile() {
    var data = {
        email: JSON.parse(localStorage.getItem(USER_KEY)).email
    };

    $.ajax({
        type: "POST",
        data: JSON.stringify(data),
        url: "/me",
        headers: {
            "token": JSON.parse(localStorage.getItem(USER_KEY)).token
        },
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            $("#myEmail").text(res.email);
            $("#myName").text(res.name);
            $("#myLikes").text(res.numberOfLikes);
        },
        error: function (res) {
            $("#close-modal-login").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}

function getUsers() {
    var data = {
        email: JSON.parse(localStorage.getItem(USER_KEY)).email
    };

    $.ajax({
        type: "GET",
        data: JSON.stringify(data),
        url: "/users?email=" + data.email,
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            debugger;
            res.data.forEach( function(obj) {
                var action = obj.action === "unlike" ? "like" : "unlike";

                $('.table tr:last').after(
                    '<tr><td>' + obj.name + '</td><td>' + obj.email + '</td>' +
                    '<td><button class="btn btn-primary toggleLike" data-id="' + obj._id + '">' + action + '</button></td>' +
                    '</tr>');
            });
        },
        error: function (res) {
            $("#close-modal-login").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}