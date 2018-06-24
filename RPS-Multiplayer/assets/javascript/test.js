var play2 = "rock";
var play1 = "paper";

var winner = theWin(play1,play2);
console.log(winner);

function theWin(play1,play2) {
    if(play1 == "rock" && play2 == "scissors") {
        winner = "rock";
    }
    if(play1 == "scissors" && play2 == "rock") {
        winner = "rock";
    }
    if(play1 == "paper" && play2 == "rock") {
        winner = "paper";
    }
    if(play1 == "rock" && play2 == "paper") {
        winner = "paper";
    }
    if(play1 == "scissors" && play2 == "paper") {
        winner = "scissors";
    }
    if(play1 == "paper" && play2 == "scissors") {
        winner = "scissors";
    }

    return winner;
}
