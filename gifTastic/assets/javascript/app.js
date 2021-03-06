var topics = ['unicorns', 'nuns', 'turtles', 'spaceship', 'racoons', 'yarn', 'yosemite sam', 'bill and ted'];

createBtns();
    
$(document).on("click", ".topic", displayTopic);

$("#topic-add").on("click", function(event) {
    event.preventDefault();

    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    $('#topic-input').val('');
    createBtns();
    });        
    
    $('body').on('click','img',function(){
        var state = $(this).attr("class");        
        if(state === "view_layer") {
            $(this).removeClass('view_layer').addClass('hide_layer');
            $( this ).siblings().removeClass('hide_layer').addClass('view_layer');
        }
        })

function createBtns() {

    $("#topic-btns").empty();

    for (var i = 0; i < topics.length; i++) {

      var a = $('<button type="button" class="btn btn-outline-secondary mr-2">');
      a.addClass("topic");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#topic-btns").append(a);
    }
  }

  function displayTopic() {
    $("#topic-display").empty();
    var topic = $(this).attr("data-name");
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=dc6zaTOxFJmzC`;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for(i=0;i<10; i++) {
        var giphDiv = $("<div class='giphContain clearfix'>");
        var stillURL = response.data[i].images.fixed_height_still.url;
        var playUrl = response.data[i].images.fixed_height.url;
        var pausedGiph = $("<img>").attr({class: "view_layer", id:"paused_" + i, src:stillURL});
        var playGiph = $("<img>").attr({class: "hide_layer", id:"play_" + i, src:playUrl});
        var giphTitleBox = $('<p class="giph_title">');
        var giphRatingBox = $('<p class="giph_rating">');
        var giphTitle = response.data[i].title;
        var giphRating = "Rating: " + response.data[i].rating;
        console.log(giphRating);
        var giphDownload = $(`<a href="${playUrl}" target="blank" class="down_load"><img src="assets/images/download.svg"></a>`)
        giphTitleBox.text(giphTitle);
        giphRatingBox.text(giphRating);
        $(giphDiv).append(pausedGiph);
        $(giphDiv).append(playGiph);
        $(giphDiv).append(giphTitleBox);
        $(giphDiv).append(giphRatingBox);
        $(giphTitleBox).append(giphDownload);
        $("#topic-display").append(giphDiv);
      }
      createBtns();
      $(".play").hide();
      
    });
  }