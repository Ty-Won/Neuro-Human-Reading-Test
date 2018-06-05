$(document).ready(function () {
    $(".jumbotron").fadeIn(1000);

    $('button.begin-btn').click(function () {
            var content;

            if ($(this).attr("data-type") === "sign-up") {
                content = '<div class=\"modal-header\"><h5 class=\"modal-title\" id=\"signUpModalTitle\">Information</h5> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </div><div class=\"modal-body\"><br><input type=\"input\" style=\"width: 40%;\" class=\"signup-form\" id=\"sign-up-first-name\" placeholder=\"First Name\"><input type=\"input\" style=\"width: 40%;\" class=\"signup-form\" id=\"sign-up-last-name\" placeholder=\"Last Name\"> <br><input type=\"input\" class=\"signup-form\" id=\"sign-up-email\" placeholder=\"Email\"> <label for=\"bday\"></label> <input id=\"date-picker-2\" type=\"date\" class=\"date-picker signup-form\" placeholder=\"Birth Date\"/><br><input type= "password" style= "width: 40%;" class= "signin-form" id="sign-in-pass" placeholder="Password"><br><br><br></div><div class=\"modal-footer\"> <button type=\"button\" class=\"btn begin-btn\" data-dismiss=\"modal\">Cancel</button> <button type=\"button\" class=\"btn begin-btn\" onclick=\"signUp()\">Submit</button> </div>';
            }
            else if ($(this).attr("data-type") === "sign-in") {
                content = '<div class=\ "modal-header"><h5 class=\ "modal-title" id=\ "signInModalTitle">Sign In</h5> <button type=\ "button" class=\ "close" data-dismiss=\ "modal" aria-label=\ "Close"> <span aria-hidden="true">&times;</span> </button> </div><div class=\ "modal-body"><br><input type=\ "input" style=\ "width: 40%;" class=\ "signin-form" id=\ "email-address" placeholder=\ "email-address"><br><input type=\ "password" style=\ "width: 40%;" class=\ "signin-form" id=\"sign-in-pass\" placeholder=\"Password\"></div><div class=\ "modal-footer"> <button type=\ "button" class=\ "btn begin-btn" data-dismiss=\ "modal">Cancel</button> <button type=\ "button" class=\ "btn begin-btn" onclick="signIn()">Submit</button> </div>';
            } else {
                content = '<h1>Something went wrong please notify the administrator</h1>';
            }
            $(".content-substitution").html(content);
        }
    )
});


function signIn(){

    var data={
        "email":$("#email-address").val(),
        "password":$("#sign-in-pass").val()

    };

    $.ajax({
        method:"POST",
        url:"/signIn",
        data:data,
        dataType:"json",
        success:function(data){
            alert("success sign in");
            console.log("success sign in");
        },
        error:function(data){
            console.log("ERROR");
        }
    })
}

function signUp(){

    var data={
        "first-name":$("#sign-up-first-name").val(),
        "last-name":$("#sign-up-last-name").val(),
        "email":$("#sign-up-email").val(),
        "password":$("#sign-in-pass").val(),
        "birthdate":$("#date-picker-2").val(),
        "simulation":[]

    };
    $.ajax({
        method:"POST",
        url:"/signUp",
        data:data,
        dataType:"json",
    }).done(function(response){
        window.location.replace("/simulation");
    })
}

// function retrieveProfile(){
//
// }
//
// function createProfile(){
//     $.ajax({
//         method: "POST",
//         url: ""
//     })
// }

