$(document).ready(function () {
    $(".jumbotron").fadeIn(1000);

    $('button.begin-btn').click(function () {
            var content;

            if ($(this).attr("data-type") === "sign-up") {
                content = '<div class=\"modal-header\"><h5 class=\"modal-title\" id=\"signupModalTitle\">Information</h5> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </div><div class=\"modal-body\"><br><input type=\"input\" style=\"width: 40%;\" class=\"signup-form\" id=\"company_name\" placeholder=\"First Name\"> <input type=\"input\" style=\"width: 40%;\" class=\"signup-form\" id=\"company_name\" placeholder=\"Last Name\"> <br><input type=\"input\" class=\"signup-form\" id=\"position\" placeholder=\"Position\"> <label for=\"bday\"></label> <input id=\"date-picker-2\" type=\"date\" class=\"date-picker signup-form\" placeholder=\"Birth Date\"/> <br><br><br></div><div class=\"modal-footer\"> <button type=\"button\" class=\"btn begin-btn\" data-dismiss=\"modal\">Cancel</button> <button type=\"button\" class=\"btn begin-btn\" onclick=\"signUp()\">Submit</button> </div>';
            }
            else if ($(this).attr("data-type") === "sign-in") {
                content = '<div class=\ "modal-header"><h5 class=\ "modal-title" id=\ "signupModalTitle">Sign In</h5> <button type=\ "button" class=\ "close" data-dismiss=\ "modal" aria-label=\ "Close"> <span aria-hidden="true">&times;</span> </button> </div><div class=\ "modal-body"><br><input type=\ "input" style=\ "width: 40%;" class=\ "signin-form" id=\ "email-address" placeholder=\ "email-address"> <br><input type=\ "password" style=\ "width: 40%;" class=\ "signin-form" id=\ "sign-in-pass" placeholder=\ "Password"></div><div class=\ "modal-footer"> <button type=\ "button" class=\ "btn begin-btn" data-dismiss=\ "modal">Cancel</button> <button type=\ "button" class=\ "btn begin-btn">Submit</button> </div>';
            } else {
                content = '<h1>Something went wrong please notify the administrator</h1>';
            }
            $(".content-substitution").html(content);
        }
    )
});
//
//
// function signIn(){
//     return true;
// }
//
// function signUp(){
//     $.ajax({
//         method: "GET",
//         url: "/test"
//     })
// }

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

