sessionStorage.clear();
// YOUR TASK!!!
// Code in the logic for storing and retrieving the most recent user.
// Don't forget to provide initial data to your Firebase database.
name = $("#playerName").val().trim();
name = sessionStorage.getItem("name");
name = sessionStorage.setItem("name", name);
$("#session_name").append($("<h1>").html(`${name} is ready to play!`));
$("#name_form").hide();
$("#player_name").show();
//console.log(name);


database.ref().push({
    name: inputName,
    score: 0,
  });
  database.ref().on("child_added", function (childSnapshot) {
      console.log(childSnapshot.val());
  })



  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
});



database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    numberOfPlayers = snapshot.numChildren();
    console.log("number of players: " + numberOfPlayers);
      // Handle the errors
      if(numberOfPlayers == "2") {
        console.log("Room full");
    }
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  database.ref(`/${sessionStorage.getItem("name")}/`).set({
    name: sessionStorage.getItem("name"),
    win: 0,
    loss:0,
    tie:0,
    throw:""
  });
$("#session_name").append($("<h1>").html(`Hello ${sessionStorage.getItem("name")}, just waiting on another player`));
$("#player_name").show();
$("#name_form").hide();


database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.child(`/${playerData}/`).val());
      // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


//player left
  //$(".game-data").append($("<p>")).text(key);
  database.ref(`/${playerName}/`).onDisconnect().remove();
  console.log(snapshot.numChildren()); 
  console.log(snapshot.val());


  player1Ref.on('value', function(snapshot) {
    var pl1 = snapshot.val();
      console.log("player 1 browser: " + pl1.browser);
});


database.ref("player1/throw").orderBy("order").endAt(1).on("child_added", function(snapshot){
  console.log(snapshot.val());
});



database.ref().on("value", function (snapshot) {
  var pl1Throws = snapshot.child("player1/throw").numChildren();
  var pl12Throws = snapshot.child("player2/throw").numChildren();
  if(pl1Throws == pl12Throws) {
      //console.log(snapshot.orderByKey("player1/throw").limitToLast(1));
      gamesPlayed = pl1Throws;
      //console.log("games played: " + gamesPlayed);
      console.log("Player 1 = " + player1Throw);
      console.log("Player 2 = " + player2Throw);
      if(player1Throw === player2Throw) {
          database.ref(playerRef).update({
              tie: + 1
          });
      }
  }
})





// else {
//   var winner = theWin(player1Throw,player2Throw);
//   if(player1Throw == winner) {
//       database.ref("player1/win").transaction(function(win) {
//           return (win || 0) + 1;
//         });
//       database.ref("player2/loss").transaction(function(loss) {
//       return (loss || 0) + 1;
//       });
//   } else {
//       database.ref("player1/loss").transaction(function(loss) {
//           return (loss || 0) + 1;
//         });
//       database.ref("player2/win").transaction(function(win) {
//       return (win || 0) + 1;
//       });
//   }
// }



if (player1Throw === player2Throw) {
  database.ref("player1/tie").transaction(function(tie) {
      return (tie || 0) + 1;
    });
  database.ref("player2/tie").transaction(function(tie) {
  return (tie || 0) + 1;
  });
} else if (player1Throw != player2Throw) {
  var winner = theWin(player1Throw,player2Throw);
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
}



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


//use this!!!!

database.ref(`${playerRef}throw`).push({
  throw: $(this).val()
});
//$(".game-buttons").hide();
//console.log(sessionName + $(this).val());
database.ref("player1/throw").orderByKey().limitToLast(1).on("child_added", function(snapshot){
  player1Throw = snapshot.val().throw;
  //console.log(player1Throw);
});
database.ref("player2/throw").orderByKey().limitToLast(1).on("child_added", function(snapshot){
  player2Throw = snapshot.val().throw;
  //console.log(player2Throw);
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
      var winner = theWin(player1Throw,player2Throw);
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


