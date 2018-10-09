
$(document).ready(function() {
    getProfile();
    getUsers();
    toggleLike();
});

function toggleLike() {
    $('body').click('.toggleLike', function(ev) {
        var action = ev.target.dataset.action,
            userId = ev.target.dataset.id,
            email = ev.target.dataset.email,
            name = ev.target.dataset.name;

        var data = {
            affectedUserEmail: email,
            affectedUserName: name,
            committedBy: JSON.parse(localStorage.getItem(USER_KEY)).email
        };

        $.ajax({
            type: "POST",
            data: JSON.stringify(data),
            url: "/user/" + userId + "/" + action,
            headers: {
                "token": JSON.parse(localStorage.getItem(USER_KEY)).token
            },
            contentType: "application/json; charset=utf-8",
            success: function () {
                window.location.reload();
            },
            error: function (res) {
                $("#close-modal-login").click();
                alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
            }
        });

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
        headers: {
            "token": JSON.parse(localStorage.getItem(USER_KEY)).token
        },
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            res.data.forEach( function(obj) {
                var action = obj.action === "unlike" ? "like" : "unlike";

                $('.table tr:last').after(
                    '<tr><td><a id="userInfo" href="/user/' +obj._id + '"' +'>' + obj.name + '</a></td><td>' + obj.email + '</td>' +
                    '<td><button class="btn btn-primary toggleLike" data-email="' + obj.email + '" data-name="' + obj.name + '" data-action="' + action + '" data-id="' + obj._id + '">' + action + '</button></td>' +
                    '</tr>');
            });
        },
        error: function (res) {
            $("#close-modal-login").click();
            alert("Message: " + JSON.parse(res.responseText).message + " Status: " + res.status);
        }
    });
}