var choices=[];

/**
 * variable simulationStage indicates what part we must display
 * 0-Generate dot
 * 1-Display letters
 * 2-Display dot again
 * 3-Option Red or blue
 * @type {number}
 */

var simulationStage=0;



$(document).ready(function(){

    var simulationStage=0;
    $(window).keydown(function(key){
        if(simulationStage===0 || simulationStage===2){
            $("#simulationLetter").css("display","none");
            $("#colorAssociation").css("display","none");
            generateDot();
            $("#dotSimulation").css("display","block");
            if(simulationStage===0){
                simulationStage=1;
            }
            else{
                simulationStage=3;
            }
        }
        else if(simulationStage===1){
            $("#dotSimulation").css("display","none");
            $("#simulationLetter").css("display","flex");
            simulationStage=2;
        }else if(simulationStage===3){
            $("#dotSimulation").css("display","none");
            $("#simulationLetter").css("display","none");
            $("#colorAssociation").css("display","block");
            simulationStage=0;
        }

    })
});



function generateDot(){
    var canvas= $("canvas")[0];
    var canvasHeight=canvas.height;
    var canvasWidth=canvas.width;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle="#000000";

    var height =canvasHeight*Math.random();
    var width =canvasWidth*Math.random();
    // console.log(height);
    // console.log(width);
    ctx.fillRect(width,height,2,2);

}


function selectChar(id){
    choices.push(id);
    $("#simulationCanvas").html("<div>Blue</div>");
}

