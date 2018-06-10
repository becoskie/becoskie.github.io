var gamesPlayed = 0;
var trivia = data;
var correct = 0;
var wrong = 0;
var unAnswered = 0;

$( document ).ready(function() {
    $(".trivia_block, .reply, .final_score, #play_again").hide();
    $("#play").click(function(){
        $('.landing').hide();
        gameBlock();
    });
    $("#play_again").click(function(){
        gamesPlayed = 0;
        correct = 0;
        unAnswered = 0;
        wrong = 0;
        $(".final_score").empty();
        $(".final_score, #play_again").hide();
        gameBlock();
    });

}); //end ready

function gameBlock() {
    gamesPlayed ++;
    var trivArr = getTriva();
    console.log(trivArr);
    var ranAns = Math.floor(Math.random()*4);
    var query = trivArr[ranAns];
    var answer = trivia[query];
    var userAnser;
    var userChoice;
    var questP = $("<p>");
    var timeleft = 20;
    $("#timer").text(timeleft);
    questP.text(answer.question);
    $(".questions").append(questP);
    trivArr.forEach( function(item) {
        var choiceP = $("<p>").text(trivia[item].title);
        choiceP.attr('id', trivia[item].id);
        $(".answers").prepend(choiceP);
      });
    $(".trivia_block").show();
    $(".answers p").click(function(){
        clearInterval(gameTimer);
        userChoice = $(this).attr('id');
        if (userChoice === answer.id) {
            userAnser = true;
            correct ++;
        } else {
            userAnser = false;
            wrong ++; 
        }
        $(".answers").empty();
        $(".questions").empty();
        $('.trivia_block').hide();
        resultBlock(answer, userAnser);
    });
    var gameTimer = setInterval(function(){
        timeleft--;
        $("#timer").text(timeleft);
        
        if(timeleft <= 0) {
            clearInterval(gameTimer);
            userAnser = false;
            unAnswered ++;
            $(".answers").empty();
            $(".questions").empty();
            $('.trivia_block').hide();
            resultBlock(answer, userAnser);
        }
    },1000);
}

function getTriva() {
    var arr = []
    while(arr.length < 4){
        var randomnumber = Math.floor(Math.random()*trivia.length);
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    return arr;
}

function resultBlock(answer, clickedAns) {
    $(".reply").show();
    var replyText;
    var showReply = 2;
    if(clickedAns === true) {
        replyText = "Good Job!!";
    } else {
        replyText = "Sorry, the correct answer is:";
    }
    $("#reply_txt").text(replyText);
    $(".state").attr("src",`assets/images/${answer.file}`);
    $("#img_text").text(answer.title);

    var replyTime = setInterval(function(){
        showReply--;
        if(showReply <= 0) {
            clearInterval(replyTime);
            $("#reply_txt").text('');
            $("#my_image").attr("src","");
            var removed = removeByKey(trivia, {
                key: 'id',
                value: answer.id
              });
            gameStatus();
        }   
    }, 1000);
}

function gameStatus() {
    if(gamesPlayed === 10) {
        $(".reply").hide();
        $(".final_score").show();
        $("#play_again").show();
        finalScore();
   } else {
        $(".reply").hide();
        gameBlock();
   }
}

function finalScore(){
    var total = correct + wrong + unAnswered;
    var percent = correct/total;
    var finalStat = $("<p>");
    var closeStatement = $("<p>");
    finalStat.text(`You had ${correct} questions right out of ${total}.`);
    if(percent > .89) {
        closeStatement.text("Ok. Wow, you're very good at catching Trouser Pantskyseses.");
    } else {
        closeStatement.text("That wasn't enough, Trouser Pantsky out witted the stink out of you.");
    }
    $(".final_score").prepend(finalStat);
    $(".final_score").append(closeStatement);
}

function removeByKey(array, params){
    array.some(function(item, index) {
      return (array[index][params.key] === params.value) ? !!(array.splice(index, 1)) : false;
    });
    return array;
}