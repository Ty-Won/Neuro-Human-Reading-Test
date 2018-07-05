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

function check_pass() {
    if(!$('#sign-up-pass').val() && !$('#sign-up-pass-verify').val()){
        $('submit').disabled = true;
        $('#pass-message').css("visibility","hidden");
    }
    else if ($('#sign-up-pass').val() === $('#sign-up-pass-verify').val()) {
        $('submit').disabled = false;
        $('#pass-message').css("visibility","visible");
        $('#pass-message').css('color','green');
        $('#pass-message').html('Passwords Match');
    } else {
        $('#submit').disabled = true;
        $('#pass-message').css("visibility","visible");
        $('#pass-message').css('color','red');
        $('#pass-message').html('Passwords Do Not Match');
    }
}

function signIn(){

    if($("#error-msg").is(":visible")){
           $("#error-msg").toggle();
    }

    var data = {};
    $("#sign-in-form").serializeArray().map(function(item) {
        if ( data[item.name] ) {
            if ( typeof(data[item.name]) === "string" ) {
                data[item.name] = [data[item.name]];
            }
            data[item.name].push(item.value);
        } else {
            data[item.name] = item.value;
        }
    });

    $.ajax({
        method:'POST',
        url:'signIn',
        data:data,
        success: function(response){
            window.location.href="/trial/"+JSON.parse(response).id;
        },
        error:function(response){
            $("#error-msg").toggle()

        }

    })

}




