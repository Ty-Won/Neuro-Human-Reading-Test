var choices = [];
var simulationStage = 1;
/**
 * variable simulationStage indicates what part we must display
 * 1-Display letters
 * 2-Display dot again
 * 3-Option Red or blue
 * 4-Generate dot
 * @type {number}
 */

$(document).ready(function () {
    $("#simulationLetter").css("display", "none");
    $("#colorAssociation").css("display", "none");
    generateDot(false);
    $(window).keydown(function (key) {
        nextSimulation(key.keyCode);
    })
});


function nextSimulation(key) {

    if (simulationStage === 1) {
        $("#dotSimulation").css("display", "none");
        $("#simulationLetter").css("display", "flex");
        simulationStage = 2;
    } else if (simulationStage === 2 && (key === 37 || key === 39)) { //37 is left arrow key and 39 is right
        generateDot(true);
        $("#dotSimulation").css("display", "block");
        simulationStage = 3;
        choices.push(key);
    }
    else if (simulationStage === 3) {
        simulationStage = 4;
        $("#simulationLetter").css("display", "none");
        $("#dotSimulation").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (simulationStage === 4 && (key === 38 || key === 40)) { //38 is up and 40 is down
        simulationStage = 1;
        $("#simulationLetter").css("display", "none");
        $("#colorAssociation").css("display", "none");
        $("#dotSimulation").css("display", "block");
        choices.push(key);
    }


}


function generateDot(rightSide) {
    var canvas = $("canvas")[0];
    var canvasHeight = canvas.height;
    var canvasWidth = canvas.width;
    var ctx = canvas.getContext("2d");
    var height = canvasHeight / 2;
    var width;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.imageSmoothingEnabled = false;

    if (rightSide) {
        width = canvasWidth * (3 / 4);
    }
    else {
        width = canvasWidth / 4;
    }

    ctx.fillRect(width, height, 5, 5);

}


function selectChar(id) {
    choices.push(id);
}


