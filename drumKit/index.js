
n = document.querySelectorAll(".drum").length;

for(var i = 0; i<n ; i++){

document.querySelectorAll(".drum")[i].addEventListener("click", function (){

    let i = this.innerHTML;
    bAnim(i);
    sPlayer(i);

});

}

document.addEventListener('keydown', function(e){    

    bAnim(e.key);
    sPlayer(e.key);

});

function sPlayer(i){

    switch(i){
        case 'j' :
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            break;
        case 'k' :
            var audio = new Audio("./sounds/kick-bass.mp3");
            audio.play();
            break;
        case 'l' :
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            break;
        case 'w' :
            var audio = new Audio("./sounds/tom-1.mp3");
            audio.play();
            break;
        case 'a' :
            var audio = new Audio("./sounds/tom-2.mp3");
            audio.play();
            break;
        case 's':
            var audio = new Audio("./sounds/tom-3.mp3");
            audio.play();
            break;
        case 'd':
            var audio = new Audio("./sounds/tom-4.mp3");
            audio.play();
            break;
        default : console.log(i);
    }

}

function bAnim(i){
    var activeButton = document.querySelector("." + i);
    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    },100);
}