
$( document ).ready(function() {
    sessionStorage.clear();
    var config = {
    apiKey: "AIzaSyCgbGCKQG43m5zScqjRMbSVBZ2QoGUUZHw",
    authDomain: "rps-data-2cc1f.firebaseapp.com",
    databaseURL: "https://rps-data-2cc1f.firebaseio.com",
    projectId: "rps-data-2cc1f",
    storageBucket: "",
    messagingSenderId: "882678428054"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// name is value from text box
var name;
// sessionName is the name of the player stored in the session
var sessionName;
// playerRef is going to firebase as /player1 or 2/
var playerRef;
var numberOfPlayers = 0;
var gamesPlayed = 0;
//currently not in use
var player1Throw;
var player2Throw;
var winner;
$("#game_contain").hide();
$("#game_info").hide();
$(".play_again").hide();
$("#chat_box").hide();


    $("#submitBtn").on("click", function (event) {
        // Don't refresh the page!
        event.preventDefault();
        //sessionStorage.clear();
        //inputName = $("#playerName").val().trim();
        name = $("#playerName").val().trim();
        numberOfPlayers ++;
        if(name == "") {
            $("#error").html("Take a second and think real hard, then enter your name.");
            $('#myModal').modal("show");
        } else {
            name = sessionStorage.setItem("name", name);
            playerRef = "/player" + numberOfPlayers +"/";
            sessionName = sessionStorage.getItem("name");
            sessionName = sessionStorage.getItem("name");
            //console.log(sessionName); 
            database.ref(playerRef).set({
                name: `${sessionName}`,
                win: 0,
                loss:0,
                tie:0,
                throw:'',
                message:''
            });
            $("#session_name").append($("<h1>").html(`Hello ${sessionStorage.getItem("name")}, just waiting on another player`));
            $("#game_info").show();
            $("#name_form").hide();
        }
    });

    var gameStarted = false;

    database.ref().on("value", function(snapshot) {
        numberOfPlayers = snapshot.numChildren();
        //console.log(snapshot.child("player1/browser").val());
        if(snapshot.numChildren() == 2) {
        // We have two players
            $("#game_info").hide();
            $("#session_name").empty();
            $("#session_name").hide();
            //database.ref().off();
            if(!gameStarted) {
                gameStarted = true;
                gameOn(snapshot);
            }
            
        }
        // one of the players quit
        database.ref(`${playerRef}`).onDisconnect().remove();
          // Handle the errors
      }, function(errorObject) {
      });

      database.ref().on("child_removed", function(snapshot) {
        $("#session_name").append($("<h1>").html("Looks like your opponent quit."));
        $("#game_info").show();
        $("#session_name").show();
        $("#game_contain").hide();
    });

    $(".game-buttons button").click(function(event){
        event.preventDefault();
        var roundReady = false;
        player1Throw = "";
        player2Throw = "";
        winner = "";
        $(".game-buttons").hide();
        $(".play_again").show();
        database.ref(`${playerRef}throw`).push({
            throw: $(this).val()
          });

        database.ref().on("value", function (snapshot) {
            var pl1Throws = snapshot.child("player1/throw").numChildren();
            var pl12Throws = snapshot.child("player2/throw").numChildren();
            if(pl1Throws == pl12Throws) {
                roundReady = true;
                database.ref().off("value");
            }
        });
        if(roundReady) {
            database.ref("player1/throw").orderByKey().limitToLast(1).on("child_added", function(snapshot){
                player1Throw = snapshot.val().throw;
                console.log(player1Throw);
              });
            database.ref("player2/throw").orderByKey().limitToLast(1).on("child_added", function(snapshot){
                player2Throw = snapshot.val().throw;
                console.log(player2Throw);
            });

            if(player1Throw && player2Throw) {
                if (player1Throw === player2Throw) {
                    database.ref("player1/tie").transaction(function(tie) {
                        return (tie || 0) + 1;
                      });
                    database.ref("player2/tie").transaction(function(tie) {
                    return (tie || 0) + 1;
                    });
                  } else if (player1Throw != player2Throw) {
                    winner = theWin(player1Throw,player2Throw);
                    if(player1Throw === winner) {
                        database.ref("player1/win").transaction(function(win) {
                            return (win || 0) + 1;
                          });
                        database.ref("player2/loss").transaction(function(loss) {
                        return (loss || 0) + 1;
                        });
                      } else {
                        database.ref("player1/loss").transaction(function(loss) {
                            return (loss || 0) + 1;
                          });
                        database.ref("player2/win").transaction(function(win) {
                        return (win || 0) + 1;
                        });
                      }
                      console.log(winner);
                  }
                  
              }
              
        }
        database.ref().on("value", function (snapshot) {
            $("#player_one").text(
                `${snapshot.child("player1/name").val()} 
                wins: ${snapshot.child("player1/win").val()}
                losses: ${snapshot.child("player1/loss").val()}
                ties: ${snapshot.child("player1/tie").val()}`
            );
            $("#player_two").text(
                `${snapshot.child("player2/name").val()} 
                wins: ${snapshot.child("player2/win").val()}
                losses: ${snapshot.child("player2/loss").val()}
                ties: ${snapshot.child("player2/tie").val()}`
            );
            database.ref().off("value");
            //console.log(snapshot.child("player1/browser").val());
          });
    }); //clear vars!!!!

    $("#play_more").click(function(event){
        event.preventDefault();
        $(".game-buttons").show();
        $(".play_again").hide();
    });
    $("#send_message").click(function(event){
        event.preventDefault();
        var message = $("#message_text").val().trim();
        database.ref(`${playerRef}message`).push({
            message: message
          });
    });
    database.ref("player1/message").orderByKey().limitToLast(1).on("child_added", function(snapshot){
        player1message = snapshot.val().message;
        $("#message_text").text(player1message).val();
    });
    database.ref("player2/message").orderByKey().limitToLast(1).on("child_added", function(snapshot){
        player2message = snapshot.val().message;
        $("#message_text").text(player2message).val();
    });
    
});

function gameOn(data) {
    $("#game_contain").show();
    $("#chat_box").show();
    var player1Name = data.child("player1/name").val();
    var player2Name = data.child("player2/name").val();
    //var player1Score = data.child("player1/win").val();
    //var player2Score = data.child("player2/win").val();
    $("#game_contain").prepend($("<h4>").text(player1Name + " vs " + player2Name));
    //$(".game-data").append($("<p>").text(player1Name + " wins: " + player1Score));
    //$(".game-data").append($("<p>").text(player2Name + " wins: " + player2Score));
}

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