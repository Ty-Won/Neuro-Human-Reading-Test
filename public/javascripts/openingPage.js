$(document).ready(function () {
    $(".jumbotron").fadeIn(1000);

    //Display either the sign up modal or the sign in
    $('button.begin-btn').click(function () {
            var content;
            if ($(this).attr("data-type") === "sign-up") {
                content = $("#sign-up-modal")[0];

            }
            else if ($(this).attr("data-type") === "sign-in") {
                content = $("#sign-in-modal")[0];
            }
            $(".content-substitution").html(content);

        }
    );

    $("#sign-up-pass, #sign-up-pass-verify").keyup(function(){
        if($("#sign-up-pass").val()==$("#sign-up-pass-verify").val()){
            $("#pass-message").html("Matching").css("color","green");
        }
        else{
            $("#pass-message").html("Password does not match").css("color","red");
        }
    })


});



