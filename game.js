var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];


$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

var started = false;
var level = 0;
$(document).keypress(function(){
    
    if(!started){
        $("#level-title").text("Level " + level); 
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    
    level++;
    var randomNumber= Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 
    playSound(randomChosenColor);

    
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function playSound(name){
     
    
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
 

}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();},1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart"); 
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
        level = 0;
        started = false;
        gamePattern =[];
}
