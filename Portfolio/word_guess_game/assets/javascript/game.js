var items = data;
var wordsArray = items;
var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
var kenScore = 0;
var playerScore = 0;
var letterCont = letterUsed();

document.getElementById("quit").style.display = "none";

document.getElementById("play").onclick = function() {loadGamePage()};

document.getElementById("quit").addEventListener("click", function(){
  var pageGame = document.querySelector(".play_game");
  var exit = document.querySelector(".exit");
  var gameOpacity = 1;
  var exitOpacity = 0;
  var timer = setInterval(function(){
    if(gameOpacity < 0.1){
            clearInterval(timer);
    }
  pageGame.style.opacity = gameOpacity;
  gameOpacity -=  0.1;
  pageGame.style.display = "none";
  exit.style.opacity = exitOpacity;
  exit.style.display = "block";
  exitOpacity +=  0.1;
  }, 100);
}, false);

document.getElementById("play_again").addEventListener("click", function(){
  document.querySelector(".word_container").innerHTML = "";
  document.getElementById("count").innerHTML = "";
  document.getElementById("game_over").innerHTML = "";
  document.getElementById("count").style.display = "block";
  document.getElementById("play_again").style.display = "none";
  document.getElementById("quit").style.display = "none";
  document.getElementById("player_score").innerHTML = "Your score <span class style=\"color:#CD6A50;\">" + playerScore + "</span>";
  document.getElementById("ken_score").innerHTML = "Cool Ken's score <span class style=\"color:#CD6A50;\">" + kenScore + "</span>";
  document.getElementById("letter_container").style.display = "block";
  document.getElementById("instruct").style.display = "none";
  var resetLetters = document.querySelectorAll(".letter_choice");
  for(i=0; i<resetLetters.length; i++) {
    resetLetters[i].style.color = "white";
  }
  var resetWhite = document.querySelectorAll(".letter");
          for(var w=0; w<resetWhite.length; w++) {
            if(resetWhite[w].style.color = "black") {
              resetWhite[w].style.color = "white";
            }
          }
  newGame();
}, false);


function loadGamePage() {
  var pageTwo = document.querySelector(".play_game");
  var landing = document.querySelector(".landing");
  var landingOpacity = 1;
  var pageTwoOpacity = 0;
  var timer = setInterval(function(){
  if(landingOpacity < 0.1){
          clearInterval(timer);
  }
  landing.style.opacity = landingOpacity;
  landingOpacity -=  0.1;
  landing.style.display = "none";
  pageTwo.style.opacity = pageTwoOpacity;
  pageTwo.style.display = "block";
  pageTwoOpacity +=  0.1;
  }, 100);

  if (isMobile) {
    // add input box
    document.getElementById("touch_input").style.display = "block";
  }
    newGame();
}

function getWordItem(wordsArray) {
  var random = Math.floor(Math.random() * wordsArray.length);
  var word = wordsArray[random];
  return word;
}

var newGame = function playGame() {
  
  if(wordsArray.length === 0) {
    var pageGame = document.querySelector(".play_game");
    var exit = document.querySelector(".exit");
    var gameOpacity = 1;
    var exitOpacity = 0;
    var timer = setInterval(function(){
      if(gameOpacity < 0.1){
              clearInterval(timer);
      }
    pageGame.style.opacity = gameOpacity;
    gameOpacity -=  0.1;
    pageGame.style.display = "none";
    exit.style.opacity = exitOpacity;
    exit.style.display = "block";
    exitOpacity +=  0.1;
    }, 100);
    document.getElementById("all_done").innerHTML = "You depleted Ken! Good job. Ken's done.";
  }
  
  var word = getWordItem(wordsArray);
  var wordItem = word.color_name;
  // console.log(wordItem);
  showBoxes(wordItem);
  letterBoxes = document.querySelectorAll(".wordBox");
  var happyLetters = [];
  var occurrences = [];
  var bumLetters = [];
  var maxLetters = Math.round(wordItem.length * .3) + wordItem.length;
  var kenSings = new Audio(word.color_file);
  var hex = word.hex;
  document.getElementById("play_again").style.display = "none";
  document.getElementById("count").innerHTML = "You have <span class style=\"color:#EF4F47;\">" + (maxLetters) + "</span> chances to make Ken sing.";
  

  document.onkeyup = function(event) {
    var userGuess = event.key;
    var hideLetter = "letter_" + userGuess;
    document.getElementById(hideLetter).style.color = "#262B33";
    document.getElementById("instruct").style.display = "none";
    if (!/^[a-zA-Z]*$/g.test(userGuess)) {
      document.querySelector(".no-numbers").style.display = "block";
    }
    
    if(wordItem.includes(userGuess)) {
      for(var i=0; i<wordItem.length;i++) {
          if (wordItem[i] === userGuess) { 
            occurrences.push(i);
            document.getElementById("id_" + i).innerHTML = "<p class=\"letter\">" + userGuess + "</p>";
        }
      } 
      happyLetters.push(userGuess);
    
    } else {
      bumLetters.push(event.key);
      document.getElementById("count").innerHTML = "You have <span class style=\"color:#EF4F47;\">" + (maxLetters - bumLetters.length) + "</span> left!"
    }
    if (bumLetters.length == maxLetters) {
      document.getElementById("count").style.display = "none";
      document.getElementById("instruct").style.display = "none";
      document.getElementById("letter_container").style.display = "none";
      document.getElementById("game_over").innerHTML = "Oh snap! Ken won.";
      document.getElementById("play_again").style.display = "block";
      document.getElementById("quit").style.display = "block";
      kenScore ++;
    }
    if(wordItem.length == occurrences.length) {
      document.getElementById("count").style.display = "none";
      document.getElementById("letter_container").style.display = "none";
      document.getElementById("instruct").style.display = "none";
      document.getElementById("game_over").innerHTML = "Yeaaah!! Ken's gunna sing.";
      playerScore ++;
      kenSings.play();
      kenSings.addEventListener("ended", function(){
        document.getElementById("play_again").style.display = "block";
        document.getElementById("quit").style.display = "block";
      });
      for(var x=0; x<letterBoxes.length; x++) {
        letterBoxes[x].style.background = hex;
      }
      if(wordItem === "white") {
        var whiteLetters = document.querySelectorAll(".letter");
        for(var w=0; w<whiteLetters.length; w++) {
          whiteLetters[w].style.color = "black";
        }
      }
      var removed = removeByKey(wordsArray, {
        key: 'id',
        value: word.id
      });
    }
    }

  function showBoxes(word) {
    for(var i = 0; i < wordItem.length; i++) { 
      var letterDiv = document.createElement("div");
      letterDiv.className = 'wordBox';
      letterDiv.setAttribute("id", "id_" + i);
      letterDiv.innerHTML = "<p class=\"letter\"></p>";
      letterDiv.style.display = "inline-block"
      letterDiv.style.background = "#74A7B2"
      document.querySelector(".word_container").appendChild(letterDiv);
    }
  }

}

function letterUsed() {
  var letters = "abcdefghijklmnopqrstuvwxyz";
  var letterArray = letters.split('');
  for(var i = 0; i < letterArray.length; i++) {
    var letterDiv = document.createElement("p");
    letterDiv.className = 'letter_choice';
    letterDiv.setAttribute("id", "letter_" + letterArray[i]);
    letterDiv.innerText = letterArray[i];
    letterDiv.style.display = "inline-block"
    document.querySelector("#letter_container").appendChild(letterDiv);
  }
}

function removeByKey(array, params){
  array.some(function(item, index) {
    return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
  });
  return array;
}




