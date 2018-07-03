$(document).ready(function () {
    $(".jumbotron").fadeIn(1000);

    //Display either the sign up modal or the sign in
    $('button.neuro-btn').click(function () {
            var content;
            if ($(this).attr("data-type") === "sign-up") {
                content = $("#sign-up-modal").clone();

            }
            else if ($(this).attr("data-type") === "sign-in") {
                content = $("#sign-in-modal").clone();
            }

            $(".content-substitution").html(content);

        }
    );
});



