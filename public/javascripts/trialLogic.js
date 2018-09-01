var trialStage = 1;
var currentRun = parseInt($("#exampleModalLongTitle").attr("data-run"));
var currentBlock = 1;
var currentTrial = 1;
var numberOfBlocks = 1;
var numberTrials = 1;
var characterVariation;
var topicChoice;
var conditionChoice;
var characterIdList;
var runData = {
    "blocks": []
};

var block = {
    "trials": []
};

var trial = {
    "Block": null,
    "Trial": null,
    "Condition": null,
    "Topic": null,
    "Stim_ids": [],
    "reading_time": null,
    "reaction_time": null,
    "key":null
}


$(document).ready(function () {
    welcomeMsg(currentRun);
    $("#trialCharacter").css("display", "none");
    $("#colorAssociation").css("display", "none");


    var canvas = document.getElementById("dotCanvas");
    canvas.width = $("#canvasContainer").width();
    canvas.height = $("#canvasContainer").height();

    $("#run-modal").modal('show');

    $("#begin-trial").click(function () {
        beginTrial()
    });


});

function welcomeMsg(run) {
    var welcome_msg;
    var isDone=false;
    switch (run) {
        case 1:
            welcome_msg = 'Welcome to the first day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. Your task today is to determine the topic associated with each symbol.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a unique symbol will appear. Look at the symbol carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”). Note that if you do not make a choice by pressing ↑ or ↓, a green circle will appear around the correct answer.  ' +
                '     ' +
                '  When you are ready to start, press →  ';
                break;
        case 2:
            welcome_msg = 'Welcome to the second day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. Yesterday, you learned that this language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. Your task today is to review what you learned yesterday by associating each symbol with its corresponding topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a unique symbol will appear. Look at the symbol carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”). Note that if you do not make a choice by pressing ↑ or ↓, a green circle will appear around the correct answer.  ' +
                '     ' +
                '  When you are ready to start, press →.';
                break;
        case 3:
            welcome_msg = 'Welcome to the third day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. You should now have some idea of which symbol is associated with which topic.  ' +
                '     ' +
                '   Today, you will discover that symbols may appear in combination. Specifically, you will read combinations of 2 and 3 symbols, in addition to symbols presented alone. Your task is to determine whether each symbol or combination of symbol is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a single symbol or a combination will appear. Look at the symbols carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol or combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.';
                break;
        case 4:
            welcome_msg = 'Welcome to the fourth day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. You should now have some idea of which symbol is associated with which topic. You also discovered that symbols may appear in combination, and that each combination is associated with a specific topic.  ' +
                '     ' +
                '   Your task today is to review what you learned yesterday by determining whether each symbol or combination of symbol is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a single symbol or a combination will appear. Look at the symbols carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol or combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.  ';
                break;
        case 5:
            welcome_msg = 'Welcome to the fifth and last day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. As you discovered, symbols may appear alone or in different combinations. You should now have some idea of which symbol or combination is associated with which topic and  ' +
                '     ' +
                '   Today, you will be presented with the maximal combination of symbols possible in the artificial language (7 symbols). Some trials will also present unique symbols. Your task today is to determine whether each symbol or combination of symbols is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a symbol or combination will appear. Look at the symbol or combination carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol/ combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.  ';
                break;
        default:
            welcome_msg="Welcome! You have successfully finished all the days the visual trial."
            isDone=true;

    }


    $("#model-message").html("<p>" + welcome_msg + "</p>");

    if(isDone){
        setTimeout(function(){
            window.location.href = "/";
        },3000)
    }


}


function beginTrial() {
    $("#run-modal").modal('hide');
    generateDot(false);
    runData.blocks.push(block);
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
 * 3-Generate another dot
 * 4-Display color choice
 * 5-Provide feedback on color choice
 *
 * @param key:Keyboard stroke code that was pressed
 */
function nextTrial(key) {


    //If the currentTrial has just surpassed the number of trials per block,
    // create a new block and assign a new character display variation to it
    if (currentTrial > numberTrials) {
        currentTrial = 1;
        currentBlock++;
        //If the number of blocks tested per run is reached, submit the run
        if (currentBlock > numberOfBlocks) {
            submitRun(runData);
        }
        runData.blocks.push(block);
    }



    if (trialStage === 1 && key === 39) {
        topicChoice= Math.random() * 2;
        conditionChoice = Math.floor(Math.random() * 11)

        if (topicChoice > 1) {
            topicChoice = 2;

        }
        else {
            topicChoice = 1;
        }
        characterIdList = generateStimulus(topicChoice, conditionChoice);
        $("#dotTrial").css("display", "none");
        displayCharacter(characterIdList);
        $("#trialCharacter").css("display", "flex");
        trialStage = 2;
    }

    else if (trialStage === 2 && key === 39) { // 39 is right arrow key
        generateDot(true);
        trialStage = 3;
    }
    else if (trialStage === 3 && key === 39) {
        trialStage = 4;
        $("#trialCharacter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
    }
    else if (trialStage === 4 && (key === 38 || key === 40)) { //38 is up arrow key and 40 is the down arrow key
        trialStage = 5;
        feedback("#color-one", "#color-two", true);
        runData.blocks[currentBlock - 1].trials.push(trial);
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].key = key;
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].Block = currentBlock;
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].Condition = conditionChoice;
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].Topic = topicChoice;
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].Stim_ids = characterIdList;
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].Trial = currentTrial;
        currentTrial++;
    }
    else if (trialStage === 5) {
        trialStage = 1;
        generateDot(false);
        $("#colorAssociation").css("display", "none");
        feedback("#color-one", "#color-two", false);
    }


}

/**
 * The touchOption handles any input from a touchscreen device
 * @param choiceId
 */
function touchOption(choiceId) {
    var blockSchema = { "trials": [{ "color": null }] };
    var trialSchema = { "color": null };

    //If the currentTrial has just surpassed the number of trials per block (-1 is due to index starting at 0),
    // create a new block and assign a new character display variation to it
    if (currentTrial > numberTrials - 1) {
        currentTrial = 0;
        dataRun[selectedRun].blocks.push(blockSchema);
        currentBlock++;
        characterVariation = charactersToDisplay();
    }

    //If the number of blocks tested per run is reached, submit the run
    if (currentBlock > numberOfBlocks - 1) {
        var newRun = { "blocks": [{ "trials": [{ "color": null }] }] };
        dataRun.push(newRun);
        submitRun();
    }

    // Generate the dot
    if (trialStage === 1 && (choiceId === '#dotTrial')) {
        $("#dotTrial").css("display", "none");
        generateCharacter(characterVariation);
        $("#trialCharacter").css("display", "flex");
        trialStage = 2;
    } else if (trialStage === 2 && (choiceId === '#trialCharacter')) {
        generateDot(true);
        $("#dotTrial").css("display", "block");
        trialStage = 3;
    }
    else if (trialStage === 3 && (choiceId === '#dotTrial')) {
        $("#trialCharacter").css("display", "none");
        $("#dotTrial").css("display", "none");
        $("#colorAssociation").css("display", "flex");
        generateDot(false);
        trialStage = 4;
    }
    else if (trialStage === 4 && (choiceId === '#color-one' || choiceId === '#color-two')) {
        var choiceElement = $(choiceId);
        var answer = feedback("#color-one", "#color-two", true);

        // check if the chosen element id matches the correct answer element id
        if (answer.attr("id") === choiceElement.attr("id")) {
            // for now just storing if color picked was the correct ==> true
            dataRun.blocks[currentBlock - 1].trials[currentTrial - 1].color = true;
        } else {
            // if color picked was incorrect ==> false
            dataRun.blocks[currentBlock - 1].trials[currentTrial - 1].color = false;
        }


        trialStage = 5;
        run[currentRun].blocks[currentBlock].trials.push(trialSchema);
        currentTrial++;
    }
    else if (trialStage === 5) {
        $("#colorAssociation").css("display", "none");
        $("#dotTrial").css("display", "block");
        feedback("#color-one", "#color-two", false);
        trialStage = 1;
    }

}


function getTime(event, reading) {
    if (reading) { //reading time
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].reading_time = event.timeStamp;

    } else { //reaction time
        runData.blocks[currentBlock - 1].trials[currentTrial - 1].reaction_time = event.timeStamp;
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

    $("#dotTrial").css("display", "block");
    //generate dot at xPos and yPos of size 5 and 5
    ctx.fillRect(xPos, yPos, 5, 5);
}

// /**
//  * The charactersToDisplay function is used for 2 purposes. One is to associate how many characters are displayed
//  * in the current block and the other is to determine which random character will be displayed
//  * (See generateCharacter below)
//  * @returns {number}: Returns number of characters to display or which character to display
//  */
// function charactersToDisplay() {
//     return Math.floor(1 + (10 - 1) * Math.random());
// }


/**
 * The generateCharacter functions generates the characters to display for every character trial.
 * It works by randomly choosing characters (via charactersToDisplay) and appending them to the #trialCharacter element
 * @param numChar: The number of characters to present in the current block
 */
function displayCharacter(charIdxSeq, x) {

    var stimulus = "";
    $(".character-container").html("");
    var chinese_char = 13312;


    var CHARCODESET = math.add(math.multiply(math.range(0, 24), 100), chinese_char);
    var collection = CHARCODESET.valueOf().map(x => String.fromCharCode(x))


    for (var i = 0; i < charIdxSeq.length; i++) {
        
        stimulus += '<span class="chinese-char">' + collection[charIdxSeq[i]] + '</span>';
    }
    $(".character-container").append(stimulus);

}





function generateStimulus(topic, condition) {
    var topic = Sampling.Binomial(1, 0.5).draw() + 1

    //testing purposes
    var pEmit = get_pEmit(topic);
    var pTransit = get_pTransit(9)


    var charIdxSeq = [];
    var stateIdxSeq = [];
    var state = nonZero(Sampling.Multinomial(1, pTransit[0]).draw());
    state = state[0] + 1;
    var cnt = 0;

    while (true) {
        if (state == pTransit[0].length) {
            break
        };
        stateIdxSeq.push(state);
        cnt = cnt + 1;

        //emit
        multinomialEmit = Sampling.Multinomial(1, pEmit[state]);
        charidx = nonZero(multinomialEmit.draw());
        charIdxSeq.push(charidx[0]);

        //transit
        multinomialTransit = Sampling.Multinomial(1, pTransit[state]);
        state = nonZero(multinomialTransit.draw());
        state = state[0] + 1;

    };
    return charIdxSeq;
}










function get_pEmit(topic) {
    var nStates = 7;
    var nChars = 24;
    var pFreq = 0.9;
    var pEmitFreq = [];
    var pEmitInfreq = [];
    var pEmit = [];

    for (var k = 1; k <= nStates; k++) { pEmitFreq[k - 1] = Array(nChars).fill(0); };
    for (var k = 1; k <= nStates; k++) { pEmitInfreq[k - 1] = Array(nChars).fill(0); };

    for (var k = 1; k <= 5; k++) { pEmitFreq[0][k - 1] = Math.exp(k / 5 * 1); };
    for (var k = 6; k <= 7; k++) { pEmitInfreq[0][k - 1] = Math.exp((k - 5) / 2 * 2); };   // a

    for (var k = 8; k <= 10; k++) { pEmitFreq[1][k - 1] = Math.exp((k - 7) / 3 * 2); };   // S
    for (var k = 11; k <= 15; k++) { pEmitInfreq[1][k - 1] = Math.exp((k - 10) / 5 * 2); };   // S

    for (var k = 16; k <= 17; k++) { pEmitFreq[2][k - 1] = Math.exp((k - 15) / 2 * 1); };   // b
    for (var k = 18; k <= 18; k++) { pEmitInfreq[2][k - 1] = Math.exp((k - 17)); };   // b

    for (var k = 19; k <= 22; k++) { pEmitFreq[3][k - 1] = Math.exp((k - 18) / 4 * 2); };   // V
    for (var k = 23; k <= 23; k++) { pEmitInfreq[3][k - 1] = Math.exp((k - 22)); };   // V

    for (var k = 1; k <= 5; k++) { pEmitFreq[4][k - 1] = pEmitFreq[0][k - 1]; }; // c (same as a_freq)
    for (var k = 6; k <= 7; k++) { pEmitInfreq[4][k - 1] = pEmitInfreq[0][k - 1]; }; // c (same as a_infreq)

    for (var k = 11; k <= 15; k++) { pEmitFreq[5][k - 1] = pEmitInfreq[1][k - 1]; }; // O (from S_infreq)
    for (var k = 8; k <= 10; k++) { pEmitInfreq[5][k - 1] = pEmitFreq[1][k - 1]; }; // O (from S_freq)

    for (var k = 1; k <= pEmitFreq.length - 1; k++) {
        var sumOfRow = pEmitFreq[k - 1].reduce((a, b) => a + b, 0);
        pEmitFreq[k - 1] = pEmitFreq[k - 1].map(x => x / sumOfRow);
        var sumOfRow = pEmitInfreq[k - 1].reduce((a, b) => a + b, 0);
        pEmitInfreq[k - 1] = pEmitInfreq[k - 1].map(x => x / sumOfRow);
    };


    if (topic == 2) {
        for (var k = 1; k <= pEmitFreq.length - 1; k++) {
            var loc; var val; var tmp;
            loc = pEmitFreq[k - 1].reduce((r, v, i) => r.concat(v > 0 ? i : []), []);
            val = pEmitFreq[k - 1].reduce((r, v) => r.concat(v > 0 ? v : []), []);
            tmp = [].concat(pEmitFreq[k - 1]);
            for (var l = 1; l <= loc.length; l++) {
                tmp[loc[l - 1]] = val[loc.length - l];
            }
            pEmitFreq[k - 1] = tmp;

            loc = pEmitInfreq[k - 1].reduce((r, v, i) => r.concat(v > 0 ? i : []), []);
            val = pEmitInfreq[k - 1].reduce((r, v) => r.concat(v > 0 ? v : []), []);
            tmp = [].concat(pEmitInfreq[k - 1]);
            for (var l = 1; l <= loc.length; l++) {
                tmp[loc[l - 1]] = val[loc.length - l];
            }
            pEmitInfreq[k - 1] = tmp;
        }
    }

    for (var k = 1; k <= nStates; k++) { pEmit[k - 1] = Array(nChars).fill(0); };
    for (var k = 1; k <= pEmitFreq.length - 1; k++) {
        for (var l = 1; l <= pEmitFreq[k - 1].length; l++) {
            pEmit[k - 1][l - 1] = pEmitFreq[k - 1][l - 1] * pFreq + pEmitInfreq[k - 1][l - 1] * (1 - pFreq);
        }
    }
    pEmit[pEmit.length - 1][23] = 1;

    return pEmit
}



function get_pTransit(condition) {
    var pTransit;
    pTransit = [[]];
    pTransit[0] = [0.25, 0.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // start
    pTransit[1] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // a
    pTransit[2] = [0.0, 0.0, 0.25, 0.75, 0.0, 0.0, 0.0, 0.0];      // S
    pTransit[3] = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];      // b
    pTransit[4] = [0.0, 0.0, 0.0, 0.0, 0.2, 0.6, 0.00, 0.2];     // V
    pTransit[5] = [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0];     // c
    pTransit[6] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.8];     // O
    pTransit[7] = [0.2, 0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];      // X

    switch (condition) {
        case 1: // a, S
            pTransit[0] = [0.25, 0.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // start
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            break;
        case 2: // aS
            pTransit[0] = [0.9, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // start
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            pTransit[1] = [0.0, 0.9, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1];     // a            
            break;
        case 3: // b, V
            pTransit[0] = [0.0, 0.0, 0.25, 0.75, 0.0, 0.0, 0.0, 0.0];     // start
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            break;
        case 4: // bV
            pTransit[0] = [0.0, 0.0, 0.9, 0.1, 0.0, 0.0, 0.0, 0.0];     // start            
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            pTransit[3] = [0.0, 0.0, 0.0, 0.9, 0.0, 0.0, 0.0, 0.1];     // b
            break;
        case 5: // c, O
            pTransit[0] = [0.0, 0.0, 0.0, 0.0, 0.25, 0.75, 0.0, 0.0];     // start
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            break;
        case 6: //cO
            pTransit[0] = [0.0, 0.0, 0.0, 0.0, 0.9, 0.1, 0.0, 0.0];     // start            
            for (var k = 2; k <= pTransit.length; k++) {
                pTransit[k - 1] = Array(pTransit[k - 1].length).fill(0);
                pTransit[k - 1][pTransit[k - 1].length - 1] = 1;
            }
            pTransit[5] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.9, 0.0, 0.1];     // c
            break;
        case 7: // two words (aS, bV, cO)
            pTransit[0] = [0.333, 0.0, 0.333, 0.0, 0.334, 0.0, 0.0, 0.0];     // start
            pTransit[1] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // a
            pTransit[2] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];      // S
            pTransit[3] = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];      // b
            pTransit[4] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];     // V
            pTransit[5] = [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0];     // c
            pTransit[6] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];     // O
            pTransit[7] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];      // X
            pTransit[8] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];      // Y
            break;
        case 8: // SV(O) + (X)
            pTransit[0] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // start
            pTransit[1] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // a
            pTransit[2] = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];      // S
            pTransit[3] = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];      // b
            pTransit[4] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.85, 0.05, 0.1];     // V
            pTransit[5] = [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0];     // c
            pTransit[6] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.95];     // O
            pTransit[7] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];      // X
            break;
        case 9: //  aSbVcO
            pTransit[0] = [0.25, 0.75, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // start
            pTransit[1] = [0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];     // a
            pTransit[2] = [0.0, 0.0, 0.2, 0.8, 0.0, 0.0, 0.0, 0.0];      // S
            pTransit[3] = [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0];      // b
            pTransit[4] = [0.0, 0.0, 0.0, 0.0, 0.2, 0.6, 0.0, 0.2];     // V
            pTransit[5] = [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0];     // c
            pTransit[6] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0];    // O
            pTransit[7] = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];      // X
            break;
        case 10:
            break;
    }

    return pTransit;
}



function nonZero(array) {

    var nonZeroIndices = []
    array.forEach(function (num, index) {
        if (num != 0) {
            nonZeroIndices.push(index)
        }
    });
    return nonZeroIndices;
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
        setTimeout(function () { }, 500);

    }
    else {
        $(colorTwo).css("border", "0.3em solid #00ff00");
        setTimeout(function () { }, 500);
    }

}

function save(data) {


    //the data run is defined within the visualTrial.ejs template under the script tag
    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/save",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            console.log(response.success);
            alert("Successfully saved");
        },

    })

}

function submitRun(data) {
    //the data run is defined within the visualTrial.ejs template under the script tag
    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/submit",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert(response);
            window.location.href = "/";
        }
    });
}
