var run;
var blocks = 3;
var numTrials=1;
var dotShift = false;
var sol;//solution


$(document).ready(function () {
    /* create timeline */
    var timeline = [];

    /* define welcome message trial */
    var welcome = {
        type: "html-keyboard-response",
        stimulus: "Welcome to the experiment.\nTo proceed through the trial, use the right arrow key to navigate. Once a colored dot appears, use the up and down arrow keys to select the color you associate yourself with and then continue to proceed with the right arrow key."
    };
    timeline.push(welcome);


    var dot_trial = {
        type: "html-keyboard-response",
        choices: jsPsych.NO_KEYS,
        stimulus: '<div class="row" id="dotTrial" ontouchstart="touchOption(\'#dotTrial\')"><div class="col-md-11" id="canvasContainer"> <canvas id="dotCanvas" >Your Browser does not Support Canvas Elements</canvas></div>',
        on_load: function () {
            generateDot(dotShift)
        },
        trial_duration: 750,
        data: {
            type: "dot"
        }
    };


    var char_trial = {
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus: function () {
            return genChar(charactersToDisplay())
        },
        trial_duration: 1000,
        data: {
            type: "char"
        }
    };


    var color_stimuli = [
        {
            stimulus: '<div id="color-container" onkeydown="feedback(key)"><div style=\'width: 5em;float:right\'>' +
            '		<div class="blue-stimuli"></div>' +
            '		<div class="orange-stimuli"></div>' +
            '	</div></div>'


        },
        {
            stimulus: '<div id="color-container" onkeydown="feedback(key)"><div style=\'width: 5em;float:right\'>' +
            '		<div class="orange-stimuli"></div>' +
            '		<div class="blue-stimuli"></div>' +
            '	</div></div>'
        }
    ];
    var color_trial = {
        type: 'categorize-html',
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: [38, 40],
        show_stim_with_feedback: true,
        key_answer: function () {
            sol = solution();
            return sol
        },
        incorrect_text: "Incorrect",
        data: {
            type: "color"
        }


    };


    var block_experiment = {
        timeline: [dot_trial, char_trial, dot_trial, color_trial],
        timeline_variables: color_stimuli,
        randomize_order: true,
        repetitions: blocks*numTrials
    };

    timeline.push(block_experiment);

    /* start the experiment */
    jsPsych.init({
        display_element: 'neuro-trials',
        timeline: timeline,
        on_finish: function () {
            jsPsych.data.displayData();
            // submitRun(jsPsych.data);
            run ={"session":JSON.parse(jsPsych.data.get().json())};
            submitRun(run)
        },
    });

});


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

function solution() {
    if (Math.random * 2) {
        return 38
    }
    else {
        return 40
    }
}

function save() {
    // submitRun(jsPsych.data);
    run ={"session":JSON.parse(jsPsych.data.get().json())};

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