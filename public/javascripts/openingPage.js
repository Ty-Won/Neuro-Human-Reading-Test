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

});



