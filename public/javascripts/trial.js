var choices = [];
var trialStage = 1;
/**
 * variable trialStage indicates what part we must display
 * 1-Display letters
 * 2-Display dot again
 * 3-Option Red or blue
 * 4-Generate dot
 * @type {number}
 */

$(document).ready(function () {
    $("#trialLetter").css("display", "none");
    $("#colorAssociation").css("display", "none");

        var canvas = document.getElementById("dotCanvas");
        canvas.width = $("#canvasContainer").width();
        canvas.height = $("#canvasContainer").height();
    generateDot(false);
    $(window).keydown(function (key) {
        nextTrial(key.keyCode);
    })
});


function nextTrial(key) {

    if (simulationStage === 1) {
        $("#dotTrial").css("display", "none");
        $("#trialLetter").css("display", "flex");
        trialStage = 2;
    } else if (trialStage === 2 && (key === 37 || key === 39)) { //37 is left arrow key and 39 is right
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
        choices.push(key);
    }
    else if (trialStage === 3) {
        trialStage = 4;
        $("#trialLetter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (trialStage === 4 && (key === 38 || key === 40)) { //38 is up and 40 is down
        trialStage = 1;
        $("#trialLetter").css("display", "none");
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        choices.push(key);
    }


}


function generateDot(rightSide) {
    var canvas = $("canvas")[0];
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var ctx = canvas.getContext("2d");
    var y = canvasHeight / 2;
    var x;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.imageSmoothingEnabled = false;

    if (rightSide) {
        x = canvasWidth * (3 / 4);
    }
    else {
        x = canvasWidth / 4;
    }

    ctx.fillRect(x, y, 5, 5);
}


function touchOption(choice){
    if (trialStage === 1) {
        $("#dotTrial").css("display", "none");
        $("#trialLetter").css("display", "flex");
        trialStage = 2;
    } else if (trialStage === 2) {
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
        choices.push(choice);
    }
    else if (trialStage === 3) {
        trialStage = 4;
        $("#trialLetter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (trialStage === 4) {
        trialStage = 1;
        $("#trialLetter").css("display", "none");
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        choices.push(choice);
    }
}


function submit(){
    console.log("lol");
    $.ajax({
        method: "POST",
        url:"/trial",
        data:choices,
        success:function(result){
            alert("WORKS");
        },
        error:function(result){
            alert("Back to work bud");
        }

    });

}
