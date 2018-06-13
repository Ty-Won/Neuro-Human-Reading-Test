$(document).ready(function () {
    $(".jumbotron").fadeIn(1000);

    $('button.begin-btn').click(function () {
            var content;

            if ($(this).attr("data-type") === "sign-up") {
                content =  '   	<div class="content-substitution">  '  +
                    '   		<div class="modal-header">  '  +
                    '   			<h5 class="modal-title" id="signUpModalTitle">Information</h5><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">×</span></button>  '  +
                    '   		</div>  '  +
                    '   		<form action="/signUp" method="POST">  '  +
                    '   		<div class="modal-body">  '  +
                    '   			<br>  '  +
                    '   			<input class="signup-form" id="sign-up-first-name" placeholder="First Name" name="firstName" style="width: 40%;" type="input"><input class="signup-form" id="sign-up-last-name" name="lastName" placeholder="Last Name" style="width: 40%;" type="input"><br>  '  +
                    '   			<input class="signup-form" id="sign-up-email" name="email" placeholder="Email" type="input"> <label for="bday"></label> <input class="date-picker signup-form" name="birthdate" id="date-picker-2" placeholder="Birth Date" type="date"><br>  '  +
                    '   			<input class="signin-form" id="sign-in-pass" name="password" placeholder="Password" style="width: 40%;" type="password"><br>  '  +
                    '   			<br>  '  +
                    '   			<br>  '  +
                    '   		</div>  '  +
                    '   		<div class="modal-footer">  '  +
                    '   			<button class="btn begin-btn" data-dismiss="modal" type="button">Cancel</button> <button class="btn begin-btn" onclick="signUp()" type="submit">Submit</button>  '  +
                    '   		</div>  '  +
                    '   		</form>  '  +
                    '  	</div>  ' ; }
            else if ($(this).attr("data-type") === "sign-in") {
                content =
                    '   	<div class="modal-header">  '  +
                    '   		<h5 class="modal-title" id="signInModalTitle">Sign In</h5><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>  '  +
                    '   	</div>  '  +
                    '   	<form action="/signIn" method="POST">  '  +
                    '   	<div class="modal-body">  '  +
                    '   		<br>  '  +
                    '   		<input class="signin-form" id="email-address" placeholder="email-address" name="email" style="width: 40%;" type="input"><br>  '  +
                    '   		<input class="signin-form" id="sign-in-pass" placeholder="Password" name="password" style="width: 40%;" type="password">  '  +
                    '   	</div>  '  +
                    '   	<div class="modal-footer">  '  +
                    '   		<button class="btn begin-btn" data-dismiss="modal" type="button">Cancel</button> <button class="btn begin-btn" onclick="signIn()" type="submit" value="submit">Submit</button>  '  +
                    '   	</div>  '  +
                    '  	</form>  ' ;
            } else {
                content = '<h1>Something went wrong please notify the administrator</h1>';
            }
            $(".content-substitution").html(content);
        }
    )
});



