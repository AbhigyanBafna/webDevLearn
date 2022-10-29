

function diceG(){
let p1 = Math.floor(Math.random() * 6 + 1);
let srcString1 = "images/dice" + p1 + ".png";
document.querySelectorAll("img")[0].setAttribute("src",srcString1);

let p2 = Math.floor(Math.random() * 6 + 1);
srcString2 = "images/dice" + p2 + ".png";
document.querySelectorAll("img")[1].setAttribute("src",srcString2);

if(p1>p2){
    document.querySelector("a").innerHTML = "Player 1 Wins";
}
if(p1 == p2){
    document.querySelector("a").innerHTML = "Tie!";
}
if(p2>p1){
    document.querySelector("a").innerHTML = "Player 2 Wins";
}

}


