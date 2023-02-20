var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;




function nextSequence(){
    level ++ ;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    userClickedPattern = [];

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}

$(document).keydown(function(){
    if (start != true){
        nextSequence();
        $("#level-title").text("level "+level);
        userClickedPattern = [];
        start = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over")
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");

      stratOver();

    }

}

function stratOver(){
    level = 0;
    gamePattern = [];
    start = false;
}

