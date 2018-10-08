

$(document).on('click','.sign-up',function() {
    debugger;
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
        success: function (data) {
           console.log("success");
        }
    });
});