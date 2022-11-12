
let bColors = ["red","blue","green","yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

$(document).keypress(function(e){
    if (!started) {

        nextSequence(); //Starts the game on Keypress
        started = true; //Set to true so that on another keypress, game doesn't glitch.
    }
});

$(".btn").on("click",function(e){

    userPattern.push(e.target.id); //Logs user moves into array

    sPlayer(e.target.id); //Plays Sounds
    fButton(e.target.id); //Flashes Button

    checkAns(userPattern.length-1); //Checks answer against current sequence.
})

function checkAns(currentLevel){

    if(gamePattern[currentLevel] == userPattern[currentLevel]){  //To check if the most recent answer is correct.

        if (userPattern.length === gamePattern.length){ //Checks for no of elements in both arrays which should be same

        setTimeout(function () {
            nextSequence(); //Calls for next pattern after a 1 second delay
          }, 1000);

        }
    }
    else{

        sPlayer("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over"); //Ends the game and flashes a red screen with a sound for 0.2 seconds.
        }, 200);

        startOver(); //Resets everything.

    }
}

function nextSequence(){

    userPattern = []; //Clears userPattern so that user enters the whole pattern again
    level++;

    $("#level-title").html("Level " + level); //Upgrades to next level

    let rand = Math.floor(Math.random()*4);
    gamePattern.push(bColors[rand]); //Pushes another random color to the pattern

    fButton(bColors[rand]);
    sPlayer(bColors[rand]); // Displays the newly added color to user.

}

function fButton(color){
    $("#"+color).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50); //Flashes the button
}

function sPlayer(color){
    var audio = new Audio("sounds/" + color + ".mp3"); //Plays required audio
    audio.play();
}

function startOver() { //Resets the level and game pattern.
    level = 0;
    gamePattern = [];
    started = false; //Set to false to reset the keypress detection.
  }