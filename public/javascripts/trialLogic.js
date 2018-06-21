var trialStage = 1;
var currentRun = selectedRun;
var currentBlock = run[currentRun].blocks.length - 1;
var currentTrial = run[currentRun].blocks[currentBlock].trials.length - 1;
var numberOfBlocks = 3;
var numberTrials = 5;
var characterVariation;


$(document).ready(function () {
    $("#trialCharacter").css("display", "none");
    $("#colorAssociation").css("display", "none");
    characterVariation = charactersToDisplay();

    var canvas = document.getElementById("dotCanvas");
    canvas.width = $("#canvasContainer").width();
    canvas.height = $("#canvasContainer").height();

    $("#run-modal").modal('show');

    $("#begin-trial").click(function () {
        beginTrial()
    });


});

function beginTrial() {
    $("#run-modal").modal('hide');
    generateDot(false);
    $(window).keydown(function (key) {
        nextTrial(key.keyCode);
    });
}


/**
 * The nextTrial function is responsible for executing the trial process.
 * It depends on the variable trialStage which indicates what part will be displayed and keeps
 * track of the trials,blocks and runs in terms of db schemas.
 * Every color selection is stored in the run json to be saved and submitted at the end of the trials
 *
 * Sequence:
 * 1-Generate dot
 * 2-Display Characters
 * 3-Generate another dote
 * 4-Display color choice
 * 5-Provide feedback on color choice
 *
 * @param key:Keyboard stroke code that was pressed
 */
function nextTrial(key) {
    var blockSchema = {"trials": [{"color": null}]};
    var trialSchema = {"color": null};

    //If the currentTrial has just surpassed the number of trials per block (-1 is due to index starting at 0),
    // create a new block and assign a new character display variation to it
    if (currentTrial > numberTrials-1) {
        currentTrial = 0;
        run[selectedRun].blocks.push(blockSchema);
        currentBlock++;
        characterVariation = charactersToDisplay();
    }

    //If the number of blocks tested per run is reached, submit the run
    if (currentBlock > numberOfBlocks - 1) {
        var newRun={"blocks":[{"trials":[{"color":null}]}]};
        run.push(newRun);
        submitRun();
    }

    //Generate the dot
    if (trialStage === 1 && key === 39) {
        $("#dotTrial").css("display", "none");
        generateCharacter(characterVariation);
        $("#trialCharacter").css("display", "flex");
        trialStage = 2;
    }

    else if (trialStage === 2 && key === 39) { //37 is left arrow key and 39 is right
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
    }
    else if (trialStage === 3 && key === 39) {
        trialStage = 4;
        $("#trialCharacter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);

    }
    else if (trialStage === 4 && (key === 38 || key === 40)) { //38 is up arrow key and 40 is the down arrow key
        trialStage = 5;
        feedback("#color-one", "#color-two", true);
        run[currentRun].blocks[currentBlock].trials[currentTrial].color = key;
        run[currentRun].blocks[currentBlock].trials.push(trialSchema);
        currentTrial++;
    }
    else if (trialStage === 5) {
        trialStage = 1;
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        feedback("#color-one", "#color-two", false);
    }


}

/**
 * The touchOption handles any input from a touchscreen device
 * @param choice
 */
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


/**
 * The generateDot function is responsible for the dot generation in the html canvas during the trial
 * @param rightSide: A boolean to determine if the dot should be generated on the left side or right side
 */

function generateDot(rightSide) {
    var canvas = $("canvas")[0];
    var height = canvas.height;
    var width = canvas.width;
    var ctx = canvas.getContext("2d");
    var yPos = height / 2;
    var xPos;

    //Clears any previous dots on board
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.imageSmoothingEnabled = false;

    if (rightSide) {
        xPos = width * (3 / 4);
    }
    else {
        xPos = width / 4;
    }

    //generate dot at xPos and yPos of size 5 and 5
    ctx.fillRect(xPos, yPos, 5, 5);
}

/**
 * The charactersToDisplay function is used for 2 purposes. One is to associate how many characters are displayed
 * in the current block and the other is to determine which random character will be displayed
 * (See generateCharacter below)
 * @returns {number}: Returns number of characters to display or which character to display
 */
function charactersToDisplay() {
    return Math.floor(1 + (10 - 1) * Math.random());
}


/**
 * The generateCharacter functions generates the characters to display for every character trial.
 * It works by randomly choosing characters (via charactersToDisplay) and appending them to the #trialCharacter element
 * @param numChar: The number of characters to present in the current block
 */
function generateCharacter(numChar) {
    var charElement = $(".character-container")[0];
    var character;
    $("#trialCharacter").html("");
    for (var char = 0; char <= numChar; char++) {
        character = charactersToDisplay();
        $(charElement).attr("id", "charID" + char);
        $("#trialCharacter").append($(charElement).clone());
        $("#charID" + char + ">img").attr("src", "../images/svg/" + character + ".svg")

    }

}

/**
 * The Feedback function highlights the correct color association by creating a green border
 * @param colorOne: element that contains color one
 * @param colorTwo: element that contains color two
 * @param display: Boolean to determine if feedback being displayed. If it is, proceed to highlight the correct
 *                 choice, if not remove the border
 */
function feedback(colorOne, colorTwo, display) {

    /******For Ku, logic for feedback enter here****/
    var topicChoice = Math.random() * 2;
    /******For Ku, logic for feedback end here****/

    if (!display) {
        $(colorOne).css("border", "none");
        $(colorTwo).css("border", "none");
    }
    else if (topicChoice > 1) {
        $(colorOne).css("border", "0.3em solid #00ff00");
    }
    else {
        $(colorTwo).css("border", "0.3em solid #00ff00");
    }

}

function save() {
    var data = {session:JSON.stringify(run)};
    //the data run is defined within the visualTrial.ejs template under the script tag
    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/save",
        data: data,
        success: function (response) {
            console.log(response.success);
            alert("Successfully saved");
        }
    })

}





function submitRun() {
    var data = {session:JSON.stringify(run)};
    //the data run is defined within the visualTrial.ejs template under the script tag
    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/submit",
        data: data,
        success: function (response) {
            alert(response);
            window.location.href="/";
        }
    });
}
