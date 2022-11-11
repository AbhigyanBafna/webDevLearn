
let bColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

$(document).keypress(function(e){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(e){

    userPattern.push(e.target.id); //Logs user moves into array

    sPlayer(e.target.id); //Plays Sounds
    fButton(e.target.id); //Flashes Button

    checkAns(userPattern.length-1); //Checks answer against current sequence.
})

function checkAns(currentLevel){

    if(gamePattern[currentLevel] == userPattern[currentLevel]){ 

        if (userPattern.length === gamePattern.length){ //Checks if there are same number of entries in both arrays

        setTimeout(function () {
            nextSequence();
          }, 1000);

        }
    }
    else{

        sPlayer("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        startOver();

    }
}

function nextSequence(){

    userPattern = [];
    level++;

    $("#level-title").html("Level " + level);

    let rand = Math.floor(Math.random()*4);
    gamePattern.push(bColors[rand]);

    fButton(bColors[rand]);
    sPlayer(bColors[rand]);

}

function fButton(color){
    $("#"+color).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
}

function sPlayer(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }