var trialStage = 1;
var currentRun=selectedRun;
var currentBlock=run[currentRun].blocks.length-1;
var currentTrial=run[currentRun].blocks[currentBlock].trials.length-1;
var numberOfBlocks=3;
var numberTrials=5;
var characterVariation;
var blockSchema={"trials":[{"character":null,"color":null}]};
var trialSchema={"character":null,"color":null};

/**
 * variable trialStage indicates what part we must display
 * 1-Display Characters
 * 2-Display dot again
 * 3-Option Red or blue
 * 4-Generate dot
 * @type {number}
 */

$(document).ready(function () {
    $("#trialCharacter").css("display", "none");
    $("#colorAssociation").css("display", "none");
    characterVariation=characterToDisplay();

    var canvas = document.getElementById("dotCanvas");
    canvas.width = $("#canvasContainer").width();
    canvas.height = $("#canvasContainer").height();


    generateDot(false);
    $(window).keydown(function (key) {
        nextTrial(key.keyCode);
    })
});


function nextTrial(key) {

    //-1 is due to index starting at 0
    if(currentTrial>=numberTrials-1){
        currentTrial=0;
        run.push(blockSchema);
        currentBlock++;
        characterVariation=characterToDisplay();
    }

    if(currentBlock>=numberOfBlocks-1){
        submitRun();
    }

    //show numbers
    if (trialStage === 1) {
        $("#dotTrial").css("display", "none");
        generateCharacter(characterVariation);
        $("#trialCharacter").css("display", "flex");
        trialStage = 2;
    } else if (trialStage === 2 && (key === 37 || key === 39)) { //37 is left arrow key and 39 is right
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
    }
    else if (trialStage === 3) {
        trialStage = 4;
        $("#trialCharacter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (trialStage === 4 && (key === 38 || key === 40)) { //38 is up and 40 is down
        trialStage = 1;
        $("#trialCharacter").css("display", "none");
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        run[currentRun].blocks[currentBlock].trials[currentTrial].color=key;
        run[currentRun].blocks[currentBlock].trials.push(trialSchema);
        currentTrial++;
    }


}



function touchOption(choice) {
    if (trialStage === 1) {
        $("#dotTrial").css("display", "none");
        $("#trialCharacter").css("display", "flex");
        trialStage = 2;
    } else if (trialStage === 2) {
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
        trial.push(choice);
    }
    else if (trialStage === 3) {
        trialStage = 4;
        $("#trialCharacter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (trialStage === 4) {
        trialStage = 1;
        $("#trialCharacter").css("display", "none");
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        trial.push(choice);
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

function generateCharacter(numChar){
    var charElement=$(".character-container")[0];
    var character;
    $("#trialCharacter").html("");
    for(var char=0;char<=numChar;char++){
        character=characterToDisplay();
        $(charElement).attr("id","charID"+char);
        $("#trialCharacter").append($(charElement).clone());
        $("#charID"+char+">img").attr("src","../images/svg/"+character+".svg")

    }

}



function submitRun() {
    var f = document.createElement("form");
    f.setAttribute('method',"post");
    f.setAttribute('id',"run-form");
    f.setAttribute('action',"/submit");

    var i = document.createElement("input"); //input element, text
    i.setAttribute('type',"text");
    i.setAttribute('name',"run");

    f.appendChild(i);
    $("body").append(f);
    f.submit()
}

function save(){
    console.log(run);
    //the data run is defined within the visualTrial.ejs template under the script tag
    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/save",
        data: run,
        success: function (response) {

            window.location.href = response.redirect;
        }
    })

}


function characterToDisplay(){
    return Math.floor(1+(10-1)*Math.random());
}
// function signUp(){
//
//     var data={
//         "first-name":$("#sign-up-first-name").val(),
//         "last-name":$("#sign-up-last-name").val(),
//         "email":$("#sign-up-email").val(),
//         "password":$("#sign-in-pass").val(),
//         "birthdate":$("#date-picker-2").val(),
//         "run":[]
//
//     };
//     $.ajax({
//         method:"POST",
//         url:"/signUp",
//         data:data,
//         dataType:"json",
//         success:function(response){
//             window.location.href = response.redirect;
//         }
//     })
// }


