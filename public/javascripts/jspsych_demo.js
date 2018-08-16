//var run is defined in a script tag within jspsychDemo.ejs
var blocks = 3;
var numTrials = 1;
var dotShift = false;
var sol;//solution
var color_order;

$(document).ready(function () {
    /* create timeline */
    var timeline = [];

    /* define welcome message trial */
    var welcome = {
        type: "html-keyboard-response",
        stimulus: runMessage(run)
    };
    timeline.push(welcome);


    var dot_trial = {
        type: "html-keyboard-response",
        choices: [39],
        stimulus: '<div class="row" id="dotTrial" ontouchstart="touchOption(\'#dotTrial\')"><div class="col-md-11" id="canvasContainer"> <canvas id="dotCanvas" >Your Browser does not Support Canvas Elements</canvas></div>',
        on_load: function () {
            generateDot(dotShift)
        },
        data: {
            type: "dot"
        }
    };


    var char_trial = {
        type: 'html-keyboard-response',
        choices: [39],
        stimulus: function () {
            return genChar(charactersToDisplay())
        },
        data: {
            type: "char"
        }
    };


    var color_stimuli = [
        {
            stimulus: '<div class="color-container"><div style=\'width: 5em;float:right\'>' +
                '		<div class="blue-stimuli up-selection"></div>' +
                '		<div class="orange-stimuli down-selection"></div>' +
                '	</div></div>'


        },
        {
            stimulus: '<div class="color-container"><div style=\'width: 5em;float:right\'>' +
                '		<div class="orange-stimuli up-selection"></div>' +
                '		<div class="blue-stimuli down-selection"></div>' +
                '	</div></div>'
        }
    ];
    var color_trial = {
        type: 'categorize-html',
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: [38, 40],
        show_stim_with_feedback: false,
        trial_duration: 5000,
        feedback_duration: 1,
        key_answer: solution(),
        incorrect_text:" ",
        correct_text:" ",
        timeout_message:" ",
        post_trial_gap:8000,
        on_start: function(trial){
            color_order=trial.stimulus;
        },
        on_finish: function (data) {
            feedback(data.correct,data.key_press, data.stimulus);
            setTimeout(function(){displayAnswer(data.correct)},2000);
        },
        data: {
            type: "color"
        }


    };


    var block_experiment = {
        timeline: [dot_trial, char_trial, dot_trial, color_trial],
        timeline_variables: color_stimuli,
        randomize_order: true,
        repetitions: blocks * numTrials
    };

    timeline.push(block_experiment);

    /* start the experiment */
    jsPsych.init({
        display_element: 'neuro-trials',
        timeline: timeline,
        on_finish: function () {
            jsPsych.data.displayData();
            // run ={"session":JSON.parse(jsPsych.data.get().json())};
            // submitRun(run)
        },
    });

});


function runMessage(run) {

    switch (run) {
        case 1:
            return 'Welcome to the first day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. Your task today is to determine the topic associated with each symbol.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a unique symbol will appear. Look at the symbol carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”). Note that if you do not make a choice by pressing ↑ or ↓, a green circle will appear around the correct answer.  ' +
                '     ' +
                '  When you are ready to start, press →  ';
        case 2:
            return 'Welcome to the second day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. Yesterday, you learned that this language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. Your task today is to review what you learned yesterday by associating each symbol with its corresponding topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a unique symbol will appear. Look at the symbol carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”). Note that if you do not make a choice by pressing ↑ or ↓, a green circle will appear around the correct answer.  ' +
                '     ' +
                '  When you are ready to start, press →.';
        case 3:
            return 'Welcome to the third day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. You should now have some idea of which symbol is associated with which topic.  ' +
                '     ' +
                '   Today, you will discover that symbols may appear in combination. Specifically, you will read combinations of 2 and 3 symbols, in addition to symbols presented alone. Your task is to determine whether each symbol or combination of symbol is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a single symbol or a combination will appear. Look at the symbols carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol or combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.';
        case 4:
            return 'Welcome to the fourth day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. You should now have some idea of which symbol is associated with which topic. You also discovered that symbols may appear in combination, and that each combination is associated with a specific topic.  ' +
                '     ' +
                '   Your task today is to review what you learned yesterday by determining whether each symbol or combination of symbol is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a single symbol or a combination will appear. Look at the symbols carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol or combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.  ';
        case 5:
            return 'Welcome to the fifth and last day of your experimental training. In this experiment, we are trying to understand how people learn artificial languages. We specifically created an artificial language that you will learn here for 5 days. This language is composed of different symbols. Each of the symbols is associated with a specific “topic”: “red” or “blue”. As you discovered, symbols may appear alone or in different combinations. You should now have some idea of which symbol or combination is associated with which topic and  ' +
                '     ' +
                '   Today, you will be presented with the maximal combination of symbols possible in the artificial language (7 symbols). Some trials will also present unique symbols. Your task today is to determine whether each symbol or combination of symbols is associated with the “red” or the “blue” topic.  ' +
                '     ' +
                '   At the beginning of each trial, you will see a black dot on the screen. Press → and a symbol or combination will appear. Look at the symbol or combination carefully. Press → again and two vertically-aligned dots with a red and a blue square around them will appear. At this point, you will have to decide whether the symbol/ combination presented is associated with the topic “red” or the topic “blue”. Press ↑ to select the topic at the top or ↓ to select the topic at the bottom. Please answer as accurately and as fast as possible. A green circle will appear around the chosen topic when you select it.  ' +
                '     ' +
                '   After that, a feedback message will appear on the screen indicating whether your choice was correct (“CORRECT”) or wrong (“WRONG”).  ' +
                '     ' +
                '  When you are ready to start, press →.  ';

    }

}

//Generate dot is responsible for the black dot that appears in between trials
function generateDot(rightSide) {
    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth * 0.75;
    ctx.canvas.height = window.innerHeight * 0.75;
    var height = canvas.height;
    var width = canvas.width;
    var yPos = height / 2;
    var xPos;

    //Clears any previous dots on board
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.imageSmoothingEnabled = false;

    if (rightSide) {
        xPos = width * (3 / 4);
        dotShift = false;
    }
    else {
        xPos = width / 4;
        dotShift = true;
    }


    //generate dot at xPos and yPos of size 5 and 5
    ctx.fillRect(xPos, yPos, 5, 5);
}


function charactersToDisplay() {
    return Math.floor(1 + (10 - 1) * Math.random());
}

function genChar(num) {
    var stimulus = "";
    var chinese_char = 13312;
    for (var i = 0; i < num; i++) {
        chinese_char += charactersToDisplay() * 100;
        stimulus += '<span class="chinese-char">&#' + chinese_char + '</span>'
    }
    return stimulus;
}

//determines using the probability the right answer
function solution() {
    if (Math.random * 2>=1) {
        sol=38;
    }
    else {
        sol=40;   
    }
    return sol;
}

//determines the feedback, green circle for selection chosen
function feedback(userSelection, correctKeyboardKey, stimulus) {
    var feedbackDisplay=$(stimulus);
    if(userSelection){ // if the user got the choice right
        if(correctKeyboardKey == 38){//if the correct key is the up arrow
            feedbackDisplay.find('.up-selection').addClass('green-highlight');
            $('#jspsych-content').append(feedbackDisplay);
        }
        else{
            feedbackDisplay.find('.down-selection').addClass('green-highlight');
            $('#jspsych-content').append(feedbackDisplay);

        }
    }
    else{
        if(correctKeyboardKey == 38){//if the correct key is the up arrow
            feedbackDisplay.find('.down-selection').addClass('green-highlight');
            $('#jspsych-content').append(feedbackDisplay);
        }
        else{
            feedbackDisplay.find('.up-selection').addClass('green-highlight');
            $('#jspsych-content').append(feedbackDisplay);

        }
    }

}


function displayAnswer(correctAnswer){
    $('#jspsych-content').html("");
    if(correctAnswer){
        $('#jspsych-content').append("<p>Correct</p>");
    }
    else{
        $('#jspsych-content').append("<p>Incorrect</p>");
    }
}




//save function
function save() {
    // submitRun(jsPsych.data);
    run = { "session": JSON.parse(jsPsych.data.get().json()) };

    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/save",
        data: run,
        success: function (response) {
            console.log(response.success);
            alert("Successfully saved");
        }
    })

}

function submitRun(run) {

    $.ajax({
        method: "PUT",
        url: window.location.pathname + "/submit",
        data: run,
        success: function (response) {
            alert(response);
            window.location.href = "/";
        }
    });
}