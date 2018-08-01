var run;
var blocks;
var dotShift = false;


$(document).ready(function () {
    /* create timeline */
    var timeline = [];

    /* define welcome message trial */
    var welcome = {
        type: "html-keyboard-response",
        stimulus: "Welcome to the experiment.\nTo proceed through the trial, use the right arrow key to navigate. Once a colored dot appears, use theup and down arrow keys to select the color you associate yourself with and then continue to proceed with the right arrow key."
    };
    timeline.push(welcome);

    /* define instructions trial */
    var instructions = {
        type: "html-keyboard-response",
        stimulus: "<p>In this experiment, a circle will appear in the center " +
        "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
        "press the letter F on the keyboard as fast as you can.</p>" +
        "<p>If the circle is <strong>orange</strong>, press the letter J " +
        "as fast as you can.</p>" +
        "<div style='width: 700px;'>" +
        "<div style='float: left;'><img src='images/blue.png'></img>" +
        "<p class='small'><strong>Press the F key</strong></p></div>" +
        "<div class='float: right;'><img src='images/orange.png'></img>" +
        "<p class='small'><strong>Press the J key</strong></p></div>" +
        "</div>" +
        "<p>Press any key to begin.</p>",
        post_trial_gap: 1000
    };
    timeline.push(instructions);


    var dot_trial = {
        type: "html-keyboard-response",
        choices: jsPsych.NO_KEYS,
        stimulus: '<div class="row" id="dotTrial" ontouchstart="touchOption(\'#dotTrial\')"><div class="col-md-11" id="canvasContainer"> <canvas id="dotCanvas" >Your Browser does not Support Canvas Elements</canvas></div>',
        on_load: function () {
            generateDot(dotShift)
        },
        trial_duration: 1000

    };

    var char_stimuli ={char_stimulus:genChar(charactersToDisplay())};
    var char_trial = {
        type: 'html-keyboard-response',
        choices: jsPsych.NO_KEYS,
        stimulus: jsPsych.timelineVariable('char_stimuli'),
        trial_duration: 1000
    };


    var color_stimuli = [
        {
            stimulus: '<div id="color-container"><div style=\'width: 5em;float:right\'>' +
            '		<div>' +
            '			<img src=\'images/blue.png\' style=\'max-width: 100%;\'>' +
            '		</div>' +
            '		<div>' +
            '			<img src=\'images/orange.png\' style=\'max-width: 100%;\'>' +
            '		</div>' +
            '	</div></div>'
        },
        {
            stimulus: '<div id="color-container"><div style=\'width: 5em;float:right\'>' +
            '		<div>' +
            '			<img src=\'images/orange.png\' style=\'max-width: 100%;\'>' +
            '		</div>' +
            '		<div>' +
            '			<img src=\'images/blue.png\' style=\'max-width: 100%;\'>' +
            '		</div>' +
            '	</div></div>'
        }
    ];
    var color_trial = {
        type: 'html-keyboard-response',
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: [38, 40]
    };


    var block_experiment = {
        timeline: [dot_trial,char_trial,dot_trial, color_trial],
        timeline_variables: {char_stimuli,color_stimuli},
        randomize_order: true,
        repetitions: 5
    };

    timeline.push(block_experiment);

    /* start the experiment */
    jsPsych.init({
        display_element: 'neuro-trials',
        timeline: timeline,
    });

});


function generateDot(rightSide) {
    var canvas = $("canvas")[0];
    var ctx = canvas.getContext("2d");

    ctx.canvas.width = window.innerWidth*0.9;
    ctx.canvas.height = window.innerHeight*0.9;
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
function genChar(num){
    var stimulus="";
    var chinese_char=13312;
    for (var i = 0; i < num; i++) {
        chinese_char+=charactersToDisplay()*100;
        stimulus += '<span>&#' + chinese_char + '</span>'
    }
    return stimulus;
}